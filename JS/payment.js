let customerInfo = {
    gender          : '',
    emailAdress     : '',
    phone           : '',
    firstName       : '',
    lastName        : '',
    streetNumber    : '',
    streetName      : '',
    zipCode         : '',
    city            : '',
    country         : ''
};


const lireFormulaireClient = () => {
    let gender          = document.querySelector("input[name='gender']:checked");
    let emailAdress     = document.getElementById('emailAdress');
    let phone           = document.getElementById('phone');
    let firstName       = document.getElementById('firstName');
    let lastName        = document.getElementById('lastName');
    let streetNumber    = document.getElementById('streetNumber');
    let streetName      = document.getElementById('streetName');
    let zipCode         = document.getElementById('zipCode');
    let city            = document.getElementById('city');
    let country         = document.getElementById('country');
    let requiredForm    = document.getElementById('requiredForm');
    
    let array = [
        emailAdress     = emailAdress,
        phone           = phone,
        firstName       = firstName,
        lastName        = lastName,
        streetNumber    = streetNumber,
        streetName      = streetName,
        zipCode         = zipCode,
        city            = city,
        country         = country
    ];
    
    console.log(array);

    /*
    Si les champs ne sont pas validés, ils s'afficheront encadré en rouge
    */
    for (let i = 0; i < array.length; i++) {
        let checkValidityTest = array[i].checkValidity(array[i])
        if (checkValidityTest){
            console.log(array[i].value);
            console.log(array[i].id);
            array[i].classList.remove('noValidForm');
            requiredForm.classList.remove('noValidForm');
            array[i].classList.add('validForm');
            array[i].classList.remove('noValidForm');
            //customerInfo.array[i].id = array[i].value;
        } else if (!checkValidityTest) {
            requiredForm.classList.add('noValidForm');
            array[i].classList.add('noValidForm');
            array[i].classList.remove('validForm');
        };
        console.log(checkValidityTest);   
    };

    let test = checkValidityTest(array);
    if (test === true){
        console.log("formulaire ok, création de l'objet customerInfo");
        customerInfo.gender         = gender.value;
        customerInfo.emailAdress    = emailAdress.value;
        customerInfo.phone          = phone.value;
        customerInfo.firstName      = firstName.value;
        customerInfo.lastName       = lastName.value;
        customerInfo.streetNumber   = streetNumber.value;
        customerInfo.streetName     = streetName.value;
        customerInfo.zipCode        = zipCode.value;
        customerInfo.city           = city.value;
        customerInfo.country        = country.value;
    };
    console.log(customerInfo);
};


const checkValidityTest = (array) =>{
    /*
    si n'importe lequel des champs n'est pas valide, on excute ce code qui permet d'encadrer en rouge la :
    "* : pour le bon déroulement de votre commande, ses champs sont obligatoires."
    */
    for (let i = 0; i < array.length; i++) {
        let checkValidityTest = array[i].checkValidity(array[i])
        if (checkValidityTest){
            array[i].classList.remove('noValidForm');
            return true;
        } else if (!checkValidityTest) {
            requiredForm.classList.add('noValidForm');
            return false;
        };
    };
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