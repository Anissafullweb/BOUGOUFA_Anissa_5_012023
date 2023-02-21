/* Affichage du contenu du panier dans la page panier*/
/*Récupération du panier avec la fonction getCard*/
/*let cart = cart();

/*Récupération de l'élèment qui contiendra les détails du panier */
const cartList = document.getElementById("cart__items");

/*Récupération des élèments qui contiendront les totaux et le bon de commande*/
const cartHeading = document.querySelector("h1");
const totalDisplay = document.querySelector(".cart__price p");
const orderForm = document.querySelector(".cart__order");

/*Récupération des élèments qui afficheront le prix total et la quantité total de produits dans le panier*/
let totalProductsQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
/*Initialisation du TotalCartPrice qui sera mis à jour ultérieurement avec le résultat renvoyé par la fonction getTotalPrice*/
let TotalCartPrice = 0;

/* Parcourir le panier avec une boucle for OF*/
for (let product of cart) {
    let productId = product.id;
    let productColors = product.color;
    let productQuantity = product.quantity;
    let productName = product.name;
}
/*Envoi d'une requête HTTP à l'API avec fetch( aller chercher) récuperer des ressources */
fetch(`http://localhost:3000/api/products/${productId}`)

    /* Si la requête aboutit retourne la réponse au format JSON*/
    /*THEN veux dire quand tu as finis de contacter le serveur fais moi un retour*/
    .then(r => { return r.json() })

    /* Définir la réponse de l'API en tant que produits et définir l'action à exécuter*/
    .then((productsDetails) => {

        /*Création de l'élèment arcticle définition, ajout de la classe cart__item et définition en tant qu'enfant de l'élèment cartList*/
        let productArticle = document.createElement("article");
        productArticle.classList.add("cart__item");
        productArticle.setAttribute("data-id", productId);
        productArticle.setAttribute("data-color", productColors);
        cartList.appendChild(productArticle);
    });
