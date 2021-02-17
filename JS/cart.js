let numberOfItems = 0;

function addOneToCart(){
    console.log("appel fonction +");
    console.log(numberOfItems);
    numberOfItems++;
    if (numberOfItems <= 0){
        numberOfItems=0;
    }
    showNumberOfCartItems();
};

function minusOneToCart(){
    console.log("appel fonction +");
    console.log(numberOfItems);
    numberOfItems--;
    if (numberOfItems <= 0){
        numberOfItems=0;
    }
    showNumberOfCartItems();
};

function showNumberOfCartItems(){
    document.getElementById('numberOfCartItems').innerText=numberOfItems;
    console.log(numberOfItems);
};














document.getElementById('cart-plus-one').addEventListener('click', e=>{
    console.log("+1");
    addOneToCart();
});
document.getElementById('cart-minus-one').addEventListener('click', e=>{
    console.log("-1");
    minusOneToCart();
});