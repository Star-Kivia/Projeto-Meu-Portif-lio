const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        if (body.classList.contains('dark-mode')) {
            header.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    } else {
        header.style.boxShadow = 'none';
        if (body.classList.contains('dark-mode')) {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

const filterButtons = document.querySelectorAll('.portfolio-filters button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('confirmationModal');
const closeModalBtn = document.querySelector('.close-modal');
const whatsappBtn = document.getElementById('whatsappBtn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    document.getElementById('conf-name').textContent = name;
    document.getElementById('conf-email').textContent = email;
    document.getElementById('conf-subject').textContent = subject;
    document.getElementById('conf-message').textContent = message;
    
    modal.style.display = 'flex';
    
    whatsappBtn.onclick = function() {
        const phone = '5579999408131'; // Número sem espaços ou caracteres especiais
        const text = `Olá, meu nome é ${name}. ${message} (Assunto: ${subject}). Meu email: ${email}`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    contactForm.reset();
});

closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Simular envio de e-mail
contactForm.addEventListener('submit', function(e) {
    console.log('Dados para envio de e-mail:');
    console.log({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    });
});

// Efeito de digitação 
const subtitle = document.getElementById('typing-subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
subtitle.style.borderRight = '0.15em solid var(--primary)'; // Garantir que a borda seja visível

setTimeout(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
            subtitle.style.borderRight = 'none'; // Remover o cursor após a digitação
        }
    }, 100);
}, 1000);

// Animação ai oh
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .skill-card, .portfolio-item').forEach(item => {
    observer.observe(item);
});