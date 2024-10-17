'use strict'

const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]') 
const operadores = document.querySelectorAll('[id*=operador]') 

let novoNumero = true
let operador // Salvo na memoria
let numeroAnterior // Salvo na memoria


const operacaoPendente = () => operador !== undefined
// Se o operador é difernte de vazio

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.')) 
        novoNumero = true
        const resultado = eval (` ${numeroAnterior} ${operador} ${numeroAtual}`) 
        atualizarDisplay(resultado)
    }   
}
 
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR') // 
        novoNumero = false // Se clicou uma vez, o novoNumero vira falso
    } else { // Se não for novoNumero concatena
        display.textContent += texto.toLocaleString('BR')
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', inserirNumero)) // ForEach varre todos os elementos

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular()
        novoNumero = true // Em todo mundo que utilizado 'novoNumero' eu limpo meu display
        operador = evento.target.textContent
        numeroAnterior = parseFloat(display.textContent.replace(',','.'))
        console.log(operador)
    }
} 

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador)) 

const ativarIgual = () => {
    calcular()
    operador = undefined
} 

document.getElementById('igual').addEventListener('click', ativarIgual)

const limparDisplay = () => {
    display.textContent = ''
}

document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () => {
    limparDisplay()
    operador = ''
    novoNumero = true
    numeroAnterior = ''
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo)

const removerUltimoNumero = () => {
    display.textContent = display.textContent.slice(0,-1)
} // Utilizado para remover o último caracter do meu display

document.getElementById('backspace').addEventListener('click', removerUltimoNumero)

const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay (display.textContent * -1)
}
// Utilizado para inverter o sinal de negativado para positivo ou contrário

document.getElementById('inverter').addEventListener('click', inverterSinal)

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){ 
        if (existeValor()){
            atualizarDisplay(',')
        } else {
            atualizarDisplay('0,') 
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)

const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal',
}

const mapearTeclado = (evento) => {
    const tecla = evento.key
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1 
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click()
} //  Ao clicar, o sistema irá procurar a tecla correta dentro do meu mapaTeclado

document.addEventListener('keydown', mapearTeclado)


// Retorno -1 quando não existe, qualquer outro valor quando existe.