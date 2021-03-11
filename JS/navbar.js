function showDropdownMenu (){
    document.getElementById('myDropdown').classList.toggle('show');
};

function showMenu(event, list){
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
});

let checkboxShowMenu=document.getElementById('menu-btn');
checkboxShowMenu.addEventListener('click', e=>{
    let list = document.getElementById('navbar-fold');
    showMenu(checkboxShowMenu.checked, list);
    console.log(checkboxShowMenu.checked);
});