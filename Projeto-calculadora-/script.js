// Declaração de variáveis

var display = document.getElementById("display")
var numeros = document.querySelectorAll("[id^=tecla]")
var operadores = document.querySelectorAll("[id^=op]")
var numeroNovo = true
var contador = 0
var operador;
var numeroAnterior;
var control = false

function mostrarCalculo(texto) {
    if (numeroNovo) {
        display.textContent = texto
        numeroNovo = false
    } else {
        display.textContent += texto
    }
}

function inserirNumeros(evento) {

    if (control == false) {
        contador++
        console.log(contador);
        if (contador > 8) {
            display.textContent = "LIMITE MÁXIMO : 8"
            control = true
            display.style.color = 'red'
            contador = 0;
            setTimeout(() => {
                display.textContent = ""
                control = false
            }, 1300)
        } else {
            mostrarCalculo(evento.target.textContent)
            display.style.color = 'white'
        }
    }

}

function operacaoPendente() {
    if (operador != undefined) {
        return true
    } else {
        return false
    }
}

function calcular() {
    if (operacaoPendente()) {
        var numeroAtual = parseFloat(display.textContent)
        numeroNovo = true
        if (operador == "+") {
            mostrarCalculo(numeroAnterior + numeroAtual)
        } else if (operador == "-") {
            mostrarCalculo(numeroAnterior - numeroAtual)
        } else if (operador == "*") {
            mostrarCalculo(numeroAnterior * numeroAtual)
        } else if (operador == "÷") {
            mostrarCalculo(numeroAnterior / numeroAtual)
        }
    }
}

function selecionarOperador(evento) {
    contador = 0
    if (!numeroNovo || display.textContent != "LIMITE MÁXIMO : 8") {
        calcular()
        numeroNovo = true
        operador = evento.target.textContent
        numeroAnterior = parseFloat(display.textContent)
    }

}

function verificaCalculo() {
    if (display.textContent != "LIMITE MÁXIMO : 8") {
        calcular()
        operador = undefined
    }
}

function limparDisplay() {
    display.textContent = ""
}

function limparCalculo() {
    display.textContent = "0"
    numeroNovo = true
    operador = undefined
    numeroAnterior = undefined
}

function inverterSinal() {
    if (display.textContent != "LIMITE MÁXIMO : 8") {
        numeroNovo = true
        mostrarCalculo(display.textContent * -1)
    }
}

// Adiciona evento de click a todos numeros e chama a função inserirNumeros
numeros.forEach(numero => numero.addEventListener('click', inserirNumeros))

//Adiciona evento de click a todos os operadores e chama a função selecionarOperador
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))