
/**Affichage des produits sur la page index */


/*Envoi d'une requête HTTP à l'API avec fetch( aller chercher) récuperer des ressources */
fetch("http://localhost:3000/api/products")

    /* Si la requête aboutit retourne la réponse au format JSON*/
    /*THEN veux dire quand tu as finis de contacter le serveur fais moi un retour*/
    .then(r => { return r.json() })

    /* Définir la réponse de l'API en tant que produits et définir l'action à exécuter*/
    .then((products) => {
        console.log(products)
        /* Parcourir les données renvoyées par l'API avec une boucle for*/
        for (let product of products) {
            displayProduct(product)

        }
    })
    /*Si la demande echoue */
    /*creation d'un message à télécharger,dans l'élèments productiList pour informer l'utilisateur que quelque chose s'est mal passé */

    .catch((error) => {
        console.log("Le chargement des produits a rencontré un problème" + error);
        const productsList = document.getElementById("items")
        const errorMessage = document.createElement("h2");
        errorMessage.textContent = "Nous rencontrons des difficultés techniques et ne pouvons pas présenter les articles pour le moment. Nos équipes sont à l'oeuvre pour résoudre ce problème  dans les plus bref délai.Nous vous invitons à réesayer ultérieurement et nous excusons pour la gêne occasionnée.";
        errorMessage.style.textAlign = "center";
        errorMessage.style.padding = "15px";
        productsList.appendChild(errorMessage);

    })

function displayProduct(product) {
    /**  Récupération de l'élèment qui contiendra les produits et affectation dans une constante nommé productsList"*/

    const productsList = document.getElementById("items")

    /* Création de l'élément productLink (a) definition de l'attribut href et déclaration en tant qu'enfant de l'élèment productcsLists */
    let productLink = document.createElement("a");
    productLink.setAttribute("href", `product.html?id=${product._id}`);
    productsList.appendChild(productLink);

    /* Créer un élèment productArticle (article) et le déclarer comme enfant de l'élèment productLink */
    let productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    /*Création de l'élèment productImg (image), définition des attributs src et alt et déclaration en tant qu'enfant de l'element productArticle*/
    let productImg = document.createElement("img");
    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt", product.altTxt);
    productArticle.appendChild(productImg);

    /*Création de l'element prudcutName (h3) ajout de la classe productName et du contenu Textuel et décalaration en tant que l'element enfant de l'element productArticle*/
    let productName = document.createElement("h3");
    productName.classList.add("productName");
    productName.textContent = product.name;
    productArticle.appendChild(productName);

    /* Création de l'élèment productDescription (p) ajout de la classe productDescription et du contentu textuel et déclaration en tant qu'enfant de l'élèment productArticle*/
    let productDescription = document.createElement("p");
    productDescription.classList.add("productDescription");
    productDescription.textContent = product.description;
    productArticle.appendChild(productDescription);
}


