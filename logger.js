const EventEmitter = require("events")
const fs = require('fs')
const path = require('path')

const emmiter = new EventEmitter()

emmiter.on('log', (menssage) => {
    fs.appendFile(path.join(__dirname, 'log.txt'), menssage, (err) => {
        if(err) throw err
    })
})

function log(menssage) {
    emmiter.emit('log', menssage)
}

module.exports = log
