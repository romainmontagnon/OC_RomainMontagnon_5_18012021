function localStorageResume(){
    let cartItems = localStorage.getItem('cartItems');
    console.log(cartItems);
    if (cartItems===null){
        cartItems=0;
    }
    showNumberOfCartItems(cartItems);
    console.log(cartItems);
};


function addOneToCart(){
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

function minusOneToCart(){
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

function clearCart (){
    // console.log("appel fonction clear");
    let cartItems = localStorage.getItem('cartItems');
    cartItems = 0;
    localStorage.setItem('cartItems', cartItems);
    showNumberOfCartItems(cartItems);
}

function showNumberOfCartItems(cartItems){
    document.getElementById('numberOfCartItems').innerText=cartItems;
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