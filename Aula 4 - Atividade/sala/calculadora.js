const setNumero = function(x){
    let display = documento.getElementById("display");
    display.value += x;
}

const setIgual = () => {
    let res = documento.getElementById("display");
    res = eval(res.value);
    documento.getElementById("display").value = res;
}