# Test-Technique-Bons-Artisans

## Démarrer
Il faut cloner le projet avec `git clone git@github.com:Koffi-ali/Test-Techniques-Bons-Artisans.git`.\
Ensuite se rendre dans le repertoire `Test-Techniques-Bons-Artisans`\.

## Lancer l'application
L'application a été déployée dans un conteneur dockeur qu'il faudra lancer.

On commence par démarrer le service docker.\
Ensuite dans le repertoire `Test-Techniques-Bons-Artisans`, on lance `docker compose up`\
pour démarrer les services de  l'application (service front-end + service back-end + la database mongo).



## Visualiser l'application
Une fois les étapes précedentes ont été rélaisées, l'application sera visible grâce au lien \
(http://localhost:3000).

Le lien pour l'api du serveur est (http://localhost:4000/api/products).

Pour visualiser la database mongodb, vous pourrez vous connecter directement \
avec l'URI `mongodb://admin:admin123@localhost:27017/` ou en ligne de commande \
en spécifiant le userName `admin` et le password `admin123`.\
Une fois connecté, dans la database `test`, il y a une collection `products` qui stockent les produits.

## Stoper l'application
Pour arrêter les services de l 'application, on lancera la commande `docker compose down`

