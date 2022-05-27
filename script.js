//blue = 1
//red = 2
//green = 3
//yellow = 4

let arrayCores = [];
let arrayJogador = [];
let arrayConfirma = [];
let acumulador = 1;
let contadorClick = 0;

// chamando as classes
const apagado = document.querySelectorAll(".apagado")
const mgsTela = document.querySelector(".msg_tela")
const numTela = document.querySelector(".num_tela")

//chamando o som

/*let som1 = document.querySelector('#btn');
som1.addEventListener('click',function(){
    const audio =document.querySelector('#som1')
    audio.play()
});*/



function start(){
    numTela.innerHTML = acumulador;
    for(let i = 0; i< acumulador; i++){
        arrayCores[i] = Math.floor(Math.random() * 4)
        //toque(arrayCores[i])
        removedor(arrayCores[i], Number(i) + 1)
    }
}

function entradaJogador(id){
    //toque(id)
    //adiciona o numero do botao clicado
    arrayJogador[contadorClick] = id 
    //acumulador de click
    contadorClick++ 
    //verificador de excesso de cliques
    if(contadorClick > acumulador){
        msgAviso("Excesso de cliques")
    }
    removedor(id, 0)
}

//remove o elemento da classe
function removedor(valor, number){
    let desvio = number;
    number = number * 1000
    setTimeout(() => {
        apagado[valor].classList.remove('apagado')
        toque(valor)
        chamaJogador(valor, desvio)
        tempoFim(valor);
    }, number - 200) 
}

//adiciona o elemento a classe
function tempoFim(valor){
    setTimeout(() => {
        apagado[valor].classList.add('apagado')
        //start()//sempre comentar pra não virar loop
    }, 200) 
}

//ao finalizar a sequencia de de piscadas vai ser chamado o jogador
function chamaJogador(valor, desvio){
    //salvando os valores e comparando com o aculador para finalizar as piscadas
    //console.log(desvio)
    if(desvio != 0){
        arrayConfirma[desvio - 1] = valor
        if(arrayConfirma.length === acumulador){
           msgAviso("Sua vez") 
        }
    }else{
        if(arrayJogador.length == acumulador){
            for (let i = 0; i < acumulador; i++){
                if(arrayConfirma[i] == arrayJogador[i]){
                    msgAviso("Proximo nivel");
                }else{
                    msgAviso("Você errou")
                    gameOver()
                    return
                }
            }
            nextLevel();
        }   
    }
}

function nextLevel(){
    acumulador = acumulador + 1;
    setTimeout(() => {
        resetando();
        start();
    }, 2000) 
}

function gameOver(){
    toque(4)
    acumulador = 1;
    resetando();
}

function resetando(){
    arrayCores = [];
    arrayJogador = [];
    arrayConfirma = [];
    contadorClick = 0;
}

function toque(valor){
    const audio =document.querySelector('#som' + valor)
    audio.play()
}

//AVISA QUE É A VEZ DO JOGADOR//
//IMPLEMENTAR OUTRAS MENSAGENS
function msgAviso(aviso){
    setTimeout(() => {
        mgsTela.innerHTML = aviso
        setTimeout(() => {
            mgsTela.innerHTML = " " 
        }, 1000);
    }, 500);  
}