const localStorageResume = () => {
    let cartItems = localStorage.getItem('cartItems');
    console.log(cartItems);
    if (cartItems===null){
        cartItems=0;
    }
    showNumberOfCartItems(cartItems);
    console.log(cartItems);
};


const addOneToCart = () => {
    // console.log("appel fonction +");
    // console.log(numberOfItems);
    let cartItems = localStorage.getItem('cartItems');
    cartItems++;
    if (cartItems <= 0){
        cartItems=0;
    }
    localStorage.setItem('cartItems', cartItems);
    showNumberOfCartItems(cartItems);
};

const minusOneToCart = () => {
    // console.log("appel fonction +");
    // console.log(numberOfItems);
    let cartItems = localStorage.getItem('cartItems');
    cartItems--;
    if (cartItems <= 0){
        cartItems=0;
    }
    localStorage.setItem('cartItems', cartItems);
    showNumberOfCartItems(cartItems);
};

const clearCart = () => {
    // console.log("appel fonction clear");
    let cartItems = localStorage.getItem('cartItems');
    cartItems = 0;
    localStorage.setItem('cartItems', cartItems);
    showNumberOfCartItems(cartItems);
}

const showNumberOfCartItems = (cartItems) => {
    document.getElementById('numberOfCartItems').innerText=cartItems;
};

const options = () => {
    let itemOption = document.getElementsByClassName('item-option');
    console.log(itemOption);
    for (let i = 0; i < itemOption.length; i++){
        if (itemOption[i].checked==true) {
            console.warn(itemOption[i].dataset);
            addItemToCart(itemOption[i].dataset);
        };  
    };
};

const quantity = () => {
    let inputQuantity = document.getElementById('inputQuantity');
    console.log(inputQuantity.value);
};

const addItemToCart = (value) =>{
    console.log(value);
};

document.getElementById('cart-plus-one').addEventListener('click', e=>{
    // console.log("+1");
    addOneToCart();
});
document.getElementById('cart-minus-one').addEventListener('click', e=>{
    // console.log("-1");
    minusOneToCart();
});

document.getElementById('clear-cart').addEventListener('click', e=>{
    // console.log("CLEAR CART");
    clearCart();
});

document.getElementById('addToCart').addEventListener('click', e=> {
    options ();
    quantity();
});