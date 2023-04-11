//Affichage panier

const cartList = document.getElementById("cart__items");

//Premier objectif récupérer le array dans le localstorage
const ElementsLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(ElementsLocalStorage);
// Tableau Utiliser une boucle for of (for of parcourt des elements iterables)

for (let product of ElementsLocalStorage) {
    // cibler l'ID  color quantité
    let productId = product.productId;
    let productColor = product.color;
    let productQuantity = product.itemQuantity;

    // recupérer nom descriprtion prix dans l'API depuis l'ID (ligne 11 products)
    fetch(`http://localhost:3000/api/products/${productId}`)
        /* Si la requête fonctionne  retourne une réponse en format JSON */
        .then(r => { return r.json() })
        /* Definir la réponse de l'API en tant que productDetails et définir l'action à executer */
        .then((productDetails) => {
            displayProduct(productDetails, productColor, productQuantity)
            console.log(productDetails)
        })
    console.log(product)
};
function displayProduct(productDetails, productColor, productQuantity) {
    //  Créer (document.create element) les élèments HTML page cart
    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    cartArticle.setAttribute("data-id", productDetails._id);
    cartArticle.setAttribute("data-color", productColor);
    document.getElementById("cart__items").appendChild(cartArticle);

    const cartImgItem = document.createElement("div")
    cartImgItem.classList.add("cart__item__img")
    cartArticle.appendChild(cartImgItem)


    //  Création image
    const img = document.createElement("img");
    // Comment la relier au choix du canapé au niveau de l'image
    img.setAttribute("src", productDetails.imageUrl);
    img.setAttribute("alt", productDetails.altText);
    cartImgItem.appendChild(img)



    //Création description
    const cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    cartArticle.appendChild(cartItemContent)

    //Création description détaillé
    const cartiItemContentDescription = document.createElement("div");
    cartiItemContentDescription.classList.add("cart__item__content__description");
    cartItemContent.appendChild(cartiItemContentDescription)


    // Création h2
    const nomDuProduit = document.createElement("h2");
    nomDuProduit.innerText = productDetails.name;
    cartiItemContentDescription.appendChild(nomDuProduit)
    // Comment mettre le nom du produit




    // Paragraphe couleur
    const colorProduitCart = document.createElement("p");
    colorProduitCart.innerText = productColor;
    cartiItemContentDescription.appendChild(colorProduitCart)

    //Prix
    const prixProduitCart = document.createElement("p");
    // Comment récupérer prix
    prixProduitCart.innerText = productDetails.price * productQuantity + " €";
    cartiItemContentDescription.appendChild(prixProduitCart)

    // Creation div cart__item__content__setting
    const cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__setting");
    cartItemContent.appendChild(cartItemContentSettings);

    // Creation P quantity
    const pQuantity = document.createElement("p");
    pQuantity.innerText = ("Quantité : " + productQuantity);
    cartItemContentSettings.appendChild(pQuantity);

    // Creation input ajout d'attribut insertion quantité sélectionner par le client 
    const inputCommande = document.createElement("input");
    inputCommande.setAttribute("type", "number");
    inputCommande.classList.add("itemQuantity");
    inputCommande.setAttribute("name", "itemQuantity");
    inputCommande.setAttribute("min", 1);
    inputCommande.setAttribute("max", 100);
    inputCommande.setAttribute("value", productQuantity)
    cartItemContentSettings.appendChild(inputCommande);

    // Creation class="cart__item__content__settings__delete

    const supprimerArticle = document.createElement("div");
    supprimerArticle.classList.add("cart__item__content__settings__delete");
    cartItemContentSettings.appendChild(supprimerArticle);
    // Création paragraphe supprimer

    const actionSupprimerArticle = document.createElement("p");
    actionSupprimerArticle.classList.add("deleteItem");
    actionSupprimerArticle.innerText = ("Supprimer");
    supprimerArticle.appendChild(actionSupprimerArticle);


    // Add event listener il se passe quelquechose au niveau du click supprimer article

    actionSupprimerArticle.addEventListener("click", function suppresionArticle(event) {
        console.log(event.target);
        const pDeleteItem = event.target;
        const articleItem = pDeleteItem.closest("article");
        console.log(articleItem);
        const productId = articleItem.getAttribute("data-id");
        const productColor = articleItem.getAttribute("data-color");
        removeFromCart(productId, productColor);
        articleItem.remove();
        // Alerte pour confirmer la suppression
        alert("Votre article a bien été supprimer");
        // On recharge la page
        //document.location.reload();


    })
};
function removeFromCart(productId, productColor) {
    //J'aurais besoin de récupérer la quantité au panier 
    // 1 - Récupérer l'ID la couleur  et le supprimer dans le local storage
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    // Cible 
    // let foundIndexProduct = productInLocalStorage.findIndex(product => productColor == product.color && productId == product.productId);
    //console.log(foundIndexProduct);
    //  Supprimer element du tableau et ensuite renvoie le tableau local storage
    const filteredProducts = productInLocalStorage.filter((product) => productColor !== product.color || productId !== productId)
    localStorage.setItem("product", JSON.stringify(filteredProducts));

    // Création cart__price
    let syntheseQuantity = document.getElementById("totalQuantity");
    syntheseQuantity.setAttribute("value", productQuantity);

    let synthesePrix = document.getElementById("totalPrice")
    synthesePrix = number(productDetails.price * productQuantity);
};



