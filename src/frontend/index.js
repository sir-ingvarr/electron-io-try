const electron = require('electron');

const { ipcRenderer } = electron;

const randomizer = () => Math.round(Math.random()*255);

ipcRenderer.on('message', (event, message) => {
    const node = document.getElementsByTagName('body')[0];
    const div = document.createElement("div");
    const colorStyle = `rgb(${randomizer()}, ${randomizer()}, ${randomizer()})`
    div.style.color = colorStyle;
    console.log(colorStyle);
    div.innerHTML = message;
    node.appendChild(div);
});

const senderButton = document.getElementById('submitter');
senderButton.onclick = function(){ return sendSomeText(document.getElementById('text').value)};

const sendSomeText = (text) => {
    ipcRenderer.send('message', text);
};
