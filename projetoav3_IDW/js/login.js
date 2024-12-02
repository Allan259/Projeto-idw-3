function loginUsuario(event) {
    event.preventDefault();

    const email = document.querySelector('input[placeholder="Digite seu e-mail"]').value;
    const senha = document.querySelector('input[placeholder="Digite sua senha"]').value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const credenciais = {
        email: email,
        password: senha
    };

    fetch('https://projetoweb-api.vercel.app/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciais)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Erro no login.');
                });
            }
            return response.json();
        })
        .then(data => {
            // Armazena o token e os dados do usuário no localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userData', JSON.stringify(data.user)); // Salva informações completas do usuário
            alert('Login realizado com sucesso!');
            window.location.href = 'home.html';
        })
        .catch(error => {
            console.error(error.message);
            alert(`Erro: ${error.message}`);
        });
}

document.querySelector('form.entry').addEventListener('submit', loginUsuario);
