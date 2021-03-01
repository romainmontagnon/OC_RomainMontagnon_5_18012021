let numberOfItems = 0;

// function localStorageResume(){
//     let cartItems = localStorage.getItem('cartItems');
//     numberOfItems = cartItems;
//     showNumberOfCartItems();
//     console.log(cartItems);
// };


function addOneToCart(){
    // console.log("appel fonction +");
    // console.log(numberOfItems);
    numberOfItems++;
    if (numberOfItems <= 0){
        numberOfItems=0;
    }
    showNumberOfCartItems();
};

function minusOneToCart(){
    // console.log("appel fonction +");
    // console.log(numberOfItems);
    numberOfItems--;
    if (numberOfItems <= 0){
        numberOfItems=0;
    }
    showNumberOfCartItems();
};

function clearCart (){
    // console.log("appel fonction clear");
    numberOfItems = 0;
    showNumberOfCartItems();
}

function showNumberOfCartItems(){
    document.getElementById('numberOfCartItems').innerText=numberOfItems;
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