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

  { id: 'jacob', theme: 'Personnage', reponse: 'Jacob', accepte: ['israel'],
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

  { id: 'jean-baptiste', theme: 'Personnage', reponse: 'Jean-Baptiste', accepte: ['jean baptiste', 'jean le baptiseur', 'jean'],
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
    reference: 'Psaume 23:1 ; 119',
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

  { id: 'e-pierre', theme: 'Personnage', reponse: 'Pierre', accepte: ['simon pierre', 'simon'],
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
    ] }
];
