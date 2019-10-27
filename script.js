const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
const container = document.querySelector('.container');

const LIST_ADDED = 'currentList';

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

    }
    edit (input){
        input.disabled = !input.disabled;
    }
    remove(item){
        container.removeChild(item);
    }
}
let storedChat = retrieveSelectedChat() || new Chat('convo');

chats.push(storedChat);

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

function persistSelectedList() {
    let listString = JSON.stringify(item);
    localStorage.setItem(LIST_ADDED, listString);
}

function retrieveSelectedChat() {
    let chatString = localStorage.getItem(CURRENT_CHAT_KEY);
    if (chatString) {
        let parsedChat = JSON.parse(chatString);

        let chat = new Chat(parsedChat.name);
        parsedChat.messages.forEach(message => {
            let newMessage = new Message(message.text, message.user);
            newMessage.seen = message.seen;
            chat.addMessage(newMessage);
        });

        return chat;
    }
    return null;
}