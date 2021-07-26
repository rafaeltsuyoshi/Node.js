const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')
const path = require('path')
const URL = require('url')
const fs = require('fs')
const data = require('./urls.json')

function writeFile(cb) {
    fs.writeFile(
        path.join(__dirname, "urls.json"), 
        JSON.stringify(data, null, 2),
        err => {
            if(err) throw err

            cb(JSON.stringify({message:'ok'}))
        }
    )
}

async function load() {
    // fetch("http://localhost:3000/").then((data) => data.json()).then((data) => console.log(data))
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    res.urls.map(({name, url}) => addElement({name, url}))
}

async function update() {
    // fetch("http://localhost:3000/").then((data) => data.json()).then((data) => console.log(data))
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    res.urls.map(({name, url}) => addElement({name, url}))
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })

    input.value = ""
})