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

1. **Accueil** — le nombre de joueurs (1 à 8) et leurs noms, les questions
   **Adultes** ou **Enfants** (5-10 ans) et leur nombre (5, 10, 15 ou 20).
   La **roue crantée** en haut à droite ouvre les réglages de la lecture à voix
   haute : marche ou arrêt, la voix (parmi les voix françaises du téléphone,
   ★ pour les voix améliorées) et sa vitesse. Tout est retenu pour la
   prochaine fois.
2. **Lancer la partie.** Chaque question se lit **indice par indice**, du plus
   difficile au plus facile. Le texte s'affiche au fil de la lecture.
3. **BUZZ !** Le téléphone est posé au milieu de la table et **chaque joueur a
   son propre buzzer**, de sa couleur, sur le bord qui lui fait face et écrit
   dans son sens : joueur 1 en bas, 2 en haut (retourné), 3 à gauche, 4 à
   droite, puis on recommence de 5 à 8. Le premier qui appuie arrête la
   lecture.
4. **Il tape sa réponse**, ou la **dicte** avec le bouton 🎤, et valide. En
   dictée, si l'une des transcriptions proposées par le téléphone est la bonne
   réponse, elle est validée d'elle-même ; sinon le texte reste dans le champ
   pour être corrigé.
   - **Juste** : un point, la réponse et ses références bibliques s'affichent.
     Chaque référence ouvre **JW Library** au bon verset ; la petite flèche ↗
     ouvre le même passage sur **jw.org**.
   - **Faux** : il ne peut plus buzzer sur cette question, et la lecture reprend
     au début de l'indice interrompu.
5. Quand tout est lu, **dix secondes de dernière chance**. Personne ? La réponse
   est donnée.
6. À la fin, le **classement** (ex æquo compris), puis *Rejouer* avec de
   nouvelles questions.

« Buzz par erreur, reprendre » annule un buzz sans pénalité. Sur ordinateur,
les touches 1 à 8 servent de buzzers. L'écran reste allumé pendant la partie.

### Les réponses

On tape vite, sous pression : la réponse est comparée **sans accents, sans
majuscules et sans article** (« le », « la », « le roi », « le mont »…), et une
petite faute de frappe est pardonnée sur les mots longs, jamais sur la
première lettre (« Anne » n'est pas « manne »). Une phrase est acceptée si la
réponse y figure avec de simples mots de liaison (« c'est David », « le roi
David »), mais « Jean-Baptiste » n'est pas « Jean ». « moise », « Moïse »,
« Nabucodonosor », « 12 » pour douze sont justes.

Les questions déjà posées ne reviennent pas avant que tout le questionnaire y
soit passé.

### Le mode enfants

Un questionnaire à part, pour les 5-10 ans : trois indices courts, des récits
qu'ils connaissent (Noé, David et Goliath, Jonas, Daniel…), des animaux, des
objets, des métiers et des nombres. Le jeu y est plus indulgent : une faute
d'orthographe de plus est pardonnée sur les mots longs (« Goliat »,
« colonbe »), et la dernière
chance dure quinze secondes au lieu de dix.

## Le questionnaire

Tout est dans [`js/questions.js`](js/questions.js), chaque question avec sa
référence :

- `QUESTIONS` — 131 questions pour les adultes (personnages, lieux, objets,
  livres, nombres), quatre indices ;
- `QUESTIONS_ENFANTS` — 44 questions pour les 5-10 ans, trois indices simples.
  Leurs identifiants commencent par `e-`.

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

**Après tout ajout ou toute correction, réenregistrer la voix** (voir
ci-dessous) : sans enregistrement, la question est lue par la voix du
téléphone.

## La voix enregistrée

Les questions sont lues par **Audrey (Premium)**, une voix de macOS
enregistrée à l'avance dans [`audio/`](audio) : la même belle voix sur tous les
téléphones, même hors ligne. Chaque indice est un fichier, ainsi que les phrases
« Bonne réponse ! C'était… » et « La réponse était… » de chaque question.

```bash
python3 outils/enregistrer.py
```

Le script lit `js/questions.js`, n'enregistre que les phrases nouvelles ou
modifiées (`audio/index.json` en garde la trace) et retire celles qui ne
servent plus. Il faut un Mac avec la voix installée : Réglages Système →
Accessibilité → Contenu énoncé → Voix du système → Gérer les voix… →
Français → Audrey (Premium). Une autre voix : `--voix "Thomas"`.

Dans le jeu, les enregistrements d'une partie se chargent au lancement. Les
Réglages permettent aussi de choisir une voix du téléphone à la place ; elle
sert de toute façon de repli si un enregistrement manque.

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
js/bible.js             les 66 livres, liens JW Library et jw.org (repris de Vox)
js/questions.js         le questionnaire
js/reponse.js           vérification tolérante des réponses
js/voix.js              voix enregistrée, voix du téléphone, dictée, petits sons
js/jeu.js               les écrans et le déroulement d'une partie
js/app.js               démarrage
assets/                 icônes
audio/                  la voix enregistrée (un fichier par phrase)
outils/enregistrer.py   enregistre les questions avec une voix du Mac
```
