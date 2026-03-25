// Função para validar se o valor é positivo e válido
function validarValor(valor, nomeCampo) {
    if (valor === "" || valor === null) {
        alert(`Por favor, preencha o campo "${nomeCampo}"!`);
        return false;
    }
    
    const numero = parseFloat(valor);
    if (isNaN(numero)) {
        alert(`Por favor, insira um número válido no campo "${nomeCampo}"!`);
        return false;
    }
    
    if (numero <= 0) {
        alert(`O campo "${nomeCampo}" deve ser um valor positivo (maior que zero)!`);
        return false;
    }
    
    return true;
}

// Função principal para calcular a economia
function calcularEconomia() {
    // Obter os valores dos campos
    const objetivoInput = document.getElementById("objetivo");
    const valorInicialInput = document.getElementById("valorInicial");
    const depositoMensalInput = document.getElementById("depositoMensal");
    const jurosMensalInput = document.getElementById("jurosMensal");
    
    // Validar todos os campos obrigatórios
    const objetivoValido = validarValor(objetivoInput.value, "objetivo financeiro");
    const valorInicialValido = validarValor(valorInicialInput.value, "valor inicial da poupança");
    const depositoMensalValido = validarValor(depositoMensalInput.value, "depósito mensal");
    const jurosMensalValido = validarValor(jurosMensalInput.value, "juros mensal");
    
    if (!objetivoValido || !valorInicialValido || !depositoMensalValido || !jurosMensalValido) {
        return;
    }
    
    // Converter valores para números
    const objetivo = parseFloat(objetivoInput.value);
    const valorInicial = parseFloat(valorInicialInput.value);
    const depositoMensal = parseFloat(depositoMensalInput.value);
    const jurosMensal = parseFloat(jurosMensalInput.value) / 100; // Converter porcentagem para decimal
    
    // Verificar se o valor inicial já é maior que o objetivo
    if (valorInicial >= objetivo) {
        document.getElementById("total").value = "✅ Você já atingiu seu objetivo!";
        return;
    }
    
    // Calcular quantos meses serão necessários
    let saldoAtual = valorInicial;
    let meses = 0;
    const maxMeses = 1200; // Limite máximo de 100 anos para evitar loop infinito
    
    while (saldoAtual < objetivo && meses < maxMeses) {
        // Aplicar juros sobre o saldo atual
        saldoAtual = saldoAtual * (1 + jurosMensal);
        // Adicionar depósito mensal
        saldoAtual += depositoMensal;
        meses++;
    }
    
    // Verificar se atingiu o objetivo dentro do limite
    if (meses >= maxMeses) {
        document.getElementById("total").value = "❌ Não foi possível atingir o objetivo no período máximo!";
    } else {
        // Formatar o resultado
        const resultado = `📊 Em ${meses} mês${meses !== 1 ? 'es' : ''} você terá R$ ${saldoAtual.toFixed(2)}`;
        document.getElementById("total").value = resultado;
        
        // Calcular valor total investido
        const totalInvestido = valorInicial + (depositoMensal * meses);
        const totalJuros = saldoAtual - totalInvestido;
        
        // Mostrar detalhes em um alerta
        alert(`📈 RESULTADO DA SIMULAÇÃO:\n\n` +
              `✅ Objetivo: R$ ${objetivo.toFixed(2)}\n` +
              `💰 Valor final: R$ ${saldoAtual.toFixed(2)}\n` +
              `📅 Tempo necessário: ${meses} meses (${Math.floor(meses/12)} anos e ${meses%12} meses)\n` +
              `💵 Total investido: R$ ${totalInvestido.toFixed(2)}\n` +
              `📊 Total em juros: R$ ${totalJuros.toFixed(2)}`);
    }
}

// Função para limpar todos os campos
function limparTudo() {
    document.getElementById("objetivo").value = "";
    document.getElementById("valorInicial").value = "";
    document.getElementById("depositoMensal").value = "";
    document.getElementById("jurosMensal").value = "";
    document.getElementById("total").value = "";
}

// Adicionar suporte para tecla Enter
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        calcularEconomia();
    }
});

// Adicionar validação em tempo real para impedir números negativos
document.addEventListener("DOMContentLoaded", function() {
    const campos = ["objetivo", "valorInicial", "depositoMensal", "jurosMensal"];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        campo.addEventListener("input", function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});
