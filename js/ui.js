/*
 * Questio — briques d'interface.
 */
const UI = (() => {

  /** el('div.carte', { onclick }, [enfants…]) */
  function el(selecteur, attributs, enfants) {
    const parties = selecteur.split(/(?=[.#])/);
    const noeud = document.createElement(parties[0] || 'div');
    for (const partie of parties.slice(1)) {
      if (partie[0] === '.') noeud.classList.add(partie.slice(1));
      else if (partie[0] === '#') noeud.id = partie.slice(1);
    }
    if (attributs) {
      for (const [cle, valeur] of Object.entries(attributs)) {
        if (valeur === null || valeur === undefined || valeur === false) continue;
        if (cle === 'texte') noeud.textContent = valeur;
        else if (cle.startsWith('on') && typeof valeur === 'function') {
          noeud.addEventListener(cle.slice(2), valeur);
        } else if (cle === 'valeur') noeud.value = valeur;
        else noeud.setAttribute(cle, valeur === true ? '' : valeur);
      }
    }
    for (const enfant of [].concat(enfants || [])) {
      if (enfant === null || enfant === undefined || enfant === false) continue;
      noeud.appendChild(typeof enfant === 'string' ? document.createTextNode(enfant) : enfant);
    }
    return noeud;
  }

  /** Mémoire locale : jamais bloquante (navigation privée, stockage plein). */
  const memoire = {
    lire(cle, defaut) {
      try {
        const brut = localStorage.getItem('questio.' + cle);
        return brut === null ? defaut : JSON.parse(brut);
      } catch (e) {
        return defaut;
      }
    },
    ecrire(cle, valeur) {
      try { localStorage.setItem('questio.' + cle, JSON.stringify(valeur)); } catch (e) { /* tant pis */ }
    }
  };

  // À augmenter à chaque publication, avec le cache de sw.js : on voit ainsi
  // sur le téléphone si la mise à jour est arrivée.
  const VERSION = 27;

  return { el, memoire, VERSION };
})();
