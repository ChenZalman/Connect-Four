let status = document.getElementById('status');
let messages = document.getElementById('messages');
let messageInput = document.getElementById('messageInput');
let table = document.getElementById('board')
let ws = new WebSocket("ws://localhost:8080");
let cells = []
let row = null

let headers = (i) => {
    sendMessage(i)
}

// Create the board of the game
row = document.createElement('tr')
row.id = "trHead"

// Create headers to show where to place the tokens
for (let i = 0; i < 7; i++) {
    let cell = document.createElement("th")
    cell.id = "th" + i
    cell.onclick = () => headers(i)
    cell.innerHTML = `&#8595`
    cell.style.fontSize = '30px'
    row.appendChild(cell)
}
table.appendChild(row)

for (let i = 0; i < 6; i++) {
    cells.push([])
    let row = document.createElement("tr")
    row.id = "tr" + i
    for (let j = 0; j < 7; j++) {
        cells[i].push("O")
        let cell = document.createElement("td")
        cell.id = "td" + j
        cell.innerHTML = cells[i][j]
        row.appendChild(cell)
    }
    table.appendChild(row)
}


ws.onopen = () => {
    status.innerHTML = "connected to server";
    status.style.color = "blue";
};
ws.onmessage = (ev) => {
    let message = document.createElement('div');
    message.innerHTML = ev.data;
    messages.appendChild(message);
    messages.scrollTop = message.scrollHeight;

};
ws.onerror = (err) => {
    status.innerHTML = "error: " + err;
    status.style.color = "red";
};
ws.onclose = () => {
    status.innerHTML = "disconnected.";
    status.style.color = "red";
}

function sendMessage(i) {
    ws.send(`{ "player":1 , "column":` + i + `}`);
    messageInput.value = "";
}
