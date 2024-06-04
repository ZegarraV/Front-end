// SE O USUÁRIO ENTRAR SEM O TOKEN VAI DIRECIONAR ELE PARA A PÁGINA DE LOGIN
if(localStorage.getItem('token') == null){ // SE O TOKEN FOR IGUAL A 0 = NÃO EXISTIR
    alert('Você precisa estar logado para acessar essa página!') // MSG NA TELA
    window.location.href = './assets/html/login.html' 
}

var userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (userLogado) {
    var logado = document.querySelector('#logado');

    logado.innerHTML = `<h1>Olá, ${userLogado.nome}</h1>`;

} else {
    alert('Erro ao carregar dados do usuário.');
    window.location.href = './assets/html/login.html';
}

// EXECUTAR FUNCAO QUANDO USUARIO FOR SAIR
function sair(){
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    window.location.href = './assets/html/login.html';
}