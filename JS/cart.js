let cartItemsArray = new Array();

let cameraCartObject = {
    name        : '',
    _id         : '',
    itemOption  : '',
    price       : '',
    imageUrl    : '',
    quantity    : ''
};

const addToCart = () => {
    let addToCart = document.getElementById('addToCart');
    if (addToCart === null){
        return;
    } else {
            addToCart.addEventListener('click', e=> {
            readItemInfo ();
        });
    };
    return;
};

const localStorageResume = () => {
    //Cart Resume
    let arrayCartItemsCallback = localStorage.getItem('arrayCartItems');
    if (arrayCartItemsCallback === null){
        return;
    } else {
        arrayCartItemsCallback = JSON.parse(arrayCartItemsCallback, cameraCartObject);
        resumeCartItems (Array.from(arrayCartItemsCallback));
        numberOfCartItems (Array.from(arrayCartItemsCallback));
    };
    return;
};

const storeToLocalStorage = (items) =>{
    let jsToString = JSON.stringify(items, cameraCartObject);
    localStorage.setItem('arrayCartItems', jsToString);
};

const resumeCartItems = (arrayOfItems) => {
    console.table(arrayOfItems);
    if (arrayOfItems == ''){
        console.log('hello');
    } else{
        for (let i = 0; i < arrayOfItems.length; i++){
            console.table(arrayOfItems[i]);
            let object = {
                name        : arrayOfItems[i].name,
                _id         : arrayOfItems[i]._id,
                itemOption  : arrayOfItems[i].itemOption,
                price       : arrayOfItems[i].price,
                imageUrl    : arrayOfItems[i].imageUrl,
                quantity    : arrayOfItems[i].quantity
            };
            cartItemsArray.push(object);
            console.table(arrayOfItems);
        };
    };
    showCartItems(cartItemsArray);
};

const numberOfCartItems = (arrayOfItems) => {
    let quantity = 0;
    for (let i = 0; i < arrayOfItems.length; i++) {
        let base=10;
        quantity += parseInt(arrayOfItems[i].quantity, base);
    };
    showNumberOfCartItems (quantity);
    return (quantity);
};

const clearCart = () => {
    let itemsInCart = localStorage.getItem('arrayCartItems');
    itemsInCart = {};
    let jsToString = JSON.stringify(itemsInCart, cameraCartObject);

    cartItemsParsed = 0;
    localStorage.setItem('arrayCartItems', jsToString);
    showNumberOfCartItems(cartItemsParsed);
    clearCartDiv();
    return;
};

const clearCartDiv = () =>{
    document.getElementById('showCartItems').innerHTML=" ";    
};

const cartPrice = () => {
    let writeCartPrice = document.getElementById('writeCartPrice');
    let writeCartPriceDropdown = document.getElementById('writeCartPriceDropdown');

    let calcul = 0;
    for (let i= 0; i< cartItemsArray.length; i++){
        let price    = cartItemsArray[i].price;
        let quantity = cartItemsArray[i].quantity;
        calcul += (price*quantity);
    };
    writeCartPriceDropdown.textContent='TOTAL : '+calcul+'€';
    if (writeCartPrice == null){
        return;
    } else {
        writeCartPrice.textContent='TOTAL : '+calcul+'€';
    };
};

const showNumberOfCartItems = (numberOfItems) => {
    document.getElementById('numberOfCartItems').innerText=numberOfItems;
};

const showCartItems = (myArray) =>{
    console.table(myArray);
    if (myArray == ''){
        console.log('le panier est vide');
        showEmptyCart('showCartItems');
    } else {
        clearCartDiv();
        for (let i = 0; i < myArray.length; i++) {
            let tr = document.createElement('tr');
            let html = ``;
            html = `<tr>
                    <td>${myArray[i].name}</td>
                    <td>${myArray[i].itemOption}</td>
                    <td>
                        <input type="number" value=${myArray[i].quantity} min=1 max=10 class="form-control" id="inputCartQuantity">
                    </td>
                    <td>${myArray[i].price}€</td>
                    <td>
                        <button type="button" class="cartItemId btn btn-outline-dark" aria-label="supprimer du panier">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>`;
            htmlToTr(tr, html,'showCartItems');
        };
    };

    numberOfCartItems(myArray);
    storeToLocalStorage(myArray);
    return;
};

const showCartDetails = () =>{
    let items = cartItemsArray;
    console.table(items);
    if (items == ''){
        console.log('la page panier est vide');
        showEmptyCart('showCartDetails');
        cartPrice();
    } else {
        for (let i = 0; i < items.length; i++) {
            let tr      = document.createElement('tr');
            let html    = ``;
                html    = `
                            <td>${items[i].name} toto</td>
                            <td>${items[i].itemOption}</td>
                            <td>
                                <input type="number" value=${items[i].quantity} min=1 max=10 class="form-control" id="inputCartQuantity">
                            </td>
                            <td>${items[i].price}€</td>
                            <td>
                                <button type="button" class="cartItemId btn btn-outline-dark" aria-label="supprimer du panier">
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </td>`;
            htmlToTr(tr, html,'showCartDetails');
        };
        cartPrice();
    };
    return;
};

const showEmptyCart = (divId) => {
    let tr   = document.createElement('tr');
    let html = ``;
        html = `
            <td>Votre panier est vide</td>
            <td>Votre panier est vide</td>
            <td>Votre panier est vide</td>
            <td>Votre panier est vide</td>
            <td>Votre panier est vide</td>
        `;
    htmlToTr(tr, html,divId);
};

const htmlToTr = (tr, html,divId) =>{
    tr.innerHTML+=html;
    let showCartDetails = document.getElementById(divId);
    if (showCartDetails === null){
        return;
    } else {
        showCartDetails.appendChild(tr)
    };
};

const readItemInfo = () =>{
    let itemInfo        = document.getElementById('itemInfo');
    let itemName        = itemInfo.textContent;
    let itemId          = itemInfo.dataset.itemId;
    let itemOption      = document.querySelector("input[name='lense']:checked").dataset.lenseId;
    let itemPrice       = itemInfo.dataset.itemPrice;
    let itemImageUrl    = itemInfo.dataset.itemImageUrl;
    let itemQuantity    = document.getElementById('inputQuantity').value;
    
    let object = {
        name        : itemName,
        _id         : itemId,
        itemOption  : itemOption,
        price       : itemPrice,
        imageUrl    : itemImageUrl,
        quantity    : itemQuantity
    };
  
    cartItemsArray.push(object);
    showCartItems(cartItemsArray);
};

const clearCartPageListener = () => {
    let clearCartPage = document.getElementById('clear-cart-page');
    if (clearCartPage == null){
        return;
    } else {
        clearCartPage.addEventListener('click', e=>{
            clearCart();
        });
    };
};

const cartValidationPageListener = () => {
    let cartValidation = document.getElementById('cartValidation');
    if (cartValidation == null){
        return;
    } else {
        cartValidation.addEventListener('click', e=>{
            if (cartItemsArray == ''){
                e.preventDefault();
                alert('Votre panier est vide');
            } else {
                return;
            };
        });
    };
};

document.onload = localStorageResume();
document.onload = addToCart();
document.onload = showCartDetails();
document.onload = clearCartPageListener();
document.onload = cartValidationPageListener();

document.getElementById('clear-cart').addEventListener('click', e=>{
    clearCart();
});