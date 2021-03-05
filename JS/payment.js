let customerInfo = {
    emailAdress : '',
    firstName : '',
    lastName : '',
    streetNumber : '',
    streetName : '',
    zipCode : '',
    city : '',
    country : ''
};


const lireFormulaireClient = () => {
    let emailAdress     = document.getElementById('emailAdress');
    let firstName       = document.getElementById('firstName');
    let lastName        = document.getElementById('lastName');
    let streetNumber    = document.getElementById('streetNumber');
    let streetName      = document.getElementById('streetName');
    let zipCode         = document.getElementById('zipCode');
    let city            = document.getElementById('city');
    let country         = document.getElementById('country');
    console.log('j ai les infos');
};

const validationFormulaireListener = () => {
    console.log('je suis loader')
    let validationFormulaire = document.getElementById('validationFormulaire');
    console.log(validationFormulaire);
    if (validationFormulaire == null){
        return;
    } else {
        validationFormulaire.addEventListener('click', e=>{
            console.log('hello');
            e.preventDefault();
            lireFormulaireClient();
        });
    };
};

document.onload = validationFormulaireListener();