//Affichage panier

const cartList = document.getElementById("cart__items");

//Premier objectif récupérer le array dans le localstorage

let ElementsLocalStorage = JSON.parse(localStorage.getItem("product"));
if (ElementsLocalStorage === null) {
    ElementsLocalStorage = []
}
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
            console.log("données reçues")
            displayProduct(productDetails, productColor, productQuantity)
            console.log(productDetails)
            /** on ajoute le prix pour chacun des produits dans ElementsLocalStorage */
            product.price = productDetails.price
            updateTotalPrice()
            updateTotalQuantity()
        })
    console.log(product)
};
console.log("après la boucle fetch")
function displayProduct(productDetails, productColor, productQuantity) {
    //  Créer (document.create element) les élèments HTML page cart
    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    cartArticle.setAttribute("data-id", productDetails._id);
    cartArticle.setAttribute("data-color", productColor);
    document.getElementById("cart__items").appendChild(cartArticle);
    const cartImgItem = document.createElement("div");
    cartImgItem.classList.add("cart__item__img");
    cartArticle.appendChild(cartImgItem);


    //  Création image
    const img = document.createElement("img");
    // Comment la relier au choix du canapé au niveau de l'image
    img.setAttribute("src", productDetails.imageUrl);
    img.setAttribute("alt", productDetails.altText);
    cartImgItem.appendChild(img);

    //Création description

    const cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    cartArticle.appendChild(cartItemContent)

    //Création description détaillé

    const cartiItemContentDescription = document.createElement("div");
    cartiItemContentDescription.classList.add("cart__item__content__description");
    cartItemContent.appendChild(cartiItemContentDescription);

    // Création h2

    const nomDuProduit = document.createElement("h2");
    nomDuProduit.innerText = productDetails.name;
    cartiItemContentDescription.appendChild(nomDuProduit);

    // Comment mettre le nom du produit  // Paragraphe couleur

    const colorProduitCart = document.createElement("p");
    colorProduitCart.innerText = productColor;
    cartiItemContentDescription.appendChild(colorProduitCart);

    //Prix

    const prixProduitCart = document.createElement("p");

    // Comment récupérer prix

    prixProduitCart.innerText = productDetails.price + " €";
    cartiItemContentDescription.appendChild(prixProduitCart)

    // Creation div cart__item__content__setting

    const cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__setting");
    cartItemContent.appendChild(cartItemContentSettings);

    // Creation P quantity

    const pQuantity = document.createElement("p");
    pQuantity.innerText = ("Quantité : ");
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
    inputCommande.addEventListener("change", function modificationArticle(event) {
        console.log(event.target);
        const inputModification = event.target;
        const article = inputCommande.closest("article");
        const recuperationId = article.getAttribute("data-id");
        const recuperationColor = article.getAttribute("data-color");
        const recuperationQuantity = inputModification.value;
        const quantityNumber = parseInt(recuperationQuantity, 10);
        if (quantityNumber < 1 || quantityNumber > 100) {
            location.reload();
            return alert("La quantité doit être comprise entre 1 et 100");
        }
        modifierPanier(recuperationId, recuperationColor, recuperationQuantity)
    })

    // Fonction fenêtre pop up


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
        location.reload();
    })

    function newFunction() {
        alert("La quantité doit être comprise entre 1 et 100");
    }
};

function removeFromCart(productId, productColor) {
    /* On écrase le tableau ElementsLocalStorage par le résultat du filtre On retire le produit correspondant à celui sur lequel ont vient de cliquer du tableau
    Le produit correspondant sera celui qui a la même couleur et id dans le tableau que celui cliqué */
    let ElementsLocalStorage = JSON.parse(localStorage.getItem("product"));
    ElementsLocalStorage = ElementsLocalStorage.filter((product) => productColor !== product.color || productId !== product.productId)



    /* On envoie le tableau de produits sans les prix dans le storage, après l'avoir stringify */

    localStorage.setItem("product", JSON.stringify(ElementsLocalStorage));

    /** On appelle les fonctions pour mettre à jour la quantité et le prix total */
    updateTotalPrice()
    updateTotalQuantity()

}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById("totalPrice");
    let newTotalPrice = 0
    for (const product of ElementsLocalStorage) {
        newTotalPrice += product.price * product.itemQuantity
    }
    totalPriceElement.innerText = newTotalPrice
}

function updateTotalQuantity() {
    const totalQuantityElement = document.getElementById("totalQuantity");
    let newTotalQuantity = 0;
    for (const product of ElementsLocalStorage) {
        newTotalQuantity += product.itemQuantity;
    }
    totalQuantityElement.innerText = newTotalQuantity;
}


// Fonction de modification
function modifierPanier(recuperationId, recuperationColor, recuperationQuantity) {
    // Trouver l'index de l'élément à modifier
    let ElementsLocalStorage = JSON.parse(localStorage.getItem("product"));
    let foundIndexProduct = ElementsLocalStorage.findIndex((product) => recuperationColor === product.color && recuperationId === product.productId);
    /* On envoie le tableau de produits sans les prix dans le storage, après l'avoir stringify */
    ElementsLocalStorage[foundIndexProduct].itemQuantity = parseInt(recuperationQuantity);
    console.log(typeof recuperationQuantity);
    // Modifier la quantité d’un produit en fonction de son index depuis le LocalStorage, ligne 192
    console.log(foundIndexProduct);
    localStorage.setItem("product", JSON.stringify(ElementsLocalStorage));
    // Modifier l'élément dans le tableau
    location.reload();

    // Mettre à jour le panier avec les modifications apportées
    //console.log(panier);
}

//////////////////////////   Contrôle de validité et envoi du formulaire avec un post request   ////////////////////////////////

// J'assigne une variable à chaque élément du HTML concernés avec querySelector.

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
const firstNameErr = document.querySelector("#firstNameErrorMsg");
const lastNameErr = document.querySelector("#lastNameErrorMsg");
const addressErr = document.querySelector("#addressErrorMsg");
const cityErr = document.querySelector("#cityErrorMsg");
const emailErr = document.querySelector("#emailErrorMsg");

// J'établis des regex pour le contrôle des champs.
const cityNameRegEx = /^[a-zA-Zàâäéèêëïîôöùûüç '-]+$/;
const addressRegEx = /^([0-9]{1,4}[,. ]{1})?[-a-zA-Zàâäéèêëïîôöùûüç ]+$/
const emailRegEx = /^([a-z\d\.-]+)@([a-z\d-.]+)(\.[a-z]{2,8})$/;

const cityNameMessageError = "Ce champs ne requiert que des lettres";
const mailMessageError = "Ce champs attends le format mail@example.com ";
const addressMessageError = "Ce champs accepte des chiffres des lettres  virgule points et tirets"
// La fonction suivante permet de vérifier la validité des informations
// rentrées par l'utilisateur dans les champs du formulaire.

formControl = () => {

    const testFormulaire = (name, regEx, error, errorMessage) => {
        if ((name.value).match(regEx)) {
            error.innerHTML = "";
        } else {
            error.innerHTML = errorMessage;
            return false;
        }
    };
    // Je met un event change dans la méthode addeventlistener pour qu'un éventuel message d'erreur
    // ne s'affiche que lorsque l'utilisateur a quitté le champ de saisi.

    firstName.addEventListener("change", () => {
        testFormulaire(firstName, cityNameRegEx, firstNameErr, cityNameMessageError);
    });
    lastName.addEventListener("change", () => {
        testFormulaire(lastName, cityNameRegEx, lastNameErr, cityNameMessageError);
    });
    address.addEventListener("change", () => {
        testFormulaire(address, addressRegEx, addressErr, addressMessageError);
    });
    city.addEventListener("change", () => {
        testFormulaire(city, cityNameRegEx, cityErr, cityNameMessageError);
    });
    email.addEventListener("change", () => {
        testFormulaire(email, emailRegEx, emailErr, mailMessageError);
    });
}

formControl();

// La fonction suivante permet de vérifier s'il n'y a pas de champs vides ou d'erreurs dans le formulaire 
// ou si le panier n'est pas vide.

const form = document.querySelector(".cart__order__form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (firstName.value == "" || lastName.value == "" || address.value == "" || city.value == "" || email.value == "") {

        alert("Veuillez remplir tous les champs du formulaire");
    }
    else if (firstNameErr.innerHTML !== "" || lastNameErr.innerHTML !== "" || addressErr.innerHTML !== "" || cityErr.innerHTML !== "" || emailErr.innerHTML !== "") {
        alert("Veuillez vérifier les erreurs dans le formulaire");
    }
    else if (ElementsLocalStorage === null || ElementsLocalStorage.length === 0) {
        alert('Votre panier est vide, veuillez choisir un article');
        window.location.href = "index.html";
    }
    else if (confirm("Confirmez-vous votre commande ? ") == true) {
        let confirmationPanier = [];
        for (let i = 0; i < ElementsLocalStorage.length; i++) {
            confirmationPanier.push(ElementsLocalStorage[i].productId);
        }
        // Les informations du formulaire et les produits sélectionnés sont récupérés
        // dans l'objet order.    
        let order = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: confirmationPanier
        };
        // Les données de l'objet order sont envoyées au serveur avec la méthode post.
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch('http://localhost:3000/api/products/order', options)
            .then(res => res.json())
            .then(data => {
                localStorage.removeItem("product");
                // La propriété window.location.href avec l'url confirmation.html nous redirige vers cette 
                // dernière si la commande est réussi. On passe l'id de commande en valeur de la variable
                // ?orderId dans la chaîne de requête. La réponse du post nous renvoi un numéro de commande
                // qui sera affiché dans la page confirmation.html.
                window.location.href = "confirmation.html?orderId=" + data.orderId;
            })
            .catch(error => {
                alert(error);
            })
    }
    else {
        return false;
    }
});
console.log("fin du script");