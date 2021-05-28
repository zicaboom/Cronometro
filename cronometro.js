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

let AttInterval
let tempoAtual = {
    min: 0,
    sec: 0,
    miliSec :0
}

function start() {
    btnStart.removeEventListener('click', start)
    btnCrono.classList.add('clica')
    btnCrono.addEventListener('animationend', event => {
        if (event.animationName == 'clica') {
            btnCrono.classList.remove('clica')
        }
    })
    AttInterval = setInterval(function () {
        if(tempoAtual.sec === 60){ tempoAtual.min++; tempoAtual.sec = 0}
        if (tempoAtual.miliSec === 60) { tempoAtual.sec++; tempoAtual.miliSec = 0}
        tempoAtual.miliSec++
        lbTempo.innerHTML = `${zeroFill(tempoAtual.min)}:${zeroFill(tempoAtual.sec)}:${zeroFill(tempoAtual.miliSec)}`
    }, 1)
}
function pause() {
    btnCrono.classList.add('clica')
    btnCrono.addEventListener('animationend', event => {
        if (event.animationName == 'clica') {
            btnCrono.classList.remove('clica')
        }
    })
    btnStart.addEventListener('click', start)
    clearInterval(AttInterval)
}
function reset() {
    pause()
    sltLaps.classList.add('hidden')
    tempoAtual.min = 0
    tempoAtual.sec = 0
    tempoAtual.miliSec = 0
    lbTempo.innerHTML = `${zeroFill(tempoAtual.min)}:${zeroFill(tempoAtual.sec)}:${zeroFill(tempoAtual.miliSec)}`
    sltLaps.innerHTML = ``
    
}
function lapse() {
    btnCrono.classList.add('clica')
    btnCrono.addEventListener('animationend', event => {
        if (event.animationName == 'clica') {
            btnCrono.classList.remove('clica')
        }
    })
    sltLaps.classList.remove('hidden')
    sltLaps.innerHTML += `<option>${zeroFill(tempoAtual.min)}:${zeroFill(tempoAtual.sec)}:${zeroFill(tempoAtual.miliSec)}</option>`
}
const zeroFill = n => {
        //pega as duas ultimas posições
		return ('0' + n).slice(-2);
	}