'use strict'

const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]') // Com [] procuro TODOS os id que se tenham atributo 'tecla', com * antes do = procuro todos os elementos que tenham pelo menos um pedaço do meu atributo
const operadores = document.querySelectorAll('[id*=operador]') 

let novoNumero = true
let operador // Salvo na memoria
let numeroAnterior // Salvo na memoria
// Inicialmente minhas variáveis operador e numeroAnterior não tem valor, passarão a ter no meu const selecionarOperador

const operacaoPendente = () => operador !== undefined
//Se o operador é difernte de vazio

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent)
        novoNumero = true
        const resultado = eval (` ${numeroAnterior} ${operador} ${numeroAtual}`) // Eval tem como objetivo substituir as várias funções para cada operador
        atualizarDisplay(resultado)

        /*
        if (operador == '+'){ // Função de calculo de adição
            atualizarDisplay(numeroAnterior + numeroAtual)
        } else if (operador == '-'){ // Função de calculo de subtração
            atualizarDisplay(numeroAnterior - numeroAtual)
        } else if (operador == '*'){ // Função de calculo de multiplicacao
            atualizarDisplay(numeroAnterior * numeroAtual)
        } else if (operador == '/'){ // Função de calculo de divisão
            atualizarDisplay(numeroAnterior / numeroAtual)
        }  */ 
    }   
}
 
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto // Se for novoNumero não concatena (precisei usar pois ao clicar em qualquer numero, substituia o antigo de maneira automatica)
        novoNumero = false // Se clicou uma vez, o novoNumero vira falso
    } else { // Se não for novoNumero concatena
        display.textContent += texto
    }
}
// Crio minha função, defino que o 'nome' do seu parâmetro será 'texto', e informou que a informação de texto armazenada no display será meu conteúdo 'texto
// += Concatenação

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
// Crio minha função que recebe o 'evento', direciono essa informação recebida para minha função 'atualizar', e defino que meu evento será o target do meu textContent e coloco como parâmetro da nova função

numeros.forEach(numero => numero.addEventListener('click', inserirNumero)) //ForEach varre todos os elementos, fica ouvindo igual o add.EventListener // Pra cada variável numero, um evento ao ser clicada

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular()
        novoNumero = true
        operador = evento.target.textContent
        numeroAnterior = parseFloat(display.textContent)
        console.log(operador)
    }
} // Cliquei em qualquer operador, me valor passa a ser um novo numero, guardo o valor do operador e guardo o valor do número anterior


operadores.forEach(operador => operador.addEventListener('click', selecionarOperador)) 

const ativarIgual = () => {
    calcular()
    operador = undefined
} // Após a função ativarIgual ser realizada, os operadores passam a não ter valor, voltando a ter apenas após escolher um outro número para a equação.
// Assim evito que após calcular, clicando nos operadores a calculadora some valores quaisquer automaticamente

document.getElementById('igual').addEventListener('click', ativarIgual)

const limparDisplay = () => {
    display.textContent = ''
} // Limpo o que está aparecendo no meu display naquele momento, clicando no botão limpar display

document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () => {
    limparDisplay()
    operador = ''
    novoNumero = true
    numeroAnterior = ''
} // A função limpar calculo além de copiar a função do 'limparDisplar', exclui também meu operador, meu 1° e 2° algarismos da equação

document.getElementById('limparCalculo').addEventListener('click', limparCalculo)