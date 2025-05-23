**Exigences Fonctionnelles – Plateforme SalesTraction (POC)**

**EF001 – Landing Page informative**

Description :    
L'utilisateur accède à une page d’accueil décrivant clairement le concept de la plateforme. Deux parcours sont proposés : « Je suis une startup » ou « Je suis un talent commercial ». Un encadré présente le modèle de commission et les bénéfices associés.

Critères d’acceptation :  
\- La page est accessible publiquement.  
\- Les deux boutons de parcours redirigent vers les formulaires d’inscription correspondants.

**EF002 – Inscription des Startups**

Description:    
Une startup peut créer un compte en renseignant son nom, son SIRET (recherche automatique via API Sirene ou entrée manuelle) et ses coordonnées.

Critères d’acceptation :  
\- L’inscription est possible via formulaire.  
\- Si le SIRET est valide, les champs se remplissent automatiquement.  
\- Si le SIRET est absent, un modérateur valide manuellement la fiche via l’admin.

**EF003 – Création d’offres de mission**

Description :    
Une fois inscrite, une startup peut publier une mission (type de produit/service à vendre, secteur, durée, conditions de commission, documents joints).

Critères d’acceptation :  
\- Un formulaire permet de renseigner tous les champs obligatoires.  
\- Un ou plusieurs documents peuvent être attachés (PDF, DOCX).  
\- La mission apparaît immédiatement dans la marketplace une fois validée.

**EF004 – Tableau de bord Startup**

Description:    
Une startup visualise les candidatures reçues pour ses offres, avec les profils des étudiants et leurs messages de motivation.

Critères d’acceptation :  
\- Liste des missions actives avec compteur de candidatures.  
\- Accès aux détails de chaque étudiant candidat.  
\- Statut de chaque candidature (nouvelle, en cours, refusée, match).

**EF005 – Inscription Étudiant**

Description :    
Un étudiant crée un compte en complétant un formulaire détaillé : âge, université, secteurs préférés, langues parlées, lien LinkedIn/CV.

Critères d’acceptation:  
\- Tous les champs obligatoires sont renseignés.  
\- Validation de l’adresse email.  
\- Le profil est modifiable depuis le tableau de bord.

**EF006 – Marketplace d’offres**

Description :    
Un étudiant accède à un tableau de missions actives, avec des filtres (secteur, durée, rémunération, langue, type de produit).

Critères d’acceptation :  
\- Les filtres fonctionnent sans recharger la page (JS côté client).  
\- Les résultats s’adaptent en temps réel.  
\- Chaque offre est cliquable pour accéder au détail.

**EF007 – Postulation aux offres**

Description :    
Un étudiant peut candidater à une mission avec un message personnalisé.

Critères d’acceptation :  
\- Le message de motivation est obligatoire.  
\- La candidature est visible dans le tableau de bord startup.  
\- L’étudiant peut consulter un historique de ses candidatures.

**EF008 – Tableau de bord Étudiant**

Description :    
L’étudiant suit ses candidatures et voit l’état de ses commissions.

Critères d’acceptation :  
\- Affichage des missions postulées.  
\- Statut de chaque candidature (en attente, match, refusé).  
\- Montant de la commission prévue si mission réussie.

**EF009 – Panel Admin**

Description :    
Un administrateur peut valider les startups non reconnues par le SIRET, gérer les litiges et consulter les statistiques globales.

Critères d’acceptation :  
\- Liste des startups à valider avec bouton "Accepter/Refuser".  
\- Tableau des litiges ouverts (avec filtres par mission/startup).  
\- Statistiques visibles : nombre d’inscriptions, de candidatures, de mises en relation.

**EF010 – Intégration de données initiales**

Description :    
Un fichier statique (CSV ou JSON) de 1000 startups (source Xplore.vc) est importé pour précharger la plateforme.

Critères d’acceptation :  
\- Données lisibles depuis l’interface admin.  
\- Les startups sont marquées comme « préchargées ».  
\- Possibilité de filtrer les startups par source.

**EF011 – Statistiques de réussite**

Description :    
Les statistiques suivantes sont suivies en temps réel ou quotidiennement :    
\- Nombre de startups inscrites (objectif : 100\)    
\- Nombre d’étudiants inscrits (objectif : 200\)    
\- Nombre de mises en relation réussies (objectif : 10\)

Critères d’acceptation :  
\- Les chiffres sont visibles dans le panneau admin.  
\- Mise à jour automatique quotidienne.  
\- Export CSV possible.

**Bonus :** 

Modèle économique (à paramétrer)

**EF012 – Paramétrage de la commission**

Description :    
L’administrateur peut configurer le modèle de monétisation du POC :  
\- Option 1 : 10 % de la commission de l’étudiant.  
\- Option 2 : 50 € par mise en relation.

Critères d’acceptation :  
\- Le modèle peut être sélectionné depuis l’admin.  
\- L’affichage sur la landing page s’adapte selon le choix.  
\- Un seul modèle est actif à la fois.

**Justification des choix technologiques :** 

**Base de données – PostgreSQL**  

Nous avons choisi PostgreSQL comme système de gestion de base de données pour sa robustesse, sa fiabilité et sa conformité aux standards SQL En tant que base de données relationnelle, PostgreSQL nous permet de structurer les données de manière claire et cohérente, ce qui est particulièrement adapté à notre cas d’usage, où les relations entre entités (étudiants, startups, offres, candidatures, commissions) sont bien définies.  

PostgreSQL offre également une excellente performance, des fonctionnalités avancées (indexation, transactions ACID, requêtes complexes), ainsi qu’une facilité de migration et de scalabilité à mesure que la plateforme évolue. Son écosystème mature et sa compatibilité avec des outils ORM comme TypeORM (utilisable avec NestJS) facilitent grandement l'intégration côté backend.

**Backend – NestJS :**  
Nous avons choisi NestJS un framework Node.js basé sur TypeScript, pour sa structure modulaire et évolutive. Son approche inspirée d’Angular favorise une architecture claire et maintenable, idéale pour un développement par étapes (MVP puis évolutions).    
NestJS facilite aussi l'intégration de services externes (authentification, base de données, envoi d’e-mails), tout en restant compatible avec les standards REST.

**Frontend – React :**  
Pour la partie frontend, nous avons retenu React un framework JavaScript largement utilisé, reconnu pour sa réactivité, sa modularité et sa large communauté.    
Son système de composants permet une construction flexible et réutilisable des interfaces, facilitant l’implémentation progressive des fonctionnalités (landing page, tableaux de bord, marketplace…).  

**Présentation fonctionnelle et perspectives d’évolution de la plateforme**

**Fonctionnalités actuelles**

La plateforme propose une interface d’accueil permettant aux deux principales typologies d’utilisateurs les entreprises et les étudiants  de se connecter ou de créer un compte. Une fois authentifié, l’utilisateur est redirigé vers le marketplace, conçu comme un espace d’interactions dynamiques entre les deux parties.

Le fonctionnement repose sur un système de matching inspiré des applications de rencontre, dans lequel :

- Les entreprises peuvent visualiser des profils étudiants et exprimer leur intérêt via un système de "like".  
- Les étudiants, quant à eux, visualisent des offres publiées par les entreprises et peuvent également manifester leur intérêt.

Toutefois, chaque "like" émis par un étudiant doit obligatoirement être accompagné d’un message de motivation personnalisé, favorisant ainsi des échanges plus qualitatifs.

En cas de match mutuel, deux options sont proposées à l’utilisateur :

- Poursuivre la navigation sur le marketplace pour découvrir d’autres profils ou offres,  
- Démarrer une conversation via la messagerie intégrée, afin d’engager un dialogue direct.

Par ailleurs, plusieurs espaces fonctionnels sont mis à disposition pour enrichir l’expérience utilisateur :

- Une interface de suivi des candidatures, permettant aux utilisateurs de consulter l’état de leurs offres,  
- Un accès à la messagerie centralisant toutes les conversations actives,  
- Une page de profil permettant la visualisation des informations personnelles.

**Évolutions techniques et roadmap**

Dans le cadre des prochaines itérations de développement, plusieurs axes d’amélioration ont été identifiés afin d’assurer la montée en qualité, la sécurité et l’évolutivité de la plateforme :

1\. Gestion des médias utilisateurs

Il est prévu de mettre en place une architecture de gestion des fichiers permettant de stocker les images dans un répertoire dédié côté serveur. Seul le chemin d’accès à chaque image sera conservé en base de données, assurant ainsi une meilleure performance et une maintenance facilitée.

2\. Renforcement de la sécurité via CORS

Le backend sera renforcé par une politique CORS stricte, n’autorisant que des méthodes HTTP spécifiques et des origines explicitement définies. Cela garantira un contrôle accru des flux entre le frontend et l’API.

3\. Déploiement d’un espace administrateur complet

Le back-office destiné aux administrateurs sera enrichi par les éléments suivants :

- Un dashboard de statistiques permettant de suivre des indicateurs clés : taux de match, volume d’offres publiées, nombre de visiteurs uniques, etc.  
- Un module de gestion des incidents, dédié au traitement des signalements liés à des problématiques telles que les paiements, les comportements inappropriés ou le non-respect des conditions d’utilisation.

4\. Optimisation multi-supports

La plateforme ayant été initialement conçue selon une approche mobile first, une attention particulière sera portée à son adaptation en version desktop,  avec une refonte responsive garantissant une ergonomie optimale sur écrans larges.

5\. Gestion des modifications utilisateurs

Une évolution fonctionnelle sera apportée aux interfaces de gestion des profils utilisateurs et des offres publiées. Il s’agira de permettre aux utilisateurs qu’ils soient étudiants ou entreprises de modifier les informations saisies a posteriori, dans le respect des règles de validation en vigueur. Cette fonctionnalité visera à renforcer la flexibilité de la plateforme tout en garantissant la cohérence des données.

6\. Mise en place du système de commission

Le système de gestion des commissions devra être intégré progressivement. Dans un premier temps, les informations relatives à la commission sont gérées directement au sein de la table \`sales\_offer\`, en attendant la mise en place d’une table dédiée. Ce mécanisme permettra notamment :

- À l’administrateur de configurer dynamiquement le pourcentage de commission appliqué aux offres,  
- À l’étudiant de suivre l’évolution de son épargne ou de ses gains via une interface dédiée.

Ce socle initial posera les bases d’un système économique plus complet, qui pourra être étendu ultérieurement pour intégrer des règles de calcul avancées, des seuils d’éligibilité ou des historiques de transaction.

7\. Développement d’un algorithme de mise en avant

Afin d’optimiser la pertinence des interactions sur le marketplace, un algorithme de mise en avant des utilisateurs sera conçu et intégré. Cet algorithme aura pour objectif de prioriser l’affichage de certains profils, en fonction de critères dynamiques et personnalisés tels que :

- Les centres d’intérêt communs entre les utilisateurs,  
- La popularité, mesurée notamment par le nombre de likes reçus ou de matches obtenus,  
- Le taux d’activité ou de réactivité sur la plateforme,  
- La complétude du profil, favorisant les utilisateurs ayant renseigné l’ensemble des informations demandées.

Ce mécanisme visera à renforcer la qualité des recommandations, tout en stimulant l’engagement des utilisateurs. Il constituera également un levier stratégique pour favoriser la visibilité des profils les plus investis ou les plus recherchés.


**Arbre de navigation du projet :** 

[https://www.figma.com/board/sRRwkXvNwXEsqhZijbDJXe/Arbre-navigation-SalesTraction?node-id=0-1\&t=ZQi1h3NF39ZPbzgg-1](https://www.figma.com/board/sRRwkXvNwXEsqhZijbDJXe/Arbre-navigation-SalesTraction?node-id=0-1&t=ZQi1h3NF39ZPbzgg-1)

**Recommandation de déploiement**

1\. Architecture proposée

Deux configurations sont envisageables selon les objectifs de performance et d’indépendance des services :

Déploiement sur un serveur unique : adapté aux premiers déploiements ou à un MVP. Le frontend, le backend et la base de données sont hébergés ensemble. Cette solution est simple à mettre en place mais limite la scalabilité.

Déploiement sur deux serveurs distincts : recommandé pour une architecture plus modulaire. Le frontend ( React ) est déployé sur un serveur ou un service d’hébergement statique, tandis que le backend (API NestJS) est hébergé séparément. Cela permet une meilleure répartition des charges, une sécurité renforcée et une maintenance plus souple.

2\. Comparatif des solutions d’hébergement : AWS vs OVH

| Critère | AWS (Amazon Web Services) | OVHcloud |
| ----- | ----- | ----- |
| **Scalabilité** | Très haute – services managés, autoscaling, CI/CD intégrés | Moyenne – scalabilité manuelle ou limitée selon l’offre |
| **Stockage de fichiers** | Amazon S3 (hautement fiable, scalable, sécurisé) | Object Storage compatible S3 (bon compromis performance/prix) |
| **Coût** | Pay-as-you-go (flexible mais peut devenir coûteux à grande échelle) | Tarification plus prévisible, souvent moins chère en Europe |
| **Simplicité de gestion** | Complexe, nécessite une expertise DevOps | Plus accessible pour des équipes techniques réduites |
| **Localisation des données** | Nombreux datacenters à travers le monde | Datacenters principalement en Europe (conforme RGPD) |
| **Fiabilité et support** | SLA élevé, support premium disponible | Support correct, bon retour utilisateur |

3\. Gestion des fichiers et images

Quel que soit le prestataire retenu, il est fortement recommandé de dissocier le stockage des images du serveur principal, en optant pour un système de bucket objet :

- Sur AWS : utiliser Amazon S3, service de stockage objet reconnu pour sa fiabilité, son intégration native avec de nombreux services AWS, et ses fonctionnalités de sécurité (versioning, accès public/privé, politiques IAM).

- Sur OVH : opter pour le Public Cloud Object Storage, compatible avec le protocole S3, ce qui facilite les migrations et l’utilisation de bibliothèques standard côté backend.

Le backend devra donc être configuré pour enregistrer les fichiers images dans un bucket distant et conserver uniquement le lien d’accès en base de données. Cela améliore les performances, sécurise les données statiques, et facilite une éventuelle migration ou montée en charge.

4\. Mise en place de la base de données

La base de données nécessaire au fonctionnement de la plateforme peut être initialisée à partir des fichiers SQL disponibles sur le dépôt GitHub du projet. Deux fichiers sont fournis :

- \`salestraction.sql\` : Ce script permet de créer l’ensemble de la structure de la base de données (tables, clés primaires/étrangères, index, etc.).  
- \`populateScript1.sql\` : Ce fichier contient des instructions d’insertion de données permettant de préremplir la base avec un jeu d’essai (profils, offres, utilisateurs, etc.).  
- \`populateScript2.sql\` : Ce fichier contient des instructions d’insertion de données permettant de préremplir la base avec un jeu d’essai (profils, offres, utilisateurs, etc.).  
- \`register\_student.sh\` : Ce fichier contient des instructions pour pouvoir créer des profils d’étudiants.  
- \`register\_enterprise.sh\` : Ce fichier contient des instructions pour pouvoir créer des profils d’enterprises.

\> Recommandation : L’exécution de ces fichiers peut se faire via un outil de gestion de bases de données (ex. : DBeaver, phpMyAdmin) ou directement en ligne de commande via \`psql\` (PostgreSQL). Veuillez d’abord lancer le script de création de la base de données puis le premier fichier de peuplement de la base de données,les scripts shells et enfin le deuxième fichier de peuplement de la base de données.

5\. Installation et lancement de la plateforme

L’installation du projet nécessite deux environnements distincts : un pour le backend et un pour le frontend. Voici les étapes à suivre :

**Étape 1 : Clonage du projet**

Cloner le dépôt GitHub du projet dans votre environnement local :

git clone https://github.com/lien-vers-le-répertoire  
cd salestraction

**Étape 2 : Initialisation du backend**

1\. Accéder au dossier contenant l’API :

   cd api\_st

2\. Installer les dépendances via NPM :

   npm install

3\. Lancer le serveur backend :

   npm run start

\> Note : Vérifiez que les variables d’environnement (par exemple \`DATABASE\_URL\`, \`PORT\`, etc.) sont bien définies dans un fichier \`.env\` ou dans votre environnement système.

**Étape 3 : Initialisation du frontend**

1\. Accéder au dossier contenant le frontend :

   cd ../SalesTraction

2\. Installer les dépendances du projet :

   npm install

3\. Démarrer le serveur de développement :

   npm run dev

\> Une fois ces deux services lancés, la plateforme est accessible localement. Par défaut, le frontend est disponible sur \`http://localhost:5173\` et le backend sur le port spécifié (par exemple \`http://localhost:3000\`).

6\. Gestion des traductions dans le frontend React

Le projet frontend utilise le système de traduction \`i18n\`, reposant sur des fichiers JSON organisés par langue. Par exemple, les traductions en français sont centralisées dans un fichier \`fr.json\`. Pour ajouter ou modifier une traduction, il suffit d’éditer ce fichier en respectant la structure clé/valeur existante. Cette approche permet une gestion claire et évolutive du contenu multilingue sans nécessiter de modifications dans le code source.