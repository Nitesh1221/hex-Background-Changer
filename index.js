
document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector(".hex_color").value = null;

})

const start_btn = document.querySelector('.start_btn')
const stop_btn = document.querySelector('.stop_btn')
const copy_btn = document.querySelector('.copy_btn')
const hex_input = document.querySelector('.hex_color')
const tags = document.querySelectorAll('.show_colors')
let bgInterval;
let bgIntervalStop = false;
const colorArray = new Array();



start_btn.addEventListener('click', (e) => {
    if (!bgIntervalStop) {
        oneSecondColor()
        showPopUpMsg("Every second background Changer \"Started\"")
    } else{
        showPopUpMsg("Every second background Changer \"Already Started\"")

    }

})

stop_btn.addEventListener('click', (e) => {
    const clear = clearInterval(bgInterval)
    bgIntervalStop = false;
    document.querySelector('.hex_color').removeAttribute("readonly")
    showPopUpMsg("Every second background Changer \"Stoped\"")

    // console.log(clear, bgIntervalStop)
})


copy_btn.addEventListener('click', (e) => {
    let inputText = document.querySelector('.hex_color')
    copyText(inputText)
    showPopUpMsg("Copy successful")

    // console.log(inputText)
})

hex_input.addEventListener('input', (e) => {
    const color = e.target.value
    setBodyColor(color)

    // console.log("hello")
})

tags.forEach((item) => {
    item.addEventListener('click', (e) => {
        const tag = e.target
        copyText(tag)
        showPopUpMsg("Copy successful")
        // console.log(tag)
    })
})

//generate hex code
function oneSecondColor() {
    bgIntervalStop = true;
    bgInterval = setInterval(() => {
        // console.log(bgIntervalStop)
        hexColor()
    }, 1000);
    // console.log(bgInterval, bgIntervalStop)
}

function hexColor() {
    const random = Math.random()
    const randomNumber = (Math.floor(random * 100000)).toString(16)
    const randomcolor = `#${randomNumber}`

    const input = document.querySelector('.hex_color')
    input.value = randomcolor;
    input.setAttribute("readonly", "true")
    // console.log(colorArray)
    storeColor(randomcolor, colorArray)
    setBodyColor(randomcolor)
}

function setBodyColor(color) {
    document.body.style.backgroundColor = color;
    // console.log("setcol",color)
}

function copyText(copyText) {
    copyText.select()
    document.execCommand("copy")
}

function storeColor(color, colorArray) {
    if (colorArray.length >= 10) {
        colorArray.shift()
        // console.log(colorArray,"item pushed")
        removeFirstChild()
    }
    colorArray.push(color)
    createLi(color)
}
function createLi(color) {
    const li = document.createElement('input')
    li.className = "color"
    li.id = color;
    li.value = color;
    document.querySelector('.show_colors').appendChild(li)

}

function removeFirstChild(parent) {
    const firstChild = document.querySelector('.show_colors').firstElementChild
    // console.log(firstChild,"func worked")
    firstChild.remove()
}

function showPopUpMsg(message) {
    const div = document.createElement('div')
    div.className = "popup_msg"
    div.innerText = message;
    document.querySelector('.popup').appendChild(div);
    setTimeout(() => {
        removePopUpMsg()
    }, 1000);

}
function removePopUpMsg() {
    document.querySelector('.popup').firstElementChild.remove()
}