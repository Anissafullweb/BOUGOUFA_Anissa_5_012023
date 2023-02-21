/*Affichage des élèments produits sur la page produits*/


function recuperationId() {/* Extraire l'identifiant du produit de l'URL du document et tester si l'extraction a réussi */
    let params = new URL(document.location).searchParams;
    let productId = params.get("id");
    console.log(`Récupération de l ID du produit ayant enregistré un clic sur la page d accueil : ${productId}`);
    return productId
}
/* Envoi d'une requête HTTP à l'API avec fetch */
fetch(`http://localhost:3000/api/products/${recuperationId()}`)
    /* Si la requête fonctionne  retourne une réponse en format JSON */
    .then(r => { return r.json() })
    /* Definir la réponse de l'API en tant que productDetails et définir l'action à executer */
    .then((productDetails) => {
        displayProduct(productDetails)
    })

    /*Si la demande echoue */
    /*creation d'un message à télécharger,dans l'élèments productiList pour informer l'utilisateur que quelque chose s'est mal passé */

    .catch((error) => {
        console.log("Le chargement des produits a rencontré un problème" + error);
        alert("Le produit demandé n'est pas disponible");
        location.assign("index.html");

    })

function displayProduct(productDetails) {
    /*Récuperation des élèments qui contiendront les détails du produit (nom, description, prix, image, options de couleur)*/
    const itemPresentation = document.querySelector(".item");
    const itemContent = document.querySelector("article");
    const itemImgContainer = document.querySelector(".item__img");
    const itemName = document.getElementById("title");
    const itemPrice = document.getElementById("price");
    const itemDescription = document.getElementById("description");
    const itemColor = document.getElementById("colors");

    /*Création de l'élèment productImg (img), définition des attributs scr et alt et déclaration en tant qu'enfant de l'élèment itemImgContainer */
    let productImg = document.createElement("img");
    productImg.setAttribute("src", productDetails.imageUrl);
    productImg.setAttribute("alt", productDetails.altText);
    itemImgContainer.appendChild(productImg);
    /*Définir productName et le définir contenu de l'élèment itemName (#title)*/
    let productName = productDetails.name;
    itemName.innerText = productName;

    /* Définir productPrice et le definir comme contenu de l'élèment itemPrice(#)*/
    let productPrice = productDetails.price;
    itemPrice.innerText = productPrice;

    /* Définir productDesrcription et le définir comme contenu de l'élèment itemDescritpion (#description)*/

    let productDesrcription = productDetails.description;
    itemDescription.innerText = productDesrcription;

    console.log(productDetails);
    for (let productColors of productDetails.colors) {

        let colorOption = document.createElement("option");
        colorOption.setAttribute("value", productColors);
        colorOption.innerText = productColors;
        itemColor.appendChild(colorOption);
    }
}
/* L'ajout aux paniers RECUPERER LES DONNEES selectionner par l'utilisateur et envoie du panier--*/
/* Séléction de l'ID */

/* séléction du bouton dans le DOM*/
const btn_EnvoyerPanier = document.querySelector("#addToCart");
console.log(btn_EnvoyerPanier);
/*ecouter le bouton et envoyer le panier------------------*/
btn_EnvoyerPanier.addEventListener("click", (event) => {
    event.preventDefault();
    /*event défault permet de retirer les evenements par defaut*/
    /*Mettre le choix de l'utilisateur dans une variable ----*/

    /*Récuperation des valeurs du panier ***/
    let choixPanier = {
        productId: recuperationId(),
        itemQuantity: document.getElementById("quantity").value,
        colors: document.getElementById("colors").value,
    }
    console.log(choixPanier);

    //------------------------------------Local storage ----------------------//
    //----------------Récupération des valeurs du panier pour les intégrer aux local storage--//
    //---------Déclaration d'un variable produit ajouté dans le local storage -----/
    let produitsEnregistreDansLeLocalStorage = JSON.parse(localStorage.getItem("produit"));
    //--Json.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JAVASCRIPT dans l'autre sens json.stringify--//
    console.log(produitsEnregistreDansLeLocalStorage);

    // Fonction fenêtre pop up 








    //Si il y a de produits enregistés dans le local storage---//
    if (produitsEnregistreDansLeLocalStorage) {
        produitsEnregistreDansLeLocalStorage.push(choixPanier);
        localStorage.setItem("produit", JSON.stringify(produitsEnregistreDansLeLocalStorage));
        console.log(produitsEnregistreDansLeLocalStorage);
    }
    //Si il n'y a pas de produits enregistés dans le local storage---//
    else {
        produitsEnregistreDansLeLocalStorage = [];
        produitsEnregistreDansLeLocalStorage.push(choixPanier);
        localStorage.setItem("produit", JSON.stringify(produitsEnregistreDansLeLocalStorage));
        console.log(produitsEnregistreDansLeLocalStorage);
    }

});



