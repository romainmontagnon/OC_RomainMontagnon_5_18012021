function ajaxRequest (){
    console.log('Lancement de la requete AJAX');
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status==200){
            let result = [];
            console.log('Création d\'un array vide'+result);
            result = JSON.parse(this.responseText);
            console.log(result);
            document.getElementById('result').innerHTML = 'Appareil : '+result[0].name+'.<br>Optique : '+result[0].lenses[0]+' ou '+result[0].lenses[1]+'.<br>Prix : '+result[0].price+' €';
            document.getElementById('picture').innerHTML = `<img scr=${result[0].imageUrl}></img>`;
            console.table(result);
            console.log(result[0]);
        }
    };
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
    console.log('Contenue de la request :');
    console.log(request);
};

function showResult (items){
    for (let i = 0; i < items.length; i++){
        function showResult (items){
            for (let i = 0; i < items.length; i++){
                console.log(items[i].name);
                console.table(items[i]);
                let li = createLi(items[i]);
                console.log(lis);
                document.getElementById('myList').appendChild(li);
                //affichage(items[i]);
            };
        };
        let li = createLi(items[i]);
        //affichage(items[i]);
    };
};

function affichage(item){
    document.getElementById('result').innerHTML = 'Appareil : '+item.name+'.<br>Optique : '+item.lenses[0]+' ou '+item.lenses[1]+'.<br>Prix : '+item.price+' €';
    document.getElementById('picture').innerHTML = `<img src=${item.imageUrl}></img>`;
};

function createLi(item){
    let li = document.createElement('li');
    //let html = 'Appareil : '+item.name+'.<br>Optique : '+item.lenses[0]+' ou '+item.lenses[1]+'.<br>Prix : '+item.price+' €<br><img src="'+item.imageUrl+'"></img>';
    let html = `
                <div class="card bg-light my-3 w-50">
                    <img src=${item.imageUrl} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <ul class="list-unstyled">
                            <li><h6>Optique : </h6><span>${item.lenses[0]}  ou ${item.lenses[1]}</span></li>
                            <li><h6>Prix : </h6><span>${item.price} €</span></li>
                        </ul>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>`
    li.innerHTML = html;
    console.log(li);
    console.log(item.imageUrl);
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
            console.log(result);
            showResult(result);
        });
};

document.getElementById('submit').addEventListener('click', e =>{
    // ajaxRequest();
    // console.log('Appel de la fonction ajaxRequest');
    fetchRequest();
    console.log('Appel de la fonction fetchRequest');
});