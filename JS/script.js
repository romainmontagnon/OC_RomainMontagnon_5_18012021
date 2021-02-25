function showResult (items){
    for (let i = 0; i < items.length; i++){
        function showResult (items){
            for (let i = 0; i < items.length; i++){
                // console.log(items[i].name);
                // console.table(items[i]);
                let li = createLi(items[i]);
                // console.log(li);
                //document.getElementById('myList').appendChild(li);
                //affichage(items[i]);
            };
        };
        let li = createLi(items[i]);
    };
};

function showProduct (items){
    console.log('showProduct()');
    let itemID = localStorage.getItem('itemID');
    //console.log(itemID);
    for (let i = 0; i < items.length; i++){
        let itemsID = (items[i]._id);
        console.log(itemsID);
        if(itemID===itemsID){
            console.warn(itemID);
            productPageDetails(items[i]);
        } else {
            console.error(itemsID);
        };
    };
};

function productPageDetails(e){
    console.log(e);
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
                        <h2 class="text-dark fw-normal my-3">${e.name}</h2>
                        <h3 class="text-dark fw-normal my-3">Description</h3>
                        <p class="ps-4">${e.description}</p>
                        <h3 class="text-dark fw-normal my-3">Options</h3>
                        <p class="ps-4">${e.lenses[0]}</p>
                        <p class="ps-4">${e.lenses[1]}</p>
                    </div>
                    <div class="col-4">
                        <h2 class="text-dark fw-normal my-3">En cours</h2>
                        <h3 class="text-dark fw-normal my-3">Choix</h3>
                        <div class="row">
                            <div class="col form-check form-switch">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                ${e.lenses[0]}
                            </label>
                            </div>
                            <div class="col form-check form-switch">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                ${e.lenses[1]}
                            </label>
                            </div>
                        </div>
                        <div class="row">
                            <button type="button" class="col-2 h-50 my-auto btn btn-primary">+</button>
                                <div class="h-50 col-5 form-floating">
                                    <select class="form-select" id="floatingSelect" aria-label="Choisir la quantité">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">3</option>
                                        <option value="user">user define</option>
                                    </select>                                </div>
                            <button type="button" class="col-2 h-50 my-auto btn btn-primary">-</button>
                        </div>
                        <p class="ps-4">${e.description}</p>
                        <h3 class="text-dark fw-normal my-3">Options</h3>
                        <p class="ps-4">${e.lenses[0]}</p>
                        <p class="ps-4">${e.lenses[1]}</p>
                    </div>
                </div>
    `
    div.innerHTML = html
    document.getElementById('myProductDetail').appendChild(div);
};

function getID(){
    let listeDeClass = document.getElementsByClassName('product-detail-link');
    console.log(listeDeClass);
    for (let i = 0; i < listeDeClass.length; i++) {
        let element = listeDeClass[i];
        element.addEventListener('click', e=>{
            console.log(e.path[0].id);
            console.log(e.path);
            localStorage.setItem('itemID', e.path[0].id);
            let itemID = localStorage.getItem('itemID');
            console.log(itemID);
        });
    };
};

function createLi(item){
    let li = document.createElement('li');
    let html = `
                <div class="card bg-light my-3 mx-auto w-75">
                    <div class="card-body">
                        <img src=${item.imageUrl} class="card-img-top" alt="photo du produit ${item.name}" class="mw-100">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text px-4">${item.description}</p>
                        <ul class="list-unstyled">
                            <li><h6>Optique : </h6><span class="ps-4">${item.lenses[0]}</span> </br> <span class="ps-4">${item.lenses[1]}</span></li>
                            <li><h6>Prix : </h6></li>
                        </ul>
                        <a href="shop_product.html" class="btn btn-primary ms-4 product-detail-link"><span id="${item._id}">${item.price} €</span></a>
                    </div>
                </div>`;
    li.innerHTML = html;
    // console.log(li);
    // console.log(item.imageUrl);
    document.getElementById('myList').appendChild(li);
    return li;
};

function fetchRequest (){
    console.log('Lancement de la requete FETCH');
    fetch("http://localhost:3000/api/cameras")
        .then(function (response){
            return  response.json();
        })
        .then(function (result){
            console.table(result);
            showResult(result);
            getID();
        });
};

function productFetchRequest (){
    console.log('Lancement de la requete FETCH');
    fetch("http://localhost:3000/api/cameras")
        .then(function (response){
            return  response.json();
        })
        .then(function (result){
            console.table(result);
            showProduct(result);
        });
};