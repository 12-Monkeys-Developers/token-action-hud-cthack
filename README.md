# Token Action HUD Cthulhu Hack

Token Action HUD est un HUD repositionnable lorsque des tokens sont sélectionnés.

## Fonctionnalités

Utilisez le HUD pour réaliser les actions suivantes :

### Personnages

Pour un personnage, le HUD permet d’accéder rapidement aux actions suivantes :

- **Sauvegardes**
  - Affiche toutes les sauvegardes du personnage.
  - Montre leur valeur actuelle directement dans le HUD.
  - Un clic lance immédiatement le jet correspondant.

- **Ressources**
  - Affiche les ressources principales du personnage :
    - torche
    - bagou
    - santé mentale
    - dés de richesse
    - dés de vie
    - ressource diverse
  - La valeur actuelle est visible dans le HUD.
  - Une ressource à 0 apparaît comme indisponible.

- **Dégâts**
  - Affiche les différentes catégories de dégâts suivies par le personnage.
  - Permet de lancer rapidement l’action associée.

- **Armes**
  - Liste toutes les armes du personnage.
  - Affiche les dés de l’arme et sa portée si disponible.
  - Le jet utilise automatiquement la bonne sauvegarde selon l’arme :
    - **FOR** pour les armes de contact (distance : contact, contact/proche, 3*FOR)
    - **DEX** pour les autres armes

- **Objets utilisables**
  - Liste les objets utilisables ayant des dés ou un effet exploitable.
  - Permet de déclencher leur utilisation directement depuis le HUD.

- **Capacités**
  - Liste les capacités du personnage.
  - Affiche les usages restants lorsqu’une capacité possède un nombre d’utilisations limité.
  - Une capacité sans usage disponible apparaît comme indisponible.

- **Magie**
  - Sépare les actions magiques en deux catégories :
    - **Sorts**
    - **Rituels**
  - Affiche les dés associés si nécessaire.
  - Permet de lancer l’action magique directement depuis le HUD.

### Adversaires

Pour un adversaire, le HUD permet d’accéder rapidement aux actions suivantes :

- **Attaques**
  - Liste toutes les attaques disponibles.
  - Affiche le nombre d’attaques et la valeur des dégâts.
  - Si l’attaque utilise des dés de dégâts, ce sont ces dés qui sont lancés.
  - Si elle n’utilise pas de dés mais une valeur fixe, cette valeur fixe est utilisée.

- **Capacités d’adversaire**
  - Liste les capacités spéciales de l’adversaire.
  - Affiche les usages restants si la capacité possède une limite d’utilisation.

- **Magie**
  - Les sorts et rituels de l’adversaire sont également accessibles depuis le HUD.
  - Leur utilisation peut être déclenchée directement en un clic.

### Utilisation

- **Clic gauche**
  - Exécute directement l’action choisie.

- **Clic droit**
  - Ouvre la fiche de l’objet concerné pour les armes, attaques, objets, capacités et actions magiques.
  - Ouvre la fiche de l’acteur pour les sauvegardes, ressources et dégâts.

- **Sélection multiple**
  - Si plusieurs tokens sont sélectionnés, les actions peuvent être appliquées à tous les acteurs concernés.

## Installation

### 1ère méthode

1. Dans l'application Foundry VTT's, sur l'écran de **Configuration**, allez sur **Modules**
2. Cliquez sur **Installer un module**
3. Rechercher **Token Action HUD Cthulhu Hack** 
4. Cliquez sur **Installation**

### 2ème méthode

1. Dans l'application Foundry VTT's, sur l'écran de **Configuration**, allez sur **Modules**
2. Cliquez sur le bouton **Installation** sur la ligne du module
3. Dans le champ **URL du Manifest**, collez&nbsp;: `(https://github.com/12-Monkeys-Developers/token-action-hud-cthack/releases/latest/download/module.json`
4. Cliquez sur le bouton **Installation** à côté du champ

## Modules requis

### Token Action HUD Core

Token Action HUD Cthulhu Hack nécessite le module [Token Action HUD Core](https://foundryvtt.com/packages/token-action-hud-core).

## Support

Pour plus de détail concernant le module Token Action HUD, allez sur cette page&nbsp;: [How to Use Token Action HUD](https://github.com/Larkinabout/fvtt-token-action-hud-core/wiki/How-to-Use-Token-Action-HUD)

Si vous avez des questions, des demandes de nouvelles fonctionnalités ou des rapports de bug, merci d'ouvrir un [ticket ici](https://github.com/12-Monkeys-Developers/token-action-hud-cthack/issues).

Les «&nbsp;Pull requests&nbsp;» sont les bienvenues. Merci d'indiquer une raison pour votre demande ou créer un ticket avant de proposer votre code.

## License

Ce module pour Foundry VTT est disponible sous [licence MIT](https://github.com/12-Monkeys-Developers/token-action-hud-cthack/LICENSE)
