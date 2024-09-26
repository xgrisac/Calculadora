'use strict'

const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]') // Com [] procuro TODOS os id que se tenham atributo 'tecla, com * antes do = procuro todos os elementos que tenham pelo menos um pedaço do meu atributo
const operadores = document.querySelectorAll('[id*=operador]') 

let novoNumero = true

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto // Se for novoNumero não concatena
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

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))