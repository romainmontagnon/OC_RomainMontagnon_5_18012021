let cartItemsArray = new Array();

let cameraCartObject = {
    name : '',
    _id : '',
    itemOption : '',
    price : '',
    imageUrl : '',
    quantity : ''
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
    // console.table(arrayCartItemsCallback);
    if (arrayCartItemsCallback === null){
        return;
    } else {
        arrayCartItemsCallback = JSON.parse(arrayCartItemsCallback, cameraCartObject);
        // console.table(arrayCartItemsCallback);
        resumeCartItems (Array.from(arrayCartItemsCallback));   //Cart Items Resume
        numberOfCartItems (Array.from(arrayCartItemsCallback));//Number of cart items Resume
        //cartPrice();

    };
    return;
};

const storeToLocalStorage = (items) =>{
    // console.table(items)
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
                name : arrayOfItems[i].name,
                _id : arrayOfItems[i]._id,
                itemOption : arrayOfItems[i].itemOption,
                price : arrayOfItems[i].price,
                imageUrl : arrayOfItems[i].imageUrl,
                quantity : arrayOfItems[i].quantity
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
        // console.table(arrayOfItems[i].quantity);
        let base=10;
        quantity += parseInt(arrayOfItems[i].quantity, base);
        // console.log (quantity);
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
    //localStorage.setItem('cartItems', cartItemsParsed);
    showNumberOfCartItems(cartItemsParsed);
    clearCartDiv();
    return;
};

const clearCartDiv = () =>{
    document.getElementById('showCartItems').innerHTML=" ";    
};

const supprCartItem = () =>{
    let supprCartItem = document.querySelectorAll('.cartItemId');
    // console.log(supprCartItem);
    supprCartItem.forEach(event => {
        console.log(event);
        // event.addEventListener('clic', e=>{
        //     console.log(e);
        // });
        
    });
};

const cartPrice = () => {
    let writeCartPrice = document.getElementById('writeCartPrice');
    let writeCartPriceDropdown = document.getElementById('writeCartPriceDropdown');

    let calcul = 0;
    for (let i= 0; i< cartItemsArray.length; i++){
        let price = cartItemsArray[i].price;
        let quantity = cartItemsArray[i].quantity;
        calcul += (price*quantity);
        console.log(price, quantity, calcul);           
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
        console.log('la panier est vide');
        showEmptyCart('showCartItems');
    } else {
        clearCartDiv();
        for (let i = 0; i < myArray.length; i++) {
            console.log(myArray[i]);
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
    //supprCartItem();
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
            console.log(items[i].quantity);
            let tr = document.createElement('tr');
        let html = ``;
            html = `
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
    //htmlToTr(tr, html,'showCartDetails');
    return;
};

const showEmptyCart = (divId) => {
    let tr = document.createElement('tr');
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
    let itemInfo = document.getElementById('itemInfo');
    let itemName        = itemInfo.textContent;
    let itemId          = itemInfo.dataset.itemId;
    let itemOption      = document.querySelector("input[name='lense']:checked").dataset.lenseId;
    let itemPrice       = itemInfo.dataset.itemPrice;
    let itemImageUrl    = itemInfo.dataset.itemImageUrl;
    let itemQuantity    = document.getElementById('inputQuantity').value;
    
    let object = {
        name : itemName,
        _id : itemId,
        itemOption : itemOption,
        price : itemPrice,
        imageUrl : itemImageUrl,
        quantity : itemQuantity
    };
  
    cartItemsArray.push(object);
    showCartItems(cartItemsArray);
    // numberOfCartItems(cartItemsArray);

    

    // console.table(object);
    // console.table(cartItemsArray);
};

const onLoadEventListener = () => {
    let clearCartPage = document.getElementById('clear-cart-page');
    if (clearCartPage== null){
        return;
    } else {
        clearCartPage.addEventListener('click', e=>{
            clearCart();
        });
    };

    let clearCart = document.getElementById('clear-cart');
    if (clearCart== null){
        return;
    } else {
        clearCart.addEventListener('click', e=>{
            clearCart();
        });
    };
};

document.onload = localStorageResume();
document.onload = addToCart();
document.onload = showCartDetails();
document.onload = onLoadEventListener();

// document.getElementById('addToCart').addEventListener('click', e=> {
//     readItemInfo ();
// });




// const addToCart = () =>{
//     document.getElementById('addToCart').addEventListener('click', e=> {
//         e.stopImmediatePropagation();
//         readItemInfo ();
//     });
// };

// document.getElementById('cart-plus-one').addEventListener('click', e=>{
//     // console.log("+1");
//     addOneToCart();
// });
// document.getElementById('cart-minus-one').addEventListener('click', e=>{
//     // console.log("-1");
//     minusOneToCart();
// });

// const objectToArray = (object) => {
// console.log(Array.from(object));
// let array = Array.from(object);
// console.table(array);
// showCartItems (array);
// };

// const addOneToCart = () => {
//     // console.log("appel fonction +");
//     let cartItems = localStorage.getItem('cartItems');
//     cartItems++;
//     if (cartItems <= 0){
//         cartItems=0;
//     }
//     localStorage.setItem('cartItems', cartItems);
//     showNumberOfCartItems(cartItems);
// };

// const minusOneToCart = () => {
//     // console.log("appel fonction +");
//     let cartItems = localStorage.getItem('cartItems');
//     cartItems--;
//     if (cartItems <= 0){
//         cartItems=0;
//     }
//     localStorage.setItem('cartItems', cartItems);
//     showNumberOfCartItems(cartItems);
// };

// const readItemInfo = (value) =>{
//     //let itemOption = document.getElementsByClassName('item-option');
//     let itemOption = readItemOption();
//     // let inputQuantity = document.getElementById('inputQuantity');
//     let inputQuantity = readQuantity();
//     console.log(inputQuantity.value);
//     for (let i = 0; i < itemOption.length; i++){
//         if (itemOption[i].checked==true) {
//             console.warn(itemOption[i].dataset);
//             fetch("http://localhost:3000/api/cameras")
//                 .then(function (response){
//                     return  response.json();
//                 })
//                 .then(function (result){
//                     console.table(result);
//                     //let inputQuantity = readQuantity();
//                     createItemForCart(itemOption[i].dataset.itemId, itemOption[i].dataset.lenseId, inputQuantity.value, result);
//                 });            
//         };  
//     };
// };


// const createItemForCart = (itemId, itemOption, quantity, data) => {
//     //console.log(itemId, itemOption, quantity, data);
//     for (let i = 0; i < data.length; i++) {
//         if(data[i]._id===itemId){
//             console.log("matching ID");
//             console.log(data[i]);
//             let item = {
//                     name : data[i].name,
//                     _id : data[i]._id,
//                     itemOption : itemOption,
//                     price : data[i].price,
//                     imageUrl : data[i].imageUrl,
//                     quantity : quantity
//                 };
//             console.table(item);
//             console.log(typeof(item));
//             arrayCartItems (item);
//         };
        
//     };
// };


// const readItemOption = () =>{
//     let itemOption = document.getElementsByClassName('item-option');
//     return itemOption;
// };


// const readQuantity = () =>{
//         let inputQuantity = 0;
//         inputQuantity = document.getElementById('inputQuantity');
//         return inputQuantity;
// };

// const arrayCartItems = (item) =>{
//     cartItemsArray.push(item);
//     numberOfCartItems(cartItemsArray);
//     showCartItems(cartItemsArray);
//     showCartDetails(cartItemsArray);
//     let jsToString = JSON.stringify(cartItemsArray, cameraCartObject);
//     console.log(jsToString);
//     localStorage.setItem('arrayCartItems', jsToString);
    // Ce code permet de stocker un ARRAY dans un local storage
    // localStorage.setItem('arrayCartItems', JSON.stringify(cartItemsArray));
    // let arrayCartItemsCallback = localStorage.getItem('arrayCartItems');
    // arrayCartItemsCallback = JSON.parse(arrayCartItemsCallback);
    // console.table(arrayCartItemsCallback);
// };