const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
const container = document.querySelector('.container');


class item {
    constructor(itemName){
        this.createDiv(itemName);
    }

    createDiv(itemName){
        let input = document.createElement('input');
        input.value = itemName;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = 'text';

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-check">';
        checkButton.classList.add('checkButton');

        let editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pen">';
        editButton.classList.add('editButton');

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash">';
        deleteButton.classList.add('deleteButton');

        container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(checkButton);
        itemBox.appendChild(editButton);
        itemBox.appendChild(deleteButton);

        checkButton.addEventListener('click', () => this.check(item));

        editButton.addEventListener('click', () => this.edit(input));

        deleteButton.addEventListener('click', () => this.remove(itemBox));

        localStorage.setItem('TODO', JSON.stringify(item));

    }
    edit (input){
        input.disabled = !input.disabled;
    }
    remove(item){
        container.removeChild(item);
    }
}

function check(){
    if (input.value != ''){
        new item(input.value);
        input.value = '';
    }
}


addButton.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
    if (e.which == 13){
        check();
    }
});

let data = localStorage.getItem('TODO');
if (data){
    item =JSON.parse(data);
    id = item.length;
    loadlist(item);

}else {
    item = [];
    id =0;
}

function loadlist(array) {
    array.forEach(function (item) {
        addToDo(item.name, input, container);
    });
}