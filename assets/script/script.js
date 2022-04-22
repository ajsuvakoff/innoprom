let HTP = "http://"

let IP = localStorage.getItem("addr");
if (IP === null) {
    localStorage.setItem("addr", "localhost:8080")
}

class videoControl {
    constructor() {

        this.socket = new WebSocket('ws://' + IP + '/api/v1');
        // Connection opened
        this.socket.onopen = () => {
            console.log('WS: Connection opened');
            this.getState()
        }

        this.socket.onclose = (e) => {
            console.log('WS: Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(function () {
                new videoControl()
            }, 1000);
        };
    }

    getState = () => {
        this.socket.onmessage = (event) => {
            this.state = JSON.parse(event.data);
        }
        return this.state
    }

    playClip = (layerId, columnId, clipId) => {

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '' + HTP + '' + IP + `/api/v1/composition/columns/${columnId}/connect`);
        xhr.send();

        let videoParamID = (this.state.layers[0].clips[`${clipId}`].transport.controls.playdirection.id);
        this.socket.send(JSON.stringify({"action": "set", "parameter": `/parameter/by-id/${videoParamID}`, "value": 2}))

        this.getState()
    };

    pauseClip(columnId, clipId) {

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '' + HTP + '' + IP + `/api/v1/composition/columns/${columnId}/connect`);
        xhr.send();

        let videoParamID = (this.state.layers[0].clips[`${clipId}`].transport.controls.playdirection.id);
        this.socket.send(JSON.stringify({
            "action": "set",
            "parameter": `/parameter/by-id/${videoParamID}`,
            "value": 1
        }));
        this.getState()
    }
}


let videoCont = new videoControl()

function Play1() {
    videoCont.playClip(0, 1, 0);
}

function Play2() {
    videoCont.playClip(0, 2, 1);
}

function Play3() {
    videoCont.playClip(0, 3, 2);
}

function Pause1() {
    videoCont.pauseClip(1, 0);
}

function Pause2() {
    videoCont.pauseClip(2, 1);
}

function Pause3() {
    videoCont.pauseClip(3, 2);
}

function Cycle() {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '' + HTP + '' + IP + '/api/v1/composition/columns/4/connect')
    xhr.send()
}