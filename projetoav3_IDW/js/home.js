function verificarLogin() {
    const token = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('userData')); // Dados do usuário

    if (!token || !userData) {
        window.location.href = 'login.html';
        return;
    }

    // Exibir dados do usuário
    document.querySelector('.container span').innerText = `Seja Bem-vindo, ${userData.name}!`;
    document.querySelector('.container span:nth-child(2)').innerText = `Seu email é: ${userData.email}`;

    // Renderizar os animes favoritos
    const favoritos = userData.animes; // Lista de animes favoritos
    const cardsDiv = document.querySelector('.cardsdiv');
    cardsDiv.innerHTML = '';

    favoritos.forEach(anime => {
        const divCard = document.createElement('div');
        divCard.classList.add('cards');

        const img = document.createElement('img');
        img.src = anime.cover; // URL da capa fornecida pela API
        img.alt = anime.title;

        const span = document.createElement('span');
        span.innerText = anime.title;

        divCard.appendChild(img);
        divCard.appendChild(span);
        cardsDiv.appendChild(divCard);
    });
}

function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

document.querySelector('button').addEventListener('click', logout);

verificarLogin();
