/*
 * Questio — démarrage.
 */
document.addEventListener('DOMContentLoaded', () => {
  Jeu.accueil();
  document.body.classList.add('prete');
});

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  // Une nouvelle version vient de s'installer : on recharge une fois pour
  // l'utiliser tout de suite, sans devoir rouvrir l'application. (Pas à la
  // toute première visite, où rien n'était encore installé.)
  const dejaInstallee = !!navigator.serviceWorker.controller;
  let recharge = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!dejaInstallee || recharge) return;
    recharge = true;
    location.reload();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Sans service worker le jeu fonctionne, simplement pas hors ligne.
    });
  });
}
