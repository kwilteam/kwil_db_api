const WebSocket = require('ws')

const waitForOpenSocket = (socket) => {
    return new Promise((resolve) => {
      if (socket.readyState !== socket.OPEN) {
        socket.on("open", _ => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

const createWebSocket = (_params) => {
    let socketProtocol = 'ws'
    if (_params.protocol == 'https') {
        socketProtocol = 'wss'
    }
    
    /*ws.on('message', function(_message) {
        console.log(_message)
    })*/
    class KwilSocket {
        constructor(_params) {
            const _host = _params.url.split(':')
            this.ws = ''
            if (_host.length == 3) {
                this.ws = new WebSocket(`${socketProtocol}:${_host[1]}:${_host[2]}`)
            } else {
                this.ws = new WebSocket(`${socketProtocol}:${_host[1]}`)
            }
            
            this.params = _params
        }

        query = async (_msg, _store = false) => {
            await waitForOpenSocket(this.ws)
            const data = this.params
            data.url = data.url
            data.data.query = _msg
            data.data.store = _store
            this.ws.send(JSON.stringify(data))
        }
    }
    return new KwilSocket(_params)
}

/*const socket = createWebSocket({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    user: 'postgres',
    password: 'password',
    moat: 'testmoat'
})


socket.query('select * from yuh;')
socket.ws.on('message', function(_message) {
    console.log(JSON.parse(_message))
})*/
/*socket.ws.on('message', function(_message) {
    console.log(_message)
})*/

//console.log(socket.sendMessage)
//console.log(socket.sendMessage('hi', socket))

module.exports = {createWebSocket}