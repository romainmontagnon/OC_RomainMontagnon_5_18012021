let cartItemsArray = new Array()
let base=10;

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
    let cartItems = localStorage.getItem('cartItems');
    let cartItemsParsed = parseInt(cartItems, base);
    cartItemsParsed = 0;
    cartItemsArray = new Array
    localStorage.setItem('cartItems', cartItemsParsed);
    showNumberOfCartItems(cartItemsParsed);
}


const showNumberOfCartItems = (numberOfItems) => {
    // console.log(typeof(numberOfItems));
    document.getElementById('numberOfCartItems').innerText=numberOfItems;
};

const readQuantityOption = (value) =>{
    let itemOption = document.getElementsByClassName('item-option');
    let inputQuantity = document.getElementById('inputQuantity');
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
                    createItemForCart(itemOption[i].dataset.itemId, itemOption[i].dataset.lenseId, inputQuantity.value, result);
                });            
        };  
    };
    
};

const createItemForCart = (itemId, itemOption, quantity, data) => {
    //console.log(itemId, itemOption, quantity, data);
    for (let i = 0; i < data.length; i++) {
        if(data[i]._id===itemId){
            console.log("matching ID");
            console.log(data[i]);
            let item = new Array()
                item['name']=data[i].name;
                item['_id']=data[i]._id;
                item['itemOption']=itemOption;
                item['price']=data[i].price;
                item['imageUrl']=data[i].imageUrl;
                item['quantity']=quantity;
            //console.table(item);
            arrayCartItems (cartItemsArray, item);
        };
        
    };
};

const arrayCartItems = (cartItemsArray, item) =>{
    cartItemsArray.push(item);
    numberOfCartItems(cartItemsArray);
    showCartItems(cartItemsArray);
    console.table(cartItemsArray);
    console.table(item);
    //Ce code permet de stocker un ARRAY dans un local storage
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
                <th scope="row">1</th>
                <td>${cartItemsArray[i].name}</td>
                <td>${cartItemsArray[i].itemOption}</td>
                <td>
                    <input type="number" value=${cartItemsArray[i].quantity} min=1 max=10 class="form-control" id="inputQuantity">
                </td>
                <td>${cartItemsArray[i].price} €</td>`;
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