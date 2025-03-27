// Main JavaScript file for interactive webpage

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
      const preloader = document.querySelector('.preloader');
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 100);
    });
  
    document.addEventListener('mousedown', function() {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
  
    document.addEventListener('mouseup', function() {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  
    // Links and buttons hover effect
    const links = document.querySelectorAll('a, button, .btn');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorFollower.style.borderColor = 'transparent';
      });
      link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'var(--primary-color)';
      });
    });
  
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
  
    window.addEventListener('scroll', function() {
      // Add scrolled class to navbar
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
  
      // Update active nav link based on scroll position
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
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
  
      // Show/hide back to top button
      const backToTop = document.getElementById('back-to-top');
      if (window.scrollY > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });
  
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  
    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Typing animation
    const typingElement = document.querySelector('.typing');
    const words = ['Computer Science Student', 'Developer', 'Problem Solver', 'Innovator'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
  
    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
      }
  
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 1000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500;
      }
  
      setTimeout(type, typingDelay);
    }
  
    if (typingElement) {
      setTimeout(type, 1000);
    }
  
    // Skill progress bars animation
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
      skillProgress.forEach(progress => {
        const value = progress.getAttribute('data-progress');
        progress.style.width = value + '%';
      });
    }
  
    // Circular skill charts animation
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    function animateCircles() {
      skillCircles.forEach(circle => {
        const percentage = circle.parentElement.getAttribute('data-percentage');
        const radius = circle.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
      });
    }
  
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
  
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        document.getElementById(`${target}-pane`).classList.add('active');
      });
    });
  
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        if (name.value.trim() === '') {
          valid = false;
          showError(name, 'Name is required');
        } else {
          removeError(name);
        }
        
        if (email.value.trim() === '') {
          valid = false;
          showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
          valid = false;
          showError(email, 'Please enter a valid email');
        } else {
          removeError(email);
        }
        
        if (subject.value.trim() === '') {
          valid = false;
          showError(subject, 'Subject is required');
        } else {
          removeError(subject);
        }
        
        if (message.value.trim() === '') {
          valid = false;
          showError(message, 'Message is required');
        } else {
          removeError(message);
        }
        
        if (valid) {
          // Simulate form submission
          const submitBtn = contactForm.querySelector('.submit-btn');
          const originalText = submitBtn.innerHTML;
          
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
          submitBtn.disabled = true;
          
          setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            setTimeout(() => {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
            }, 3000);
          }, 2000);
        }
      });
    }
  
    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      
      // Remove any existing error message
      const existingError = formGroup.querySelector('.error-message');
      if (existingError) {
        formGroup.removeChild(existingError);
      }
      
      formGroup.appendChild(errorElement);
      input.style.borderColor = 'red';
    }
  
    function removeError(input) {
      const formGroup = input.parentElement;
      const errorElement = formGroup.querySelector('.error-message');
      
      if (errorElement) {
        formGroup.removeChild(errorElement);
      }
      
      input.style.borderColor = '';
    }
  
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  
    // Animate elements when they come into view
    const animateItems = document.querySelectorAll('.animate-item');
    
    function checkScroll() {
      animateItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
          item.classList.add('animate');
        }
      });
      
      // Animate skill bars when they come into view
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsSectionTop < windowHeight - 100) {
          animateSkills();
          animateCircles();
        }
      }
    }
  
    // Initial check and add scroll event listener
    checkScroll();
    window.addEventListener('scroll', checkScroll);
  });
  
  // Particles.js configuration
  // This is already included in the initialization above
  