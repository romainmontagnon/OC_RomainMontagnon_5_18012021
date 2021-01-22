document.getElementById('submit').addEventListener('click', e =>{
    console.log('lancement de la requete AJAX');
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status==200){
            let result = [];
            console.log('Création d\'un array vide'+result);
            result = JSON.parse(this.responseText);
            console.log(result);
            document.getElementById('result').innerHTML = ('Contenue : ')+result[0];
            console.table(result);
            console.log(result[0l]);
        }
    };
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
    console.log('Contenue de la request :');
    console.log(request);
});