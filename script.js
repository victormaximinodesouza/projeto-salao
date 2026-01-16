// ===================================
// MODAL - AGENDAMENTO
// ===================================
const scheduleModal = document.getElementById('scheduleModal');

function openScheduleModal(service = '') {
    scheduleModal.style.display = 'block';
    if (service) {
        document.getElementById('serviceName').value = service;
    }
    document.body.style.overflow = 'hidden';
}

function closeScheduleModal() {
    scheduleModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('scheduleForm').reset();
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    if (event.target == scheduleModal) {
        closeScheduleModal();
    }
});

// ===================================
// FORMULÁRIO - ENVIO E VALIDAÇÃO
// ===================================
function handleSubmit(event) {
    event.preventDefault();

    const serviceName = document.getElementById('serviceName').value;
    const clientName = document.getElementById('clientName').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const scheduleDate = document.getElementById('scheduleDate').value;
    const scheduleTime = document.getElementById('scheduleTime').value;
    const clientMessage = document.getElementById('clientMessage').value;

    // Formatar mensagem para WhatsApp
    const message = `Olá! Gostaria de agendar um serviço 💅\n\nServiço: ${serviceName}\nNome: ${clientName}\nTelefone: ${clientPhone}\nData: ${new Date(scheduleDate).toLocaleDateString('pt-BR')}\nHorário: ${scheduleTime}\n${clientMessage ? `\nObservações: ${clientMessage}` : ''}`;

    // Codificar mensagem
    const encodedMessage = encodeURIComponent(message);

    // Enviar via WhatsApp
    const whatsappLink = `https://wa.me/5511999999999?text=${encodedMessage}`;
    
    // Simulação de sucesso
    alert('Agendamento realizado com sucesso! 🎉\n\nVocê será redirecionado para o WhatsApp para confirmar.');
    
    // Redirecionar (descomente para ativar)
    // window.open(whatsappLink, '_blank');
    
    closeScheduleModal();
}

// ===================================
// MENU MOBILE
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
if (navMenu) {
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// DATA MÍNIMA - AGENDAMENTO
// ===================================
const dateInput = document.getElementById('scheduleDate');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===================================
// ANIMAÇÕES AO SCROLL
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ===================================
// SMOOTH SCROLL - LINKS ÂNCORA
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
