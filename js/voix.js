/*
 * Questio — la voix et les sons.
 *
 * La lecture passe par la synthèse vocale du téléphone (voix française).
 * Chaque indice est une phrase courte, lue d'un seul tenant : on peut ainsi
 * l'interrompre au buzzer et la reprendre proprement au début de l'indice.
 *
 * Sans synthèse vocale (ou voix coupée), la lecture est simulée au rythme
 * d'une voix : le texte s'affiche et le jeu se déroule de la même façon.
 */
const Voix = (() => {

  const synthese = 'speechSynthesis' in window ? window.speechSynthesis : null;
  let voixChoisie = null;
  let enCours = null; // résolution de la phrase en cours de lecture
  let minuterie = null;

  function choisirVoix() {
    if (!synthese) return;
    const francaises = synthese.getVoices().filter(v => /^fr/i.test(v.lang));
    if (!francaises.length) return;
    // Les voix « améliorées » sont bien plus agréables à écouter.
    const note = v => (/fr[-_]FR/i.test(v.lang) ? 4 : 0)
      + (/premium|enhanced|améliorée|natural|neural/i.test(v.name) ? 3 : 0)
      + (/google|thomas|amélie|audrey|aurélie/i.test(v.name) ? 1 : 0)
      + (v.localService ? 1 : 0);
    voixChoisie = francaises.sort((a, b) => note(b) - note(a))[0];
  }

  if (synthese) {
    choisirVoix();
    synthese.addEventListener('voiceschanged', choisirVoix);
  }

  function disponible() {
    return !!synthese;
  }

  /**
   * iOS n'accepte de parler qu'après un geste de l'utilisateur : on prononce
   * un silence au premier toucher pour débloquer la voix.
   */
  function debloquer() {
    if (!synthese) return;
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
   * bout, faux si elle a été interrompue.
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

      if (!synthese || reglages.muet) {
        minuterie = setTimeout(() => conclure(true), duree(texte, reglages.vitesse));
        return;
      }

      const phrase = new SpeechSynthesisUtterance(texte);
      phrase.lang = 'fr-FR';
      if (voixChoisie) phrase.voice = voixChoisie;
      phrase.rate = reglages.vitesse || 1;
      phrase.onend = () => conclure(true);
      phrase.onerror = () => conclure(false);
      // Garde-fou : certains navigateurs oublient d'annoncer la fin.
      minuterie = setTimeout(() => conclure(true), duree(texte, reglages.vitesse) * 2.5 + 3000);
      // Chrome ignore parfois une phrase lancée juste après une coupure.
      setTimeout(() => { if (!fini) synthese.speak(phrase); }, 40);
    });
  }

  /** Coupe net la lecture en cours. */
  function taire() {
    clearTimeout(minuterie);
    if (synthese) synthese.cancel();
    if (enCours) enCours(false);
  }

  return { disponible, debloquer, dire, taire };
})();

/* ------------------------------------------------------------------ sons --- */

const Sons = (() => {
  let contexte = null;

  /** À appeler lors d'un toucher : les navigateurs exigent un geste. */
  function debloquer() {
    try {
      if (!contexte) contexte = new (window.AudioContext || window.webkitAudioContext)();
      if (contexte.state === 'suspended') contexte.resume();
    } catch (e) {
      contexte = null;
    }
  }

  function note(frequence, debut, duree, forme, volume) {
    if (!contexte) return;
    const t = contexte.currentTime + debut;
    const osc = contexte.createOscillator();
    const gain = contexte.createGain();
    osc.type = forme || 'sine';
    osc.frequency.setValueAtTime(frequence, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume || 0.25, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duree);
    osc.connect(gain).connect(contexte.destination);
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
