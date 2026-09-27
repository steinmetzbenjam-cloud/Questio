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
  const DERNIERE_CHANCE = 10; // secondes après la fin de la lecture

  const reglages = Object.assign({
    noms: ['', ''],
    nbQuestions: 10,
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
      el('h2.carte__titre', { texte: 'Questions par partie' }),
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

    const reste = QUESTIONS.length - memoire.lire('posees', []).length;
    conteneur.appendChild(el('p.pied', {
      texte: QUESTIONS.length + ' questions au total · ' + Math.max(reste, 0) + ' pas encore posées'
    }));
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

  /** Choisit des questions jamais posées ; quand tout y est passé, on recommence. */
  function tirerQuestions(nombre) {
    let posees = new Set(memoire.lire('posees', []));
    let neuves = QUESTIONS.filter(q => !posees.has(q.id));
    if (neuves.length < nombre) {
      posees = new Set();
      neuves = QUESTIONS.slice();
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

    conteneur.appendChild(el('header.barre', null, [
      el('button.rond', { type: 'button', 'aria-label': 'Quitter', texte: '✕', onclick: demanderQuitter }),
      vue.numero,
      vue.son
    ]));

    vue.scores = el('div.scores');
    conteneur.appendChild(vue.scores);

    vue.theme = el('span.scene__theme');
    vue.texte = el('div.scene__texte', { 'aria-live': 'polite' });
    vue.jauge = el('div.jauge', { hidden: true }, [el('div.jauge__barre')]);
    conteneur.appendChild(el('main.scene', null, [vue.theme, vue.texte, vue.jauge]));

    vue.buzzer = el('button.buzzer', {
      type: 'button', 'aria-label': 'Buzzer'
    }, [el('span.buzzer__texte', { texte: 'BUZZ' })]);
    // pointerdown : réagit dès le contact, sans attendre qu'on relève le doigt.
    vue.buzzer.addEventListener('pointerdown', ev => { ev.preventDefault(); buzz(); });
    vue.buzzer.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); buzz(); }
    });
    conteneur.appendChild(el('footer.pupitre', null, [vue.buzzer]));

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
    vue.scores.innerHTML = '';
    partie.joueurs.forEach((j, rang) => {
      vue.scores.appendChild(el('div.score' + (partie.bloques.has(rang) ? '.score--bloque' : ''), null, [
        el('span.score__nom', { texte: j.nom }),
        el('span.score__points', { texte: String(j.points) })
      ]));
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
    vue.buzzer.disabled = false;
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
    derniereChance(DERNIERE_CHANCE * 1000);
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
      barre.style.width = (reste / (DERNIERE_CHANCE * 1000) * 100) + '%';
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

  function buzz() {
    if (!partie || (partie.phase !== 'lecture' && partie.phase !== 'attente')) return;
    const reprise = partie.phase; // pour savoir quoi reprendre après une erreur
    interrompre();
    partie.phase = 'qui';
    partie.reprise = reprise;
    Sons.buzz();
    if (navigator.vibrate) navigator.vibrate(90);
    vue.buzzer.classList.add('buzzer--presse');
    setTimeout(() => vue.buzzer.classList.remove('buzzer--presse'), 250);

    const candidats = eligibles();
    if (candidats.length === 1) {
      demanderReponse(candidats[0]);
      return;
    }
    ouvrirPanneau([
      el('h2.panneau__titre', { texte: 'Qui a buzzé ?' }),
      el('div.qui', null, candidats.map(rang => el('button.qui__joueur', {
        type: 'button', texte: partie.joueurs[rang].nom,
        onclick: () => demanderReponse(rang)
      }))),
      el('button.lien-bouton', { type: 'button', texte: 'Fausse alerte, reprendre', onclick: reprendre })
    ]);
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

    ouvrirPanneau([
      el('p.panneau__surtitre', { texte: 'À toi de répondre' }),
      el('h2.panneau__titre', { texte: joueur.nom }),
      champ,
      el('button.bouton-plein', { type: 'button', texte: 'Valider', onclick: valider }),
      el('button.lien-bouton', {
        type: 'button', texte: 'Je ne sais plus',
        onclick: () => mauvaiseReponse(rang, null)
      })
    ]);
    setTimeout(() => champ.focus(), 60);
  }

  function verifier(rang, saisie) {
    const q = partie.questions[partie.rang];
    if (Reponse.juste(saisie, q)) {
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
    ]);
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
    vue.buzzer.disabled = true;
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
        el('span.solution__reference', { texte: q.reference })
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

  /* — panneau superposé — */

  function ouvrirPanneau(contenu) {
    vue.panneau.innerHTML = '';
    vue.panneau.appendChild(el('div.panneau__boite', { role: 'dialog', 'aria-modal': 'true' }, contenu));
    vue.panneau.hidden = false;
  }

  function fermerPanneau() {
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

  // Barre d'espace = buzzer, sur ordinateur.
  document.addEventListener('keydown', ev => {
    if (ev.code !== 'Space' || !partie) return;
    if (/^(INPUT|TEXTAREA|BUTTON)$/.test(document.activeElement && document.activeElement.tagName)) return;
    ev.preventDefault();
    buzz();
  });

  return { accueil };
})();
