// Função para adicionar números e operadores ao display
const setNumero = function(x){
    let display = document.getElementById("display");
    display.value += x;
}

// Função para calcular o resultado
const setIgual = () => {
    let display = document.getElementById("display");
    try {
        // Verificar se o display não está vazio
        if (display.value === "") {
            return;
        }
        // Calcular a expressão
        let resultado = eval(display.value);
        // Verificar se o resultado é um número válido
        if (isNaN(resultado) || !isFinite(resultado)) {
            display.value = "Erro";
        } else {
            display.value = resultado;
        }
    } catch (error) {
        display.value = "Erro";
    }
}

// Função para limpar o display
const setLimpar = () => {
    document.getElementById("display").value = "";
}
