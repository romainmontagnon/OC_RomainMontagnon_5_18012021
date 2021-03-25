const showResult = (items) => {
    for (let i = 0; i < items.length; i++){
        let li = createLi(items[i]);
    };
};

const showProductDetailFetch = () => {
    let paramString=window.location.href;
    let searchParams = new URL(paramString).searchParams;

    let itemID = searchParams.get('id');
    if (itemID === null){
        return;
    } else {
        let hostAdress = 'http://localhost:3000/api/cameras/';
        let url = hostAdress+itemID;

        fetch(url)
            .then(function (response){
                return  response.json();
            })
            .then(function (result){
                console.table(result);
                productPageDetails(result);
            });
    };
};

const productPageDetails = (e) =>{
    let div = document.createElement('div');
    let html =  `
                <div id="carouselLanding" class="carousel slide position-relative" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" id="product-img">
                            <img src=${e.imageUrl} class="d-block w-100" alt="appareil fujifilm">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <h2 class="text-dark fw-normal my-3" id='itemInfo' data-item-name='${e.name}' data-item-id=${e._id} data-item-price=${e.price} data-item-image-url=${e.imageUrl}>${e.name}</h2>
                        <h3 class="text-dark fw-normal my-3">Description</h3>
                        <p class="ps-4">${e.description}</p>
                    </div>`;
                        
                    html+=`                        
                    <div class="col-4">
                        <h3 class="text-dark fw-normal my-3">Options</h3>
                        <div>`;
                        for (let i = 0; i < e.lenses.length; i++) {                        
                        html+=`
                            <div class="form-check form-switch">
                            <input class="form-check-input item-option" checked type="radio" data-item-id=${e._id} data-lense-id="${e.lenses[i]}" name="lense" id="lense1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                ${e.lenses[i]}
                            </label>
                        </div>`;
                        };
    div.innerHTML = html
    document.getElementById('myProductDetail').appendChild(div);
};

const createLi = (item) =>{
    let li = document.createElement('li');
    let html = `
                <div class="card bg-light my-3 mx-auto w-75">
                    <div class="card-body">
                        <img src=${item.imageUrl} class="card-img-top mw-100" alt="photo du produit ${item.name}">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text px-4">${item.description}</p>
                        <ul class="list-unstyled">
                            <li><h6>Optique : </h6>`;
                            
                        for (let i = 0; i < item.lenses.length; i++) {
                            html += `<p class="ps-4">${item.lenses[i]}</p>`;                             
                        };
                            
                            html +=`
                            </li>
                            <li><h6>Prix : </h6></li>
                        </ul>
                        <a href="shop_product.html?id=${item._id}" class="btn btn-primary ms-4 product-detail-link"><span>${item.price} €</span></a>
                    </div>
                </div>`;
    li.innerHTML = html;
    let myList = document.getElementById('myList');
    if (myList === null){
        return;
    } else {
        myList.appendChild(li);
    };
    return li;
};

const showProductsFetch = () =>{
    console.log('Lancement de la requete FETCH');
    fetch("http://localhost:3000/api/cameras")
        .then(function (response){
            return  response.json();
        })
        .then(function (result){
            console.table(result);
            showResult(result);
        });
};

const readOrderId = () =>{
    let paramString=window.location.href;
    let searchParams = new URL(paramString).searchParams;

    let orderId = searchParams.get('id');
    if (orderId === null){
        return;
    } else {
        // console.log(orderId);
        displayOrderId = document.getElementById('orderId');
        displayOrderId.textContent += orderId;
        clearCart();
        sessionStorage.clear();
    };
}

const onLoadFunctionCall = ()=>{
    let url             = window.location.href;
    let pageShop        = url.search('shop.html');
    let pageShopProduct = url.search('shop_product.html')
    let finalOrderPage  = url.search('payment.html');

    if (pageShop != -1){
        // console.log('page Boutique');
        showProductsFetch();
    } else if (pageShopProduct != -1){
        // console.log('page Details Produit');
        showProductDetailFetch();
    } else if (finalOrderPage != -1){
        // console.log('page de fin de commande');
        readOrderId();
    } else {
        return;
    };
};

document.onload = onLoadFunctionCall ();