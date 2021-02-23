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
        //affichage(items[i]);
    };
};

function getID(){
    let listeDeClass = document.getElementsByClassName('product-detail-link');
    console.log(listeDeClass);
    for (let i = 0; i < listeDeClass.length; i++) {
        let element = listeDeClass[i];
        element.addEventListener('click', e=>{
            console.log(e);
        });
        // console.log(element);
        // console.log(element.id);
        // listeDeClass.addEventListener('click', e=> {
        //     console.log(e);
        // });
        
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
                        <a href="shop_product.html" class="btn btn-primary ms-4 product-detail-link" id="${item._id}"><span>${item.price} €</span></a>
                    </div>
                </div>`;
    li.innerHTML = html;
    console.log(li);
    console.log(item.imageUrl);
    document.getElementById('myList').appendChild(li);
    let addClass = document.querySelectorAll("#myList > li");
    console.log(addClass);
    for (let i = 0; i < addClass.length; i++) {
        //let element = addClass[i];
        addClass[i].classList.add('list-inline-item', 'test');
    };
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
// document.getElementById('submit').addEventListener('click', e =>{
//     // ajaxRequest();
//     // console.log('Appel de la fonction ajaxRequest');
//     fetchRequest();
//     console.log('Appel de la fonction fetchRequest');
// });



// window.addEventListener('DOMContentLoaded', e =>{
//     // ajaxRequest();
//     // console.log('Appel de la fonction ajaxRequest');
//     fetchRequest();
// });