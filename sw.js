/*
 * Questio — service worker.
 * Le jeu doit s'ouvrir sans réseau : tout le nécessaire est mis en cache à
 * l'installation.
 */

const CACHE = 'questio-v28';

const COQUILLE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './js/ui.js',
  './js/bible.js',
  './js/questions.js',
  './js/reponse.js',
  './js/voix.js',
  './js/jeu.js',
  './js/app.js',
  './assets/icone.svg',
  './assets/icone-180.png',
  './assets/icone-192.png',
  './assets/icone-512.png'
];

self.addEventListener('install', evenement => {
  evenement.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(COQUILLE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evenement => {
  evenement.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evenement => {
  const requete = evenement.request;
  if (requete.method !== 'GET') return;
  if (new URL(requete.url).origin !== self.location.origin) return;

  // Réseau d'abord pour la page (mises à jour), cache d'abord pour le reste.
  if (requete.mode === 'navigate') {
    evenement.respondWith(
      fetch(requete)
        .then(reponse => {
          const copie = reponse.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', copie));
          return reponse;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  evenement.respondWith(
    caches.match(requete).then(enCache => enCache || fetch(requete).then(reponse => {
      if (reponse && reponse.status === 200 && reponse.type === 'basic') {
        const copie = reponse.clone();
        caches.open(CACHE).then(cache => cache.put(requete, copie));
      }
      return reponse;
    }))
  );
});
