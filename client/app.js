let status = document.getElementById('status');
let roomInput = document.getElementById('roomInput');
let idInput = document.getElementById('idInput');
let table = document.getElementById('board')
let btnSend = document.getElementById("btnSend")
let ws = new WebSocket("ws://localhost:8080");
let cells = []
let row = null

let headers = (i) => {
    sendHttpGetRequest("/api/insert?column=" + i + "&room=" + roomInput.value + "&id=" + idInput.value, (res) => {

    })
    // sendMessage(i)
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
    // let message = document.createElement('div');
    // message.innerHTML = ev.data;
    // messages.appendChild(message);
    // messages.scrollTop = message.scrollHeight;

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
    // ws.send(`{ "player":1 , "column":` + i + `}`);
    sendHttpGetRequest("/api/login?room=" + roomInput.value + "&id=" + idInput.value, (res) => {
        roomInput.disabled = true
        idInput.disabled = true
        btnSend.remove()
    })
}

function sendHttpGetRequest(url, callback) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(request.responseText);
            }
        }

    };
    request.open("GET", url, true);
    request.send();
}
