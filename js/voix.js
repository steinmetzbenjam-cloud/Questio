/*
 * Questio — la voix et les sons.
 *
 * Par défaut, les questions sont lues par des enregistrements faits sur un
 * Mac avec une belle voix (audio/, voir outils/enregistrer.py) : la même voix
 * sur tous les téléphones. On peut aussi choisir une voix du téléphone
 * (synthèse vocale), qui sert de toute façon de repli si un enregistrement
 * manque.
 * Chaque indice est une phrase courte, lue d'un seul tenant : on peut ainsi
 * l'interrompre au buzzer et la reprendre proprement au début de l'indice.
 *
 * Sans synthèse vocale (ou voix coupée), la lecture est simulée au rythme
 * d'une voix : le texte s'affiche et le jeu se déroule de la même façon.
 */
/* -------------------------------------------------------------- volume --- */

/*
 * Un seul moteur audio pour la voix enregistrée et les petits sons, avec un
 * volume général réglable dans Questio. Sur iPhone, les boutons du téléphone
 * ne règlent le son d'une application web que pendant qu'elle joue : entre
 * deux phrases, ils règlent la sonnerie. Et le volume d'un lecteur audio n'y
 * est pas modifiable directement. D'où ce réglage à nous.
 */
const Sortie = (() => {
  let contexte = null;
  let principal = null;
  let niveau = 0.7;

  /*
   * Type de son demandé à l'iPhone (Safari 17 et plus). Pendant la dictée,
   * iOS passe en mode « appel » (micro, son traité pour la voix) et n'en
   * ressort pas toujours seul : la voix restait sourde après une réponse
   * dictée. On redemande donc explicitement le mode « lecture » ensuite.
   */
  function typeSession(type) {
    try {
      if (navigator.audioSession) navigator.audioSession.type = type;
    } catch (e) { /* navigateur sans cette possibilité */ }
  }

  function modeLecture() {
    typeSession('playback');
    reveiller();
  }

  function modeEnregistrement() {
    typeSession('play-and-record');
  }

  /** Crée le moteur (à faire pendant un toucher : iOS l'exige). */
  function preparer() {
    typeSession('playback');
    if (contexte) return contexte;
    try {
      contexte = new (window.AudioContext || window.webkitAudioContext)();
      principal = contexte.createGain();
      principal.gain.value = gain();
      principal.connect(contexte.destination);
      garderEveille();
    } catch (e) {
      contexte = null;
    }
    return contexte;
  }

  /**
   * Un son inaudible joue en continu : iOS ne met plus le moteur en pause
   * entre deux phrases, et les boutons du téléphone règlent le son de Questio
   * (et non la sonnerie) pendant toute la partie.
   */
  function garderEveille() {
    const veille = contexte.createOscillator();
    const muet = contexte.createGain();
    veille.frequency.value = 30;
    muet.gain.value = 0.0001;
    veille.connect(muet).connect(contexte.destination);
    veille.start();
  }

  /** Relance le moteur si iOS l'a mis en pause (appel, mise en veille…). */
  function reveiller() {
    if (contexte && contexte.state !== 'running') {
      const r = contexte.resume();
      if (r) r.catch(() => {});
    }
  }

  /**
   * Relance le moteur et attend qu'il tourne vraiment (une demi-seconde au
   * plus) : la relance n'est pas instantanée, il ne faut pas jouer trop tôt.
   */
  function pret() {
    if (!contexte || contexte.state === 'running') return Promise.resolve();
    return Promise.race([
      Promise.resolve(contexte.resume()).catch(() => {}),
      new Promise(r => setTimeout(r, 500))
    ]);
  }

  function actif() {
    return !!contexte && contexte.state === 'running';
  }

  // L'oreille perçoit le volume de façon non linéaire : on élève au carré.
  function gain() {
    return niveau * niveau;
  }

  function regler(valeur) {
    niveau = Math.max(0, Math.min(1, valeur));
    if (principal) principal.gain.value = gain();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') reveiller();
  });

  // Seul un vrai toucher autorise à relancer un moteur mis en pause par iOS :
  // on en profite à chaque fois (buzz, « Question suivante »…).
  for (const evenement of ['pointerdown', 'touchend', 'keydown']) {
    document.addEventListener(evenement, reveiller, { capture: true, passive: true });
  }

  return {
    preparer, reveiller, pret, actif, regler, modeLecture, modeEnregistrement,
    niveau: () => niveau,
    contexte: () => contexte,
    entree: () => principal
  };
})();

/* ------------------------------------------------------- enregistrements --- */

/*
 * Les fichiers audio sont chargés en mémoire (Blob) avant d'être joués :
 * Safari lit mal un son servi par le cache hors ligne, un Blob jamais.
 */
const Enregistrements = (() => {
  const charges = new Map(); // nom → Promise<adresse locale | null>

  function adresse(nom) {
    if (!charges.has(nom)) {
      charges.set(nom, fetch('audio/' + nom + '.m4a')
        .then(r => (r.ok ? r.blob() : null))
        .then(b => (b ? URL.createObjectURL(b) : null))
        .catch(() => null));
    }
    return charges.get(nom);
  }

  /** Charge d'avance les sons d'une partie, pour ne jamais attendre. */
  function precharger(noms) {
    noms.forEach(adresse);
  }

  function oublier() {
    for (const promesse of charges.values()) promesse.then(u => { if (u) URL.revokeObjectURL(u); });
    charges.clear();
  }

  return { adresse, precharger, oublier };
})();

const Voix = (() => {

  const ENREGISTREE = 'enregistree'; // la voix enregistrée (Audrey)
  const NOM_ENREGISTREE = 'Audrey';

  const synthese = 'speechSynthesis' in window ? window.speechSynthesis : null;

  // Un seul lecteur, branché sur le moteur audio : c'est lui qui porte le
  // volume réglable de Questio.
  const lecteur = new Audio();
  lecteur.preload = 'auto';
  let lecteurBranche = false;

  function brancherLecteur() {
    const ctx = Sortie.preparer();
    if (!ctx || lecteurBranche) return;
    try {
      ctx.createMediaElementSource(lecteur).connect(Sortie.entree());
      lecteurBranche = true;
    } catch (e) { /* sans moteur audio, le lecteur joue directement */ }
  }
  let voixChoisie = null;
  let preference = null;   // identifiant de la voix choisie par l'utilisateur
  let enCours = null;      // résolution de la phrase en cours de lecture
  let minuterie = null;
  const abonnes = [];
  let vitesse = 1;

  // Les voix « améliorées » sont bien plus agréables à écouter.
  const note = v => (/fr[-_]FR/i.test(v.lang) ? 4 : 0)
    + (/premium|enhanced|améliorée|natural|neural/i.test(v.name) ? 3 : 0)
    + (/google|thomas|amélie|audrey|aurélie/i.test(v.name) ? 1 : 0)
    + (v.localService ? 1 : 0);

  /** Les voix françaises du téléphone, la meilleure d'abord. */
  function liste() {
    if (!synthese) return [];
    return synthese.getVoices()
      .filter(v => /^fr/i.test(v.lang))
      .sort((a, b) => note(b) - note(a) || a.name.localeCompare(b.name));
  }

  function choisirVoix() {
    const francaises = liste();
    voixChoisie = francaises.find(v => v.voiceURI === preference) || francaises[0] || null;
  }

  // La liste des voix arrive parfois après le chargement de la page, et
  // Safari sur iPhone la complète sans toujours le signaler : on la relit
  // plusieurs fois au démarrage, et à chaque retour dans l'application.
  let nombreConnu = -1;
  function relire() {
    if (!synthese) return;
    const nombre = synthese.getVoices().length;
    if (nombre === nombreConnu) return;
    nombreConnu = nombre;
    choisirVoix();
    abonnes.forEach(f => f());
  }

  if (synthese) {
    choisirVoix();
    synthese.addEventListener('voiceschanged', relire);
    [300, 1000, 2500, 5000].forEach(ms => setTimeout(relire, ms));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') relire();
    });
  }

  /** Retient la voix voulue (null : la voix enregistrée). */
  function utiliser(identifiant) {
    preference = identifiant || null;
    choisirVoix();
  }

  function enregistree() {
    return !preference || preference === ENREGISTREE;
  }

  function actuelle() {
    if (enregistree()) return ENREGISTREE;
    return voixChoisie ? voixChoisie.voiceURI : null;
  }

  function reglerVitesse(valeur) {
    vitesse = valeur || 1;
  }

  function surChangement(fonction) {
    abonnes.push(fonction);
  }

  /** Une lecture à voix haute est possible : enregistrements ou synthèse. */
  function disponible() {
    return true;
  }

  /** Un court silence au format WAV, pour débloquer le lecteur audio. */
  let silence = null;
  function adresseSilence() {
    if (silence) return silence;
    const echantillons = 800; // 0,05 s à 16 kHz
    const octets = new DataView(new ArrayBuffer(44 + echantillons * 2));
    const ecrire = (pos, texte) => { for (let i = 0; i < texte.length; i++) octets.setUint8(pos + i, texte.charCodeAt(i)); };
    ecrire(0, 'RIFF'); octets.setUint32(4, 36 + echantillons * 2, true); ecrire(8, 'WAVE');
    ecrire(12, 'fmt '); octets.setUint32(16, 16, true); octets.setUint16(20, 1, true); octets.setUint16(22, 1, true);
    octets.setUint32(24, 16000, true); octets.setUint32(28, 32000, true); octets.setUint16(32, 2, true); octets.setUint16(34, 16, true);
    ecrire(36, 'data'); octets.setUint32(40, echantillons * 2, true);
    silence = URL.createObjectURL(new Blob([octets], { type: 'audio/wav' }));
    return silence;
  }

  /**
   * iOS n'accepte de jouer un son ou de parler qu'après un geste de
   * l'utilisateur : au premier toucher, on joue un silence sur le lecteur
   * et on prononce un silence, ce qui les débloque pour la suite.
   */
  function debloquer() {
    brancherLecteur();
    Sortie.reveiller();
    try {
      lecteur.src = adresseSilence();
      const essai = lecteur.play();
      if (essai) essai.catch(() => {});
    } catch (e) { /* pas de lecteur audio */ }
    // Avec la voix enregistrée, on ne réveille pas la voix du téléphone :
    // pendant qu'elle parle, même un silence, iOS baisse le son des autres
    // lectures, et Audrey démarrait trop bas.
    if (!synthese || enregistree()) return;
    const vide = new SpeechSynthesisUtterance(' ');
    vide.volume = 0;
    synthese.speak(vide);
  }

  /** Durée de lecture approximative, pour la lecture simulée. */
  function duree(texte, vitesse) {
    const mots = String(texte).split(/\s+/).length;
    return Math.max(1200, mots * 380 / (vitesse || 1));
  }

  /**
   * Lit une phrase. La promesse vaut vrai si la phrase a été lue jusqu'au
   * bout, faux si elle a été interrompue. Avec `enregistrement`, et la voix
   * enregistrée choisie, c'est le fichier audio de ce nom qui est joué.
   */
  function dire(texte, options) {
    const reglages = options || {};
    taire();
    return new Promise(resoudre => {
      let fini = false;
      const conclure = complet => {
        if (fini) return;
        fini = true;
        clearTimeout(minuterie);
        if (enCours === conclure) enCours = null;
        resoudre(complet);
      };
      enCours = conclure;

      // Sans voix : on simule le temps de lecture, le texte s'affiche.
      const simuler = () => {
        clearTimeout(minuterie);
        minuterie = setTimeout(() => conclure(true), duree(texte, vitesse));
      };

      const parler = () => {
        if (fini) return;
        if (!synthese) { simuler(); return; }
        const phrase = new SpeechSynthesisUtterance(texte);
        phrase.lang = 'fr-FR';
        if (voixChoisie) phrase.voice = voixChoisie;
        phrase.rate = vitesse;
        phrase.volume = Sortie.niveau();
        phrase.onend = () => conclure(true);
        phrase.onerror = () => conclure(false);
        // Garde-fou : certains navigateurs oublient d'annoncer la fin.
        clearTimeout(minuterie);
        minuterie = setTimeout(() => conclure(true), duree(texte, vitesse) * 2.5 + 3000);
        // Chrome ignore parfois une phrase lancée juste après une coupure.
        setTimeout(() => { if (!fini) synthese.speak(phrase); }, 40);
      };

      if (reglages.muet) { simuler(); return; }

      if (reglages.enregistrement && enregistree()) {
        minuterie = setTimeout(() => conclure(true), duree(texte, vitesse) * 2.5 + 5000);
        Enregistrements.adresse(reglages.enregistrement).then(adresse => {
          if (fini) return;
          if (!adresse) { parler(); return; } // enregistrement absent : la voix du téléphone
          // Le moteur doit tourner avant de jouer, sinon la phrase serait muette.
          Sortie.pret().then(() => {
            if (fini) return;
            lecteur.onended = () => conclure(true);
            lecteur.onerror = () => parler();
            lecteur.src = adresse;
            lecteur.playbackRate = vitesse;
            const lecture = lecteur.play();
            if (lecture) lecture.catch(() => parler());
          });
        });
        return;
      }

      parler();
    });
  }

  /** Coupe net la lecture en cours. */
  function taire() {
    clearTimeout(minuterie);
    lecteur.onended = lecteur.onerror = null;
    try { lecteur.pause(); } catch (e) { /* rien à couper */ }
    if (synthese) synthese.cancel();
    if (enCours) enCours(false);
  }

  return {
    ENREGISTREE, NOM_ENREGISTREE,
    disponible, debloquer, dire, taire, liste, utiliser, actuelle, enregistree, reglerVitesse, surChangement
  };
})();

/* ------------------------------------------------------------------ sons --- */

const Sons = (() => {

  /** À appeler lors d'un toucher : les navigateurs exigent un geste. */
  function debloquer() {
    Sortie.preparer();
    Sortie.reveiller();
  }

  function note(frequence, debut, duree, forme, volume) {
    const contexte = Sortie.contexte();
    if (!contexte) return;
    const t = contexte.currentTime + debut;
    const osc = contexte.createOscillator();
    const gain = contexte.createGain();
    osc.type = forme || 'sine';
    osc.frequency.setValueAtTime(frequence, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume || 0.25, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duree);
    osc.connect(gain).connect(Sortie.entree());
    osc.start(t);
    osc.stop(t + duree + 0.05);
  }

  return {
    debloquer,
    buzz()   { note(220, 0, 0.35, 'square', 0.18); note(165, 0, 0.35, 'sawtooth', 0.1); },
    juste()  { note(660, 0, 0.18); note(880, 0.14, 0.3); note(1320, 0.28, 0.4, 'sine', 0.18); },
    faux()   { note(300, 0, 0.25, 'triangle'); note(200, 0.2, 0.45, 'triangle'); },
    tic()    { note(1000, 0, 0.06, 'sine', 0.08); },
    fin()    { [523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.16, 0.5, 'sine', 0.2)); }
  };
})();

/* --------------------------------------------------------------- dictée --- */

/*
 * Dicter sa réponse au lieu de la taper, grâce à la reconnaissance vocale du
 * téléphone. Le téléphone propose plusieurs transcriptions possibles : elles
 * sont toutes rendues, pour que la bonne réponse ait sa chance même si la
 * première transcription est un peu à côté.
 */
const Dictee = (() => {
  const Reconnaissance = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let enCours = null;

  function disponible() {
    return !!Reconnaissance;
  }

  /**
   * Écoute une réponse. Réglages :
   *   provisoire(texte)      — ce qui est entendu, au fil de l'eau ;
   *   fin(propositions)      — les transcriptions possibles, la plus probable
   *                            d'abord (vide si rien n'a été compris) ;
   *   erreur(message)        — la dictée n'a pas pu fonctionner.
   */
  /** Fin de dictée : retour au son normal, un instant après l'arrêt du micro. */
  function rendreLeSon() {
    setTimeout(() => Sortie.modeLecture(), 150);
  }

  function ecouter(reglages) {
    arreter();
    Sortie.modeEnregistrement();
    const r = new Reconnaissance();
    r.lang = 'fr-FR';
    r.interimResults = true;
    r.continuous = false;
    r.maxAlternatives = 5;

    let propositions = [];
    let fini = false;
    const conclure = () => {
      if (fini) return;
      fini = true;
      if (enCours === r) enCours = null;
      rendreLeSon();
      reglages.fin(propositions);
    };

    r.onresult = ev => {
      const resultat = ev.results[ev.results.length - 1];
      const textes = Array.from(resultat).map(a => a.transcript.trim()).filter(Boolean);
      if (resultat.isFinal) propositions = textes;
      if (textes[0] && reglages.provisoire) reglages.provisoire(textes[0]);
      if (resultat.isFinal) r.stop();
    };
    r.onerror = ev => {
      if (fini) return;
      fini = true;
      if (enCours === r) enCours = null;
      rendreLeSon();
      const refus = ev.error === 'not-allowed' || ev.error === 'service-not-allowed';
      reglages.erreur(refus
        ? 'Micro refusé. Autorisez le micro pour ce site, ou utilisez le micro du clavier.'
        : ev.error === 'no-speech' ? 'Je n’ai rien entendu. Réessayez.'
          : 'La dictée n’a pas fonctionné. Utilisez le micro du clavier.');
    };
    r.onend = conclure;

    enCours = r;
    try {
      r.start();
    } catch (e) {
      r.onerror({ error: 'start' });
    }
  }

  function arreter() {
    if (!enCours) return;
    const r = enCours;
    enCours = null;
    r.onresult = r.onerror = r.onend = null;
    try { r.abort(); } catch (e) { /* déjà arrêtée */ }
    rendreLeSon();
  }

  return { disponible, ecouter, arreter };
})();
