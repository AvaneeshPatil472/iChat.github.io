const socket = io('http://localhost:8000')

// get dom elements in there respective JS variables

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainerr = document.querySelector('.container')

// audio that will play on receiving messsages
var audio = new Audio('ting.mp3');

// function which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainerr.append(messageElement);
    if(position =='left'){
        audio.play();
    }
}

// ask the user their name and let the server know
const name = prompt("Enter your name to join")
socket.emit('new-user-joined', name)

// if a new user joins receive his name fron the server
socket.on('user-joined', data =>{
append(`${name} joined the chat`, 'right')
})

// if server sends message receive it
socket.on('receive', data =>{
append(`${data.name}: ${data.message}`, 'left')
})

// if a user leaves the chat append info to the contaier
socket.on('left', name =>{
append(`${name} left the chat`, 'left')
})

// if the form gets submitted send server the messge
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})