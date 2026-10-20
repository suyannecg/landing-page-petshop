// menu mobile

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    // Toggle do menu mobile
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// form

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contatoForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Limpar mensagens anteriores
            formMessage.className = '';
            formMessage.textContent = '';

            //valores dos campos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            // Validar campos
            let isValid = true;

            // Validar Nome
            if (!nome) {
                mostrarErro('nome', 'Por favor, insira seu nome');
                isValid = false;
            } else if (nome.length < 3) {
                mostrarErro('nome', 'O nome deve ter pelo menos 3 caracteres');
                isValid = false;
            } else {
                limparErro('nome');
            }

            // Validar Email
            if (!email) {
                mostrarErro('email', 'Por favor, insira seu email');
                isValid = false;
            } else if (!validarEmail(email)) {
                mostrarErro('email', 'Por favor, insira um email válido');
                isValid = false;
            } else {
                limparErro('email');
            }

            // Validar Mensagem
            if (!mensagem) {
                mostrarErro('mensagem', 'Por favor, insira uma mensagem');
                isValid = false;
            } else if (mensagem.length < 10) {
                mostrarErro('mensagem', 'A mensagem deve ter pelo menos 10 caracteres');
                isValid = false;
            } else {
                limparErro('mensagem');
            }

            // Se válido, enviar
            if (isValid) {
                enviarFormulario(nome, email, telefone, mensagem);
            }
        });
    }
});

// Função para validar email
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// Função para mostrar erro
function mostrarErro(fieldId, mensagem) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById('erro' + fieldId.charAt(0).toUpperCase() + fieldId.slice(1));
    
    field.parentElement.classList.add('error');
    errorElement.textContent = mensagem;
    errorElement.classList.add('show');
}

// Função para limpar erro
function limparErro(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById('erro' + fieldId.charAt(0).toUpperCase() + fieldId.slice(1));
    
    field.parentElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Função para enviar formulário
function enviarFormulario(nome, email, telefone, mensagem) {
    const formMessage = document.getElementById('formMessage');
    const form = document.getElementById('contatoForm');

    // Simular envio
    console.log('Formulário enviado:', {
        nome: nome,
        email: email,
        telefone: telefone,
        mensagem: mensagem,
        data: new Date().toLocaleString('pt-BR')
    });

    // Mostrar mensagem de sucesso
    formMessage.className = 'form-message success';
    formMessage.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';

    // Limpar formulário
    form.reset();

    // Remover mensagem após 5 segundos
    setTimeout(function() {
        formMessage.className = '';
        formMessage.textContent = '';
    }, 5000);

    // rolar para a mensagem
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// animação ao rolar a página

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementsToAnimate = document.querySelectorAll(
        '.servico-card, .indicador-card, .info-item'
    );

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80; //navbar fixa

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// validação

document.addEventListener('DOMContentLoaded', function() {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    if (nomeInput) {
        nomeInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0) {
                limparErro('nome');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0 && validarEmail(this.value)) {
                limparErro('email');
            }
        });
    }

    if (mensagemInput) {
        mensagemInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0) {
                limparErro('mensagem');
            }
        });
    }
});

// console log debug 

console.log('%c🐾 Meu MiAu Pet Shop - Landing Page Carregada com Sucesso!', 
    'color: #FF6B9D; font-size: 16px; font-weight: bold;');
console.log('%cTodos os scripts foram inicializados corretamente.', 
    'color: #6C5CE7; font-size: 12px;');
