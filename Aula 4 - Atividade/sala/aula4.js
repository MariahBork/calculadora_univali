const prompt = require('prompt-sync')();
let tipoCombustivel = prompt('Digite o tipo de combustível: ');
let precoEtanol = 5.79;
let precoGasolina = 7.01;
let precoDiesel = 4.59;
let kmPercorridos = prompt('Quantos km percorreu? ');
let precoPorLitro = prompt("Quantos km por litro o seu carro faz?");
let litrosConsumidos = kmPercorridos / kmPorLitro;
let custoViagem = 0;

if(tipoCombustivel === 'etanol'){
    custoViagem = litrosConsumidos * precoEtanol;
}else if(tipoCombustivel === 'gasolina'){
    custoViagem = litrosConsumidos * precoGasolina;
}else if(tipoCombustivel === 'diesel'){
    custoViagem = litrosConsumidos * precoDiesel;
}

let mensagem = `O custo é de ${custoViagem.toFixed(2)} reais`;
console.log(mensagem);
