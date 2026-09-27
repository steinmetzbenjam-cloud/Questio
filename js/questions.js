/*
 * Questio — le questionnaire.
 *
 * Chaque question se lit indice par indice, du plus difficile au plus facile,
 * comme dans « Questions pour un champion » : plus on buzze tôt, plus c'est
 * méritoire. Le dernier indice pose la question.
 *
 *   id        — identifiant stable (pour ne pas reposer deux fois la même)
 *   theme     — Personnage, Lieu, Objet, Livre, Nombre
 *   indices   — lus à voix haute, un par un
 *   reponse   — la réponse affichée
 *   accepte   — autres formes acceptées (accents et majuscules sont ignorés)
 *   reference — où vérifier
 */
const QUESTIONS = [

  /* ------------------------------------------------------ personnages --- */

  { id: 'moise', theme: 'Personnage', reponse: 'Moïse', accepte: [],
    reference: 'Exode 2:10 ; 3:1-10 ; Actes 7:30',
    indices: [
      'J’ai été adopté par une princesse égyptienne.',
      'J’ai gardé les troupeaux de mon beau-père Jéthro pendant quarante ans.',
      'Jéhovah m’a parlé depuis un buisson en feu.',
      'J’ai conduit Israël hors d’Égypte. Qui suis-je ?'
    ] },

  { id: 'noe', theme: 'Personnage', reponse: 'Noé', accepte: [],
    reference: 'Genèse 5:28, 29 ; 6:9-14 ; 7:1',
    indices: [
      'Mon père s’appelait Lamek.',
      'J’ai eu trois fils : Sem, Cham et Japhet.',
      'Pendant des années, j’ai construit un immense bateau.',
      'Avec ma famille et les animaux, j’ai survécu au déluge. Qui suis-je ?'
    ] },

  { id: 'abraham', theme: 'Personnage', reponse: 'Abraham', accepte: ['abram'],
    reference: 'Genèse 11:31 ; 17:5 ; 22:1-12 ; Jacques 2:23',
    indices: [
      'Je suis parti d’Ur des Chaldéens.',
      'Dieu a changé mon nom pour me promettre une grande descendance.',
      'La Bible m’appelle « l’ami de Jéhovah ».',
      'J’étais prêt à offrir mon fils Isaac en sacrifice. Qui suis-je ?'
    ] },

  { id: 'isaac', theme: 'Personnage', reponse: 'Isaac', accepte: [],
    reference: 'Genèse 21:3-6 ; 22:2 ; 24:67',
    indices: [
      'Mon nom signifie « rire ».',
      'Ma mère avait 90 ans quand je suis né.',
      'J’ai épousé Rébecca.',
      'Mon père Abraham m’a presque offert en sacrifice au pays de Moriya. Qui suis-je ?'
    ] },

  { id: 'rebecca', theme: 'Personnage', reponse: 'Rébecca', accepte: ['rebekah', 'rebeca'],
    reference: 'Genèse 24:15-20 ; 24:67 ; 25:21-26',
    indices: [
      'Mon frère s’appelait Laban.',
      'Près d’un puits, j’ai donné à boire aux chameaux du serviteur d’Abraham.',
      'J’ai été la mère de jumeaux, Ésaü et Jacob.',
      'Je suis devenue la femme d’Isaac. Qui suis-je ?'
    ] },

  { id: 'jacob', theme: 'Personnage', reponse: 'Jacob', accepte: [],
    reference: 'Genèse 25:29-34 ; 28:12 ; 29:20-30 ; 32:28',
    indices: [
      'J’ai obtenu le droit d’aînesse de mon frère contre un plat de lentilles.',
      'En rêve, j’ai vu une échelle qui montait jusqu’au ciel.',
      'J’ai travaillé quatorze ans pour épouser Rachel.',
      'Mon nom a été changé en Israël. Qui suis-je ?'
    ] },

  { id: 'joseph', theme: 'Personnage', reponse: 'Joseph', accepte: [],
    reference: 'Genèse 37:3, 28 ; 41:14-41',
    indices: [
      'Mon père m’a offert un vêtement qu’il n’avait pas donné à mes frères.',
      'Jaloux, mes frères m’ont vendu comme esclave.',
      'En prison, puis devant Pharaon, j’ai interprété des rêves.',
      'Je suis devenu le second de toute l’Égypte. Qui suis-je ?'
    ] },

  { id: 'adam', theme: 'Personnage', reponse: 'Adam', accepte: [],
    reference: 'Genèse 2:7, 15, 19, 20',
    indices: [
      'J’ai été formé de la poussière du sol.',
      'J’ai donné un nom à tous les animaux.',
      'J’ai vécu dans le jardin d’Éden.',
      'Je suis le premier homme. Qui suis-je ?'
    ] },

  { id: 'eve', theme: 'Personnage', reponse: 'Ève', accepte: [],
    reference: 'Genèse 2:22 ; 3:1-6, 20',
    indices: [
      'J’ai été faite à partir d’une côte.',
      'Un serpent m’a adressé la parole.',
      'J’ai mangé du fruit défendu.',
      'Je suis appelée la mère de tous les vivants. Qui suis-je ?'
    ] },

  { id: 'cain', theme: 'Personnage', reponse: 'Caïn', accepte: [],
    reference: 'Genèse 4:1-8',
    indices: [
      'Je suis le premier enfant né sur la terre.',
      'J’étais cultivateur.',
      'Jéhovah n’a pas approuvé mon offrande.',
      'Par jalousie, j’ai tué mon frère Abel. Qui suis-je ?'
    ] },

  { id: 'mathusalem', theme: 'Personnage', reponse: 'Mathusalem', accepte: ['methuselah', 'methouchelah', 'mathusale'],
    reference: 'Genèse 5:21, 27',
    indices: [
      'Mon père s’appelait Hénok.',
      'Mon petit-fils s’appelait Noé.',
      'J’ai vécu 969 ans.',
      'Je suis l’homme qui a vécu le plus longtemps selon la Bible. Qui suis-je ?'
    ] },

  { id: 'job', theme: 'Personnage', reponse: 'Job', accepte: [],
    reference: 'Job 1:1 ; 1:13-19 ; 2:11 ; 42:10',
    indices: [
      'J’habitais le pays d’Ouz.',
      'En un seul jour, j’ai perdu mes troupeaux et mes enfants.',
      'Trois amis sont venus, soi-disant pour me consoler.',
      'Je suis resté fidèle, et Jéhovah m’a rendu le double de ce que j’avais. Qui suis-je ?'
    ] },

  { id: 'josue', theme: 'Personnage', reponse: 'Josué', accepte: [],
    reference: 'Exode 33:11 ; Nombres 13:8, 16 ; Josué 6:20',
    indices: [
      'J’étais le serviteur de Moïse.',
      'J’ai fait partie des douze espions envoyés en Canaan.',
      'Après Moïse, j’ai conduit Israël dans la Terre promise.',
      'Sous mon commandement, les murailles de Jéricho sont tombées. Qui suis-je ?'
    ] },

  { id: 'rahab', theme: 'Personnage', reponse: 'Rahab', accepte: [],
    reference: 'Josué 2:1-21 ; 6:25',
    indices: [
      'Ma maison était construite dans la muraille de la ville.',
      'J’ai caché deux espions israélites sous des tiges de lin.',
      'J’ai suspendu un cordon écarlate à ma fenêtre.',
      'Ma famille et moi avons été épargnés à Jéricho. Qui suis-je ?'
    ] },

  { id: 'debora', theme: 'Personnage', reponse: 'Débora', accepte: ['deborah'],
    reference: 'Juges 4:4-16',
    indices: [
      'Je rendais la justice assise sous un palmier.',
      'J’étais prophétesse.',
      'J’ai encouragé Barak à combattre.',
      'Avec Barak, j’ai vu l’armée de Sisera vaincue. Qui suis-je ?'
    ] },

  { id: 'gedeon', theme: 'Personnage', reponse: 'Gédéon', accepte: [],
    reference: 'Juges 6:36-40 ; 7:7, 16-22',
    indices: [
      'J’ai demandé un signe à Dieu avec une toison de laine.',
      'Mon armée a été réduite à 300 hommes.',
      'Nous avons attaqué avec des cors, des jarres et des torches.',
      'Avec ces 300 hommes, j’ai vaincu les Madianites. Qui suis-je ?'
    ] },

  { id: 'samson', theme: 'Personnage', reponse: 'Samson', accepte: [],
    reference: 'Juges 13:5 ; 14:5, 6 ; 16:4-21',
    indices: [
      'J’étais nazir depuis ma naissance.',
      'J’ai tué un lion à mains nues.',
      'Dalila m’a livré aux Philistins.',
      'Ma force a disparu quand on m’a rasé la tête. Qui suis-je ?'
    ] },

  { id: 'ruth', theme: 'Personnage', reponse: 'Ruth', accepte: [],
    reference: 'Ruth 1:4, 16 ; 2:2, 3 ; 4:13',
    indices: [
      'J’étais moabite.',
      'J’ai dit à ma belle-mère : « Ton peuple sera mon peuple, et ton Dieu mon Dieu. »',
      'J’ai glané des épis dans le champ de Boaz.',
      'J’ai épousé Boaz et je suis une ancêtre du roi David. Qui suis-je ?'
    ] },

  { id: 'anne', theme: 'Personnage', reponse: 'Anne', accepte: ['hannah'],
    reference: '1 Samuel 1:9-28',
    indices: [
      'Pendant longtemps, je n’ai pas eu d’enfant.',
      'J’ai prié au tabernacle, à Silo, et le prêtre Éli a cru que j’étais ivre.',
      'J’avais promis de donner mon fils au service de Jéhovah.',
      'Je suis la mère du prophète Samuel. Qui suis-je ?'
    ] },

  { id: 'samuel', theme: 'Personnage', reponse: 'Samuel', accepte: [],
    reference: '1 Samuel 1:24-28 ; 3:1-10 ; 10:1 ; 16:13',
    indices: [
      'Tout jeune, j’ai été confié au prêtre Éli.',
      'Une nuit, j’ai entendu Jéhovah m’appeler par mon nom.',
      'J’ai été prophète et juge en Israël.',
      'J’ai oint Saül, puis David, comme rois. Qui suis-je ?'
    ] },

  { id: 'saul', theme: 'Personnage', reponse: 'Saül', accepte: [],
    reference: '1 Samuel 9:21 ; 10:1, 23 ; 28:7',
    indices: [
      'J’étais de la tribu de Benjamin.',
      'Je dépassais tout le peuple de la tête.',
      'J’ai consulté une spirite à En-Dor.',
      'Je suis le premier roi d’Israël. Qui suis-je ?'
    ] },

  { id: 'david', theme: 'Personnage', reponse: 'David', accepte: [],
    reference: '1 Samuel 16:11-13, 23 ; 17:49',
    indices: [
      'J’étais le plus jeune des fils de Jessé.',
      'Je jouais de la harpe pour calmer le roi Saül.',
      'J’ai vaincu un géant avec une fronde et une pierre.',
      'Berger devenu roi, j’ai écrit beaucoup de psaumes. Qui suis-je ?'
    ] },

  { id: 'goliath', theme: 'Personnage', reponse: 'Goliath', accepte: [],
    reference: '1 Samuel 17:4, 16, 49',
    indices: [
      'Je venais de Gath.',
      'Je mesurais six coudées et un empan.',
      'Pendant quarante jours, j’ai défié l’armée d’Israël.',
      'Un jeune berger m’a abattu d’une pierre au front. Qui suis-je ?'
    ] },

  { id: 'absalom', theme: 'Personnage', reponse: 'Absalom', accepte: [],
    reference: '2 Samuel 14:25, 26 ; 15:10 ; 18:9',
    indices: [
      'J’étais admiré pour ma beauté et mon abondante chevelure.',
      'J’ai gagné le cœur des Israélites pour prendre le pouvoir.',
      'Je me suis révolté contre mon propre père, le roi David.',
      'En fuyant, ma tête s’est prise dans les branches d’un grand arbre. Qui suis-je ?'
    ] },

  { id: 'salomon', theme: 'Personnage', reponse: 'Salomon', accepte: [],
    reference: '1 Rois 1:30 ; 3:9-12 ; 6:1 ; 10:1',
    indices: [
      'Ma mère s’appelait Bath-Shéba.',
      'J’ai demandé à Jéhovah un cœur obéissant pour juger le peuple.',
      'La reine de Saba est venue vérifier ma sagesse.',
      'Fils de David, j’ai construit le temple de Jérusalem. Qui suis-je ?'
    ] },

  { id: 'elie', theme: 'Personnage', reponse: 'Élie', accepte: [],
    reference: '1 Rois 17:6 ; 18:20-40 ; 2 Rois 2:11',
    indices: [
      'Pendant une sécheresse, des corbeaux m’ont nourri.',
      'Sur le mont Carmel, j’ai défié les prophètes de Baal.',
      'Le feu de Jéhovah est descendu sur mon sacrifice.',
      'J’ai été emporté dans un tourbillon. Qui suis-je ?'
    ] },

  { id: 'elisee', theme: 'Personnage', reponse: 'Élisée', accepte: [],
    reference: '2 Rois 2:9-13 ; 5:10-14',
    indices: [
      'Je labourais un champ quand on m’a appelé à devenir prophète.',
      'J’ai demandé une double part de l’esprit de mon maître.',
      'J’ai ramassé le manteau d’Élie.',
      'Sur mon conseil, Naamân s’est plongé sept fois dans le Jourdain. Qui suis-je ?'
    ] },

  { id: 'nabuchodonosor', theme: 'Personnage', reponse: 'Nabuchodonosor', accepte: ['nebucadnetsar', 'nabucodonosor'],
    reference: '2 Rois 25:8-10 ; Daniel 3:1 ; 4:33',
    indices: [
      'J’ai détruit Jérusalem et son temple.',
      'J’ai fait dresser une statue d’or dans la plaine de Doura.',
      'Pendant sept temps, j’ai mangé de l’herbe comme les taureaux.',
      'J’étais le plus célèbre roi de Babylone. Qui suis-je ?'
    ] },

  { id: 'daniel', theme: 'Personnage', reponse: 'Daniel', accepte: ['beltshatsar'],
    reference: 'Daniel 1:8 ; 5:25-28 ; 6:16-22',
    indices: [
      'Jeune, j’ai été emmené captif à Babylone.',
      'J’ai refusé de me souiller avec la nourriture du roi.',
      'J’ai expliqué l’écriture apparue sur le mur au festin de Belshatsar.',
      'On m’a jeté dans la fosse aux lions. Qui suis-je ?'
    ] },

  { id: 'esther', theme: 'Personnage', reponse: 'Esther', accepte: [],
    reference: 'Esther 2:7, 17 ; 4:16 ; 7:3-6',
    indices: [
      'Orpheline, j’ai été élevée par mon cousin Mardochée.',
      'Je suis devenue reine de Perse.',
      'J’ai dit : « Si je dois périr, je périrai. »',
      'J’ai dévoilé le complot d’Haman et sauvé mon peuple. Qui suis-je ?'
    ] },

  { id: 'nehemie', theme: 'Personnage', reponse: 'Néhémie', accepte: [],
    reference: 'Néhémie 1:11 ; 2:4, 5 ; 6:15',
    indices: [
      'J’étais échanson du roi Artaxerxès.',
      'Avant de répondre au roi, j’ai prié en silence.',
      'Je suis devenu gouverneur de Juda.',
      'J’ai dirigé la reconstruction de la muraille de Jérusalem en 52 jours. Qui suis-je ?'
    ] },

  { id: 'jonas', theme: 'Personnage', reponse: 'Jonas', accepte: [],
    reference: 'Jonas 1:3, 17 ; 3:4',
    indices: [
      'Au lieu d’obéir, j’ai pris un bateau pour Tarsis.',
      'Pendant la tempête, les marins m’ont jeté à la mer.',
      'Je suis resté trois jours dans le ventre d’un grand poisson.',
      'J’ai fini par prêcher à Ninive. Qui suis-je ?'
    ] },

  { id: 'jean-baptiste', theme: 'Personnage', reponse: 'Jean-Baptiste', accepte: ['jean baptiste', 'jean le baptiseur'],
    reference: 'Luc 1:5, 13 ; Matthieu 3:4, 13-16',
    indices: [
      'Mon père, Zacharie, était prêtre.',
      'Je portais un vêtement en poil de chameau.',
      'Je me nourrissais de sauterelles et de miel sauvage.',
      'J’ai baptisé Jésus dans le Jourdain. Qui suis-je ?'
    ] },

  { id: 'marie', theme: 'Personnage', reponse: 'Marie', accepte: [],
    reference: 'Luc 1:26-31 ; 2:4-7',
    indices: [
      'J’étais fiancée à un charpentier.',
      'L’ange Gabriel m’a rendu visite à Nazareth.',
      'J’ai dû voyager jusqu’à Bethléem pour un recensement.',
      'Je suis la mère de Jésus. Qui suis-je ?'
    ] },

  { id: 'pierre', theme: 'Personnage', reponse: 'Pierre', accepte: ['simon pierre', 'simon', 'cephas'],
    reference: 'Matthieu 4:18 ; 14:29 ; 26:75 ; Jean 1:42',
    indices: [
      'J’étais pêcheur avec mon frère André.',
      'Jésus m’a donné un nom qui signifie « rocher ».',
      'J’ai marché sur l’eau, un court moment.',
      'J’ai renié Jésus trois fois avant que le coq chante. Qui suis-je ?'
    ] },

  { id: 'thomas', theme: 'Personnage', reponse: 'Thomas', accepte: [],
    reference: 'Jean 11:16 ; 20:24-28',
    indices: [
      'On m’appelait « le Jumeau ».',
      'J’étais absent quand Jésus ressuscité est apparu aux autres apôtres.',
      'J’ai dit : « Si je ne vois pas les marques des clous, je ne croirai pas. »',
      'Je suis l’apôtre qui a douté. Qui suis-je ?'
    ] },

  { id: 'judas', theme: 'Personnage', reponse: 'Judas Iscariote', accepte: ['judas', 'iscariote'],
    reference: 'Jean 12:6 ; Matthieu 26:15, 49',
    indices: [
      'Je tenais la caisse commune des apôtres, et j’y volais.',
      'On m’a payé trente pièces d’argent.',
      'J’ai désigné Jésus par un baiser.',
      'Je suis l’apôtre qui a trahi Jésus. Qui suis-je ?'
    ] },

  { id: 'lazare', theme: 'Personnage', reponse: 'Lazare', accepte: [],
    reference: 'Jean 11:1, 17, 43, 44',
    indices: [
      'J’habitais Béthanie.',
      'Mes sœurs s’appelaient Marthe et Marie.',
      'Je suis resté quatre jours dans la tombe.',
      'Jésus m’a crié : « Sors ! », et je suis revenu à la vie. Qui suis-je ?'
    ] },

  { id: 'marthe', theme: 'Personnage', reponse: 'Marthe', accepte: [],
    reference: 'Luc 10:38-42 ; Jean 11:1',
    indices: [
      'J’habitais Béthanie avec mon frère Lazare.',
      'J’ai reçu Jésus chez moi et je m’affairais au service.',
      'Je me suis plainte que ma sœur ne m’aidait pas.',
      'Jésus m’a dit : « Tu t’inquiètes et tu t’agites pour beaucoup de choses. » Qui suis-je ?'
    ] },

  { id: 'zachee', theme: 'Personnage', reponse: 'Zachée', accepte: [],
    reference: 'Luc 19:1-8',
    indices: [
      'J’habitais Jéricho.',
      'J’étais chef des collecteurs d’impôts, et riche.',
      'Petit de taille, je suis monté dans un sycomore pour voir Jésus.',
      'J’ai promis de rendre quatre fois ce que j’avais extorqué. Qui suis-je ?'
    ] },

  { id: 'etienne', theme: 'Personnage', reponse: 'Étienne', accepte: [],
    reference: 'Actes 6:5 ; 7:55-60',
    indices: [
      'J’ai été choisi parmi sept hommes pour la distribution de nourriture.',
      'On m’a décrit comme plein de foi et d’esprit saint.',
      'Devant le Sanhédrin, j’ai vu Jésus à la droite de Dieu.',
      'J’ai été le premier disciple mis à mort, lapidé. Qui suis-je ?'
    ] },

  { id: 'philippe', theme: 'Personnage', reponse: 'Philippe', accepte: [],
    reference: 'Actes 6:5 ; 8:5, 26-38 ; 21:8',
    indices: [
      'Plus tard, on m’a appelé « l’évangélisateur ».',
      'J’ai prêché en Samarie.',
      'Sur une route du désert, j’ai rejoint un char.',
      'J’ai baptisé un eunuque éthiopien. Qui suis-je ?'
    ] },

  { id: 'barnabe', theme: 'Personnage', reponse: 'Barnabé', accepte: ['barnabas'],
    reference: 'Actes 4:36, 37 ; 13:2',
    indices: [
      'J’étais un Lévite originaire de Chypre.',
      'J’ai vendu un champ et donné l’argent aux apôtres.',
      'Mon surnom signifie « fils de consolation ».',
      'J’ai accompagné Paul lors de son premier voyage missionnaire. Qui suis-je ?'
    ] },

  { id: 'paul', theme: 'Personnage', reponse: 'Paul', accepte: ['saul de tarse', 'saul'],
    reference: 'Actes 9:3-9 ; 22:3',
    indices: [
      'Je suis né à Tarse.',
      'J’ai étudié aux pieds de Gamaliel.',
      'Sur la route de Damas, une lumière m’a aveuglé.',
      'Ancien persécuteur, je suis devenu l’apôtre des nations. Qui suis-je ?'
    ] },

  { id: 'timothee', theme: 'Personnage', reponse: 'Timothée', accepte: [],
    reference: 'Actes 16:1-3 ; 2 Timothée 1:5',
    indices: [
      'Ma mère s’appelait Eunice et ma grand-mère Loïs.',
      'Mon père était grec.',
      'J’ai accompagné Paul dans ses voyages.',
      'Paul m’a écrit deux lettres qui portent mon nom. Qui suis-je ?'
    ] },

  { id: 'luc', theme: 'Personnage', reponse: 'Luc', accepte: [],
    reference: 'Colossiens 4:14 ; Luc 1:1-3 ; Actes 1:1',
    indices: [
      'Paul m’appelait « le médecin bien-aimé ».',
      'J’ai souvent voyagé avec Paul.',
      'J’ai fait des recherches précises sur la vie de Jésus.',
      'J’ai écrit un Évangile et le livre des Actes. Qui suis-je ?'
    ] },

  /* ------------------------------------------------------------- lieux --- */

  { id: 'eden', theme: 'Lieu', reponse: 'Éden', accepte: ['jardin d eden', 'paradis'],
    reference: 'Genèse 2:8-10 ; 3:24',
    indices: [
      'Un fleuve sortait de moi et se divisait en quatre.',
      'Au milieu de mon jardin se trouvait l’arbre de la connaissance du bon et du mauvais.',
      'Après la désobéissance, des chérubins ont gardé mon entrée.',
      'Adam et Ève ont vécu dans mon jardin. Quel est mon nom ?'
    ] },

  { id: 'babel', theme: 'Lieu', reponse: 'Babel', accepte: ['tour de babel'],
    reference: 'Genèse 11:1-9',
    indices: [
      'Mes bâtisseurs utilisaient des briques et du bitume.',
      'Ils voulaient une tour dont le sommet atteigne les cieux.',
      'Jéhovah a confondu leur langue.',
      'Mon nom évoque la confusion. Quel est mon nom ?'
    ] },

  { id: 'mer-rouge', theme: 'Lieu', reponse: 'La mer Rouge', accepte: ['mer rouge'],
    reference: 'Exode 14:21-28',
    indices: [
      'Un vent d’est a soufflé sur moi toute une nuit.',
      'Mes eaux se sont dressées comme un mur, à droite et à gauche.',
      'Les Israélites m’ont traversée à pied sec.',
      'L’armée de Pharaon a été engloutie dans mes eaux. Qui suis-je ?'
    ] },

  { id: 'sinai', theme: 'Lieu', reponse: 'Le mont Sinaï', accepte: ['sinai', 'mont sinai', 'horeb', 'mont horeb'],
    reference: 'Exode 19:18 ; 31:18 ; 1 Rois 19:8, 9',
    indices: [
      'On m’appelle aussi Horeb.',
      'Élie s’est réfugié dans une de mes grottes.',
      'Le peuple a campé à mes pieds pendant que je fumais.',
      'Moïse y a reçu les tables de la Loi. Quelle montagne suis-je ?'
    ] },

  { id: 'jericho', theme: 'Lieu', reponse: 'Jéricho', accepte: [],
    reference: 'Deutéronome 34:3 ; Josué 2:1 ; 6:20',
    indices: [
      'On m’appelait « la ville des palmiers ».',
      'Rahab habitait dans ma muraille.',
      'Des prêtres ont fait le tour de mes remparts en sonnant du cor.',
      'Mes murailles se sont effondrées devant Josué. Quelle ville suis-je ?'
    ] },

  { id: 'jourdain', theme: 'Lieu', reponse: 'Le Jourdain', accepte: ['jourdain'],
    reference: 'Josué 3:15-17 ; 2 Rois 5:14 ; Matthieu 3:13',
    indices: [
      'Mes eaux se sont arrêtées quand les prêtres portant l’Arche y ont mis les pieds.',
      'Naamân s’y est plongé sept fois et a été guéri.',
      'Je me jette dans la mer Morte.',
      'Jean y a baptisé Jésus. Quel fleuve suis-je ?'
    ] },

  { id: 'bethleem', theme: 'Lieu', reponse: 'Bethléem', accepte: [],
    reference: 'Ruth 1:22 ; Michée 5:2 ; Luc 2:4-7',
    indices: [
      'Ruth et Noémi sont arrivées chez moi au début de la moisson.',
      'On m’appelle « la ville de David ».',
      'Le prophète Michée a annoncé que le Messie viendrait de chez moi.',
      'Jésus y est né. Quelle ville suis-je ?'
    ] },

  { id: 'ninive', theme: 'Lieu', reponse: 'Ninive', accepte: [],
    reference: 'Jonas 1:2 ; 3:3-10',
    indices: [
      'J’étais la capitale de l’Assyrie.',
      'Il fallait trois jours de marche pour me traverser.',
      'Jonas est venu annoncer ma destruction.',
      'Mes habitants se sont repentis, du plus grand au plus petit. Quelle ville suis-je ?'
    ] },

  { id: 'nazareth', theme: 'Lieu', reponse: 'Nazareth', accepte: [],
    reference: 'Luc 1:26 ; 2:51 ; Jean 1:46',
    indices: [
      'Je suis une petite ville de Galilée.',
      'L’ange Gabriel y a rendu visite à Marie.',
      'Nathanaël a demandé si quelque chose de bon pouvait venir de chez moi.',
      'Jésus y a grandi. Quelle ville suis-je ?'
    ] },

  { id: 'patmos', theme: 'Lieu', reponse: 'Patmos', accepte: [],
    reference: 'Révélation 1:9',
    indices: [
      'Je suis une île de la mer Égée.',
      'Un apôtre âgé y a été exilé à cause de la parole de Dieu.',
      'Il y a reçu une série de visions.',
      'C’est là que Jean a reçu la Révélation. Quelle île suis-je ?'
    ] },

  /* ------------------------------------------------------------ objets --- */

  { id: 'arche-alliance', theme: 'Objet', reponse: 'L’Arche de l’alliance', accepte: ['arche de l alliance', 'arche de l alliance de jehovah', 'arche'],
    reference: 'Exode 25:10-22 ; 2 Samuel 6:6, 7 ; Hébreux 9:4',
    indices: [
      'J’étais en bois d’acacia recouvert d’or.',
      'Deux chérubins d’or se faisaient face sur mon couvercle.',
      'Ouza est mort pour m’avoir touchée.',
      'Je contenais les tables de la Loi. Qui suis-je ?'
    ] },

  { id: 'manne', theme: 'Objet', reponse: 'La manne', accepte: ['manne'],
    reference: 'Exode 16:14-35',
    indices: [
      'Je ressemblais à de la graine de coriandre.',
      'J’avais le goût de galettes au miel.',
      'Je ne tombais pas le jour du sabbat.',
      'J’ai nourri Israël pendant quarante ans dans le désert. Qui suis-je ?'
    ] },

  { id: 'arc-en-ciel', theme: 'Objet', reponse: 'L’arc-en-ciel', accepte: ['arc en ciel', 'arc'],
    reference: 'Genèse 9:12-16',
    indices: [
      'Je suis apparu pour la première fois dans le récit après le déluge.',
      'Je suis le signe d’une alliance.',
      'Je rappelle que les eaux ne détruiront plus toute chair.',
      'On me voit dans les nuages. Qui suis-je ?'
    ] },

  { id: 'serpent-cuivre', theme: 'Objet', reponse: 'Le serpent de cuivre', accepte: ['serpent de cuivre', 'serpent d airain', 'serpent'],
    reference: 'Nombres 21:8, 9 ; 2 Rois 18:4 ; Jean 3:14',
    indices: [
      'Des siècles plus tard, le roi Ézéchias m’a mis en pièces.',
      'Jésus m’a comparé à lui-même dans une conversation avec Nicodème.',
      'Moïse m’a fixé sur une perche.',
      'Celui qui me regardait après une morsure restait en vie. Qui suis-je ?'
    ] },

  { id: 'fronde', theme: 'Objet', reponse: 'La fronde', accepte: ['fronde'],
    reference: 'Juges 20:16 ; 1 Samuel 17:40, 49',
    indices: [
      'Sept cents Benjaminites gauchers maniaient cet objet sans manquer un cheveu.',
      'On m’utilise avec des pierres lisses.',
      'Un jeune berger m’a préférée à l’armure du roi.',
      'Avec moi, David a abattu Goliath. Qui suis-je ?'
    ] },

  /* ------------------------------------------------------------ livres --- */

  { id: 'genese', theme: 'Livre', reponse: 'Genèse', accepte: ['la genese'],
    reference: 'Genèse 1:1 ; 50:26',
    indices: [
      'Je me termine par la mort de Joseph en Égypte.',
      'Je raconte le déluge et la tour de Babel.',
      'Je décris la vie d’Abraham, d’Isaac et de Jacob.',
      'Je commence par : « Au commencement, Dieu créa les cieux et la terre. » Quel livre suis-je ?'
    ] },

  { id: 'psaumes', theme: 'Livre', reponse: 'Psaumes', accepte: ['psaume', 'les psaumes'],
    reference: 'Psaume 23:1 ; 119:176',
    indices: [
      'Mon plus long chapitre compte 176 versets.',
      'Je suis le livre de la Bible qui a le plus de chapitres.',
      'Beaucoup de mes chants ont été écrits par David.',
      'Mon chapitre 23 commence par : « Jéhovah est mon Berger. » Quel livre suis-je ?'
    ] },

  { id: 'proverbes', theme: 'Livre', reponse: 'Proverbes', accepte: ['proverbe', 'les proverbes'],
    reference: 'Proverbes 1:1, 7 ; 31:10',
    indices: [
      'Mon dernier chapitre décrit une femme capable.',
      'Je dis : « La crainte de Jéhovah est le commencement de la connaissance. »',
      'Je suis composé de courtes maximes pleines de sagesse.',
      'La plupart de mes paroles viennent de Salomon. Quel livre suis-je ?'
    ] },

  { id: 'actes', theme: 'Livre', reponse: 'Actes', accepte: ['actes des apotres', 'les actes'],
    reference: 'Actes 1:9 ; 2:1-4 ; 28:16',
    indices: [
      'Je me termine avec Paul prisonnier à Rome.',
      'Je raconte l’effusion de l’esprit saint à la Pentecôte.',
      'J’ai été écrit par Luc.',
      'Je raconte les débuts de la congrégation chrétienne. Quel livre suis-je ?'
    ] },

  { id: 'revelation', theme: 'Livre', reponse: 'Révélation', accepte: ['apocalypse', 'la revelation'],
    reference: 'Révélation 1:1, 9 ; 21:1-4',
    indices: [
      'J’ai été écrit sur l’île de Patmos.',
      'On y trouve quatre cavaliers.',
      'J’annonce un nouveau ciel et une nouvelle terre.',
      'Je suis le dernier livre de la Bible. Quel livre suis-je ?'
    ] },

  /* ------------------------------------------------------------ nombres --- */

  { id: 'douze', theme: 'Nombre', reponse: 'Douze', accepte: ['12'],
    reference: 'Genèse 35:22 ; Matthieu 10:1, 2',
    indices: [
      'C’est le nombre de pierres précieuses sur le pectoral du grand prêtre.',
      'C’est le nombre des fils de Jacob.',
      'C’est le nombre des tribus d’Israël.',
      'C’est le nombre des apôtres choisis par Jésus. Quel est ce nombre ?'
    ] },

  { id: 'quarante', theme: 'Nombre', reponse: 'Quarante', accepte: ['40'],
    reference: 'Genèse 7:12 ; Exode 24:18 ; Nombres 14:33',
    indices: [
      'C’est le nombre de jours que Moïse a passés sur la montagne.',
      'C’est le nombre de jours pendant lesquels Goliath a défié Israël.',
      'C’est le nombre d’années qu’Israël a passées dans le désert.',
      'Pendant le déluge, il a plu ce nombre de jours et de nuits. Quel est ce nombre ?'
    ] },

  { id: 'sept', theme: 'Nombre', reponse: 'Sept', accepte: ['7'],
    reference: 'Genèse 2:2 ; 41:2 ; 2 Rois 5:14',
    indices: [
      'Naamân s’est plongé ce nombre de fois dans le Jourdain.',
      'Pharaon a rêvé de ce nombre de vaches grasses.',
      'C’est le nombre de jours d’une semaine.',
      'Dieu s’est reposé le jour qui porte ce numéro. Quel est ce nombre ?'
    ] },

  { id: 'trois', theme: 'Nombre', reponse: 'Trois', accepte: ['3'],
    reference: 'Daniel 3:23 ; Jonas 1:17 ; Matthieu 26:75',
    indices: [
      'C’est le nombre des amis de Job venus le voir.',
      'C’est le nombre des compagnons de Daniel jetés dans la fournaise.',
      'Pierre a renié Jésus ce nombre de fois.',
      'Jonas est resté ce nombre de jours dans le poisson. Quel est ce nombre ?'
    ] },
  /* ----------------------------------------------- personnages (suite) --- */

  { id: 'abel', theme: 'Personnage', reponse: 'Abel', accepte: [],
    reference: 'Genèse 4:2-8 ; Hébreux 11:4',
    indices: [
      'Bien que mort, je parle encore, dit la lettre aux Hébreux.',
      'J’étais berger.',
      'J’ai offert à Jéhovah les premiers-nés de mon troupeau.',
      'Mon frère Caïn m’a tué par jalousie. Qui suis-je ?'
    ] },

  { id: 'henok', theme: 'Personnage', reponse: 'Hénok', accepte: ['henoch', 'enoch', 'enoc'],
    reference: 'Genèse 5:21-24 ; Jude 1:14',
    indices: [
      'Je suis de la septième génération depuis Adam.',
      'J’ai prophétisé contre les impies.',
      'J’ai marché avec le vrai Dieu.',
      'Dieu m’a pris, et l’on ne m’a plus revu. Je suis le père de Mathusalem. Qui suis-je ?'
    ] },

  { id: 'loth', theme: 'Personnage', reponse: 'Loth', accepte: ['lot'],
    reference: 'Genèse 12:5 ; 13:10-12 ; 19:15-26',
    indices: [
      'J’étais le neveu d’Abraham.',
      'J’ai choisi de m’installer dans la plaine, près de Sodome.',
      'Des anges m’ont pressé de fuir la ville avant sa destruction.',
      'Ma femme a regardé en arrière et est devenue une colonne de sel. Qui suis-je ?'
    ] },

  { id: 'sara', theme: 'Personnage', reponse: 'Sara', accepte: ['sarai', 'sarah'],
    reference: 'Genèse 12:15 ; 18:12 ; 20:12 ; 21:2-5',
    indices: [
      'J’étais la demi-sœur de mon mari.',
      'Pharaon m’a fait conduire dans sa maison, me croyant libre.',
      'J’ai ri en entendant que j’aurais un fils dans ma vieillesse.',
      'À 90 ans, j’ai donné naissance à Isaac. Qui suis-je ?'
    ] },

  { id: 'esau', theme: 'Personnage', reponse: 'Ésaü', accepte: ['edom'],
    reference: 'Genèse 25:25-34 ; 27:30-38',
    indices: [
      'À ma naissance, j’étais roux et velu.',
      'Je suis devenu un habile chasseur.',
      'J’ai vendu mon droit d’aînesse pour un plat de lentilles.',
      'Mon frère jumeau Jacob a reçu à ma place la bénédiction de notre père. Qui suis-je ?'
    ] },

  { id: 'rachel', theme: 'Personnage', reponse: 'Rachel', accepte: [],
    reference: 'Genèse 29:9, 20 ; 31:19 ; 35:16-19',
    indices: [
      'J’étais bergère et je gardais les moutons de mon père Laban.',
      'Un homme a travaillé sept ans pour m’épouser, et ces années lui ont semblé quelques jours.',
      'J’ai volé les théraphim de mon père.',
      'Je suis morte en donnant naissance à Benjamin. Qui suis-je ?'
    ] },

  { id: 'aaron', theme: 'Personnage', reponse: 'Aaron', accepte: [],
    reference: 'Exode 4:14-16 ; 7:7 ; 28:1 ; 32:4',
    indices: [
      'J’avais trois ans de plus que mon frère.',
      'J’ai été le porte-parole de mon frère devant Pharaon.',
      'J’ai fabriqué le veau d’or.',
      'Frère de Moïse, je suis devenu le premier grand prêtre d’Israël. Qui suis-je ?'
    ] },

  { id: 'miriam', theme: 'Personnage', reponse: 'Miriam', accepte: ['myriam'],
    reference: 'Exode 2:4 ; 15:20, 21 ; Nombres 12:1-10',
    indices: [
      'Enfant, j’ai surveillé mon petit frère caché dans un panier sur le Nil.',
      'Après la traversée de la mer Rouge, j’ai chanté avec un tambourin.',
      'J’ai été frappée de lèpre pour avoir critiqué mon frère.',
      'Prophétesse, je suis la sœur de Moïse et d’Aaron. Qui suis-je ?'
    ] },

  { id: 'caleb', theme: 'Personnage', reponse: 'Caleb', accepte: [],
    reference: 'Nombres 13:6, 30 ; 14:6-9 ; Josué 14:10-14',
    indices: [
      'J’étais de la tribu de Juda.',
      'J’ai été l’un des douze espions envoyés en Canaan.',
      'Avec Josué, j’ai été le seul à rapporter un bon rapport.',
      'À 85 ans, j’étais aussi fort qu’à 40, et j’ai reçu Hébron en héritage. Qui suis-je ?'
    ] },

  { id: 'balaam', theme: 'Personnage', reponse: 'Balaam', accepte: [],
    reference: 'Nombres 22:5, 6, 21-35 ; 23:11, 12',
    indices: [
      'Le roi de Moab, Balak, m’a fait venir.',
      'On m’a promis une récompense pour maudire Israël.',
      'Jéhovah a mis des bénédictions dans ma bouche au lieu de malédictions.',
      'Mon ânesse a vu un ange avant moi, puis elle m’a parlé. Qui suis-je ?'
    ] },

  { id: 'jephte', theme: 'Personnage', reponse: 'Jephté', accepte: [],
    reference: 'Juges 11:1-3, 30-35',
    indices: [
      'Mes demi-frères m’ont chassé de la maison familiale.',
      'Les anciens de Galaad sont venus me chercher pour combattre les Ammonites.',
      'Avant la bataille, j’ai fait un vœu à Jéhovah.',
      'À mon retour, ma fille unique est venue à ma rencontre avec des tambourins. Qui suis-je ?'
    ] },

  { id: 'boaz', theme: 'Personnage', reponse: 'Boaz', accepte: ['booz'],
    reference: 'Ruth 2:1-16 ; 4:9-13',
    indices: [
      'J’étais un riche propriétaire de Bethléem.',
      'J’ai laissé une étrangère glaner dans mon champ, et même au milieu des gerbes.',
      'J’ai agi comme racheteur pour la famille d’Élimélek.',
      'J’ai épousé Ruth la Moabite. Qui suis-je ?'
    ] },

  { id: 'eli', theme: 'Personnage', reponse: 'Éli', accepte: [],
    reference: '1 Samuel 1:9-14 ; 2:12 ; 4:17, 18',
    indices: [
      'Mes fils Hophni et Phinéas se conduisaient très mal.',
      'J’étais grand prêtre à Silo.',
      'J’ai cru qu’Anne, qui priait, était ivre.',
      'Je suis tombé à la renverse en apprenant que l’Arche avait été prise. Qui suis-je ?'
    ] },

  { id: 'jonathan', theme: 'Personnage', reponse: 'Jonathan', accepte: [],
    reference: '1 Samuel 14:1-14 ; 18:1-4',
    indices: [
      'Avec mon seul porteur d’armes, j’ai attaqué un poste philistin.',
      'J’étais un fils du roi Saül.',
      'J’ai donné mon manteau et mon épée à un jeune berger.',
      'J’étais le meilleur ami de David. Qui suis-je ?'
    ] },

  { id: 'bath-sheba', theme: 'Personnage', reponse: 'Bath-Shéba', accepte: ['bath sheba', 'bethsabee', 'bethsheba'],
    reference: '2 Samuel 11:2-4 ; 12:24 ; 1 Rois 1:11-17',
    indices: [
      'J’étais la femme d’Urie le Hittite.',
      'Le roi m’a vue depuis la terrasse de son palais.',
      'Le prophète Nathan a reproché au roi ce qu’il avait fait.',
      'Je suis la mère du roi Salomon. Qui suis-je ?'
    ] },

  { id: 'nathan', theme: 'Personnage', reponse: 'Nathan', accepte: [],
    reference: '2 Samuel 7:2-4 ; 12:1-7 ; 1 Rois 1:11-14',
    indices: [
      'J’étais prophète à la cour du roi David.',
      'J’ai raconté au roi l’histoire d’un homme riche qui prend l’unique agnelle d’un pauvre.',
      'Puis je lui ai dit : « C’est toi l’homme ! »',
      'J’ai soutenu Salomon pour qu’il succède à David. Qui suis-je ?'
    ] },

  { id: 'jezabel', theme: 'Personnage', reponse: 'Jézabel', accepte: [],
    reference: '1 Rois 16:31 ; 19:2 ; 21:5-16 ; 2 Rois 9:30-33',
    indices: [
      'J’étais la fille du roi de Sidon.',
      'J’ai fait tuer Naboth pour prendre sa vigne.',
      'J’ai menacé de mort le prophète Élie.',
      'Jéhu m’a fait jeter par une fenêtre. Qui suis-je ?'
    ] },

  { id: 'naaman', theme: 'Personnage', reponse: 'Naamân', accepte: [],
    reference: '2 Rois 5:1-14',
    indices: [
      'J’étais le chef de l’armée du roi de Syrie.',
      'Une petite fille israélite captive a parlé d’un prophète capable de me guérir.',
      'J’étais lépreux.',
      'Je me suis plongé sept fois dans le Jourdain. Qui suis-je ?'
    ] },

  { id: 'ezechias', theme: 'Personnage', reponse: 'Ézéchias', accepte: [],
    reference: '2 Rois 18:4, 13 ; 19:35 ; 20:6',
    indices: [
      'J’ai mis en pièces le serpent de cuivre fait par Moïse.',
      'Sennachérib, roi d’Assyrie, a menacé Jérusalem pendant mon règne.',
      'Un ange a frappé 185 000 soldats assyriens en une nuit.',
      'Malade, j’ai prié, et Jéhovah a ajouté quinze ans à ma vie. Qui suis-je ?'
    ] },

  { id: 'josias', theme: 'Personnage', reponse: 'Josias', accepte: [],
    reference: '2 Rois 22:1, 8 ; 23:4-23',
    indices: [
      'Je suis devenu roi de Juda à huit ans.',
      'Pendant mon règne, on a retrouvé le livre de la Loi dans le temple.',
      'J’ai détruit les autels et les idoles des faux dieux.',
      'J’ai célébré une Pâque comme on n’en avait plus vu depuis l’époque des juges. Qui suis-je ?'
    ] },

  { id: 'jeremie', theme: 'Personnage', reponse: 'Jérémie', accepte: [],
    reference: 'Jérémie 1:6 ; 36:4 ; 38:6',
    indices: [
      'Quand Dieu m’a appelé, j’ai dit que j’étais trop jeune.',
      'Mon secrétaire s’appelait Baruch.',
      'On m’a jeté dans une citerne pleine de boue.',
      'J’ai annoncé pendant des années la destruction de Jérusalem par Babylone. Qui suis-je ?'
    ] },

  { id: 'ezechiel', theme: 'Personnage', reponse: 'Ézéchiel', accepte: [],
    reference: 'Ézéchiel 1:3, 15-21 ; 3:17 ; 37:1-10',
    indices: [
      'J’étais prêtre, exilé à Babylone près du fleuve Kebar.',
      'J’ai vu le char céleste de Jéhovah, avec ses roues.',
      'Jéhovah m’a établi comme sentinelle pour Israël.',
      'Dans une vision, j’ai vu une vallée d’ossements desséchés reprendre vie. Qui suis-je ?'
    ] },

  { id: 'esdras', theme: 'Personnage', reponse: 'Esdras', accepte: [],
    reference: 'Esdras 7:6, 10 ; Néhémie 8:1-8',
    indices: [
      'J’étais prêtre.',
      'J’étais un copiste habile dans la Loi de Moïse.',
      'Je suis revenu de Babylone à Jérusalem avec des dons pour le temple.',
      'Debout sur une estrade en bois, j’ai lu la Loi au peuple rassemblé. Qui suis-je ?'
    ] },

  { id: 'mardochee', theme: 'Personnage', reponse: 'Mardochée', accepte: [],
    reference: 'Esther 2:5-7, 21-23 ; 3:2',
    indices: [
      'J’étais un Benjaminite exilé à Suse.',
      'J’ai découvert un complot contre le roi.',
      'J’ai refusé de me prosterner devant Haman.',
      'J’ai élevé ma cousine Esther. Qui suis-je ?'
    ] },

  { id: 'haman', theme: 'Personnage', reponse: 'Haman', accepte: [],
    reference: 'Esther 3:1-6 ; 7:10',
    indices: [
      'J’étais un Agaguite.',
      'Le roi Assuérus m’a élevé au-dessus de tous les princes.',
      'Furieux contre Mardochée, j’ai voulu exterminer tous les Juifs.',
      'J’ai été pendu sur le poteau que j’avais préparé pour Mardochée. Qui suis-je ?'
    ] },

  { id: 'nicodeme', theme: 'Personnage', reponse: 'Nicodème', accepte: [],
    reference: 'Jean 3:1-5 ; 19:39',
    indices: [
      'J’étais pharisien et chef des Juifs.',
      'Je suis venu voir Jésus de nuit.',
      'Jésus m’a expliqué qu’il fallait naître de nouveau.',
      'Pour son enterrement, j’ai apporté de la myrrhe et de l’aloès. Qui suis-je ?'
    ] },

  { id: 'matthieu', theme: 'Personnage', reponse: 'Matthieu', accepte: ['levi'],
    reference: 'Matthieu 9:9 ; Marc 2:14',
    indices: [
      'On m’appelait aussi Lévi.',
      'J’étais collecteur d’impôts.',
      'Jésus m’a dit « Suis-moi » alors que j’étais assis au bureau des impôts.',
      'J’ai écrit le premier des quatre Évangiles. Qui suis-je ?'
    ] },

  { id: 'jean-apotre', theme: 'Personnage', reponse: 'Jean', accepte: ['jean l apotre', 'apotre jean'],
    reference: 'Marc 3:17 ; Jean 21:20, 24 ; Révélation 1:1, 9',
    indices: [
      'Mon frère s’appelait Jacques et notre père Zébédée.',
      'Jésus nous a surnommés « fils du tonnerre ».',
      'On m’appelle « le disciple que Jésus aimait ».',
      'J’ai écrit un Évangile, trois lettres et la Révélation. Qui suis-je ?'
    ] },

  { id: 'marie-magdala', theme: 'Personnage', reponse: 'Marie de Magdala', accepte: ['marie madeleine', 'madeleine', 'magdala'],
    reference: 'Luc 8:1-3 ; Jean 19:25 ; 20:11-18',
    indices: [
      'Jésus m’a délivrée de sept démons.',
      'Avec d’autres femmes, je servais Jésus et ses apôtres avec mes biens.',
      'Je me tenais près du poteau où Jésus est mort.',
      'Près du tombeau, j’ai été la première à voir Jésus ressuscité, sans d’abord le reconnaître. Qui suis-je ?'
    ] },

  { id: 'joseph-arimathie', theme: 'Personnage', reponse: 'Joseph d’Arimathie', accepte: ['joseph d arimathie', 'joseph d arimathee', 'arimathie'],
    reference: 'Matthieu 27:57-60 ; Marc 15:43 ; Jean 19:38',
    indices: [
      'J’étais un homme riche et un membre respecté du Conseil.',
      'J’étais disciple de Jésus, mais en secret.',
      'J’ai eu le courage de demander à Pilate le corps de Jésus.',
      'J’ai déposé Jésus dans ma tombe neuve, taillée dans le roc. Qui suis-je ?'
    ] },

  { id: 'pilate', theme: 'Personnage', reponse: 'Ponce Pilate', accepte: ['pilate'],
    reference: 'Jean 18:38 ; Matthieu 27:24-26',
    indices: [
      'J’étais gouverneur romain de Judée.',
      'J’ai demandé : « Qu’est-ce que la vérité ? »',
      'Je me suis lavé les mains devant la foule.',
      'J’ai livré Jésus pour qu’il soit exécuté. Qui suis-je ?'
    ] },

  { id: 'barabbas', theme: 'Personnage', reponse: 'Barabbas', accepte: ['barabas'],
    reference: 'Luc 23:18, 19, 25 ; Matthieu 27:15-21',
    indices: [
      'J’étais en prison pour sédition et pour meurtre.',
      'Chaque année à la fête, le gouverneur relâchait un prisonnier.',
      'La foule a réclamé ma libération.',
      'J’ai été relâché à la place de Jésus. Qui suis-je ?'
    ] },

  { id: 'corneille', theme: 'Personnage', reponse: 'Corneille', accepte: [],
    reference: 'Actes 10:1-8, 44-48',
    indices: [
      'J’étais officier de l’armée romaine, à Césarée.',
      'Je faisais beaucoup de dons et je priais Dieu sans cesse.',
      'Un ange m’a dit de faire venir Pierre.',
      'J’ai été le premier non-Juif incirconcis à devenir disciple de Jésus. Qui suis-je ?'
    ] },

  { id: 'tabitha', theme: 'Personnage', reponse: 'Tabitha', accepte: ['dorcas'],
    reference: 'Actes 9:36-41',
    indices: [
      'J’habitais Joppé.',
      'Je faisais beaucoup de bonnes actions et je cousais des vêtements pour les veuves.',
      'Mon nom, traduit en grec, est Dorcas.',
      'Pierre m’a ramenée à la vie. Qui suis-je ?'
    ] },

  { id: 'lydie', theme: 'Personnage', reponse: 'Lydie', accepte: [],
    reference: 'Actes 16:14, 15, 40',
    indices: [
      'Je venais de la ville de Thyatire.',
      'Je vendais de la pourpre.',
      'À Philippes, j’ai écouté Paul au bord d’une rivière.',
      'Après mon baptême, j’ai insisté pour que Paul et ses compagnons logent chez moi. Qui suis-je ?'
    ] },

  { id: 'silas', theme: 'Personnage', reponse: 'Silas', accepte: ['silvain'],
    reference: 'Actes 15:32, 40 ; 16:25, 26',
    indices: [
      'J’étais prophète dans la congrégation de Jérusalem.',
      'Paul m’a choisi comme compagnon de voyage après sa séparation d’avec Barnabé.',
      'À Philippes, j’ai chanté des louanges à Dieu en prison, avec Paul.',
      'Un tremblement de terre a ouvert les portes de notre prison. Qui suis-je ?'
    ] },

  { id: 'apollos', theme: 'Personnage', reponse: 'Apollos', accepte: [],
    reference: 'Actes 18:24-28 ; 1 Corinthiens 1:12',
    indices: [
      'J’étais un Juif d’Alexandrie.',
      'J’étais éloquent et je connaissais bien les Écritures.',
      'Priscille et Aquila m’ont expliqué plus exactement le chemin de Dieu.',
      'À Corinthe, certains disaient « Moi, je suis de Paul », d’autres se réclamaient de moi. Qui suis-je ?'
    ] },

  { id: 'priscille', theme: 'Personnage', reponse: 'Priscille', accepte: ['prisca'],
    reference: 'Actes 18:2, 3, 26 ; Romains 16:3, 4',
    indices: [
      'Nous avons dû quitter Rome sur ordre de l’empereur Claude.',
      'Mon mari et moi fabriquions des tentes, comme Paul.',
      'Nous avons instruit Apollos plus exactement.',
      'Mon mari s’appelait Aquila. Qui suis-je ?'
    ] },

  { id: 'eutyche', theme: 'Personnage', reponse: 'Eutyche', accepte: [],
    reference: 'Actes 20:7-12',
    indices: [
      'J’étais un jeune homme de Troas.',
      'Paul a parlé jusqu’à minuit, et j’étais assis à une fenêtre.',
      'Je me suis endormi et je suis tombé du troisième étage.',
      'Paul m’a ramené à la vie. Qui suis-je ?'
    ] },

  { id: 'onesime', theme: 'Personnage', reponse: 'Onésime', accepte: [],
    reference: 'Philémon 1:10-16 ; Colossiens 4:9',
    indices: [
      'J’étais un esclave qui s’était enfui.',
      'J’ai rencontré Paul pendant son emprisonnement, et je suis devenu chrétien.',
      'Paul m’a renvoyé chez mon maître, avec une lettre.',
      'Mon maître s’appelait Philémon. Qui suis-je ?'
    ] },

  /* ----------------------------------------------------- lieux (suite) --- */

  { id: 'ur', theme: 'Lieu', reponse: 'Ur', accepte: ['ur des chaldeens'],
    reference: 'Genèse 11:28-31 ; Actes 7:2-4',
    indices: [
      'Haran, le frère d’Abram, est mort chez moi.',
      'Térah et sa famille m’ont quittée pour Harân.',
      'Je suis une ville des Chaldéens.',
      'Abraham a vécu chez moi avant son grand départ. Quelle ville suis-je ?'
    ] },

  { id: 'sodome', theme: 'Lieu', reponse: 'Sodome', accepte: [],
    reference: 'Genèse 13:12 ; 18:32 ; 19:24',
    indices: [
      'J’étais une ville de la région du Jourdain.',
      'Loth s’est installé près de moi, puis chez moi.',
      'Abraham a demandé si je serais épargnée pour dix justes.',
      'Jéhovah m’a détruite par une pluie de feu et de soufre, avec Gomorrhe. Quelle ville suis-je ?'
    ] },

  { id: 'egypte', theme: 'Lieu', reponse: 'L’Égypte', accepte: ['egypte'],
    reference: 'Genèse 12:10 ; 41:41 ; Exode 1:13, 14 ; 12:29-31',
    indices: [
      'Abraham y est descendu à cause d’une famine.',
      'Joseph y est devenu le second du pays.',
      'Les Israélites y ont été esclaves.',
      'Dix plaies ont frappé ce pays avant la sortie d’Israël. Quel pays suis-je ?'
    ] },

  { id: 'babylone', theme: 'Lieu', reponse: 'Babylone', accepte: [],
    reference: 'Jérémie 29:10 ; Daniel 1:1, 2 ; 5:30, 31',
    indices: [
      'Le fleuve Euphrate me traversait.',
      'Nabuchodonosor était mon roi le plus célèbre.',
      'Les Juifs y ont été emmenés en exil.',
      'Les Mèdes et les Perses m’ont prise en une nuit, pendant le festin de Belshatsar. Quelle ville suis-je ?'
    ] },

  { id: 'jerusalem', theme: 'Lieu', reponse: 'Jérusalem', accepte: ['sion'],
    reference: 'Juges 19:10 ; 2 Samuel 5:6-9 ; 1 Rois 6:1 ; Luc 19:41',
    indices: [
      'On m’appelait autrefois Jébus.',
      'David m’a conquise et en a fait sa capitale.',
      'Salomon y a construit le temple de Jéhovah.',
      'Jésus a pleuré sur moi. Quelle ville suis-je ?'
    ] },

  { id: 'damas', theme: 'Lieu', reponse: 'Damas', accepte: [],
    reference: '2 Rois 5:12 ; Actes 9:1-8',
    indices: [
      'Naamân préférait mes fleuves, l’Abana et le Pharpar, à ceux d’Israël.',
      'Je suis une ville de Syrie.',
      'Saul s’y rendait pour arrêter des disciples de Jésus.',
      'Sur la route qui mène à moi, Jésus lui est apparu dans une grande lumière. Quelle ville suis-je ?'
    ] },

  { id: 'gethsemane', theme: 'Lieu', reponse: 'Gethsémané', accepte: [],
    reference: 'Matthieu 26:36-46 ; Jean 18:1-3',
    indices: [
      'Je suis un jardin, de l’autre côté du torrent du Cédron.',
      'Jésus y allait souvent avec ses disciples.',
      'Il y a prié avec une grande angoisse, pendant que ses apôtres dormaient.',
      'Judas y est venu avec une foule armée pour l’arrêter. Quel est mon nom ?'
    ] },

  { id: 'corinthe', theme: 'Lieu', reponse: 'Corinthe', accepte: [],
    reference: 'Actes 18:1-11 ; 1 Corinthiens 1:2',
    indices: [
      'Je suis une ville grecque, célèbre pour son commerce.',
      'Paul y a vécu un an et demi.',
      'Il y a fabriqué des tentes avec Aquila et Priscille.',
      'Paul a écrit deux lettres aux chrétiens de chez moi. Quelle ville suis-je ?'
    ] },

  /* ---------------------------------------------------- objets (suite) --- */

  { id: 'veau-or', theme: 'Objet', reponse: 'Le veau d’or', accepte: ['veau d or', 'veau'],
    reference: 'Exode 32:1-6, 19, 20',
    indices: [
      'J’ai été fait avec les boucles d’oreilles du peuple.',
      'Aaron m’a façonné avec un outil de graveur.',
      'Le peuple a dansé autour de moi pendant que Moïse était sur la montagne.',
      'Moïse m’a brûlé, réduit en poudre et répandu sur l’eau. Qui suis-je ?'
    ] },

  { id: 'tables-loi', theme: 'Objet', reponse: 'Les tables de la Loi', accepte: ['tables de la loi', 'tables', 'tablettes'],
    reference: 'Exode 31:18 ; 32:19 ; 34:1, 28',
    indices: [
      'Nous étions deux, en pierre.',
      'Nous avons été écrites par le doigt de Dieu.',
      'Moïse nous a brisées en voyant le veau d’or.',
      'Nous portions les Dix Paroles. Que sommes-nous ?'
    ] },

  { id: 'tabernacle', theme: 'Objet', reponse: 'Le tabernacle', accepte: ['tabernacle', 'tente de la rencontre'],
    reference: 'Exode 26:33 ; 36:1 ; 40:34',
    indices: [
      'Bézalel et Oholiab ont dirigé ma construction.',
      'Un rideau me séparait en deux parties : le Saint et le Très-Saint.',
      'On me démontait et me transportait à chaque étape du voyage.',
      'Tente sacrée, j’ai servi de lieu de culte à Israël dans le désert. Qui suis-je ?'
    ] },

  { id: 'baton-aaron', theme: 'Objet', reponse: 'Le bâton d’Aaron', accepte: ['baton d aaron', 'baton'],
    reference: 'Exode 7:10 ; Nombres 17:8-10',
    indices: [
      'Devant Pharaon, je me suis changé en grand serpent.',
      'On m’a déposé avec les bâtons des chefs des douze tribus.',
      'En une nuit, j’ai bourgeonné, fleuri et produit des amandes.',
      'On m’a gardé devant l’Arche, comme signe. Qui suis-je ?'
    ] },

  /* ---------------------------------------------------- livres (suite) --- */

  { id: 'exode', theme: 'Livre', reponse: 'Exode', accepte: ['l exode'],
    reference: 'Exode 12:40, 41 ; 14:21, 22 ; 20:1-17',
    indices: [
      'Je décris la construction du tabernacle.',
      'Je raconte les Dix Plaies.',
      'On y trouve la traversée de la mer Rouge et les Dix Paroles.',
      'Mon nom signifie « sortie ». Quel livre suis-je ?'
    ] },

  { id: 'ecclesiaste', theme: 'Livre', reponse: 'Ecclésiaste', accepte: ['l ecclesiaste'],
    reference: 'Ecclésiaste 1:1, 2 ; 9:5 ; 12:13',
    indices: [
      'Je dis que les morts ne savent rien du tout.',
      'Je répète que, sous le soleil, tout est futilité.',
      'Mon auteur se présente comme « le rassembleur », fils de David.',
      'Je conclus : « Crains le vrai Dieu et observe ses commandements. » Quel livre suis-je ?'
    ] },

  { id: 'lamentations', theme: 'Livre', reponse: 'Lamentations', accepte: ['les lamentations'],
    reference: 'Lamentations 1:1 ; 3:22, 23',
    indices: [
      'Plusieurs de mes chapitres sont des acrostiches alphabétiques.',
      'Je dis que les miséricordes de Jéhovah sont nouvelles chaque matin.',
      'Je suis un chant de deuil sur la destruction de Jérusalem.',
      'J’ai été écrit par Jérémie. Quel livre suis-je ?'
    ] },

  { id: 'hebreux', theme: 'Livre', reponse: 'Hébreux', accepte: ['lettre aux hebreux', 'les hebreux'],
    reference: 'Hébreux 4:14 ; 11:1',
    indices: [
      'Je présente Jésus comme un grand prêtre supérieur à ceux d’Israël.',
      'J’explique que la Loi n’était qu’une ombre des choses à venir.',
      'Mon chapitre 11 définit la foi et cite une longue liste de témoins fidèles.',
      'Je suis une lettre écrite aux chrétiens d’origine juive. Quel livre suis-je ?'
    ] },

  { id: 'jacques-livre', theme: 'Livre', reponse: 'Jacques', accepte: ['lettre de jacques'],
    reference: 'Jacques 2:26 ; 3:5 ; 4:8',
    indices: [
      'Je compare la langue à un petit feu qui embrase une grande forêt.',
      'Je dis : « Approchez-vous de Dieu, et il s’approchera de vous. »',
      'J’affirme que la foi sans les œuvres est morte.',
      'J’ai été écrit par un demi-frère de Jésus. Quel livre suis-je ?'
    ] },

  /* --------------------------------------------------- nombres (suite) --- */

  { id: 'dix', theme: 'Nombre', reponse: 'Dix', accepte: ['10'],
    reference: 'Genèse 18:32 ; Luc 17:12-17 ; Exode 34:28',
    indices: [
      'C’est le nombre de lépreux que Jésus a guéris en une fois.',
      'Abraham a demandé si Sodome serait épargnée pour ce nombre de justes.',
      'C’est le nombre des plaies d’Égypte.',
      'C’est le nombre des Paroles écrites sur les tables de la Loi. Quel est ce nombre ?'
    ] },

  { id: 'cinq', theme: 'Nombre', reponse: 'Cinq', accepte: ['5'],
    reference: '1 Samuel 17:40 ; Matthieu 14:17 ; 25:2',
    indices: [
      'C’est le nombre de vierges sages dans la parabole.',
      'David a pris ce nombre de pierres lisses dans le torrent.',
      'C’est le nombre des livres écrits par Moïse.',
      'Jésus a nourri des milliers de personnes avec ce nombre de pains. Quel est ce nombre ?'
    ] },

  { id: 'soixante-dix', theme: 'Nombre', reponse: 'Soixante-dix', accepte: ['70', 'soixante dix'],
    reference: 'Jérémie 29:10 ; Daniel 9:24 ; Luc 10:1',
    indices: [
      'Jésus a envoyé ce nombre de disciples prêcher, deux par deux.',
      'C’est le nombre de « semaines » de la prophétie de Daniel.',
      'Jérémie a annoncé ce nombre d’années pour Babylone.',
      'C’est la durée, en années, de la désolation de Jérusalem. Quel est ce nombre ?'
    ] },

  { id: 'cent-quarante-quatre-mille', theme: 'Nombre', reponse: '144 000', accepte: ['144000', 'cent quarante quatre mille'],
    reference: 'Révélation 7:4 ; 14:1, 3',
    indices: [
      'Ils sont scellés, pris de toutes les tribus des fils d’Israël.',
      'Ils se tiennent avec l’Agneau sur le mont Sion.',
      'Ils ont été achetés d’entre les humains.',
      'Combien sont-ils, selon la Révélation ?'
    ] },
  /* --------------------------------------- personnages (troisième série) --- */

  { id: 'melchisedek', theme: 'Personnage', reponse: 'Melchisédek', accepte: ['melchisedech', 'melchisedec'],
    reference: 'Genèse 14:18-20 ; Psaume 110:4 ; Hébreux 7:1-3',
    indices: [
      'J’étais roi de Salem.',
      'J’étais aussi prêtre du Dieu Très-Haut.',
      'J’ai offert du pain et du vin à Abram, qui m’a donné le dixième de tout.',
      'Jésus est prêtre pour toujours « à la manière de » moi. Qui suis-je ?'
    ] },

  { id: 'agar', theme: 'Personnage', reponse: 'Agar', accepte: [],
    reference: 'Genèse 16:1-3, 7-15',
    indices: [
      'J’étais une servante égyptienne.',
      'Ma maîtresse Saraï m’a donnée à son mari.',
      'Un ange m’a trouvée près d’une source, dans le désert.',
      'J’ai donné à Abram un fils, Ismaël. Qui suis-je ?'
    ] },

  { id: 'ismael', theme: 'Personnage', reponse: 'Ismaël', accepte: [],
    reference: 'Genèse 16:11, 15 ; 21:14-20',
    indices: [
      'Mon nom signifie « Dieu entend ».',
      'Ma mère était une servante égyptienne.',
      'Avec elle, j’ai été renvoyé dans le désert de Beer-Shéba.',
      'Je suis le premier fils d’Abraham. Qui suis-je ?'
    ] },

  { id: 'lea', theme: 'Personnage', reponse: 'Léa', accepte: [],
    reference: 'Genèse 29:16-35 ; 30:20',
    indices: [
      'Mes yeux n’avaient pas d’éclat, dit la Bible.',
      'Mon père m’a fait épouser un homme à la place de ma sœur.',
      'J’ai eu six fils, dont Lévi et Juda.',
      'Je suis la sœur aînée de Rachel et la première femme de Jacob. Qui suis-je ?'
    ] },

  { id: 'benjamin', theme: 'Personnage', reponse: 'Benjamin', accepte: [],
    reference: 'Genèse 35:18 ; 44:12 ; 1 Samuel 9:21 ; Philippiens 3:5',
    indices: [
      'Ma mère, mourante, m’a appelé Ben-Oni.',
      'Le roi Saül et l’apôtre Paul descendaient de moi.',
      'On a trouvé la coupe d’argent de Joseph dans mon sac.',
      'Je suis le plus jeune des fils de Jacob. Qui suis-je ?'
    ] },

  { id: 'abigail', theme: 'Personnage', reponse: 'Abigaïl', accepte: [],
    reference: '1 Samuel 25:2-42',
    indices: [
      'Mon mari, Nabal, était riche mais dur et grossier.',
      'Je suis allée au-devant de David avec des provisions.',
      'Par ma sagesse, j’ai empêché David de verser le sang.',
      'Après la mort de Nabal, je suis devenue la femme de David. Qui suis-je ?'
    ] },

  { id: 'mephibosheth', theme: 'Personnage', reponse: 'Mephibosheth', accepte: ['mefibosheth', 'mephiboshet'],
    reference: '2 Samuel 4:4 ; 9:6-13',
    indices: [
      'J’avais cinq ans quand ma nourrice s’est enfuie avec moi.',
      'Je suis tombé de ses bras et je suis resté boiteux des deux pieds.',
      'Mon grand-père était le roi Saül.',
      'Pour l’amour de mon père Jonathan, David m’a fait manger à sa table. Qui suis-je ?'
    ] },

  { id: 'urie', theme: 'Personnage', reponse: 'Urie', accepte: [],
    reference: '2 Samuel 11:3-17',
    indices: [
      'J’étais un soldat hittite de l’armée de David.',
      'J’ai refusé de rentrer chez moi pendant que l’Arche et l’armée étaient sous des tentes.',
      'J’ai porté moi-même la lettre qui ordonnait ma mort.',
      'Ma femme s’appelait Bath-Shéba. Qui suis-je ?'
    ] },

  { id: 'achab', theme: 'Personnage', reponse: 'Achab', accepte: ['ahab'],
    reference: '1 Rois 16:29-31 ; 17:1 ; 21:1-4',
    indices: [
      'Mon père Omri était roi avant moi.',
      'J’ai épousé Jézabel, la fille du roi de Sidon.',
      'J’ai boudé parce que Naboth refusait de me céder sa vigne.',
      'Roi d’Israël, j’ai eu le prophète Élie pour adversaire. Qui suis-je ?'
    ] },

  { id: 'naboth', theme: 'Personnage', reponse: 'Naboth', accepte: [],
    reference: '1 Rois 21:1-14',
    indices: [
      'J’habitais Jizréel.',
      'Ma vigne était à côté du palais du roi.',
      'J’ai refusé de céder au roi l’héritage de mes ancêtres.',
      'Jézabel m’a fait lapider sur de faux témoignages. Qui suis-je ?'
    ] },

  { id: 'jehu', theme: 'Personnage', reponse: 'Jéhu', accepte: [],
    reference: '2 Rois 9:6, 20, 33 ; 10:28',
    indices: [
      'Un jeune prophète m’a oint roi d’Israël.',
      'On me reconnaissait de loin : je conduisais mon char comme un fou.',
      'J’ai fait jeter Jézabel par une fenêtre.',
      'J’ai fait disparaître le culte de Baal en Israël. Qui suis-je ?'
    ] },

  { id: 'isaie', theme: 'Personnage', reponse: 'Isaïe', accepte: ['esaie'],
    reference: 'Isaïe 6:1-8 ; 44:28',
    indices: [
      'J’ai annoncé le nom de Cyrus longtemps avant sa naissance.',
      'J’ai vu Jéhovah sur un trône élevé, entouré de séraphins.',
      'Un séraphin a touché mes lèvres avec une braise.',
      'J’ai répondu : « Me voici ! Envoie-moi. » Qui suis-je ?'
    ] },

  { id: 'osee', theme: 'Personnage', reponse: 'Osée', accepte: [],
    reference: 'Osée 1:2, 3 ; 3:1, 2',
    indices: [
      'Mon livre suit celui de Daniel.',
      'Jéhovah m’a demandé d’épouser une femme qui me serait infidèle.',
      'Ma femme s’appelait Gomer.',
      'Je l’ai rachetée pour quinze pièces d’argent et de l’orge. Qui suis-je ?'
    ] },

  { id: 'nimrod', theme: 'Personnage', reponse: 'Nimrod', accepte: [],
    reference: 'Genèse 10:8-11',
    indices: [
      'Je suis un descendant de Cham.',
      'J’ai été le premier homme puissant sur la terre.',
      'J’ai fondé Babel, puis je suis allé bâtir Ninive.',
      'On m’appelait « un puissant chasseur, en opposition à Jéhovah ». Qui suis-je ?'
    ] },

  { id: 'herode', theme: 'Personnage', reponse: 'Hérode', accepte: ['herode le grand'],
    reference: 'Matthieu 2:1-16',
    indices: [
      'J’étais roi de Judée quand Jésus est né.',
      'Des astrologues sont venus me demander où était né le roi des Juifs.',
      'Joseph s’est enfui en Égypte avec l’enfant pour m’échapper.',
      'J’ai fait tuer les petits garçons de Bethléem. Qui suis-je ?'
    ] },

  { id: 'andre', theme: 'Personnage', reponse: 'André', accepte: [],
    reference: 'Jean 1:35-42 ; 6:8, 9',
    indices: [
      'J’ai d’abord été disciple de Jean le Baptiseur.',
      'J’ai signalé à Jésus un garçon qui avait cinq pains et deux poissons.',
      'J’étais pêcheur, comme mon frère.',
      'J’ai amené à Jésus mon frère Simon Pierre. Qui suis-je ?'
    ] },

  { id: 'marc', theme: 'Personnage', reponse: 'Marc', accepte: ['jean marc'],
    reference: 'Actes 12:12 ; 15:37-39 ; Colossiens 4:10',
    indices: [
      'Des chrétiens se réunissaient dans la maison de ma mère, Marie.',
      'J’étais le cousin de Barnabé.',
      'Paul a refusé de m’emmener parce que je les avais quittés en Pamphylie.',
      'J’ai écrit le plus court des Évangiles. Qui suis-je ?'
    ] },

  { id: 'gamaliel', theme: 'Personnage', reponse: 'Gamaliel', accepte: [],
    reference: 'Actes 5:34-39 ; 22:3',
    indices: [
      'J’étais pharisien et enseignant de la Loi, respecté de tout le peuple.',
      'Au Sanhédrin, j’ai conseillé de laisser les apôtres tranquilles.',
      'J’ai dit : « Si cette œuvre vient de Dieu, vous ne pourrez pas la détruire. »',
      'Paul a étudié à mes pieds. Qui suis-je ?'
    ] },

  { id: 'felix', theme: 'Personnage', reponse: 'Félix', accepte: [],
    reference: 'Actes 23:24 ; 24:24-27',
    indices: [
      'J’étais gouverneur romain à Césarée.',
      'Ma femme Drusille était juive.',
      'J’ai eu peur quand Paul m’a parlé de justice, de maîtrise de soi et du jugement.',
      'J’ai gardé Paul en prison deux ans, en espérant qu’il me donnerait de l’argent. Qui suis-je ?'
    ] },

  { id: 'rhode', theme: 'Personnage', reponse: 'Rhode', accepte: [],
    reference: 'Actes 12:12-16',
    indices: [
      'J’étais servante dans la maison de Marie, la mère de Marc.',
      'Une nuit, quelqu’un a frappé à la porte d’entrée.',
      'J’ai reconnu la voix de Pierre, qui venait d’être libéré de prison.',
      'Dans ma joie, j’ai couru l’annoncer… sans lui ouvrir la porte. Qui suis-je ?'
    ] },

  { id: 'ananias', theme: 'Personnage', reponse: 'Ananias', accepte: [],
    reference: 'Actes 9:10-18',
    indices: [
      'J’étais un disciple de Damas.',
      'Dans une vision, le Seigneur m’a envoyé dans la rue appelée Droite.',
      'J’avais peur, car l’homme qu’on m’envoyait voir persécutait les disciples.',
      'J’ai posé les mains sur Saul, et il a retrouvé la vue. Qui suis-je ?'
    ] },

  { id: 'saphira', theme: 'Personnage', reponse: 'Saphira', accepte: [],
    reference: 'Actes 5:1-10',
    indices: [
      'Mon mari et moi avons vendu une propriété.',
      'Nous avons gardé en secret une partie de l’argent.',
      'Pierre m’a demandé si nous avions vendu le champ pour ce prix-là.',
      'Je suis tombée morte, comme mon mari Ananias. Qui suis-je ?'
    ] },

  { id: 'tite', theme: 'Personnage', reponse: 'Tite', accepte: [],
    reference: 'Galates 2:3 ; 2 Corinthiens 7:6 ; Tite 1:4, 5',
    indices: [
      'J’étais grec, et on ne m’a pas obligé à me faire circoncire.',
      'Paul m’a envoyé à Corinthe, et mon retour l’a réconforté.',
      'Paul m’a laissé en Crète pour y établir des anciens.',
      'Une lettre de la Bible porte mon nom. Qui suis-je ?'
    ] },

  { id: 'jesus', theme: 'Personnage', reponse: 'Jésus', accepte: ['jesus christ', 'christ'],
    reference: 'Jean 1:1, 14 ; Colossiens 1:15 ; Matthieu 20:28',
    indices: [
      'Je suis appelé « le premier-né de toute création ».',
      'Je suis aussi appelé « la Parole ».',
      'J’ai été baptisé dans le Jourdain.',
      'J’ai donné ma vie en rançon pour beaucoup. Qui suis-je ?'
    ] },

  /* ------------------------ mêmes réponses, autres indices (variantes) --- */

  { id: 'moise-b', theme: 'Personnage', reponse: 'Moïse', accepte: [],
    reference: 'Exode 2:12 ; 4:10 ; 34:29 ; Deutéronome 34:1-4',
    indices: [
      'J’ai tué un Égyptien qui frappait un Hébreu.',
      'Je disais que je n’avais pas la parole facile.',
      'Mon visage rayonnait après avoir parlé avec Dieu.',
      'Du haut du mont Nébo, j’ai vu la Terre promise sans pouvoir y entrer. Qui suis-je ?'
    ] },

  { id: 'david-b', theme: 'Personnage', reponse: 'David', accepte: [],
    reference: '1 Samuel 24:4 ; 2 Samuel 6:14 ; 12:1-7 ; Psaume 23:1',
    indices: [
      'Dans une grotte, j’ai coupé le bord du manteau de Saül au lieu de le tuer.',
      'J’ai dansé de toutes mes forces devant l’Arche.',
      'Le prophète Nathan m’a reproché mon péché avec Bath-Shéba.',
      'J’ai écrit : « Jéhovah est mon Berger. » Qui suis-je ?'
    ] },

  { id: 'elie-b', theme: 'Personnage', reponse: 'Élie', accepte: [],
    reference: '1 Rois 17:1, 9-16 ; 19:4 ; 2 Rois 2:13',
    indices: [
      'On m’appelait le Tishbite.',
      'Chez une veuve de Sarepta, la farine et l’huile n’ont jamais manqué.',
      'Découragé, je me suis assis sous un genêt et j’ai demandé à mourir.',
      'Mon manteau est tombé et Élisée l’a ramassé. Qui suis-je ?'
    ] },

  { id: 'pierre-b', theme: 'Personnage', reponse: 'Pierre', accepte: ['simon pierre', 'cephas'],
    reference: 'Actes 2:14, 41 ; 10:5 ; 12:6, 7 ; Jean 18:10',
    indices: [
      'Un ange m’a libéré alors que j’étais enchaîné entre deux soldats.',
      'On m’a envoyé chez l’officier romain Corneille.',
      'À la Pentecôte, j’ai prononcé un discours, et 3 000 personnes ont été baptisées.',
      'Dans le jardin, j’ai coupé l’oreille d’un esclave du grand prêtre. Qui suis-je ?'
    ] },

  { id: 'paul-b', theme: 'Personnage', reponse: 'Paul', accepte: [],
    reference: 'Actes 17:22 ; 18:3 ; 28:3-5 ; Philippiens 3:5',
    indices: [
      'J’étais de la tribu de Benjamin.',
      'Je fabriquais des tentes.',
      'À Athènes, j’ai parlé devant l’Aréopage.',
      'À Malte, une vipère m’a mordu sans me faire de mal. Qui suis-je ?'
    ] },

  { id: 'salomon-b', theme: 'Personnage', reponse: 'Salomon', accepte: [],
    reference: '1 Rois 3:16-28 ; 4:32 ; 11:3',
    indices: [
      'J’ai prononcé 3 000 proverbes.',
      'Mes nombreuses femmes ont détourné mon cœur vers d’autres dieux.',
      'Deux femmes se disputaient un bébé : j’ai demandé qu’on m’apporte une épée.',
      'Fils de David, j’étais célèbre pour ma sagesse. Qui suis-je ?'
    ] },

  { id: 'daniel-b', theme: 'Personnage', reponse: 'Daniel', accepte: ['beltshatsar'],
    reference: 'Daniel 1:7 ; 2:31-45 ; 9:21-27',
    indices: [
      'On m’a donné le nom babylonien de Beltshatsar.',
      'J’ai expliqué au roi son rêve d’une immense statue.',
      'L’ange Gabriel m’a expliqué la prophétie des 70 semaines.',
      'J’ai passé une nuit avec les lions sans être blessé. Qui suis-je ?'
    ] },

  { id: 'jonas-b', theme: 'Personnage', reponse: 'Jonas', accepte: [],
    reference: 'Jonas 1:1 ; 4:1-8',
    indices: [
      'J’étais le fils d’Amittaï.',
      'J’étais fâché que Jéhovah épargne une grande ville.',
      'Une plante m’a abrité du soleil, puis un ver l’a fait mourir.',
      'Avant cela, j’avais passé trois jours dans le ventre d’un poisson. Qui suis-je ?'
    ] },

  { id: 'abraham-b', theme: 'Personnage', reponse: 'Abraham', accepte: ['abram'],
    reference: 'Genèse 14:20 ; 18:1, 2 ; 23:19 ; Romains 4:11',
    indices: [
      'J’ai acheté la grotte de Makpéla pour y enterrer ma femme.',
      'J’ai reçu trois visiteurs près des grands arbres de Mamré.',
      'J’ai donné le dixième du butin à Melchisédek.',
      'On m’appelle le père de tous ceux qui ont la foi. Qui suis-je ?'
    ] },

  { id: 'joseph-b', theme: 'Personnage', reponse: 'Joseph', accepte: [],
    reference: 'Genèse 39:7-20 ; 41:47-49 ; 44:2 ; 45:4-8',
    indices: [
      'La femme de Potiphar m’a accusé à tort.',
      'J’ai stocké le grain pendant sept années d’abondance.',
      'J’ai fait cacher ma coupe d’argent dans le sac de mon plus jeune frère.',
      'J’ai pardonné à mes frères qui m’avaient vendu. Qui suis-je ?'
    ] },

  { id: 'noe-b', theme: 'Personnage', reponse: 'Noé', accepte: [],
    reference: 'Genèse 7:6 ; 8:6-12 ; 9:20 ; 2 Pierre 2:5',
    indices: [
      'L’apôtre Pierre m’appelle « prédicateur de justice ».',
      'Après une grande épreuve, j’ai planté une vigne.',
      'J’ai fait sortir un corbeau, puis une colombe.',
      'J’avais 600 ans quand le déluge a commencé. Qui suis-je ?'
    ] },

  { id: 'samson-b', theme: 'Personnage', reponse: 'Samson', accepte: [],
    reference: 'Juges 13:2, 3 ; 14:14 ; 15:4, 5 ; 16:29, 30',
    indices: [
      'Un ange a annoncé ma naissance à mes parents, Manoah et sa femme.',
      'J’ai posé une énigme sur un lion et du miel.',
      'J’ai attaché des torches à la queue de 300 renards.',
      'J’ai fait s’écrouler le temple de Dagon. Qui suis-je ?'
    ] },

  { id: 'esther-b', theme: 'Personnage', reponse: 'Esther', accepte: ['hadassa'],
    reference: 'Esther 2:7, 17 ; 5:4-8 ; 9:26-32',
    indices: [
      'Mon nom hébreu était Hadassa.',
      'J’ai été choisie pour remplacer la reine Vasthi.',
      'J’ai invité le roi et Haman à deux banquets.',
      'La fête de Pourim rappelle comment j’ai sauvé mon peuple. Qui suis-je ?'
    ] },

  { id: 'jericho-b', theme: 'Lieu', reponse: 'Jéricho', accepte: [],
    reference: '2 Rois 2:19-22 ; Marc 10:46 ; Luc 19:1-5 ; Josué 6:20',
    indices: [
      'Élisée a assaini la source d’eau de ma ville.',
      'Jésus a guéri l’aveugle Bartimée près de chez moi.',
      'Zachée habitait chez moi.',
      'Mes murailles sont tombées devant Josué. Quelle ville suis-je ?'
    ] },

  { id: 'douze-b', theme: 'Nombre', reponse: 'Douze', accepte: ['12'],
    reference: 'Luc 2:42 ; Matthieu 14:20 ; Révélation 21:12',
    indices: [
      'C’est le nombre de portes de la Nouvelle Jérusalem.',
      'Jésus avait cet âge quand ses parents l’ont retrouvé au temple.',
      'C’est le nombre de paniers de restes après la multiplication des pains.',
      'C’est aussi le nombre des apôtres. Quel est ce nombre ?'
    ] },

  { id: 'quarante-b', theme: 'Nombre', reponse: 'Quarante', accepte: ['40'],
    reference: '1 Rois 19:8 ; Jonas 3:4 ; Matthieu 4:2',
    indices: [
      'Élie a marché ce nombre de jours jusqu’au mont Horeb.',
      'Jonas a annoncé que Ninive serait détruite dans ce nombre de jours.',
      'Jésus a jeûné ce nombre de jours dans le désert.',
      'C’est le nombre d’années qu’Israël a passées dans le désert. Quel est ce nombre ?'
    ] }

];

/*
 * Questions pour les enfants de 5 à 10 ans : trois indices courts, des récits
 * qu'ils connaissent, des réponses d'un ou deux mots.
 */
const QUESTIONS_ENFANTS = [

  /* ------------------------------------------------------ personnages --- */

  { id: 'e-noe', theme: 'Personnage', reponse: 'Noé', accepte: [],
    reference: 'Genèse 6:14 ; 7:8, 9 ; 9:13',
    indices: [
      'J’ai construit un très, très grand bateau.',
      'Les animaux sont entrés dedans deux par deux.',
      'Après la pluie, j’ai vu un arc-en-ciel. Qui suis-je ?'
    ] },

  { id: 'e-adam', theme: 'Personnage', reponse: 'Adam', accepte: [],
    reference: 'Genèse 2:7, 19, 20 ; 3:20',
    indices: [
      'J’ai donné un nom à tous les animaux.',
      'Ma femme s’appelait Ève.',
      'Je suis le premier homme. Qui suis-je ?'
    ] },

  { id: 'e-eve', theme: 'Personnage', reponse: 'Ève', accepte: [],
    reference: 'Genèse 2:22 ; 3:20',
    indices: [
      'J’habitais dans un magnifique jardin.',
      'Mon mari s’appelait Adam.',
      'Je suis la première femme. Qui suis-je ?'
    ] },

  { id: 'e-abraham', theme: 'Personnage', reponse: 'Abraham', accepte: [],
    reference: 'Genèse 12:1 ; 15:5 ; 21:3',
    indices: [
      'J’ai quitté ma maison parce que Jéhovah me l’a demandé.',
      'Dieu m’a promis autant d’enfants que d’étoiles dans le ciel.',
      'Mon fils s’appelait Isaac. Qui suis-je ?'
    ] },

  { id: 'e-joseph', theme: 'Personnage', reponse: 'Joseph', accepte: [],
    reference: 'Genèse 37:3, 28 ; 41:41',
    indices: [
      'Mon papa m’a donné un très beau vêtement.',
      'Mes grands frères étaient jaloux et m’ont vendu.',
      'Je suis devenu un grand chef en Égypte. Qui suis-je ?'
    ] },

  { id: 'e-moise', theme: 'Personnage', reponse: 'Moïse', accepte: [],
    reference: 'Exode 2:3-10 ; 14:21',
    indices: [
      'Quand j’étais bébé, on m’a caché dans un panier sur le fleuve.',
      'Une princesse m’a trouvé et m’a adopté.',
      'J’ai levé mon bâton, et la mer s’est ouverte. Qui suis-je ?'
    ] },

  { id: 'e-samuel', theme: 'Personnage', reponse: 'Samuel', accepte: [],
    reference: '1 Samuel 3:1-10',
    indices: [
      'Tout petit, j’habitais près du tabernacle avec le prêtre Éli.',
      'Une nuit, j’ai entendu quelqu’un m’appeler.',
      'J’ai répondu : « Parle, ton serviteur écoute. » Qui suis-je ?'
    ] },

  { id: 'e-david', theme: 'Personnage', reponse: 'David', accepte: [],
    reference: '1 Samuel 16:11 ; 17:49 ; 2 Samuel 5:3',
    indices: [
      'J’étais un jeune berger qui gardait les moutons.',
      'J’ai battu un géant avec une fronde et une pierre.',
      'Plus tard, je suis devenu roi d’Israël. Qui suis-je ?'
    ] },

  { id: 'e-goliath', theme: 'Personnage', reponse: 'Goliath', accepte: [],
    reference: '1 Samuel 17:4-10, 49',
    indices: [
      'J’étais un soldat philistin, avec une grosse armure.',
      'J’étais un géant, beaucoup plus grand que tout le monde.',
      'Le jeune David m’a vaincu avec une petite pierre. Qui suis-je ?'
    ] },

  { id: 'e-samson', theme: 'Personnage', reponse: 'Samson', accepte: [],
    reference: 'Juges 14:5, 6 ; 16:17',
    indices: [
      'J’ai tué un lion à mains nues.',
      'Jéhovah m’avait donné une force extraordinaire.',
      'Ma force a disparu quand on m’a coupé les cheveux. Qui suis-je ?'
    ] },

  { id: 'e-ruth', theme: 'Personnage', reponse: 'Ruth', accepte: [],
    reference: 'Ruth 1:16 ; 2:2, 3 ; 4:13',
    indices: [
      'Je n’ai pas voulu quitter ma belle-mère, Noémi.',
      'J’ai ramassé des épis dans le champ de Boaz.',
      'Je suis devenue l’arrière-grand-mère du roi David. Qui suis-je ?'
    ] },

  { id: 'e-elie', theme: 'Personnage', reponse: 'Élie', accepte: [],
    reference: '1 Rois 17:6 ; 18:38 ; 2 Rois 2:11',
    indices: [
      'Des corbeaux m’apportaient à manger.',
      'Jéhovah a fait descendre du feu du ciel quand j’ai prié.',
      'Un char de feu est apparu, et je suis parti dans un tourbillon. Qui suis-je ?'
    ] },

  { id: 'e-esther', theme: 'Personnage', reponse: 'Esther', accepte: [],
    reference: 'Esther 2:17 ; 4:16 ; 8:3',
    indices: [
      'J’étais une jeune fille très belle.',
      'Je suis devenue reine.',
      'J’ai été courageuse et j’ai sauvé mon peuple. Qui suis-je ?'
    ] },

  { id: 'e-daniel', theme: 'Personnage', reponse: 'Daniel', accepte: [],
    reference: 'Daniel 6:10, 16, 22',
    indices: [
      'Je priais Jéhovah trois fois par jour.',
      'Des hommes jaloux m’ont fait jeter dans une fosse.',
      'Un ange a fermé la gueule des lions. Qui suis-je ?'
    ] },

  { id: 'e-jonas', theme: 'Personnage', reponse: 'Jonas', accepte: [],
    reference: 'Jonas 1:3, 4, 17',
    indices: [
      'J’ai pris un bateau pour m’enfuir.',
      'Il y a eu une terrible tempête sur la mer.',
      'Un grand poisson m’a avalé. Qui suis-je ?'
    ] },

  { id: 'e-marie', theme: 'Personnage', reponse: 'Marie', accepte: [],
    reference: 'Luc 1:26-31 ; 2:7',
    indices: [
      'L’ange Gabriel est venu me parler.',
      'J’ai couché mon bébé dans une mangeoire.',
      'Je suis la maman de Jésus. Qui suis-je ?'
    ] },

  { id: 'e-jesus', theme: 'Personnage', reponse: 'Jésus', accepte: ['jesus christ', 'christ'],
    reference: 'Luc 2:4-7 ; Matthieu 4:23 ; 16:16',
    indices: [
      'Je suis né à Bethléem.',
      'J’ai guéri beaucoup de malades.',
      'Je suis le Fils de Dieu. Qui suis-je ?'
    ] },

  { id: 'e-jean-baptiste', theme: 'Personnage', reponse: 'Jean-Baptiste', accepte: ['jean baptiste', 'jean le baptiseur', 'jean'],
    reference: 'Matthieu 3:4, 13-16',
    indices: [
      'Je mangeais des sauterelles et du miel.',
      'Mon vêtement était fait en poil de chameau.',
      'J’ai baptisé Jésus dans le fleuve. Qui suis-je ?'
    ] },

  { id: 'e-pierre', theme: 'Personnage', reponse: 'Pierre', accepte: ['simon pierre'],
    reference: 'Matthieu 4:18 ; 14:29 ; Jean 1:42',
    indices: [
      'J’étais pêcheur, avec mon frère André.',
      'J’ai marché sur l’eau pour aller vers Jésus.',
      'Je suis un apôtre, et mon nom veut dire « rocher ». Qui suis-je ?'
    ] },

  { id: 'e-zachee', theme: 'Personnage', reponse: 'Zachée', accepte: [],
    reference: 'Luc 19:1-6',
    indices: [
      'J’étais tout petit.',
      'Je suis monté dans un arbre pour voir Jésus passer.',
      'Jésus m’a dit : « Descends vite, je vais chez toi. » Qui suis-je ?'
    ] },

  { id: 'e-lazare', theme: 'Personnage', reponse: 'Lazare', accepte: [],
    reference: 'Jean 11:5, 17, 43, 44',
    indices: [
      'J’étais un ami de Jésus.',
      'Je suis mort, et on m’a mis dans une tombe.',
      'Jésus m’a ramené à la vie. Qui suis-je ?'
    ] },

  { id: 'e-paul', theme: 'Personnage', reponse: 'Paul', accepte: ['saul'],
    reference: 'Actes 9:3-6 ; 27:41-44',
    indices: [
      'Sur une route, une grande lumière m’a rendu aveugle.',
      'J’ai fait naufrage pendant un voyage en bateau.',
      'J’ai beaucoup voyagé pour parler de Jésus et écrit de nombreuses lettres. Qui suis-je ?'
    ] },

  /* ---------------------------------------------------------- animaux --- */

  { id: 'e-serpent', theme: 'Animal', reponse: 'Le serpent', accepte: ['serpent'],
    reference: 'Genèse 3:1-5, 14',
    indices: [
      'J’ai parlé à Ève dans le jardin.',
      'Je lui ai dit un mensonge.',
      'Je suis un animal qui rampe par terre. Qui suis-je ?'
    ] },

  { id: 'e-colombe', theme: 'Animal', reponse: 'La colombe', accepte: ['colombe', 'pigeon'],
    reference: 'Genèse 8:8-11 ; Matthieu 3:16',
    indices: [
      'Au baptême de Jésus, l’esprit de Dieu est descendu comme moi.',
      'Noé m’a fait sortir de l’arche.',
      'Je suis revenue avec une feuille d’olivier dans le bec. Qui suis-je ?'
    ] },

  { id: 'e-lion', theme: 'Animal', reponse: 'Le lion', accepte: ['lion', 'lions'],
    reference: 'Juges 14:5, 6 ; 1 Samuel 17:34, 35 ; Daniel 6:22',
    indices: [
      'Samson en a tué un à mains nues.',
      'David en a combattu un pour protéger ses moutons.',
      'Daniel a passé une nuit avec nous dans une fosse. Qui sommes-nous ?'
    ] },

  { id: 'e-anesse', theme: 'Animal', reponse: 'L’ânesse', accepte: ['anesse', 'ane', 'l ane'],
    reference: 'Nombres 22:22-28',
    indices: [
      'J’ai vu un ange au milieu du chemin.',
      'Mon maître, Balaam, m’a frappée trois fois.',
      'Jéhovah m’a fait parler comme un humain. Qui suis-je ?'
    ] },

  { id: 'e-poisson', theme: 'Animal', reponse: 'Le grand poisson', accepte: ['poisson', 'gros poisson'],
    reference: 'Jonas 1:17 ; 2:10',
    indices: [
      'J’habite dans la mer.',
      'J’ai avalé un prophète qui fuyait.',
      'Jonas est resté trois jours dans mon ventre. Qui suis-je ?'
    ] },

  { id: 'e-corbeau', theme: 'Animal', reponse: 'Le corbeau', accepte: ['corbeau', 'corbeaux'],
    reference: 'Genèse 8:7 ; 1 Rois 17:6',
    indices: [
      'Je suis un oiseau noir.',
      'Noé m’a fait sortir de l’arche avant la colombe.',
      'Avec d’autres oiseaux comme moi, j’ai apporté du pain et de la viande au prophète Élie. Qui suis-je ?'
    ] },

  /* ------------------------------------------------------------ objets --- */

  { id: 'e-arche', theme: 'Objet', reponse: 'L’arche', accepte: ['arche', 'arche de noe', 'bateau'],
    reference: 'Genèse 6:14-16 ; 7:1-9',
    indices: [
      'J’étais un immense bateau en bois.',
      'Noé et sa famille m’ont construit.',
      'Les animaux sont montés dans moi deux par deux. Qui suis-je ?'
    ] },

  { id: 'e-arc-en-ciel', theme: 'Objet', reponse: 'L’arc-en-ciel', accepte: ['arc en ciel'],
    reference: 'Genèse 9:12-16',
    indices: [
      'J’ai plein de couleurs.',
      'Je suis apparu dans le ciel après le déluge.',
      'Je rappelle la promesse de Dieu : plus jamais de déluge sur toute la terre. Qui suis-je ?'
    ] },

  { id: 'e-manne', theme: 'Objet', reponse: 'La manne', accepte: ['manne'],
    reference: 'Exode 16:14, 15, 31, 35',
    indices: [
      'Je tombais du ciel chaque matin.',
      'J’avais le goût de gâteau au miel.',
      'J’ai nourri les Israélites dans le désert. Qui suis-je ?'
    ] },

  { id: 'e-fronde', theme: 'Objet', reponse: 'La fronde', accepte: ['fronde', 'lance pierre'],
    reference: '1 Samuel 17:40, 49',
    indices: [
      'Je sers à lancer des pierres très loin.',
      'Les bergers m’utilisaient pour protéger leurs moutons.',
      'David m’a utilisée contre Goliath. Qui suis-je ?'
    ] },

  { id: 'e-mangeoire', theme: 'Objet', reponse: 'La mangeoire', accepte: ['mangeoire', 'creche'],
    reference: 'Luc 2:7, 12',
    indices: [
      'D’habitude, je sers à donner à manger aux animaux.',
      'Marie y a couché son bébé.',
      'Jésus nouveau-né a dormi dans moi. Qui suis-je ?'
    ] },

  /* ------------------------------------------------------------- lieux --- */

  { id: 'e-eden', theme: 'Lieu', reponse: 'Le jardin d’Éden', accepte: ['eden', 'jardin d eden', 'paradis'],
    reference: 'Genèse 2:8, 9, 15-17',
    indices: [
      'J’étais un magnifique jardin plein d’arbres et de fruits.',
      'Adam et Ève y habitaient.',
      'Il y avait un arbre dont il ne fallait pas manger le fruit. Qui suis-je ?'
    ] },

  { id: 'e-mer-rouge', theme: 'Lieu', reponse: 'La mer Rouge', accepte: ['mer rouge'],
    reference: 'Exode 14:21, 22',
    indices: [
      'Moïse a tendu sa main au-dessus de moi.',
      'Mes eaux se sont écartées comme deux murs.',
      'Les Israélites ont marché au milieu de moi, à pied sec. Qui suis-je ?'
    ] },

  { id: 'e-jericho', theme: 'Lieu', reponse: 'Jéricho', accepte: [],
    reference: 'Josué 6:3-5, 20',
    indices: [
      'J’étais une ville entourée de grandes murailles.',
      'Les Israélites ont fait le tour de moi pendant sept jours.',
      'Ils ont sonné du cor et crié, et mes murailles sont tombées. Qui suis-je ?'
    ] },

  { id: 'e-bethleem', theme: 'Lieu', reponse: 'Bethléem', accepte: [],
    reference: '1 Samuel 17:12 ; Luc 2:4-7',
    indices: [
      'Je suis une petite ville.',
      'Le roi David est né chez moi.',
      'Jésus aussi est né chez moi. Qui suis-je ?'
    ] },

  /* ------------------------------------------------------------ métiers --- */

  { id: 'e-berger', theme: 'Métier', reponse: 'Berger', accepte: ['bergere'],
    reference: '1 Samuel 16:11 ; Jean 10:11',
    indices: [
      'Je garde des moutons.',
      'David faisait ce travail quand il était jeune.',
      'Jésus a dit : « Je suis le bon… » Quel est ce métier ?'
    ] },

  { id: 'e-charpentier', theme: 'Métier', reponse: 'Charpentier', accepte: [],
    reference: 'Matthieu 13:55 ; Marc 6:3',
    indices: [
      'Je travaille le bois.',
      'Joseph, le mari de Marie, faisait ce métier.',
      'Jésus aussi a appris ce métier. Quel est ce métier ?'
    ] },

  { id: 'e-pecheur', theme: 'Métier', reponse: 'Pêcheur', accepte: ['pecheurs'],
    reference: 'Matthieu 4:18, 19',
    indices: [
      'J’utilise des filets et un bateau.',
      'Pierre et André faisaient ce métier.',
      'Jésus leur a dit : « Je ferai de vous des … d’hommes. » Quel est ce métier ?'
    ] },

  /* ------------------------------------------------------------ nombres --- */

  { id: 'e-deux', theme: 'Nombre', reponse: 'Deux', accepte: ['2'],
    reference: 'Jean 6:9-11',
    indices: [
      'Un petit garçon avait apporté cinq pains.',
      'Jésus s’en est servi pour nourrir une foule immense.',
      'Combien de poissons ce garçon avait-il ?'
    ] },

  { id: 'e-dix', theme: 'Nombre', reponse: 'Dix', accepte: ['10'],
    reference: 'Exode 34:28',
    indices: [
      'Moïse est descendu de la montagne avec des tablettes de pierre.',
      'Dessus, Jéhovah avait écrit ses commandements.',
      'Combien y avait-il de commandements ?'
    ] },

  { id: 'e-douze', theme: 'Nombre', reponse: 'Douze', accepte: ['12'],
    reference: 'Matthieu 10:1-4',
    indices: [
      'C’est un de plus que onze.',
      'Jacob avait ce nombre de fils.',
      'Combien Jésus avait-il d’apôtres ?'
    ] },

  { id: 'e-trois', theme: 'Nombre', reponse: 'Trois', accepte: ['3'],
    reference: 'Jonas 1:17',
    indices: [
      'Jonas a été avalé par un grand poisson.',
      'Il a prié Jéhovah dans le ventre du poisson.',
      'Combien de jours est-il resté dans le poisson ?'
    ] },
  /* ------------------------------------------ personnages (suite) --- */

  { id: 'e-isaac', theme: 'Personnage', reponse: 'Isaac', accepte: [],
    reference: 'Genèse 18:12 ; 21:3-6',
    indices: [
      'Mon papa s’appelait Abraham.',
      'Ma maman Sara a ri quand on lui a annoncé que j’allais naître.',
      'Mon nom veut dire « rire ». Qui suis-je ?'
    ] },

  { id: 'e-jacob', theme: 'Personnage', reponse: 'Jacob', accepte: [],
    reference: 'Genèse 25:24-26 ; 28:12 ; 35:22',
    indices: [
      'J’avais un frère jumeau qui s’appelait Ésaü.',
      'J’ai rêvé d’une échelle qui montait jusqu’au ciel.',
      'J’ai eu douze fils. Qui suis-je ?'
    ] },

  { id: 'e-aaron', theme: 'Personnage', reponse: 'Aaron', accepte: [],
    reference: 'Exode 4:14 ; 7:7-10',
    indices: [
      'J’étais le grand frère de Moïse.',
      'Je suis allé parler à Pharaon avec lui.',
      'Mon bâton s’est changé en serpent. Qui suis-je ?'
    ] },

  { id: 'e-miriam', theme: 'Personnage', reponse: 'Miriam', accepte: ['myriam'],
    reference: 'Exode 2:4-8 ; 15:20',
    indices: [
      'J’ai surveillé mon petit frère caché dans un panier sur le fleuve.',
      'J’ai proposé à la princesse de lui trouver une nourrice.',
      'Après la traversée de la mer Rouge, j’ai chanté avec mon tambourin. Qui suis-je ?'
    ] },

  { id: 'e-josue', theme: 'Personnage', reponse: 'Josué', accepte: [],
    reference: 'Exode 33:11 ; Josué 1:1, 2 ; 6:20',
    indices: [
      'J’étais l’aide de Moïse.',
      'Après lui, j’ai guidé le peuple d’Israël.',
      'Les murailles de Jéricho sont tombées devant nous. Qui suis-je ?'
    ] },

  { id: 'e-rahab', theme: 'Personnage', reponse: 'Rahab', accepte: [],
    reference: 'Josué 2:6, 15, 18',
    indices: [
      'Ma maison était dans le mur de la ville de Jéricho.',
      'J’ai caché deux espions sur mon toit.',
      'J’ai accroché une corde rouge à ma fenêtre. Qui suis-je ?'
    ] },

  { id: 'e-gedeon', theme: 'Personnage', reponse: 'Gédéon', accepte: [],
    reference: 'Juges 6:11, 36-40 ; 7:7',
    indices: [
      'Un ange m’a parlé pendant que je battais le blé en cachette.',
      'J’ai demandé un signe à Dieu avec de la laine mouillée.',
      'Avec seulement 300 soldats, j’ai gagné la bataille. Qui suis-je ?'
    ] },

  { id: 'e-salomon', theme: 'Personnage', reponse: 'Salomon', accepte: [],
    reference: '1 Rois 2:12 ; 3:9-12 ; 6:1',
    indices: [
      'Mon papa était le roi David.',
      'J’ai demandé à Jéhovah de me rendre sage.',
      'J’ai construit un magnifique temple. Qui suis-je ?'
    ] },

  { id: 'e-naaman', theme: 'Personnage', reponse: 'Naamân', accepte: [],
    reference: '2 Rois 5:1-3, 14',
    indices: [
      'J’étais un chef d’armée, malade de la lèpre.',
      'Une petite fille israélite a dit qu’un prophète pourrait me guérir.',
      'Je me suis lavé sept fois dans le Jourdain, et j’ai été guéri. Qui suis-je ?'
    ] },

  { id: 'e-thomas', theme: 'Personnage', reponse: 'Thomas', accepte: [],
    reference: 'Jean 20:24-28',
    indices: [
      'J’étais un apôtre de Jésus.',
      'Je n’ai pas cru tout de suite que Jésus était revenu à la vie.',
      'J’ai voulu voir les marques des clous. Qui suis-je ?'
    ] },

  { id: 'e-etienne', theme: 'Personnage', reponse: 'Étienne', accepte: [],
    reference: 'Actes 6:8 ; 7:58-60',
    indices: [
      'J’étais un disciple de Jésus, plein de courage.',
      'Des gens en colère m’ont lancé des pierres.',
      'Avant de mourir, j’ai prié pour eux. Qui suis-je ?'
    ] },

  { id: 'e-eutyche', theme: 'Personnage', reponse: 'Eutyche', accepte: ['eutique'],
    reference: 'Actes 20:9-12',
    indices: [
      'Je me suis endormi pendant que Paul parlait très longtemps.',
      'Je suis tombé par la fenêtre du troisième étage.',
      'Paul m’a ramené à la vie. Qui suis-je ?'
    ] },

  { id: 'e-timothee', theme: 'Personnage', reponse: 'Timothée', accepte: [],
    reference: 'Actes 16:1-3 ; 2 Timothée 1:5 ; 3:15',
    indices: [
      'Ma maman Eunice et ma grand-mère Loïs m’ont appris les Écritures.',
      'J’ai beaucoup voyagé avec Paul.',
      'Paul m’a écrit deux lettres. Qui suis-je ?'
    ] },

  /* ------------------------ mêmes réponses, autres indices (variantes) --- */

  { id: 'e-david-b', theme: 'Personnage', reponse: 'David', accepte: [],
    reference: '1 Samuel 16:23 ; 17:34-36, 49',
    indices: [
      'Je jouais de la harpe.',
      'J’ai protégé mes moutons contre un lion et un ours.',
      'J’ai battu le géant Goliath. Qui suis-je ?'
    ] },

  { id: 'e-noe-b', theme: 'Personnage', reponse: 'Noé', accepte: [],
    reference: 'Genèse 6:10 ; 8:8-11 ; 1 Pierre 3:20',
    indices: [
      'J’avais trois fils : Sem, Cham et Japhet.',
      'J’ai fait sortir une colombe par la fenêtre.',
      'Ma famille et moi avons été sauvés du déluge. Qui suis-je ?'
    ] },

  { id: 'e-moise-b', theme: 'Personnage', reponse: 'Moïse', accepte: [],
    reference: 'Exode 3:2 ; 17:6 ; 31:18',
    indices: [
      'J’ai vu un buisson qui brûlait sans se consumer.',
      'J’ai frappé un rocher, et de l’eau en est sortie.',
      'Jéhovah m’a donné les Dix Commandements. Qui suis-je ?'
    ] },

  { id: 'e-jonas-b', theme: 'Personnage', reponse: 'Jonas', accepte: [],
    reference: 'Jonas 1:2, 15 ; 2:1',
    indices: [
      'Jéhovah m’a demandé d’aller parler aux habitants de Ninive.',
      'Les marins m’ont jeté dans la mer.',
      'J’ai prié dans le ventre d’un grand poisson. Qui suis-je ?'
    ] },

  { id: 'e-daniel-b', theme: 'Personnage', reponse: 'Daniel', accepte: [],
    reference: 'Daniel 1:6, 12 ; 6:16',
    indices: [
      'Je suis parti à Babylone quand j’étais jeune.',
      'Avec mes amis, j’ai mangé des légumes et bu de l’eau.',
      'Le roi m’a jeté aux lions parce que je priais Jéhovah. Qui suis-je ?'
    ] },

  { id: 'e-jesus-b', theme: 'Personnage', reponse: 'Jésus', accepte: ['jesus christ', 'christ'],
    reference: 'Jean 2:7-9 ; Marc 4:39 ; Matthieu 16:16',
    indices: [
      'À un mariage, j’ai changé l’eau en vin.',
      'J’ai calmé une tempête d’un seul mot.',
      'Je suis le Fils de Dieu. Qui suis-je ?'
    ] },

  /* ---------------------------------------------------- animaux (suite) --- */

  { id: 'e-chameau', theme: 'Animal', reponse: 'Le chameau', accepte: ['chameau', 'chameaux'],
    reference: 'Genèse 24:10, 19 ; Matthieu 3:4',
    indices: [
      'Je peux marcher très longtemps dans le désert.',
      'Rébecca a donné à boire à dix d’entre nous.',
      'Jean-Baptiste portait un vêtement fait de mes poils. Qui suis-je ?'
    ] },

  { id: 'e-brebis', theme: 'Animal', reponse: 'La brebis', accepte: ['brebis', 'mouton', 'agneau'],
    reference: 'Luc 15:4-6 ; 1 Samuel 16:11',
    indices: [
      'Le jeune David gardait mon troupeau.',
      'Jésus a raconté l’histoire de l’une de nous qui s’était perdue.',
      'Le berger a laissé les 99 autres pour la chercher. Qui suis-je ?'
    ] },

  { id: 'e-grenouilles', theme: 'Animal', reponse: 'Les grenouilles', accepte: ['grenouille', 'grenouilles'],
    reference: 'Exode 8:2-6',
    indices: [
      'Dans l’une des plaies d’Égypte, nous étions partout.',
      'Nous sommes même entrées dans les fours et dans les lits.',
      'Nous sautons et nous faisons « croa, croa ». Qui sommes-nous ?'
    ] },

  { id: 'e-sauterelles', theme: 'Animal', reponse: 'Les sauterelles', accepte: ['sauterelle', 'sauterelles', 'criquets'],
    reference: 'Exode 10:12-15 ; Matthieu 3:4',
    indices: [
      'Jean-Baptiste en mangeait.',
      'Nous avons été l’une des plaies d’Égypte : nous avons tout mangé.',
      'Nous sommes des insectes qui sautent très loin. Qui sommes-nous ?'
    ] },

  /* ----------------------------------------------------- objets (suite) --- */

  { id: 'e-panier', theme: 'Objet', reponse: 'Le panier', accepte: ['panier', 'corbeille'],
    reference: 'Exode 2:3-6',
    indices: [
      'On m’avait couvert de goudron pour que l’eau n’entre pas.',
      'On m’a posé dans les roseaux, au bord du fleuve.',
      'Le bébé Moïse était caché dans moi. Qui suis-je ?'
    ] },

  { id: 'e-harpe', theme: 'Objet', reponse: 'La harpe', accepte: ['harpe', 'lyre'],
    reference: '1 Samuel 16:23 ; Psaume 33:2',
    indices: [
      'Je suis un instrument de musique à cordes.',
      'On m’utilisait pour chanter les psaumes.',
      'David jouait de moi pour calmer le roi Saül. Qui suis-je ?'
    ] },

  { id: 'e-cor', theme: 'Objet', reponse: 'Le cor', accepte: ['cor', 'cors', 'trompette', 'trompettes'],
    reference: 'Josué 6:4, 5, 20',
    indices: [
      'On me fabriquait avec une corne de bélier.',
      'On souffle dedans pour faire un son très fort.',
      'Les prêtres m’ont fait sonner en tournant autour de Jéricho. Qui suis-je ?'
    ] },

  /* ------------------------------------------------------ lieux (suite) --- */

  { id: 'e-nazareth', theme: 'Lieu', reponse: 'Nazareth', accepte: [],
    reference: 'Luc 1:26, 27 ; 2:39, 40',
    indices: [
      'Marie et Joseph y habitaient.',
      'Un ange est venu voir Marie dans cette ville.',
      'Jésus y a grandi. Quelle ville suis-je ?'
    ] },

  { id: 'e-ninive', theme: 'Lieu', reponse: 'Ninive', accepte: [],
    reference: 'Jonas 1:1-3 ; 3:3-10',
    indices: [
      'J’étais une très grande ville.',
      'Jonas ne voulait pas y aller.',
      'Mes habitants ont écouté Jonas et ont changé leur conduite. Quelle ville suis-je ?'
    ] },

  { id: 'e-egypte', theme: 'Lieu', reponse: 'L’Égypte', accepte: ['egypte'],
    reference: 'Genèse 37:28 ; Exode 1:13 ; 5:1',
    indices: [
      'Joseph y a été emmené comme esclave.',
      'Plus tard, les Israélites y ont été esclaves à leur tour.',
      'Moïse a demandé au pharaon de ce pays de laisser partir son peuple. Quel pays suis-je ?'
    ] },

  { id: 'e-sinai', theme: 'Lieu', reponse: 'Le mont Sinaï', accepte: ['sinai', 'mont sinai'],
    reference: 'Exode 19:18-20 ; 31:18',
    indices: [
      'Je suis une montagne dans le désert.',
      'Moïse est monté tout en haut de moi.',
      'Jéhovah lui a donné les Dix Commandements. Qui suis-je ?'
    ] },

  /* ---------------------------------------------------- nombres (suite) --- */

  { id: 'e-cinq', theme: 'Nombre', reponse: 'Cinq', accepte: ['5'],
    reference: 'Jean 6:9 ; 1 Samuel 17:40',
    indices: [
      'C’est le nombre de pains qu’avait le petit garçon.',
      'David a pris ce nombre de pierres pour sa fronde.',
      'C’est le nombre de doigts d’une main. Quel est ce nombre ?'
    ] },

  { id: 'e-sept', theme: 'Nombre', reponse: 'Sept', accepte: ['7'],
    reference: '2 Rois 5:14 ; Josué 6:3, 4',
    indices: [
      'Naamân s’est lavé ce nombre de fois dans le Jourdain.',
      'Les Israélites ont tourné autour de Jéricho pendant ce nombre de jours.',
      'C’est le nombre de jours dans une semaine. Quel est ce nombre ?'
    ] },

  { id: 'e-quarante', theme: 'Nombre', reponse: 'Quarante', accepte: ['40'],
    reference: 'Genèse 7:12 ; Matthieu 4:2',
    indices: [
      'Jésus a jeûné ce nombre de jours dans le désert.',
      'Pendant le déluge, il a plu ce nombre de jours et de nuits.',
      'C’est quatre fois dix. Quel est ce nombre ?'
    ] }

];

/*
 * Histoire des Témoins de Jéhovah, pour les adultes. Les références sont
 * bibliques quand il y a lieu ; sinon, elles renvoient au livre « Les
 * Témoins de Jéhovah, prédicateurs du Royaume de Dieu » (1993).
 */
const QUESTIONS_HISTOIRE = [

  /* ---------------------------------------------------------- personnes --- */

  { id: 'h-russell', theme: 'Personnage', reponse: 'Charles Taze Russell', accepte: ['russell', 'charles russell', 'c t russell'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'Je suis né en 1852, près de Pittsburgh, en Pennsylvanie.',
      'Jeune homme, j’ai formé un petit groupe d’étude de la Bible.',
      'En 1879, j’ai lancé la revue qui est devenue La Tour de Garde.',
      'J’ai écrit les Études des Écritures, et je suis mort en 1916. Qui suis-je ?'
    ] },

  { id: 'h-rutherford', theme: 'Personnage', reponse: 'Joseph Rutherford', accepte: ['rutherford', 'joseph franklin rutherford', 'juge rutherford'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'J’étais avocat, et l’on m’appelait parfois « le juge ».',
      'En 1918, j’ai été emprisonné à Atlanta avec sept autres frères.',
      'J’ai succédé à Charles Russell en 1917.',
      'En 1931, j’ai proposé que nous prenions le nom de Témoins de Jéhovah. Qui suis-je ?'
    ] },

  { id: 'h-knorr', theme: 'Personnage', reponse: 'Nathan Knorr', accepte: ['knorr', 'nathan h knorr'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'Je suis devenu président de la Société Watch Tower en 1942.',
      'Sous ma direction, l’École de Galaad a ouvert en 1943.',
      'J’ai aussi lancé une école pour apprendre à parler en public dans les congrégations.',
      'J’ai été président jusqu’à ma mort, en 1977. Qui suis-je ?'
    ] },

  { id: 'h-franz', theme: 'Personnage', reponse: 'Frederick Franz', accepte: ['franz', 'fred franz', 'frederick w franz'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'J’ai été baptisé en 1913.',
      'J’avais étudié le grec et je connaissais bien les langues bibliques.',
      'J’ai succédé à Nathan Knorr en 1977.',
      'J’ai été président jusqu’à ma mort, en 1992, à 99 ans. Qui suis-je ?'
    ] },

  { id: 'h-duplessis', theme: 'Personnage', reponse: 'Maurice Duplessis', accepte: ['duplessis'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'J’étais premier ministre du Québec.',
      'Sous mon gouvernement, des centaines de Témoins ont été arrêtés pour avoir distribué des tracts.',
      'J’ai fait retirer son permis d’alcool à Frank Roncarelli, un restaurateur qui payait leurs cautions.',
      'En 1959, la Cour suprême du Canada m’a condamné. Qui suis-je ?'
    ] },

  /* ------------------------------------------------------------- noms --- */

  { id: 'h-nom', theme: 'Nom', reponse: 'Témoins de Jéhovah', accepte: ['temoins de jehovah', 'temoins'],
    reference: 'Isaïe 43:10-12 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Avant, on nous appelait les Étudiants de la Bible.',
      'Ce nom a été adopté en 1931, lors d’une assemblée à Columbus, dans l’Ohio.',
      'Il s’appuie sur Isaïe 43:10 : « Vous êtes mes témoins. »',
      'Quel nom avons-nous adopté ?'
    ] },

  { id: 'h-etudiants', theme: 'Nom', reponse: 'Étudiants de la Bible', accepte: ['etudiants de la bible', 'etudiants de la bible internationaux', 'etudiants'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'C’est ainsi qu’on appelait les groupes formés autour de Charles Russell.',
      'En Allemagne, on disait « Bibelforscher ».',
      'Ce nom a été remplacé en 1931.',
      'Quel était notre nom avant 1931 ?'
    ] },

  /* ------------------------------------------------------ publications --- */

  { id: 'h-tour-garde', theme: 'Publication', reponse: 'La Tour de Garde', accepte: ['tour de garde'],
    reference: 'Ézéchiel 33:7 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Mon premier numéro est paru en juillet 1879.',
      'Mon titre anglais d’origine parlait de Sion et de la présence du Christ.',
      'Je suis l’un des périodiques les plus diffusés au monde.',
      'Mon nom évoque la sentinelle qui veille. Qui suis-je ?'
    ] },

  { id: 'h-reveillez', theme: 'Publication', reponse: 'Réveillez-vous !', accepte: ['reveillez vous'],
    reference: 'Romains 13:11 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Je suis paru pour la première fois en 1919, sous le nom de « L’Âge d’Or ».',
      'En 1937, j’ai été renommé « Consolation ».',
      'Depuis 1946, je porte mon nom actuel.',
      'Je suis le compagnon de La Tour de Garde. Qui suis-je ?'
    ] },

  { id: 'h-divin-plan', theme: 'Publication', reponse: 'Le Divin Plan des Âges', accepte: ['divin plan des ages', 'plan divin des ages'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'J’ai été publié en 1886.',
      'Je suis le premier volume des Études des Écritures.',
      'Mon auteur est Charles Taze Russell.',
      'Mon titre parle du dessein de Dieu à travers les âges. Qui suis-je ?'
    ] },

  { id: 'h-tmn', theme: 'Publication', reponse: 'La Traduction du monde nouveau', accepte: ['traduction du monde nouveau', 'monde nouveau', 'tmn'],
    reference: 'Psaume 83:18 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Les Écritures grecques chrétiennes sont parues en anglais en 1950.',
      'La Bible complète est parue en 1961.',
      'Elle rétablit le nom de Jéhovah des milliers de fois.',
      'Une édition révisée est parue en français en 2018. Quelle est cette traduction ?'
    ] },

  { id: 'h-photodrame', theme: 'Prédication', reponse: 'Le Photo-Drame de la Création', accepte: ['photo drame de la creation', 'photo drame', 'photodrame'],
    reference: 'Genèse 1:1 ; Prédicateurs du Royaume (1993)',
    indices: [
      'J’ai été présenté pour la première fois en 1914.',
      'Je durais environ huit heures, en quatre parties.',
      'Je mêlais des projections de photos, des films et des enregistrements sonores.',
      'Des millions de personnes m’ont vu dès ma première année. Qui suis-je ?'
    ] },

  { id: 'h-phonographe', theme: 'Prédication', reponse: 'Le phonographe', accepte: ['phonographe', 'gramophone', 'tourne disque'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'Dans les années 1930, on m’emportait de porte en porte.',
      'Je faisais entendre des discours bibliques enregistrés.',
      'Beaucoup de proclamateurs me transportaient dans une mallette.',
      'Quel est cet appareil ?'
    ] },

  { id: 'h-salle', theme: 'Prédication', reponse: 'La Salle du Royaume', accepte: ['salle du royaume'],
    reference: 'Hébreux 10:24, 25 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Ce nom a été proposé par Joseph Rutherford en 1935.',
      'Il est apparu lors d’une visite à Hawaï.',
      'C’est là que la congrégation se réunit.',
      'Comment appelle-t-on ce lieu de réunion ?'
    ] },

  { id: 'h-grande-foule', theme: 'Enseignement', reponse: 'La grande foule', accepte: ['grande foule'],
    reference: 'Révélation 7:9, 10 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Lors d’une assemblée à Washington, en 1935, un discours a éclairci ce sujet.',
      'Il s’agit de personnes de toutes les nations qui espèrent vivre sur la terre.',
      'La Révélation dit que personne ne pouvait la compter.',
      'Comment la Bible appelle-t-elle ce groupe ?'
    ] },

  { id: 'h-1914', theme: 'Date', reponse: '1914', accepte: ['mil neuf cent quatorze'],
    reference: 'Luc 21:24 ; Daniel 4:16, 17 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Charles Russell et ses compagnons attendaient cette année depuis longtemps.',
      'C’est l’année où a commencé la Première Guerre mondiale.',
      'Les « temps fixés des nations » se sont alors achevés.',
      'Jésus a commencé à régner comme Roi dans le ciel. Quelle est cette année ?'
    ] },

  /* ------------------------------------------------------------- lieux --- */

  { id: 'h-cedar-point', theme: 'Lieu', reponse: 'Cedar Point', accepte: [],
    reference: 'Matthieu 24:14 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Des assemblées marquantes s’y sont tenues en 1919 et en 1922.',
      'C’est un lieu au bord du lac Érié, dans l’Ohio.',
      'En 1922, une grande banderole y a été déroulée.',
      'On y a lancé l’appel : « Annoncez, annoncez, annoncez le Roi et son Royaume ! » Quel est ce lieu ?'
    ] },

  { id: 'h-brooklyn', theme: 'Lieu', reponse: 'Brooklyn', accepte: [],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'Le siège mondial s’y est installé en 1909, en quittant Pittsburgh.',
      'Le Béthel y est resté plus de cent ans.',
      'C’est un quartier de New York.',
      'Le siège l’a quitté pour s’installer à Warwick. Quel est ce lieu ?'
    ] },

  { id: 'h-warwick', theme: 'Lieu', reponse: 'Warwick', accepte: [],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'Je suis situé dans l’État de New York, au bord d’un lac.',
      'Des milliers de bénévoles ont participé à ma construction.',
      'Le siège mondial s’y est installé vers 2017.',
      'On y est venu en quittant Brooklyn. Quel est ce lieu ?'
    ] },

  { id: 'h-yankee', theme: 'Lieu', reponse: 'Yankee Stadium', accepte: ['yankee'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'Une grande assemblée s’y est tenue en 1950.',
      'La Traduction du monde nouveau des Écritures grecques y a été présentée.',
      'En 1958, avec le stade voisin, il a accueilli plus de 250 000 personnes à l’assemblée « Volonté divine ».',
      'C’est un célèbre stade de baseball de New York. Quel est ce lieu ?'
    ] },

  /* ------------------------------------------------------------ écoles --- */

  { id: 'h-galaad', theme: 'École', reponse: 'Galaad', accepte: ['ecole de galaad', 'gilead'],
    reference: 'Genèse 31:47, 48 ; Prédicateurs du Royaume (1993)',
    indices: [
      'J’ai ouvert en février 1943.',
      'Mon nom vient d’un mot hébreu qui signifie « tas de témoignage ».',
      'Je forme des missionnaires envoyés dans le monde entier.',
      'Quelle est cette école ?'
    ] },

  { id: 'h-ecole-ministere', theme: 'École', reponse: 'L’École du ministère théocratique', accepte: ['ecole du ministere theocratique', 'ecole du ministere'],
    reference: 'Prédicateurs du Royaume (1993)',
    indices: [
      'Elle a été créée en 1943.',
      'Les frères y présentaient de courts exposés, puis les sœurs aussi, à partir de 1959.',
      'On y apprenait à mieux parler en public et à enseigner.',
      'Quelle était cette école de la congrégation ?'
    ] },

  /* ------------------------------------------------------- persécutions --- */

  { id: 'h-triangle', theme: 'Persécution', reponse: 'Le triangle violet', accepte: ['triangle violet', 'triangle mauve', 'triangle'],
    reference: 'Matthieu 5:10 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Dans les camps de concentration nazis, chaque catégorie de prisonniers avait son signe.',
      'Les Témoins pouvaient être libérés en signant une déclaration reniant leur foi.',
      'Très peu l’ont signée.',
      'Quel signe les Témoins portaient-ils sur leur uniforme ?'
    ] },

  { id: 'h-malawi', theme: 'Persécution', reponse: 'Le Malawi', accepte: ['malawi'],
    reference: 'Jean 17:16 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Dans les années 1960 et 1970, les Témoins y ont été cruellement persécutés.',
      'Ils refusaient d’acheter la carte du parti politique unique.',
      'Des milliers ont dû s’enfuir dans les pays voisins.',
      'Le président de ce pays était Hastings Banda. Quel est ce pays ?'
    ] },

  { id: 'h-grece', theme: 'Procès', reponse: 'La Grèce', accepte: ['grece'],
    reference: 'Actes 5:29 ; Prédicateurs du Royaume (1993)',
    indices: [
      'Minos Kokkinakis y a été arrêté plus de 60 fois pour « prosélytisme ».',
      'En 1993, la Cour européenne des droits de l’homme lui a donné raison.',
      'C’était la première victoire des Témoins devant cette cour.',
      'Quel est ce pays ?'
    ] },

  { id: 'h-russie', theme: 'Persécution', reponse: 'La Russie', accepte: ['russie'],
    reference: 'Jean 15:20 ; 2 Timothée 3:12',
    indices: [
      'En 2017, la Cour suprême de ce pays a interdit les Témoins de Jéhovah.',
      'Le centre administratif proche de Saint-Pétersbourg a été confisqué.',
      'Des frères y ont été condamnés à des années de prison pour leur foi.',
      'Quel est ce pays ?'
    ] }
];

/*
 * Félicitations lues après une bonne réponse, tirées au hasard. Elles sont
 * enregistrées avec la voix (outils/enregistrer.py) : sans prénom, donc.
 */
const FELICITATIONS = [
  'Bravo, bonne réponse !',
  'Excellent !',
  'Bien joué !',
  'Magnifique, c’est exact !',
  'Quelle connaissance des Écritures !',
  'Digne des Béréens !',
  'Impressionnant !',
  'Exactement !',
  'Chapeau !',
  'Sage comme Salomon !',
  'Superbe réponse !',
  'Rien ne t’échappe !'
];
