let contact = {
    gender          : '',
    emailAdress     : '',
    phone           : '',
    firstName       : '',
    lastName        : '',
    streetNumber    : '',
    streetName      : '',
    zipCode         : '',
    city            : '',
    country         : '',
    cardName        : '',
    cardCrypto      : '',
    cardNumber      : ''
};

let paiementPossible = false;

const storeToSessionStorage = (items, sessionStorageKey) =>{
    // console.table(items)
    let jsToString = JSON.stringify(items, sessionStorageKey);
    sessionStorage.setItem(sessionStorageKey, jsToString);
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
    let cardName        = document.getElementById('cardName');
    let cardCrypto      = document.getElementById('cardCrypto');
    let cardNumber      = document.getElementById('cardNumber');
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
        country         = country,
        cardName        = cardName,
        cardCrypto      = cardCrypto,
        cardNumber      = cardNumber
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
            //contact.array[i].id = array[i].value;
        } else if (!checkValidityTest) {
            requiredForm.classList.add('noValidForm');
            array[i].classList.add('noValidForm');
            array[i].classList.remove('validForm');
        };
        console.log(checkValidityTest);
    };

    let test = checkValidityTest(array);
    if (test === true){
        console.log("formulaire ok, complétion de l'objet contact");
        contact.gender         = gender.value;
        contact.emailAdress    = emailAdress.value;
        contact.phone          = phone.value;
        contact.firstName      = firstName.value;
        contact.lastName       = lastName.value;
        contact.streetNumber   = streetNumber.value;
        contact.streetName     = streetName.value;
        contact.zipCode        = zipCode.value;
        contact.city           = city.value;
        contact.country        = country.value;
        contact.cardName       = cardName.value;
        contact.cardCrypto     = cardCrypto.value;
        contact.cardNumber     = cardNumber.value;

        storeToSessionStorage(contact, 'contact');
    } else {
        return;
    };
    console.log(contact);
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
            paiementPossible = true;
            return true;
        } else if (!checkValidityTest) {
            requiredForm.classList.add('noValidForm');
            validationFormulaire.classList.remove('noValidForm');
            paiementPossible = false;
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
            if(!paiementPossible){
                e.preventDefault();
                validationFormulaire.classList.add('noValidForm');
                //alert("N'oubliez pas de valider vos infos personnelles");
            } else {
                fetch("http://localhost:3000/api/order",{
                    method: 'PUT',
                    body: JSON.stringify(contact),
                    headers: {'Content-type': 'application/json; charset=UTF-8',},
                })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch(error => console.log('error', error));
            };
        });
    };
};

document.onload = validationFormulaireListener();