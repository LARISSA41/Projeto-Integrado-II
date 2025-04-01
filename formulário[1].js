document.addEventListener("DOMContentLoaded", function () {
    // Pegando o formulário (pode ser de login ou cadastro)
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio automático do formulário
        
        // Pegando os valores dos campos
        let email = document.getElementById("email");
        let senha = document.getElementById("senha");
        let nome = document.getElementById("nome"); // Para o cadastro
        let confirmSenha = document.getElementById("confirmSenha"); // Para o cadastro

        // Resetando as mensagens de erro e estilos
        resetForm();

        // Variável para saber se tudo está correto
        let valid = true;
        let tipoForm = form.dataset.tipo; // Verifica se o formulário é de "cadastro" ou "login"

        // Validação do Nome (só para cadastro)
        if (tipoForm === "cadastro" && !nome.value.trim()) {
            showError(nome, "O nome é obrigatório!");
            valid = false;
        }

        // Validação do E-mail
        if (!isValidEmail(email.value)) {
            showError(email, "E-mail inválido!");
            valid = false;
        }

        // Validação da Senha
        if (senha.value.length < 6) {
            showError(senha, "A senha deve ter pelo menos 6 caracteres!");
            valid = false;
        }

        // Validação da Confirmação de Senha (só para cadastro)
        if (tipoForm === "cadastro" && senha.value !== confirmSenha.value) {
            showError(confirmSenha, "As senhas não coincidem!");
            valid = false;
        }

        // Se o formulário estiver válido, envia
        if (valid) {
            alert(tipoForm === "cadastro" ? "Cadastro realizado com sucesso!" : "Login realizado com sucesso!");
            form.submit(); // Envia o formulário
        }
    });

    // Função para resetar os erros e bordas
    function resetForm() {
        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => {
            input.style.border = "1px solid #ccc"; // Resetando bordas
            const error = input.nextElementSibling;
            if (error && error.classList.contains("error")) {
                error.textContent = ""; // Resetando mensagens de erro
            }
        });
    }

    // Função para mostrar a mensagem de erro
    function showError(input, message) {
        input.style.border = "2px solid red"; // Borda vermelha
        let errorSpan = input.nextElementSibling;
        
        if (!errorSpan || !errorSpan.classList.contains("error")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error");
            input.parentElement.appendChild(errorSpan);
        }

        errorSpan.textContent = message; // Definindo a mensagem de erro
    }

    // Função para validar o formato de e-mail
    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }
});
