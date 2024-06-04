// SE O USUÁRIO ENTRAR SEM O TOKEN VAI DIRECIONAR ELE PARA A PÁGINA DE LOGIN
    var userLogado = JSON.parse(localStorage.getItem('userLogado'));
    if (userLogado && userLogado.nome) {
        var logado = document.querySelector('#logado');
        logado.innerHTML = `<h1>Olá, ${userLogado.nome}</h1>`;
    } else {
        alert('Erro ao carregar dados do usuário.');
        window.location.href = './assets/pages/login.html';
    }
    
// EXECUTAR FUNCAO QUANDO USUARIO FOR SAIR
function sair(){
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    window.location.href = './assets/pages/login.html';
}