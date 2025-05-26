document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');
    const mainTitleElement = document.getElementById('main-title');
    const subtitleElement = document.getElementById('subtitle');

    // Typed.js para efecto de escritura
    if (mainTitleElement) {
        // Primero "Hola, soy Ares", luego el subtítulo animado por CSS
        // El título principal no usará Typed.js para que la animación CSS se vea mejor
        // Solo el subtítulo si se desea, o mantener las animaciones CSS
    }
     if (subtitleElement) {
        new Typed('#subtitle', {
            strings: [
                `Desarrollador Full Stack <span class="highlight-ai">Python & IA</span>`,
                `Creando el futuro con Código e Inteligencia.`,
                `Soluciones Tecnológicas Innovadoras.`
            ],
            typeSpeed: 80,
            backSpeed: 40,
            startDelay: 1200, // Empieza después de la animación del título
            loop: true,
            smartBackspace: true,
            contentType: 'html', // Importante para que interprete el <span>
        });
    }


    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.4}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Cerrar menú móvil si está abierto y se hace clic en un enlace
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => link.style.animation = '');
            }
        });
    });

    // Configuración de Particles.js para tema Negro y Guinda
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60, // Un poco menos para un look más limpio en oscuro
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#8A0303" // Color guinda para las partículas
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.6, // Ligeramente más visibles
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.8,
                        "opacity_min": 0.2,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3.5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 160,
                    "color": "#444444", // Líneas en un gris oscuro, sutiles
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5, // Movimiento más lento y elegante
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // "grab" o "repulse" funcionan bien
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 130,
                        "line_linked": {
                            "opacity": 0.7 // Líneas más visibles al agarrar
                        }
                    },
                    "bubble": { // Menos efectivo en este diseño, pero aquí está la config
                        "distance": 200,
                        "size": 20,
                        "duration": 2,
                        "opacity": 0.8
                    },
                    "repulse": {
                        "distance": 80,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Animación de elementos al hacer scroll (Intersection Observer API)
    const animatedElements = document.querySelectorAll('.section h2, .project-card, .tech-icon, .sobre-mi-texto p, .social-icons a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Aplicar un delay escalonado para algunos elementos
                const delay = entry.target.classList.contains('project-card') || entry.target.classList.contains('tech-icon') ? index * 100 : 0;

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        elementObserver.observe(el);
    });

    // Actualizar año en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

});