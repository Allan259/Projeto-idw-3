function carregarAnimes() {
    fetch('https://projetoweb-api.vercel.app/anime')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar a lista de animes.');
            }
            return response.json();
        })
        .then(animeData => {
            const animes = animeData.animes;
            const favoritosContainer = document.querySelector('.favorites');
            favoritosContainer.innerHTML = ''; // Limpa qualquer conteúdo anterior

            // Cria checkboxes para cada anime com limite de seleção
            animes.forEach(anime => {
                const label = document.createElement('label');
                label.style.display = 'flex';
                label.style.alignItems = 'center'; // Alinha checkbox e texto centralizados
                label.style.marginBottom = '4px'; // Menor espaçamento entre os itens

                const textNode = document.createTextNode(anime.title);

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = anime.id;
                checkbox.style.marginLeft = '80%'; // Espaçamento mais apertado entre a checkbox e o texto

                // Adiciona evento para limitar a seleção a 6 animes
                checkbox.addEventListener('change', () => {
                    const selecionados = document.querySelectorAll('.favorites input:checked');
                    if (selecionados.length > 6) {
                        checkbox.checked = false;
                        alert('Você pode selecionar no máximo 6 animes favoritos.');
                    }
                });

                label.appendChild(textNode); // Primeiro o nome do anime
                label.appendChild(checkbox); // Depois a checkbox
                favoritosContainer.appendChild(label);
            });
        })
        .catch(error => {
            console.error(error.message);
            alert('Erro ao carregar animes: ' + error.message);
        });
}

function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.querySelector('input[placeholder="Digite seu nome"]').value;
    const email = document.querySelector('input[placeholder="Digite seu e-mail"]').value;
    const senha = document.querySelector('input[placeholder="Digite sua senha"]').value;

    // Obtendo os animes favoritos selecionados
    const favoritos = [];
    document.querySelectorAll('.favorites input:checked').forEach(checkbox => {
        favoritos.push(checkbox.id);
    });

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (favoritos.length > 6) {
        alert("Selecione no máximo 6 animes favoritos.");
        return;
    }

    const usuario = {
        name: nome,
        email,
        password: senha,
        anime_preference: favoritos
    };

    fetch('https://projetoweb-api.vercel.app/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Erro ao registrar usuário.');
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error(error.message);
            alert(`Erro: ${error.message}`);
        });
}

document.querySelector('form.entry').addEventListener('submit', cadastrarUsuario);

// Carregar a lista de animes ao carregar a página
carregarAnimes();
