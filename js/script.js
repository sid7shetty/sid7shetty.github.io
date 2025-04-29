// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const scrollProgress = document.getElementById('scrollProgress');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const contactForm = document.getElementById('contactForm');
const projectCards = document.querySelectorAll('.project-card');
const skillCategories = document.querySelectorAll('.skill-category');

// Initialize GSAP if available
let gsapAvailable = false;
try {
    if (typeof gsap !== 'undefined') {
        gsapAvailable = true;
        initGsapAnimations();
    }
} catch (e) {
    console.log('GSAP not loaded, using fallback animations');
}

// Enhanced custom cursor
document.addEventListener('mousemove', (e) => {
    // Only show cursor on desktop devices
    if (window.innerWidth > 768) {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delayed cursor follower animation with smoother easing
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    } else {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    }
});

// Enhanced cursor interactions
document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category, .timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.backgroundColor = 'rgba(0, 123, 255, 0.5)';
        cursorFollower.style.border = '1px solid rgba(0, 123, 255, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'var(--primary-color)';
        cursorFollower.style.border = '1px solid var(--primary-color)';
    });
});

// Hide cursor when it leaves the window
document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement) {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    }
});

document.addEventListener('mouseover', () => {
    if (window.innerWidth > 768) {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }
});

// Mobile menu toggle with smooth animation
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    mobileMenuBtn.classList.toggle('active');
    
    // Add body scroll lock when menu is open
    if (navLinks.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            // Smoother scroll with custom easing
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Enhanced navbar scroll effect
const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.padding = '0.6rem 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
};

window.addEventListener('scroll', handleNavbarScroll);

// Enhanced scroll progress indicator
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
    
    // Add pulsing effect when reach 100%
    if (scrollPercentage > 99) {
        scrollProgress.classList.add('completed');
    } else {
        scrollProgress.classList.remove('completed');
    }
});

// Enhanced scroll animations with intersection observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Once animated, no need to observe anymore
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

animatedElements.forEach(element => {
    observer.observe(element);
});

// Enhanced project card hover effects
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const projectImage = this.querySelector('.project-image img');
        if (projectImage) {
            projectImage.style.transform = 'scale(1.05)';
        }
        this.style.transform = 'translateY(-15px)';
        this.style.boxShadow = '0 25px 35px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        const projectImage = this.querySelector('.project-image img');
        if (projectImage) {
            projectImage.style.transform = 'scale(1)';
        }
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Enhanced skill category hover effects with icons
skillCategories.forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        const skillIcon = this.querySelector('.skill-icon img');
        if (skillIcon) {
            skillIcon.style.transform = 'scale(1.2) translateY(-5px)';
        }
    });
    
    skill.addEventListener('mouseleave', function() {
        const skillIcon = this.querySelector('.skill-icon img');
        if (skillIcon) {
            skillIcon.style.transform = 'scale(1)';
        }
    });
});

// Lazy loading for project and skill images
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Dark mode toggle with enhanced animation
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Add transition class for smoother theme change
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Enhanced contact form with validation and better feedback
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Reset error states
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error');
        });
        
        // Simple validation
        let hasError = false;
        
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            hasError = true;
        }
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            emailInput.classList.add('error');
            hasError = true;
        }
        
        if (!messageInput.value.trim()) {
            messageInput.classList.add('error');
            hasError = true;
        }
        
        if (hasError) {
            shakeElement(contactForm.querySelector('button[type="submit"]'));
            return;
        }
        
        // Simulate form submission with better feedback
        const formButton = this.querySelector('button[type="submit"]');
        const originalText = formButton.textContent;
        
        // Disable button and show loading state
        formButton.disabled = true;
        formButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
            
            // Hide form fields temporarily
            formGroups.forEach(group => {
                group.style.display = 'none';
            });
            formButton.style.display = 'none';
            
            // Add success message
            contactForm.appendChild(successMessage);
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                formGroups.forEach(group => {
                    group.style.display = 'block';
                });
                formButton.style.display = 'block';
                formButton.disabled = false;
                formButton.textContent = originalText;
                contactForm.removeChild(successMessage);
            }, 3000);
        }, 1500);
    });
    
    // Add floating labels effect for form inputs
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check on load if fields are filled
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Initialize page animations on load
window.addEventListener('load', () => {
    // Add initial animations for hero section
    document.querySelectorAll('.text-reveal').forEach((element, index) => {
        element.style.animationDelay = `${0.2 * index}s`;
    });
    
    // Set initial state for animate-on-scroll elements
    animatedElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            setTimeout(() => {
                el.classList.add('show');
            }, 300); // Stagger effect
        }
    });
    
    // Hide page loader if exists
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        pageLoader.classList.add('loaded');
    }
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize portfolio filters
    initPortfolioFilters();
});

// Auto-resize text area with better performance
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});

// Parallax effects
function initParallaxEffects() {
    // Hero section parallax
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        });
    }
    
    // Add subtle movement to profile image on mouse move
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;
                
                profileImg.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
            }
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Helper function for error animation
function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 600);
}

// Function to initialize GSAP animations if available
function initGsapAnimations() {
    // Only run if GSAP is loaded
    if (!gsapAvailable) return;
    
    // Hero section animations
    gsap.from('.hero-text h1', {
        duration: 1.2,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-text .subtitle', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-cta', {
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-image', {
        duration: 1.5,
        opacity: 0,
        scale: 0.8,
        delay: 0.4,
        ease: 'elastic.out(1, 0.3)'
    });
    
    // ScrollTrigger for sections
    gsap.registerPlugin(ScrollTrigger);
    
    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // Animate project cards
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            stagger: 0.2
        });
    });

    // Animate skill categories
    gsap.utils.toArray('.skill-category').forEach(skill => {
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            stagger: 0.1
        });
    });
}

// Portfolio filtering functionality
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const projectItems = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                    
                    // Add animation for appearing items
                    setTimeout(() => {
                        if (item.style.display === 'block') {
                            item.classList.add('show-portfolio-item');
                        } else {
                            item.classList.remove('show-portfolio-item');
                        }
                    }, 100);
                });
            });
        });
    }
}