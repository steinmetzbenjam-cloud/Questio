/*
 * Questio — les écrans et le déroulement d'une partie.
 *
 * Accueil (joueurs, réglages) → partie → classement.
 *
 * Une question se déroule ainsi :
 *   lecture   — les indices sont lus un par un ; le buzzer est actif ;
 *   qui       — quelqu'un a buzzé : on indique qui ;
 *   reponse   — il tape sa réponse ;
 *     juste   → il marque un point, on passe au résultat ;
 *     fausse  → il ne peut plus buzzer sur cette question, la lecture reprend ;
 *   attente   — tout est lu : dix secondes de dernière chance ;
 *   resultat  — la réponse est donnée, on passe à la question suivante.
 */
const Jeu = (() => {

  const el = UI.el;
  const memoire = UI.memoire;

  const JOUEURS_MIN = 1;
  const JOUEURS_MAX = 8;
  // Secondes de dernière chance après la fin de la lecture.
  const DERNIERE_CHANCE = { adultes: 10, enfants: 15 };

  const reglages = Object.assign({
    noms: ['', ''],
    nbQuestions: 10,
    public: 'adultes', // ou « enfants » : questionnaire des 5-10 ans
    voix: true,
    voixNom: null,   // null : la meilleure voix française du téléphone
    vitesse: 1
  }, memoire.lire('reglages', {}));

  Voix.utiliser(reglages.voixNom);
  Voix.reglerVitesse(reglages.vitesse);

  let partie = null;
  let verrouEcran = null;

  const racine = () => document.getElementById('app');

  function enregistrerReglages() {
    memoire.ecrire('reglages', reglages);
  }

  /* =====================================================================
   *  Accueil
   * ===================================================================== */

  function accueil() {
    arreterPartie();
    const conteneur = racine();
    conteneur.innerHTML = '';
    conteneur.className = 'app app--accueil';

    conteneur.appendChild(el('header.marque', null, [
      el('div.marque__logo', { 'aria-hidden': 'true' }, [el('span', { texte: 'Q' })]),
      el('h1.marque__nom', { texte: 'Questio' }),
      el('p.marque__devise', { texte: 'Le jeu biblique de questions. Tous autour du téléphone, le premier qui sait appuie !' })
    ]));

    /* — joueurs — */
    const liste = el('div.joueurs');
    const compteur = el('span.pas__valeur');

    function dessinerJoueurs() {
      liste.innerHTML = '';
      compteur.textContent = reglages.noms.length;
      reglages.noms.forEach((nom, rang) => {
        const champ = el('input.champ', {
          type: 'text',
          placeholder: 'Joueur ' + (rang + 1),
          autocomplete: 'off',
          enterkeyhint: 'next',
          maxlength: '20',
          'aria-label': 'Nom du joueur ' + (rang + 1)
        });
        champ.value = nom;
        champ.addEventListener('input', () => {
          reglages.noms[rang] = champ.value;
          enregistrerReglages();
        });
        champ.addEventListener('keydown', ev => {
          if (ev.key !== 'Enter') return;
          const suivant = liste.querySelectorAll('input')[rang + 1];
          if (suivant) suivant.focus(); else champ.blur();
        });
        liste.appendChild(el('label.joueur', null, [
          el('span.joueur__rang', { texte: String(rang + 1) }),
          champ
        ]));
      });
      moins.disabled = reglages.noms.length <= JOUEURS_MIN;
      plus.disabled = reglages.noms.length >= JOUEURS_MAX;
    }

    const moins = el('button.pas__bouton', {
      type: 'button', 'aria-label': 'Un joueur de moins', texte: '−',
      onclick: () => {
        if (reglages.noms.length <= JOUEURS_MIN) return;
        reglages.noms.pop();
        enregistrerReglages();
        dessinerJoueurs();
      }
    });
    const plus = el('button.pas__bouton', {
      type: 'button', 'aria-label': 'Un joueur de plus', texte: '+',
      onclick: () => {
        if (reglages.noms.length >= JOUEURS_MAX) return;
        reglages.noms.push('');
        enregistrerReglages();
        dessinerJoueurs();
        const champs = liste.querySelectorAll('input');
        champs[champs.length - 1].focus();
      }
    });

    conteneur.appendChild(el('section.carte', null, [
      el('div.carte__tete', null, [
        el('h2.carte__titre', { texte: 'Joueurs' }),
        el('div.pas', null, [moins, compteur, plus])
      ]),
      liste
    ]));
    dessinerJoueurs();

    /* — partie — */
    const pied = el('p.pied');
    const dessinerPied = () => {
      const posees = new Set(memoire.lire('posees', []));
      const liste = questionnaire();
      const reste = liste.filter(q => !posees.has(q.id)).length;
      pied.textContent = liste.length + ' questions ' + (reglages.public === 'enfants' ? 'pour les enfants' : 'pour les adultes')
        + ' · ' + reste + ' pas encore posées · version ' + UI.VERSION;
    };

    const choixPublic = el('div.choix');
    for (const [valeur, libelle] of [['adultes', 'Adultes'], ['enfants', 'Enfants']]) {
      choixPublic.appendChild(el('button.choix__bouton' + (valeur === reglages.public ? '.choix__bouton--actif' : ''), {
        type: 'button', texte: libelle,
        onclick: ev => {
          reglages.public = valeur;
          enregistrerReglages();
          choixPublic.querySelectorAll('.choix__bouton').forEach(b => b.classList.remove('choix__bouton--actif'));
          ev.currentTarget.classList.add('choix__bouton--actif');
          dessinerPied();
        }
      }));
    }

    const choixQuestions = el('div.choix');
    for (const n of [5, 10, 15, 20]) {
      choixQuestions.appendChild(el('button.choix__bouton' + (n === reglages.nbQuestions ? '.choix__bouton--actif' : ''), {
        type: 'button', texte: String(n),
        onclick: ev => {
          reglages.nbQuestions = n;
          enregistrerReglages();
          choixQuestions.querySelectorAll('.choix__bouton').forEach(b => b.classList.remove('choix__bouton--actif'));
          ev.currentTarget.classList.add('choix__bouton--actif');
        }
      }));
    }

    const caseVoix = el('input', { type: 'checkbox', role: 'switch' });
    caseVoix.checked = reglages.voix;
    caseVoix.addEventListener('change', () => {
      reglages.voix = caseVoix.checked;
      enregistrerReglages();
    });

    conteneur.appendChild(el('section.carte', null, [
      el('h2.carte__titre', { texte: 'Questions' }),
      choixPublic,
      el('p.carte__sous-titre', { texte: 'Par partie' }),
      choixQuestions,
      el('label.bascule', null, [
        el('span.bascule__texte', null, [
          el('span', { texte: 'Lecture à voix haute' }),
          el('span.bascule__aide', {
            texte: Voix.disponible()
              ? 'Le téléphone lit les questions. Montez le volume !'
              : 'Ce navigateur ne sait pas lire à voix haute : les questions s’afficheront à l’écran.'
          })
        ]),
        caseVoix
      ]),
      reglagesVoix()
    ]));

    conteneur.appendChild(el('button.lancer', {
      type: 'button',
      onclick: lancerPartie
    }, [el('span', { texte: 'Lancer la partie' })]));

    dessinerPied();
    conteneur.appendChild(pied);
  }

  /** Choix de la voix et de la vitesse de lecture. */
  function reglagesVoix() {
    const essayer = () => {
      Voix.debloquer();
      Voix.dire('Bienvenue dans Questio ! Je suis né à Tarse. Qui suis-je ?');
    };

    const bloc = el('div.voix');
    const menu = el('select.champ.voix__menu', { 'aria-label': 'Voix' });
    menu.addEventListener('change', () => {
      reglages.voixNom = menu.value || null;
      enregistrerReglages();
      Voix.utiliser(reglages.voixNom);
      essayer();
    });

    const REGIONS = { FR: 'France', CA: 'Canada', BE: 'Belgique', CH: 'Suisse', LU: 'Luxembourg' };
    function remplirMenu() {
      const voix = Voix.liste();
      menu.innerHTML = '';
      for (const v of voix) {
        const region = REGIONS[(v.lang.split(/[-_]/)[1] || '').toUpperCase()];
        menu.appendChild(el('option', {
          value: v.voiceURI,
          texte: v.name.replace(/\s*\(.*\)\s*$/, '') + (region ? ' — ' + region : '')
            + (/premium|enhanced|améliorée|natural|neural/i.test(v.name) ? ' ★' : '')
        }));
      }
      menu.value = Voix.actuelle() || '';
      ligneMenu.hidden = voix.length < 2;
    }

    const ligneMenu = el('label.voix__ligne', null, [el('span.voix__etiquette', { texte: 'Voix' }), menu]);
    // La liste des voix arrive parfois un peu après l'ouverture de la page.
    Voix.surChangement(() => { if (menu.isConnected) remplirMenu(); });
    remplirMenu();

    const vitesses = el('div.choix.choix--petit');
    for (const [libelle, valeur] of [['Lente', 0.85], ['Normale', 1], ['Rapide', 1.15]]) {
      vitesses.appendChild(el('button.choix__bouton' + (valeur === reglages.vitesse ? '.choix__bouton--actif' : ''), {
        type: 'button', texte: libelle,
        onclick: ev => {
          reglages.vitesse = valeur;
          enregistrerReglages();
          Voix.reglerVitesse(valeur);
          vitesses.querySelectorAll('.choix__bouton').forEach(b => b.classList.remove('choix__bouton--actif'));
          ev.currentTarget.classList.add('choix__bouton--actif');
          essayer();
        }
      }));
    }

    bloc.appendChild(ligneMenu);
    bloc.appendChild(el('div.voix__ligne', null, [el('span.voix__etiquette', { texte: 'Vitesse' }), vitesses]));
    bloc.appendChild(el('p.bascule__aide', {
      texte: 'Le téléphone ne partage pas toutes ses voix avec les applications web : les voix Siri n’y sont jamais. '
        + 'Une voix « améliorée » téléchargée dans les réglages peut apparaître après avoir fermé et rouvert Questio.'
    }));
    bloc.appendChild(el('button.lien-bouton', { type: 'button', texte: 'Tester la voix', onclick: essayer }));
    if (!Voix.disponible()) bloc.hidden = true;
    return bloc;
  }

  /* =====================================================================
   *  Préparation
   * ===================================================================== */

  function melanger(tableau) {
    const copie = tableau.slice();
    for (let i = copie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
  }

  function questionnaire() {
    return reglages.public === 'enfants' ? QUESTIONS_ENFANTS : QUESTIONS;
  }

  /** Choisit des questions jamais posées ; quand tout y est passé, on recommence. */
  function tirerQuestions(nombre) {
    const liste = questionnaire();
    let posees = new Set(memoire.lire('posees', []));
    let neuves = liste.filter(q => !posees.has(q.id));
    if (neuves.length < nombre) {
      // Ce questionnaire est épuisé : on l'oublie, sans toucher à l'autre.
      for (const q of liste) posees.delete(q.id);
      neuves = liste.slice();
    }
    const tirage = melanger(neuves).slice(0, Math.min(nombre, neuves.length));
    for (const q of tirage) posees.add(q.id);
    memoire.ecrire('posees', Array.from(posees));
    return tirage;
  }

  function nomsDesJoueurs() {
    const vus = new Map();
    return reglages.noms.map((brut, rang) => {
      let nom = String(brut || '').trim() || 'Joueur ' + (rang + 1);
      // Deux « Marie » : on les distingue.
      const deja = vus.get(nom.toLowerCase()) || 0;
      vus.set(nom.toLowerCase(), deja + 1);
      if (deja) nom += ' ' + (deja + 1);
      return nom;
    });
  }

  function lancerPartie() {
    // Débloque le son et la voix pendant le toucher : iOS l'exige.
    Sons.debloquer();
    if (reglages.voix) Voix.debloquer();
    garderEcranAllume();

    partie = {
      enfants: reglages.public === 'enfants',
      joueurs: nomsDesJoueurs().map(nom => ({ nom, points: 0 })),
      questions: tirerQuestions(reglages.nbQuestions),
      rang: -1,
      segment: 0,
      bloques: new Set(),
      phase: 'pause',
      jeton: 0,
      compte: null
    };
    ecranPartie();
    questionSuivante();
  }

  /* =====================================================================
   *  Partie
   * ===================================================================== */

  const vue = {};

  /*
   * Le téléphone est posé au milieu de la table : chaque joueur a son propre
   * buzzer, sur le bord qui lui fait face, écrit dans son sens.
   *   joueur 1 en bas, 2 en haut, 3 à gauche, 4 à droite, puis on recommence.
   */
  const COTES = ['bas', 'haut', 'gauche', 'droite'];
  const COULEURS = ['#e4572e', '#3b82f6', '#22a06b', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16'];

  function ecranPartie() {
    const conteneur = racine();
    conteneur.innerHTML = '';
    conteneur.className = 'app app--partie';

    vue.numero = el('span.barre__numero');
    vue.son = el('button.rond', {
      type: 'button', 'aria-label': 'Voix', title: 'Couper ou remettre la voix',
      onclick: basculerVoix
    });
    dessinerBoutonSon();

    vue.theme = el('span.scene__theme');
    vue.texte = el('div.scene__texte', { 'aria-live': 'polite' });
    vue.jauge = el('div.jauge', { hidden: true }, [el('div.jauge__barre')]);

    const centre = el('div.centre', null, [
      el('header.barre', null, [
        el('button.rond', { type: 'button', 'aria-label': 'Quitter', texte: '✕', onclick: demanderQuitter }),
        vue.numero,
        vue.son
      ]),
      el('main.scene', null, [vue.theme, vue.texte, vue.jauge])
    ]);

    const cotes = {};
    for (const cote of COTES) cotes[cote] = el('div.cote.cote--' + cote);

    vue.postes = partie.joueurs.map((joueur, rang) => {
      const bouton = el('button.poste', {
        type: 'button',
        'aria-label': 'Buzzer de ' + joueur.nom,
        style: '--couleur: ' + COULEURS[rang % COULEURS.length]
      }, [
        el('span.poste__nom', { texte: joueur.nom }),
        el('span.poste__points', { texte: '0' })
      ]);
      // pointerdown : réagit dès le contact, sans attendre qu'on relève le doigt.
      bouton.addEventListener('pointerdown', ev => { ev.preventDefault(); buzz(rang); });
      bouton.addEventListener('keydown', ev => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); buzz(rang); }
      });
      cotes[COTES[rang % COTES.length]].appendChild(bouton);
      return bouton;
    });

    const nombre = partie.joueurs.length;
    const table = el('div.table.table--' + Math.min(nombre, 4) + (nombre > 4 ? '.table--foule' : ''), null, [
      cotes.haut, cotes.gauche, centre, cotes.droite, cotes.bas
    ]);
    conteneur.appendChild(table);

    vue.panneau = el('div.panneau', { hidden: true });
    conteneur.appendChild(vue.panneau);
  }

  function dessinerBoutonSon() {
    if (!vue.son) return;
    vue.son.textContent = reglages.voix ? '🔊' : '🔇';
    vue.son.classList.toggle('rond--eteint', !reglages.voix);
  }

  function basculerVoix() {
    reglages.voix = !reglages.voix;
    enregistrerReglages();
    dessinerBoutonSon();
    if (reglages.voix) Voix.debloquer();
    // La lecture en cours reprend au début de l'indice, avec ou sans voix.
    if (partie && partie.phase === 'lecture') {
      interrompre();
      lire();
    }
  }

  function dessinerScores() {
    partie.joueurs.forEach((j, rang) => {
      const poste = vue.postes[rang];
      poste.querySelector('.poste__points').textContent = String(j.points);
      poste.classList.toggle('poste--bloque', partie.bloques.has(rang));
      poste.disabled = partie.phase === 'resultat' || partie.bloques.has(rang);
    });
  }

  function dessinerTexte() {
    const q = partie.questions[partie.rang];
    vue.texte.innerHTML = '';
    const derniere = partie.phase === 'resultat' ? q.indices.length - 1 : partie.segment;
    q.indices.forEach((indice, rang) => {
      if (rang > derniere) return;
      vue.texte.appendChild(el('p.indice' + (rang === partie.segment && partie.phase === 'lecture' ? '.indice--courant' : ''), {
        texte: indice
      }));
    });
  }

  function questionSuivante() {
    fermerPanneau();
    partie.rang++;
    if (partie.rang >= partie.questions.length) {
      finDePartie();
      return;
    }
    const q = partie.questions[partie.rang];
    partie.segment = 0;
    partie.bloques = new Set();
    partie.compte = null;
    partie.phase = 'lecture';
    vue.numero.textContent = 'Question ' + (partie.rang + 1) + ' / ' + partie.questions.length;
    vue.theme.textContent = q.theme;
    vue.jauge.hidden = true;
    dessinerScores();
    dessinerTexte();
    lire();
  }

  /* — lecture — */

  function interrompre() {
    partie.jeton++;
    Voix.taire();
    arreterCompte();
  }

  function attendre(ms, jeton) {
    return new Promise(resoudre => setTimeout(() => resoudre(jeton === partie.jeton), ms));
  }

  async function lire() {
    const jeton = ++partie.jeton;
    const q = partie.questions[partie.rang];
    partie.phase = 'lecture';
    while (partie.segment < q.indices.length) {
      dessinerTexte();
      const complet = await Voix.dire(q.indices[partie.segment], { muet: !reglages.voix });
      if (!partie || jeton !== partie.jeton) return; // interrompu par le buzzer
      if (!complet && reglages.voix) {
        // La voix a échoué : on laisse le temps de lire à l'écran.
        if (!(await attendre(2000, jeton))) return;
      }
      partie.segment++;
      if (partie.segment < q.indices.length && !(await attendre(450, jeton))) return;
    }
    partie.segment = q.indices.length - 1;
    dessinerTexte();
    derniereChance(DERNIERE_CHANCE[reglages.public] * 1000);
  }

  /* — dernière chance — */

  function derniereChance(duree) {
    partie.phase = 'attente';
    const debut = Date.now();
    vue.jauge.hidden = false;
    const barre = vue.jauge.firstChild;
    let dernierTic = Math.ceil(duree / 1000);
    partie.compte = { reste: duree };
    const tour = () => {
      const reste = Math.max(0, duree - (Date.now() - debut));
      partie.compte.reste = reste;
      barre.style.width = Math.min(100, reste / duree * 100) + '%';
      const secondes = Math.ceil(reste / 1000);
      if (secondes < dernierTic && secondes <= 3) Sons.tic();
      dernierTic = secondes;
      if (reste <= 0) {
        arreterCompte();
        reveler(null);
      }
    };
    partie.compte.minuterie = setInterval(tour, 100);
    tour();
  }

  function arreterCompte() {
    if (partie && partie.compte && partie.compte.minuterie) {
      clearInterval(partie.compte.minuterie);
      partie.compte.minuterie = null;
    }
  }

  /* — buzzer — */

  function eligibles() {
    return partie.joueurs.map((j, rang) => rang).filter(rang => !partie.bloques.has(rang));
  }

  function buzz(rang) {
    if (!partie || (partie.phase !== 'lecture' && partie.phase !== 'attente')) return;
    if (partie.bloques.has(rang)) return;
    const reprise = partie.phase; // pour savoir quoi reprendre ensuite
    interrompre();
    partie.phase = 'qui';
    partie.reprise = reprise;
    Sons.buzz();
    if (navigator.vibrate) navigator.vibrate(90);
    const poste = vue.postes[rang];
    poste.classList.add('poste--presse');
    setTimeout(() => poste.classList.remove('poste--presse'), 300);
    demanderReponse(rang);
  }

  function demanderReponse(rang) {
    partie.phase = 'reponse';
    const joueur = partie.joueurs[rang];
    const champ = el('input.champ.champ--reponse', {
      type: 'text',
      placeholder: 'Votre réponse',
      autocomplete: 'off',
      autocorrect: 'off',
      spellcheck: 'false',
      enterkeyhint: 'done',
      'aria-label': 'Réponse de ' + joueur.nom
    });
    const valider = () => {
      const saisie = champ.value.trim();
      if (!saisie) { champ.focus(); return; }
      verifier(rang, saisie);
    };
    champ.addEventListener('keydown', ev => { if (ev.key === 'Enter') valider(); });

    /* — dictée : on dit sa réponse au lieu de la taper — */
    const etat = el('p.reponse__etat', { hidden: true });
    const micro = el('button.micro', {
      type: 'button', 'aria-label': 'Dicter la réponse', title: 'Dicter la réponse'
    }, [el('span', { texte: '🎤' })]);

    const finEcoute = () => micro.classList.remove('micro--ecoute');
    micro.addEventListener('click', () => {
      // Sans reconnaissance vocale (certaines applis installées sur iPhone),
      // le micro du clavier fait le même travail.
      if (!Dictee.disponible()) {
        etat.hidden = false;
        etat.className = 'reponse__etat';
        etat.textContent = 'Touchez le micro 🎙 du clavier pour dicter.';
        champ.focus();
        return;
      }
      if (micro.classList.contains('micro--ecoute')) {
        Dictee.arreter();
        finEcoute();
        etat.hidden = true;
        return;
      }
      champ.blur(); // le clavier laisse la place
      micro.classList.add('micro--ecoute');
      etat.hidden = false;
      etat.className = 'reponse__etat';
      etat.textContent = 'J’écoute…';
      Dictee.ecouter({
        provisoire: texte => { champ.value = texte; },
        fin: propositions => {
          finEcoute();
          if (!propositions.length) {
            etat.textContent = champ.value ? 'Vérifiez, puis validez.' : 'Je n’ai rien compris. Réessayez.';
            return;
          }
          // Si l'une des transcriptions est la bonne réponse, c'est gagné.
          const q = partie.questions[partie.rang];
          const juste = propositions.find(p => Reponse.juste(p, q, partie.enfants));
          if (juste) {
            champ.value = juste;
            verifier(rang, juste);
            return;
          }
          champ.value = propositions[0];
          etat.textContent = 'Vérifiez, corrigez si besoin, puis validez.';
        },
        erreur: message => {
          finEcoute();
          etat.className = 'reponse__etat reponse__etat--erreur';
          etat.textContent = message;
        }
      });
    });

    ouvrirPanneau([
      el('p.panneau__surtitre', { texte: 'À toi de répondre' }),
      el('h2.panneau__titre', { texte: joueur.nom }),
      el('div.reponse', null, [champ, micro]),
      etat,
      el('button.bouton-plein', { type: 'button', texte: 'Valider', onclick: valider }),
      el('button.lien-bouton', {
        type: 'button', texte: 'Je ne sais plus',
        onclick: () => mauvaiseReponse(rang, null)
      }),
      el('button.lien-bouton.lien-bouton--discret', {
        type: 'button', texte: 'Buzz par erreur, reprendre',
        onclick: reprendre
      })
    ], rang);
    // On laisse le choix entre taper et dicter : le clavier ne s'ouvre pas d'office.
  }

  function verifier(rang, saisie) {
    const q = partie.questions[partie.rang];
    if (Reponse.juste(saisie, q, partie.enfants)) {
      partie.joueurs[rang].points++;
      Sons.juste();
      reveler(rang, saisie);
    } else {
      mauvaiseReponse(rang, saisie);
    }
  }

  function mauvaiseReponse(rang, saisie) {
    Sons.faux();
    if (navigator.vibrate) navigator.vibrate([60, 60, 60]);
    partie.bloques.add(rang);
    dessinerScores();
    partie.phase = 'erreur';
    ouvrirPanneau([
      el('div.verdict.verdict--faux', { texte: '✕' }),
      el('h2.panneau__titre', { texte: saisie ? 'Ce n’est pas « ' + saisie + ' »' : 'Dommage !' }),
      el('p.panneau__texte', {
        texte: partie.joueurs[rang].nom + ' ne peut plus buzzer sur cette question.'
      })
    ], rang);
    const jeton = partie.jeton;
    setTimeout(() => {
      if (!partie || partie.jeton !== jeton || partie.phase !== 'erreur') return;
      if (!eligibles().length) reveler(null);
      else reprendre();
    }, 1800);
  }

  /** Reprend là où le buzzer a coupé : l'indice en cours, ou la dernière chance. */
  function reprendre() {
    fermerPanneau();
    if (partie.reprise === 'attente') {
      // Au moins quelques secondes pour les autres joueurs.
      derniereChance(Math.max(partie.compte ? partie.compte.reste : 0, 4000));
    } else {
      lire();
    }
  }

  /* — résultat — */

  function reveler(gagnant, saisie) {
    interrompre();
    partie.phase = 'resultat';
    vue.jauge.hidden = true;
    dessinerScores();
    dessinerTexte();
    const q = partie.questions[partie.rang];
    const derniere = partie.rang === partie.questions.length - 1;

    const contenu = gagnant === null
      ? [
        el('div.verdict.verdict--personne', { texte: '?' }),
        el('h2.panneau__titre', { texte: 'Personne n’a trouvé' })
      ]
      : [
        el('div.verdict.verdict--juste', { texte: '✓' }),
        el('h2.panneau__titre', { texte: 'Bravo ' + partie.joueurs[gagnant].nom + ' !' }),
        el('p.panneau__texte', { texte: '+1 point' })
      ];

    ouvrirPanneau(contenu.concat([
      el('div.solution', null, [
        el('span.solution__etiquette', { texte: 'La réponse' }),
        el('span.solution__mot', { texte: q.reponse }),
        liensReferences(q.reference)
      ]),
      el('button.bouton-plein', {
        type: 'button',
        texte: derniere ? 'Voir le classement' : 'Question suivante',
        onclick: questionSuivante
      })
    ]));

    if (reglages.voix) {
      Voix.dire(gagnant === null
        ? 'La réponse était : ' + q.reponse + '.'
        : 'Bravo ' + partie.joueurs[gagnant].nom + ' ! C’était ' + q.reponse + '.');
    }
  }

  /**
   * Les références deviennent des liens : le nom ouvre JW Library au bon
   * verset, la petite flèche ouvre le même passage sur jw.org.
   * « Exode 2:10 ; 3:1-10 » : un passage sans nom de livre garde le précédent.
   */
  function liensReferences(reference) {
    const conteneur = el('span.solution__references');
    let livre = null;
    for (const morceau of String(reference || '').split(';').map(m => m.trim()).filter(Boolean)) {
      let ref = Bible.analyser(morceau);
      if (!ref && livre && /^\d/.test(morceau)) ref = Bible.analyser(Bible.nomLivre(livre) + ' ' + morceau);
      if (!ref) {
        conteneur.appendChild(el('span.reference', { texte: morceau }));
        continue;
      }
      livre = ref.livre;
      conteneur.appendChild(el('span.reference', null, [
        el('a.reference__lien', {
          href: Bible.lienApplication(ref),
          texte: Bible.formater(ref),
          title: 'Ouvrir dans JW Library'
        }),
        el('a.reference__web', {
          href: Bible.lienWeb(ref),
          target: '_blank',
          rel: 'noopener',
          texte: '↗',
          title: 'Ouvrir sur jw.org',
          'aria-label': 'Ouvrir ' + Bible.formater(ref) + ' sur jw.org'
        })
      ]));
    }
    return conteneur;
  }

  /* — panneau superposé — */

  /**
   * Ouvre une fenêtre au milieu de l'écran. Avec `rang`, elle est tournée vers
   * ce joueur, comme son buzzer : il la lit dans son sens, de sa place.
   */
  function ouvrirPanneau(contenu, rang) {
    Dictee.arreter();
    vue.panneau.innerHTML = '';
    const cote = rang === undefined ? 'bas' : COTES[rang % COTES.length];
    vue.panneau.appendChild(el('div.panneau__boite.panneau__boite--' + cote, { role: 'dialog', 'aria-modal': 'true' }, contenu));
    vue.panneau.hidden = false;
  }

  function fermerPanneau() {
    Dictee.arreter();
    if (!vue.panneau) return;
    vue.panneau.hidden = true;
    vue.panneau.innerHTML = '';
  }

  /* — quitter — */

  function demanderQuitter() {
    const enJeu = partie && (partie.phase === 'lecture' || partie.phase === 'attente');
    if (enJeu) {
      partie.reprise = partie.phase;
      interrompre();
      partie.phase = 'pause';
    }
    const fond = el('div.modale', null, [
      el('div.modale__boite', { role: 'dialog', 'aria-modal': 'true' }, [
        el('h2.panneau__titre', { texte: 'Quitter la partie ?' }),
        el('p.panneau__texte', { texte: 'Les scores seront perdus.' }),
        el('div.modale__actions', null, [
          el('button.bouton-discret', {
            type: 'button', texte: 'Continuer',
            onclick: () => {
              fond.remove();
              if (enJeu) reprendre();
            }
          }),
          el('button.bouton-plein.bouton-plein--danger', {
            type: 'button', texte: 'Quitter',
            onclick: () => { fond.remove(); accueil(); }
          })
        ])
      ])
    ]);
    document.body.appendChild(fond);
  }

  /* =====================================================================
   *  Fin de partie
   * ===================================================================== */

  function finDePartie() {
    const joueurs = partie.joueurs.slice().sort((a, b) => b.points - a.points);
    arreterPartie();
    Sons.fin();

    const conteneur = racine();
    conteneur.innerHTML = '';
    conteneur.className = 'app app--fin';

    const meilleur = joueurs[0].points;
    const champions = joueurs.filter(j => j.points === meilleur);

    conteneur.appendChild(el('header.marque', null, [
      el('div.trophee', { 'aria-hidden': 'true', texte: '🏆' }),
      el('h1.marque__nom', {
        texte: meilleur === 0 ? 'Partie terminée'
          : champions.length > 1 ? 'Égalité !' : champions[0].nom
      }),
      el('p.marque__devise', {
        texte: meilleur === 0 ? 'Personne n’a marqué… la prochaine sera la bonne !'
          : champions.length > 1 ? champions.map(j => j.nom).join(' et ') + ' remportent la partie.'
            : 'Remporte la partie !'
      })
    ]));

    // Classement avec ex æquo : même score, même place.
    const liste = el('ol.classement');
    let place = 0;
    joueurs.forEach((j, rang) => {
      if (rang === 0 || j.points !== joueurs[rang - 1].points) place = rang + 1;
      liste.appendChild(el('li.classement__ligne' + (place === 1 && meilleur > 0 ? '.classement__ligne--premier' : ''), null, [
        el('span.classement__place', { texte: String(place) }),
        el('span.classement__nom', { texte: j.nom }),
        el('span.classement__points', { texte: j.points + (j.points > 1 ? ' points' : ' point') })
      ]));
    });
    conteneur.appendChild(liste);

    conteneur.appendChild(el('button.lancer', { type: 'button', onclick: lancerPartie }, [
      el('span', { texte: 'Rejouer' })
    ]));
    conteneur.appendChild(el('button.lien-bouton.lien-bouton--centre', {
      type: 'button', texte: 'Changer les joueurs', onclick: accueil
    }));

    if (reglages.voix && meilleur > 0) {
      Voix.dire(champions.length > 1
        ? 'Égalité ! Bravo ' + champions.map(j => j.nom).join(' et ') + ' !'
        : 'Bravo ' + champions[0].nom + ', tu remportes la partie !');
    }
  }

  function arreterPartie() {
    if (partie) {
      partie.jeton++;
      arreterCompte();
    }
    Voix.taire();
    partie = null;
    for (const k of Object.keys(vue)) delete vue[k];
    document.querySelectorAll('.modale').forEach(m => m.remove());
    libererEcran();
  }

  /* — écran allumé pendant la partie — */

  function garderEcranAllume() {
    if (!('wakeLock' in navigator)) return;
    navigator.wakeLock.request('screen').then(v => { verrouEcran = v; }).catch(() => {});
  }

  function libererEcran() {
    if (verrouEcran) verrouEcran.release().catch(() => {});
    verrouEcran = null;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && partie) garderEcranAllume();
  });

  // Sur ordinateur, les touches 1 à 8 servent de buzzers.
  document.addEventListener('keydown', ev => {
    if (!partie || !/^[1-8]$/.test(ev.key)) return;
    if (/^(INPUT|TEXTAREA)$/.test(document.activeElement && document.activeElement.tagName)) return;
    const rang = parseInt(ev.key, 10) - 1;
    if (rang >= partie.joueurs.length) return;
    ev.preventDefault();
    buzz(rang);
  });

  return { accueil };
})();
