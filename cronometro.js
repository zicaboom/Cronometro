const lbTempo = document.querySelector('#tempo')
const btnStart = document.querySelector('#start')
const btnPause = document.querySelector('#pause')
const btnLapse = document.querySelector('#lapse')
const btnReset = document.querySelector('#reset')
const btnCrono = document.querySelector('.btnCrono')
const sltLaps = document.querySelector('#laps')

btnStart.addEventListener('click', start)
btnPause.addEventListener('click', pause)
btnReset.addEventListener('click', reset)
btnLapse.addEventListener('click', lapse)
btnCrono.addEventListener('animationend', event => {
    if (event.animationName == 'clica') {
        btnCrono.classList.remove('clica')
    }
})

let AttInterval
let tempoAtual = {
    m: 0,s: 0, cs:0,  
    retornaTempo() {
        return `${zeroFill(this.m)}:${zeroFill(this.s)}:${zeroFill(this.cs)}`
    },
    addCs() {
        this.cs += 1
        if (this.cs === 100) this.s++, this.cs = 0; 
        if (this.s === 60) this.m++, this.s = 0; 
    },
    resetTime() {
        this.m = 0
        this.s = 0
        this.cs = 0
    }
}

function start() {
    btnStart.removeEventListener('click', start)
    anima()
    AttInterval = setInterval(function () {
    tempoAtual.addCs()
    lbTempo.innerHTML = tempoAtual.retornaTempo()
    }, 10)
}
function pause() {
    anima()
    btnStart.addEventListener('click', start)
    clearInterval(AttInterval)
}
function reset() {
    pause()
    sltLaps.classList.add('hidden')
    tempoAtual.resetTime()
    lbTempo.innerHTML = tempoAtual.retornaTempo()
    sltLaps.innerHTML = ``
    
}
function lapse() {
    anima()
    sltLaps.classList.remove('hidden')
    sltLaps.innerHTML += `<option>${tempoAtual.retornaTempo()}</option>`
}

const zeroFill = (n)  => {
    //pega as duas ultimas posições
    return ('0' + n).slice(-2);
}

const anima = () => btnCrono.classList.add('clica')