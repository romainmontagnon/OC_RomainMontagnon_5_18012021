const updateRegexCardDate = () =>{
    let year = (new Date()).getFullYear().toString();
    let a = year.substring(2,3);    console.log(a);
    let b = year.substring(3,4);
    return '^([0-9][1-2]\/['+a+'-9]['+b+'-9])$';
};

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
    cardNumber      : '',
    cardDate        : ''
};

let paiementPossible = false;

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
let cardDate        = document.getElementById('cardDate');

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
    cardNumber      = cardNumber,
    cardDate        = cardDate
];

let regexEmailAdress     = '^([a-zA-Z0-9.]{0,255})@([a-zA-Z0-9.]{0,255})$';
let regexPhone           = '^(([0-9]{10})|([0-9]{2} *[0-9]{2} *[0-9]{2} *[0-9]{2} *[0-9]{2}))$';
let regexFirstName       = '^[A-Za-zÀ-ÿ\u00f1\u00d1 \-]*$';
let regexLastName        = '^[A-Za-zÀ-ÿ\u00f1\u00d1 \-]*$';
let regexStreetNumber    = '^[0-9]+$';
let regexStreetName      = '^[0-9A-Za-zÀ-ÿ\u00f1\u00d1 \-]*$';
let regexZipCode         = '^([0-9]{5})';
let regexCity            = '^[A-Za-zÀ-ÿ\u00f1\u00d1 \-]*$';
let regexCountry         = '^[A-Za-zÀ-ÿ\u00f1\u00d1 \-]*$';
let regexCardName        = '^[A-Za-z0-9 ]*$';
let regexCardCrypto      = '^[0-9]{3}';
let regexCardNumber      = '^(([0-9]{16})|([0-9]{4} *[0-9]{4} *[0-9]{4} *[0-9]{4}))$';
let regexCardDate        = updateRegexCardDate();

const regexFormPattern = () => {
    emailAdress.setAttribute('pattern', regexEmailAdress);
    phone.setAttribute('pattern', regexPhone);
    firstName.setAttribute('pattern', regexFirstName);
    lastName.setAttribute('pattern', regexLastName);
    streetNumber.setAttribute('pattern', regexStreetNumber);
    streetName.setAttribute('pattern', regexStreetName);
    zipCode.setAttribute('pattern', regexZipCode);
    city.setAttribute('pattern', regexCity);
    country.setAttribute('pattern', regexCountry);
    cardName.setAttribute('pattern', regexCardName);
    cardCrypto.setAttribute('pattern', regexCardCrypto);
    cardNumber.setAttribute('pattern', regexCardNumber);
    cardDate.setAttribute('pattern', regexCardDate);
};

const storeToSessionStorage = (items, sessionStorageKey) =>{
    // console.table(items)
    let jsToString = JSON.stringify(items, sessionStorageKey);
    sessionStorage.setItem(sessionStorageKey, jsToString);
};

const lireFormulaireClient = () => {
    console.log(array);
    let test = checkValidityTest(array);
    console.log(test);
    if (test){
        console.log("formulaire ok, complétion de l'objet contact");
        paiementPossible       = true;

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
        contact.cardDate       = cardDate.value;

        storeToSessionStorage(contact, 'contact');
    } else if (!test){
        paiementPossible = false;
        return;
    };
    console.log(contact);
};

const checkValidityTest = (array) => {
   /*
   je crée un array dans lequel stocker les resultats des tests a chaque tour de boucle
   a la fin de a boucle, j'utilise la method every qui fait appel a une foction anonyme
   Si une des valeur du tableau est false, elle renvera false, si tout est true, elle renverra true.
   */
   let bool = new Array();
    /*
    Si les champs ne sont pas validés, ils s'afficheront encadré en rouge
    */
    for (let i = 0; i < array.length; i++) {
        let test = array[i].checkValidity(array[i]);
        if (test){
            console.log(array[i].value);
            console.log(array[i].id);
            array[i].classList.remove('noValidForm');
            requiredForm.classList.remove('noValidForm');
            array[i].classList.add('validForm');
            array[i].classList.remove('noValidForm');
            bool.push(true);
        } else if (!test) {
            requiredForm.classList.add('noValidForm');
            array[i].classList.add('noValidForm');
            array[i].classList.remove('validForm');
            bool.push(false);
        };
        console.log(test);
    };
    console.log(bool);
    return (bool.every(elem => elem === true));
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
            //e.preventDefault();
            lireFormulaireClient();
            if (!paiementPossible){
                e.preventDefault();
                //validationFormulaire.classList.add('noValidForm');
                alert("Votre formulaire est incomplet.");
            } else if (paiementPossible){
                //requete vers API pour donner les infos sur le client et le détail de la commande.

                fetch("http://localhost:3000/api/order",{
                    method: 'PUT',
                    body: JSON.stringify(contact),
                    headers: {'Content-type': 'application/json; charset=UTF-8',},
                })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch(error => console.log('error', error))
                .catch(e.preventDefault());

                //si la requete est ok
                //redirectionJsToUrl ('../html/payment.html');

                //sinon afficher page avec code erreur 


                console.log('Paiement Possible');
                
                let url = 'http://localhost:3000/api/order';
                console.log(url);
                let contactToString = JSON.stringify(contact);
                console.log(contactToString);
                let arrayCartItemsCallback = localStorage.getItem('arrayCartItems');
                console.log(arrayCartItemsCallback);

                //fetch("http://localhost:3000/api/order",{
                //     method: 'PUT',
                //     body: JSON.stringify(contact),
                //     headers: {'Content-type': 'application/json; charset=UTF-8',},
                // })
                // .then((response) => response.json())
                // .then((json) => console.log(json))
                // .catch(error => console.log('error', error));
            };
        });
    };
};

const redirectionJsToUrl = (url) => {
  document.location.href=url; 
};

document.onload = validationFormulaireListener();
document.onload = regexFormPattern();
document.onload = updateRegexCardDate();