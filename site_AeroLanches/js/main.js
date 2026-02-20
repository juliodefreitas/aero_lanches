/* ============================================
   TOGGLE DO MENU MOBILE
   ============================================ */

// Seleciona o botão hambúrguer e a lista de navegação
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

// Verifica se os elementos existem antes de adicionar eventos
if (menuToggle && navList) {
    // Ao clicar no botão, alterna a classe 'active' (abre/fecha menu)
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Fecha o menu automaticamente ao clicar em um link de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
}

/* ============================================
   EFEITO DE SCROLL NO HEADER
   ============================================ */

// Seleciona o header e controla a sombra baseado no scroll
const header = document.querySelector('.header');
let lastScroll = 0;

// Aumenta a sombra do header quando o usuário rola a página
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Se scrollou mais de 100px, aumenta a sombra para dar mais destaque
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

/* ============================================
   ANIMAÇÃO DE SCROLL (FADE IN)
   ============================================ */

// Configuração do Intersection Observer para detectar quando elementos entram na viewport
const observerOptions = {
    threshold: 0.1,                    // Dispara quando 10% do elemento está visível
    rootMargin: '0px 0px -50px 0px'    // Margem inferior para disparar antes
};

// Observer que adiciona classe 'visible' quando elemento entra na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');  // Adiciona classe para animação
        }
    });
}, observerOptions);

// Aplica animação fade-in aos elementos quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos que devem ter animação ao aparecer
    const animateElements = document.querySelectorAll('.qualidade-card, .endereco-info, .mapa-container, .contato-text');
    
    // Adiciona classe fade-in e observa cada elemento
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);  // Inicia a observação
    });
});

/* ============================================
   SCROLL SUAVE PARA LINKS DE NAVEGAÇÃO
   ============================================ */

// Adiciona scroll suave para todos os links que apontam para âncoras (#)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();  // Previne o comportamento padrão
        
        // Encontra o elemento de destino
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Calcula a posição considerando a altura do header fixo
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Faz scroll suave até a posição calculada
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'  // Scroll suave
            });
        }
    });
});

/* ============================================
   EFEITO HOVER NOS CARDS DE QUALIDADE
   ============================================ */

// Adiciona efeito de elevação e escala ao passar o mouse nos cards
const cards = document.querySelectorAll('.qualidade-card');
cards.forEach(card => {
    // Quando o mouse entra no card
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';  // Eleva e aumenta levemente
    });
    
    // Quando o mouse sai do card
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';  // Volta ao normal
    });
});

/* ============================================
   FUNÇÃO PARA ATUALIZAR MAPA (FUTURO)
   ============================================ */

// Função preparada para futuras melhorias no mapa
function updateMapEmbed() {
    const iframe = document.querySelector('.mapa-container iframe');
    if (iframe) {
        // O iframe já está configurado no HTML
        // Esta função pode ser expandida para adicionar mais funcionalidades
        const address = 'R. Holanda, 580 - Boa Vista, Curitiba - PR, 82510-190';
    }
}

/* ============================================
   INICIALIZAÇÃO QUANDO A PÁGINA CARREGA
   ============================================ */

// Executa quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    updateMapEmbed();
    
    // Garante que o conteúdo do hero tenha a animação de entrada
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
});

/* ============================================
   EFEITO HOVER NO BOTÃO WHATSAPP FLUTUANTE
   ============================================ */

// Melhora a interatividade do botão WhatsApp flutuante
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    // Aumenta o botão quando o mouse passa por cima
    whatsappFloat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    // Volta ao tamanho normal quando o mouse sai
    whatsappFloat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

/* ============================================
   POPUP DE RESENHAS - CARROSSEL AUTOMÁTICO
   ============================================ */

// Seleciona elementos do popup
const popupResenhas = document.getElementById('popupResenhas');
const closePopup = document.getElementById('closePopup');
const resenhasCarousel = document.getElementById('resenhasCarousel');
const slides = document.querySelectorAll('.resenha-slide');
const indicators = document.querySelectorAll('.popup-indicators .indicator');

let currentSlide = 0;
let carouselInterval = null;

// Função para mostrar um slide específico
function showSlide(index) {
    // Remove classe active de todos os slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    
    // Atualiza indicadores
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) {
            indicator.classList.add('active');
        }
    });
    
    currentSlide = index;
}

// Função para passar para o próximo slide
function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

// Função para iniciar o carrossel automático
function startCarousel() {
    // Limpa intervalo anterior se existir
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    // Muda de slide a cada 5 segundos
    carouselInterval = setInterval(nextSlide, 5000);
}

// Função para parar o carrossel
function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// Abre o popup
function openPopup() {
    if (popupResenhas) {
        popupResenhas.classList.add('active');
        showSlide(0);
        startCarousel();
    }
}

// Fecha o popup
function closePopupFunc() {
    if (popupResenhas) {
        popupResenhas.classList.remove('active');
        stopCarousel();
    }
}

// Event listeners
if (closePopup) {
    closePopup.addEventListener('click', closePopupFunc);
}

// Fecha ao clicar no overlay
if (popupResenhas) {
    const overlay = popupResenhas.querySelector('.popup-overlay');
    if (overlay) {
        overlay.addEventListener('click', closePopupFunc);
    }
    
    // Evita fechar ao clicar no conteúdo do celular
    const popupPhone = popupResenhas.querySelector('.popup-phone');
    if (popupPhone) {
        popupPhone.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Navegação por indicadores (clicar nas bolinhas)
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        stopCarousel();
        startCarousel(); // Reinicia o timer
    });
});

// Abre o popup automaticamente após 2 segundos do carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(openPopup, 2000);
});
