/*
 * Questio — vérification des réponses.
 *
 * On tape vite, sur un téléphone, sous pression : la réponse est comparée
 * sans accents, sans majuscules, sans article (« le », « la », « l' »…), et
 * une petite faute de frappe est pardonnée. « moise », « Moïse » et « Moise »
 * sont justes ; « Nabucodonosor » aussi.
 */
const Reponse = (() => {

  const ARTICLES = /^(le|la|les|l|un|une|des|du|de|d|au|aux|mont|roi|reine|apotre|prophete|saint)\s+/;
  const NOMBRES = {
    un: '1', deux: '2', trois: '3', quatre: '4', cinq: '5', six: '6', sept: '7', huit: '8',
    neuf: '9', dix: '10', onze: '11', douze: '12', treize: '13', quarante: '40', cent: '100'
  };

  function normaliser(texte) {
    let net = String(texte || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[’'`´-]/g, ' ')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    // Retire les articles et titres en tête, même enchaînés (« le roi David »).
    let avant;
    do {
      avant = net;
      net = net.replace(ARTICLES, '');
    } while (net !== avant);
    return NOMBRES[net] || net;
  }

  /** Nombre de modifications pour passer d'un mot à l'autre. */
  function distance(a, b) {
    if (a === b) return 0;
    const ligne = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      let diagonale = ligne[0];
      ligne[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const haut = ligne[j];
        ligne[j] = Math.min(
          ligne[j] + 1,
          ligne[j - 1] + 1,
          diagonale + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
        diagonale = haut;
      }
    }
    return ligne[b.length];
  }

  /** Fautes tolérées selon la longueur du mot attendu. */
  function tolerance(attendu) {
    if (/^\d+$/.test(attendu)) return 0;
    if (attendu.length >= 9) return 2;
    if (attendu.length >= 5) return 1;
    return 0;
  }

  function proche(saisie, attendu) {
    if (!saisie || !attendu) return false;
    if (saisie === attendu) return true;
    if (distance(saisie, attendu) <= tolerance(attendu)) return true;
    // « c'est Moïse », « Moïse le prophète » : la bonne réponse est dedans.
    const mots = saisie.split(' ');
    const cible = attendu.split(' ');
    if (mots.length > cible.length + 3) return false;
    for (let i = 0; i + cible.length <= mots.length; i++) {
      const morceau = mots.slice(i, i + cible.length).join(' ');
      if (distance(morceau, attendu) <= tolerance(attendu)) return true;
    }
    return false;
  }

  /** La saisie correspond-elle à la réponse de la question ? */
  function juste(saisie, question) {
    const tape = normaliser(saisie);
    if (!tape) return false;
    return [question.reponse].concat(question.accepte || [])
      .some(forme => proche(tape, normaliser(forme)));
  }

  return { juste, normaliser };
})();
