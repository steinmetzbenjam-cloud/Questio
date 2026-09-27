/*
 * Questio — démarrage.
 */
document.addEventListener('DOMContentLoaded', () => {
  Jeu.accueil();
  document.body.classList.add('prete');
});

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Sans service worker le jeu fonctionne, simplement pas hors ligne.
    });
  });
}
