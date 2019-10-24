



// $("#container").hide();



$("#myName").html("");





let bigList = [];
let idcount = 0;

$(".listbox").sortable({
    stop: function(event, ui) {executecode();}
});

function saveitem(event){
    switch(event.which){
        case 13:
            let myval = $("#todo").val();
            console.log(myval);
            let tempObj = {};
            tempObj.id = idcount;
            tempObj.listname = myval;
            tempObj.liscol = [];
            bigList.push(tempObj);
            printmypage();
            $("#todo").val("");
            idcount ++;
            break;
        default:
        //do nothing
    }
}

function printmypage(){
    $(".listbox").html("");
    for(var i = 0; i < bigList.length; i++){
        $(".listbox").append(`<div class="list">
                            <i class="fas fa-times" onclick="removelist(this, ${bigList[i].id})"></i>
                            <span>${bigList[i].listname}</span>
                            </div>`);
    }
}

function removelist(el, myid){
    /*$(el).parent().fadeOut('slow', function () {
        
    });*/
    for(var i = 0; i < bigList.length; i++){
        if(myid == bigList[i].id){
            bigList.splice(i, 1);
        }
    }

    $(el).parent().animate( {
        opacity: 0,
        left: "-=50",
        height: 0,
    },  600, function () {
        $(el).parent().remove();
        printmypage();
    });
}
function executecode(){
    console.log("hola");
    let listarray = $(".listbox").children();
    for(let i = 0; i < listarray.length; i++){
        //console.log(listarray[i]);
        $(listarray[i]).attr("id", `listnum${i}`);
    }
   //$(listarray[0]).addClass("activeitem");
}
/*function saveitem(){
    let myval = $("#todo").val();
    console.log(myval);
}*/
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