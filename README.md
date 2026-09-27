# Questio

Le jeu biblique de questions, dans l'esprit de *Questions pour un champion*.
On se met tous autour d'un téléphone : il lit la question à voix haute, le
premier qui sait appuie sur le gros buzzer.

*Questio* : « question », « recherche » en latin.

Application web autonome, comme Vox : **aucun serveur, aucun compte**. Elle
s'installe sur l'écran d'accueil de n'importe quel téléphone et fonctionne hors
ligne.

---

## Comment on joue

1. **Accueil** — le nombre de joueurs (1 à 8) et leurs noms, le nombre de
   questions (5, 10, 15 ou 20), la lecture à voix haute, la voix (parmi les
   voix françaises du téléphone, ★ pour les voix améliorées) et sa vitesse.
   Tout est retenu pour la prochaine fois.
2. **Lancer la partie.** Chaque question se lit **indice par indice**, du plus
   difficile au plus facile. Le texte s'affiche au fil de la lecture.
3. **BUZZ !** La lecture s'arrête net. On touche le nom de celui qui a buzzé
   (s'il ne reste qu'un joueur en lice, c'est automatique).
4. **Il tape sa réponse** et valide.
   - **Juste** : un point, la réponse et sa référence biblique s'affichent.
   - **Faux** : il ne peut plus buzzer sur cette question, et la lecture reprend
     au début de l'indice interrompu.
5. Quand tout est lu, **dix secondes de dernière chance**. Personne ? La réponse
   est donnée.
6. À la fin, le **classement** (ex æquo compris), puis *Rejouer* avec de
   nouvelles questions.

« Fausse alerte, reprendre » annule un buzz par erreur. La barre d'espace sert
de buzzer sur ordinateur. L'écran reste allumé pendant la partie.

### Les réponses

On tape vite, sous pression : la réponse est comparée **sans accents, sans
majuscules et sans article** (« le », « la », « le roi », « le mont »…), et une
petite faute de frappe est pardonnée sur les mots longs. « moise », « Moïse »,
« Nabucodonosor », « 12 » pour douze sont justes.

Les questions déjà posées ne reviennent pas avant que tout le questionnaire y
soit passé.

## Le questionnaire

Tout est dans [`js/questions.js`](js/questions.js) : 70 questions
(personnages, lieux, objets, livres, nombres), chacune avec sa référence.

Pour en ajouter une, copier ce modèle dans la liste :

```js
{ id: 'noe', theme: 'Personnage', reponse: 'Noé', accepte: [],
  reference: 'Genèse 6:9-14',
  indices: [
    'Mon père s’appelait Lamek.',                 // le plus difficile
    'J’ai eu trois fils : Sem, Cham et Japhet.',
    'Pendant des années, j’ai construit un immense bateau.',
    'J’ai survécu au déluge. Qui suis-je ?'       // le plus facile, avec la question
  ] },
```

- `id` doit être unique ;
- `accepte` liste les autres formes justes (surnom, autre orthographe) ;
- des phrases courtes : chacune est lue d'un seul tenant, et c'est au début de
  la phrase interrompue que la lecture reprend.

## Installation

### Sur iPhone / iPad

1. Ouvrir l'adresse du site dans **Safari**.
2. Bouton Partager → **Sur l'écran d'accueil**.

La voix utilisée est celle du téléphone. Pour une voix plus naturelle :
*Réglages → Accessibilité → Contenu énoncé → Voix → Français*, et télécharger
une voix « améliorée ». Vérifier aussi que le bouton silencieux n'est pas
activé.

### Sur Android

Chrome propose **Installer l'application** dans son menu.

## Essayer en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Organisation du code

Pas de framework, pas d'étape de compilation, pas de dépendance.

```
index.html              coquille
manifest.webmanifest    installation sur l'écran d'accueil
sw.js                   cache hors ligne
css/app.css             toute la mise en forme
js/ui.js                création d'éléments, mémoire locale
js/questions.js         le questionnaire
js/reponse.js           vérification tolérante des réponses
js/voix.js              lecture à voix haute et petits sons
js/jeu.js               les écrans et le déroulement d'une partie
js/app.js               démarrage
assets/                 icônes
```
