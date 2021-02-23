console.log("navbar.js loaded");


function showDropdownMenu (){
    document.getElementById('myDropdown').classList.toggle('show');
    console.log('show menu');
};

function showMenu(event, list){
    console.log(list);
    if (event===true){
        list.classList.replace('hide-menu','show-menu');
    } else if (event===false) {
        list.classList.replace('show-menu','hide-menu');
    };
};


let menuDrop = document.getElementById('menu-drop');
menuDrop.addEventListener('click', e=>{
    let list = document.getElementById('myDropdown')
    showMenu(menuDrop.checked, list);
    console.log(menuDrop.checked);
    console.log(e);
});

let checkboxShowMenu=document.getElementById('menu-btn');
checkboxShowMenu.addEventListener('click', e=>{
    let list = document.getElementById('navbar-fold');
    showMenu(checkboxShowMenu.checked, list);
    console.log(checkboxShowMenu.checked);
});