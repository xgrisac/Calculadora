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
        const numeroAtual = parseFloat(display.textContent.replace(',','.')) // Replace substitui a vírgula por ponto, possibilitando que meu 'calcular' calcule os decimais também
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
        display.textContent = texto.toLocaleString('BR') // Se for novoNumero não concatena (precisei usar pois ao clicar em qualquer numero, substituia o antigo de maneira automatica)
        novoNumero = false // Se clicou uma vez, o novoNumero vira falso
    } else { // Se não for novoNumero concatena
        display.textContent += texto.toLocaleString('BR')
    }
}
// Crio minha função, defino que o 'nome' do seu parâmetro será 'texto', e informou que a informação de texto armazenada no display será meu conteúdo 'texto
// += Concatenação

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
// Crio minha função que recebe o 'evento', ou seja, todo mundo que usar 'atualizarDisplay' vou inserir o conteudo daquele função, direciono essa informação recebida para minha função 'atualizar', e defino que meu evento será o target do meu textContent e coloco como parâmetro da nova função

numeros.forEach(numero => numero.addEventListener('click', inserirNumero)) //ForEach varre todos os elementos, fica ouvindo igual o add.EventListener // Pra cada variável numero, um evento ao ser clicada

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular()
        novoNumero = true // Em todo mundo que utilizado 'novoNumero' eu limpo meu display
        operador = evento.target.textContent
        numeroAnterior = parseFloat(display.textContent.replace(',','.'))
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

const existeDecimal = () => display.textContent.indexOf(',') !== -1; // Verifico se existe decimal no meu display, se sim TRUE, se não -1(False) // IndexOf procura a vírgula no meu text
const existeValor = () => display.textContent.length > 0; // length conta a quantidade de elementos, se for maior que 0 é True
const inserirDecimal = () => {
    if (!existeDecimal()){ // Se não existe decimal
        if (existeValor()){ // Mas existe valor
            atualizarDisplay(',') // Incluo o decimal
        } else { // Se não
            atualizarDisplay('0,') // Incluo '0,'
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
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1 // Verifico se 1 das chaves do objetvo 'mapaTeclado' tem a tecla que foi pressionada, ou seja, se tem retorna true, se não tem retorna false(-1)
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click()
} //  Ao clicar, o sistema irá procurar a tecla correta dentro do meu mapaTeclado

document.addEventListener('keydown', mapearTeclado)
// Comando que houve as teclados do teclado e manda o evento/informação para minha função


// Retorno -1 quando não existe, qualquer outro valor quando existe.