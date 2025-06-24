// Loading Animation
    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 1500);
    });

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
      const scrollProgress = document.getElementById('scrollProgress');
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollable) * 100;
      scrollProgress.style.width = progress + '%';
    });

    // Floating Particles Animation
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 15;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
      }
    }

    // Intersection Observer for Section Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Enhanced hover effects for cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
      });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      const parallaxSpeed = 0.5;
      
      if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });

    // Text typing animation for hero
    function typeWriter(element, text, speed = 100) {
      let i = 0;
      element.innerHTML = '';
      
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      type();
    }

    // Mouse cursor trail effect
    let mouseTrail = [];
    const trailLength = 5;

    document.addEventListener('mousemove', (e) => {
      mouseTrail.push({ x: e.clientX, y: e.clientY });
      
      if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
      }
      
      // Remove existing trail elements
      document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
      
      // Create new trail elements
      mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
          position: fixed;
          width: ${6 - index}px;
          height: ${6 - index}px;
          background: rgba(78, 222, 128, ${0.8 - index * 0.15});
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          left: ${point.x - (6 - index) / 2}px;
          top: ${point.y - (6 - index) / 2}px;
          transition: opacity 0.5s ease;
        `;
        document.body.appendChild(trail);
        
        // Remove after animation
        setTimeout(() => {
          if (trail.parentNode) {
            trail.style.opacity = '0';
            setTimeout(() => {
              if (trail.parentNode) {
                trail.remove();
              }
            }, 500);
          }
        }, 100);
      });
    });

    // Initialize animations when page loads
    document.addEventListener('DOMContentLoaded', () => {
      createParticles();
      
      // Add stagger animation to cards
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });
      
      // Add entrance animation to nav items
      const navItems = document.querySelectorAll('nav a');
      navItems.forEach((item, index) => {
        item.style.animation = `slideDown 0.6s ease-out ${0.2 + index * 0.1}s both`;
      });
    });

    // Performance optimization - throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
      // Scroll progress bar
      const scrollProgress = document.getElementById('scrollProgress');
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollable) * 100;
      scrollProgress.style.width = progress + '%';
      
      // Parallax effect
      const hero = document.querySelector('.hero');
      if (hero) {
        const parallaxSpeed = 0.3;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
      
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    });
