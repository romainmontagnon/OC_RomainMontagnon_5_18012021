let cartItemsArray = new Array()
let base=10;

let cameraCartObject = {
    name : '',
    _id : '',
    itemOption : '',
    price : '',
    imageUrl : '',
    quantity : ''
};




const localStorageResume = () => {
    //Cart Resume
    //Number of cart items
    let cartItems = localStorage.getItem('cartItems');
    console.log(cartItems);
    if (cartItems===null){
        cartItems=0;
        let cartItemsParsed = parseInt(cartItems, base);
        showNumberOfCartItems(cartItemsParsed);
    }
    let cartItemsParsed = parseInt(cartItems, base);
    showNumberOfCartItems(cartItemsParsed);
    console.log(cartItemsParsed);

    //Cart Items Resume
    let arrayCartItemsCallback = localStorage.getItem('arrayCartItems');
    // arrayCartItemsCallback = JSON.parse(arrayCartItemsCallback, cameraCartObject);
    console.table(arrayCartItemsCallback);
    showCartItems(arrayCartItemsCallback);
};


const numberOfCartItems = () => {
    let cartItems = localStorage.getItem('cartItems');
    let cartItemsParsed = parseInt(cartItems, base);
    //console.log(cartItemsParsed);
    let newNumber = 0;
    //cartItems = cartItemsArray.length;
    for (let i = 0; i < cartItemsArray.length; i++) {
        let cartItemsArrayParsed = parseInt(cartItemsArray[i].quantity, base);
        // console.log(cartItemsArrayParsed);
        newNumber = cartItemsArrayParsed;
    }
    if (cartItemsParsed <= 0){
        cartItemsParsed=0;
    }
    cartItemsParsed += newNumber;
    localStorage.setItem('cartItems', cartItemsParsed);
    showNumberOfCartItems(cartItemsParsed);
};

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

const clearCart = () => {
    // console.log("appel fonction clear");
    let numberOfCartItems = localStorage.getItem('cartItems');
    let cartItemsParsed = parseInt(numberOfCartItems, base);

    let itemsInCart = localStorage.getItem('arrayCartItems');
    itemsInCart = {};

    cartItemsParsed = 0;
    cartItemsArray = new Array();
    localStorage.setItem('arrayCartItems', itemsInCart);
    localStorage.setItem('cartItems', cartItemsParsed);
    showNumberOfCartItems(cartItemsParsed);
    document.getElementById('showCartItems').innerHTML=" ";
    return;
};


const showNumberOfCartItems = (numberOfItems) => {
    // console.log(typeof(numberOfItems));
    document.getElementById('numberOfCartItems').innerText=numberOfItems;
};

const readQuantityOption = (value) =>{
    //let itemOption = document.getElementsByClassName('item-option');
    let itemOption = readItemOption();
    // let inputQuantity = document.getElementById('inputQuantity');
    let inputQuantity = readQuantity();
    console.log(inputQuantity.value);
    for (let i = 0; i < itemOption.length; i++){
        if (itemOption[i].checked==true) {
            console.warn(itemOption[i].dataset);
            fetch("http://localhost:3000/api/cameras")
                .then(function (response){
                    return  response.json();
                })
                .then(function (result){
                    console.table(result);
                    //let inputQuantity = readQuantity();
                    createItemForCart(itemOption[i].dataset.itemId, itemOption[i].dataset.lenseId, inputQuantity.value, result);
                });            
        };  
    };
    
};

const readItemOption = () =>{
    let itemOption = document.getElementsByClassName('item-option');
    return itemOption;
};

const readQuantity = () =>{
        let inputQuantity = 0;
        inputQuantity = document.getElementById('inputQuantity');
        return inputQuantity;
};

const createItemForCart = (itemId, itemOption, quantity, data) => {
    //console.log(itemId, itemOption, quantity, data);
    for (let i = 0; i < data.length; i++) {
        if(data[i]._id===itemId){
            console.log("matching ID");
            console.log(data[i]);
            let item = {
                    name : data[i].name,
                    _id : data[i]._id,
                    itemOption : itemOption,
                    price : data[i].price,
                    imageUrl : data[i].imageUrl,
                    quantity : quantity
                };
            console.table(item);
            console.log(typeof(item));
            arrayCartItems (item);
        };
        
    };
};


const arrayCartItems = (item) =>{
    cartItemsArray.push(item);
    numberOfCartItems(cartItemsArray);
    showCartItems(cartItemsArray);
    console.table(cartItemsArray);
    console.log(typeof(item));
    // console.table(item);
    let jsToString = JSON.stringify(cartItemsArray, cameraCartObject);
    console.log(jsToString);
    localStorage.setItem('arrayCartItems', jsToString);
    // Ce code permet de stocker un ARRAY dans un local storage
    // localStorage.setItem('arrayCartItems', JSON.stringify(cartItemsArray));
    // let arrayCartItemsCallback = localStorage.getItem('arrayCartItems');
    // arrayCartItemsCallback = JSON.parse(arrayCartItemsCallback);
    // console.table(arrayCartItemsCallback);
};

const showCartItems = (cartItemsArray) =>{
    console.table(cartItemsArray);
    let tr = document.createElement('tr');
    let html = ``;
    for (let i = 0; i < cartItemsArray.length; i++) {
         html = `
                <td>${cartItemsArray[i].name}</td>
                <td>${cartItemsArray[i].itemOption}</td>
                <td>
                    <input type="number" value=${cartItemsArray[i].quantity} min=1 max=10 class="form-control" id="inputCartQuantity">
                </td>
                <td>${cartItemsArray[i].price}€</td>`;
    };
    tr.innerHTML=html;
    document.getElementById('showCartItems').appendChild(tr);
    return;
};

// document.getElementById('cart-plus-one').addEventListener('click', e=>{
//     // console.log("+1");
//     addOneToCart();
// });
// document.getElementById('cart-minus-one').addEventListener('click', e=>{
//     // console.log("-1");
//     minusOneToCart();
// });

document.getElementById('clear-cart').addEventListener('click', e=>{
    // console.log("CLEAR CART");
    clearCart();
});

document.getElementById('addToCart').addEventListener('click', e=> {
    readQuantityOption ();
});