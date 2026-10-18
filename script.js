/**
 * CodeX Priyanshu — Interactive Portfolio Engine
 * Author: Priyanshu Kumar Maurya
 * Features:
 *  - Theme Engine (Dark / Light mode with localStorage)
 *  - Dynamic Typing Animation for Hero Section
 *  - Interactive Developer CLI Terminal Simulator with Easter Eggs
 *  - Skills Categorization & Interactive Filter Tabs
 *  - Smooth Scroll Spy & Navigation Drawer
 *  - One-Click Code Snippet Copy
 *  - Form Validation & Animated Toast System
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Configuration & Constants
  // ---------------------------------------------------------------------------
  const CONFIG = {
    STORAGE_THEME_KEY: 'codex_theme_pref',
    TYPING_WORDS: [
      'Full-Stack Web Developer',
      'BCA Scholar & Programmer',
      'UI/UX & Frontend Architect',
      'Creative Software Engineer',
      'Open Source Contributor'
    ],
    TYPING_SPEED: 90,
    DELETING_SPEED: 45,
    PAUSE_TIME: 2000,
    DEVELOPER: {
      name: 'Priyanshu Kumar Maurya',
      email: 'pk1062417@gmail.com',
      degree: 'BCA (Bachelor of Computer Applications)',
      location: 'Mariyahu, Jaunpur, Uttar Pradesh, India (222161)',
      github: 'https://github.com/Priyanshu-kumar-maurya',
      linkedin: 'https://www.linkedin.com/in/priyanshu-kumar-maurya-808718281/',
      instagram: 'https://www.instagram.com/codexs_priyanshu/',
      bio: 'https://priyanshu-kumar-maurya.github.io/Bio/'
    }
  };

  // ---------------------------------------------------------------------------
  // 2. Toast Notification System
  // ---------------------------------------------------------------------------
  function showToast(message, type = 'info', icon = 'fas fa-info-circle') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon"><i class="${icon}"></i></div>
      <div class="toast-content">${message}</div>
      <button class="toast-close-btn" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    const closeBtn = toast.querySelector('.toast-close-btn');
    const dismiss = () => {
      toast.classList.remove('visible');
      setTimeout(() => {
        if (toast.parentNode === container) {
          container.removeChild(toast);
        }
      }, 350);
    };

    if (closeBtn) closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, 3800);
  }

  // ---------------------------------------------------------------------------
  // 3. Theme Toggle (Dark / Light Mode)
  // ---------------------------------------------------------------------------
  function initTheme() {
    const toggleBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem(CONFIG.STORAGE_THEME_KEY) || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(CONFIG.STORAGE_THEME_KEY, newTheme);

        showToast(
          newTheme === 'dark' ? 'Dark Futuristic Mode enabled 🌙' : 'Light Daylight Mode enabled ☀️',
          'success',
          newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'
        );
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Dynamic Typewriter Animation
  // ---------------------------------------------------------------------------
  function initTypewriter() {
    const textEl = document.getElementById('typewriterText');
    if (!textEl) return;

    const words = CONFIG.TYPING_WORDS;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        textEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        textEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? CONFIG.DELETING_SPEED : CONFIG.TYPING_SPEED;

      if (!isDeleting && charIndex === currentWord.length) {
        timeout = CONFIG.PAUSE_TIME;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = 500;
      }

      setTimeout(type, timeout);
    }

    type();
  }

  // ---------------------------------------------------------------------------
  // 5. Navigation, Mobile Drawer & Scroll Spy
  // ---------------------------------------------------------------------------
  function initNavigation() {
    const header = document.getElementById('mainHeader');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawerBtn = document.getElementById('closeMobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Sticky Header Blur & Back-to-Top Toggle
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      if (header) {
        if (scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      if (backToTopBtn) {
        if (scrollY > 350) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }

      updateActiveNav();
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Mobile Drawer Controls
    const openDrawer = () => {
      if (mobileDrawer) mobileDrawer.classList.add('open');
      if (drawerOverlay) drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
      if (drawerOverlay) drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Skills Categorization Tabs
  // ---------------------------------------------------------------------------
  function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const cards = document.querySelectorAll('.skill-card');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.dataset.category;

        cards.forEach(card => {
          const cardCategories = (card.dataset.category || '').split(' ');
          if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 7. Interactive CLI Terminal Simulator
  // ---------------------------------------------------------------------------
  function initTerminal() {
    const input = document.getElementById('terminalInput');
    const historyContainer = document.getElementById('terminalHistory');
    const screen = document.getElementById('terminalScreen');
    const clearBtn = document.getElementById('clearTerminalBtn');
    const chips = document.querySelectorAll('.chip-cmd');

    if (!input || !historyContainer) return;

    let commandHistory = [];
    let historyIndex = -1;

    const COMMANDS = {
      help: () => `
Available Commands:
  - about       : Learn more about Priyanshu
  - skills      : Print technical skill competencies
  - projects    : View featured web projects with live URLs
  - education   : Display academic details (BCA Scholar)
  - contact     : Get email, location, and contact coordinates
  - socials     : Links to LinkedIn, GitHub, Instagram, Bio
  - theme       : Toggle dark and light mode
  - clear       : Clear terminal window (Ctrl+L)
  - sudo hire   : Unlock full developer privileges
  - date        : Current date and time
  - help        : Show this manual
`,
      about: () => `
👨‍💻 *Priyanshu Kumar Maurya*
Degree   : Bachelor of Computer Applications (BCA)
Role     : Full-Stack Web Developer & Creative Engineer
Location : Mariyahu, Jaunpur, Uttar Pradesh, India
Focus    : Modern Web Development, Clean Responsive UI/UX, Algorithmic Thinking.
Passion  : Engineering accessible, lightning-fast web applications.
`,
      skills: () => `
⚡ *Technical Skills Inventory:*
  • Frontend  : HTML5, CSS3/SCSS, JavaScript (ES6+), Responsive UI, Glassmorphism
  • Languages : C, C++, Core JavaScript
  • CS Core   : Data Structures & Algorithms, Object-Oriented Programming (OOP), DBMS
  • Tooling   : Git, GitHub, Vercel, VS Code, Browser DevTools
`,
      projects: () => `
🚀 *Featured Web Creations:*
  1. 🛍️ Aura Jewels (Earrings Shop)
     Live: https://earrings-shop.vercel.app
     Code: https://github.com/Priyanshu-kumar-maurya/Earrings-shop
     Stack: JavaScript, Luxury CSS3, Cart Drawer, UPI Flow

  2. 📚 JP Library
     Live: https://jp-library.vercel.app
     Code: https://github.com/Priyanshu-kumar-maurya/Jp-Library
     Stack: JavaScript, Booking Engine, Fee Calculator, Responsive Grid

  3. ⚡ Developer Bio & Link Hub
     Live: https://bio-delta-topaz.vercel.app
     Code: https://github.com/Priyanshu-kumar-maurya/Bio
     Stack: HTML5, CSS3, JavaScript, Verified Socials

  4. 💻 CodeX Priyanshu
     Code: https://github.com/Priyanshu-kumar-maurya/codex-priyanshu
     Stack: Vanilla JS, Interactive CLI Simulator, Dual Theme
`,
      education: () => `
🎓 *Academic Credentials:*
  • Degree: Bachelor of Computer Applications (BCA)
  • Specialization: Computer Science & Software Engineering
  • Key Subjects: Data Structures, C/C++, Web Programming, Database Systems, Computer Networks
`,
      contact: () => `
📬 *Contact Coordinates:*
  • Email    : pk1062417@gmail.com
  • Location : Mariyahu, Jaunpur, Uttar Pradesh, India - 222161
  • Status   : Open for Web Development Projects, Internships & Collaborations
`,
      socials: () => `
🌐 *Verified Developer Socials:*
  • LinkedIn  : https://www.linkedin.com/in/priyanshu-kumar-maurya-808718281/
  • GitHub    : https://github.com/Priyanshu-kumar-maurya
  • Instagram : https://www.instagram.com/codexs_priyanshu/
  • Bio Hub   : https://priyanshu-kumar-maurya.github.io/Bio/
`,
      theme: () => {
        const toggleBtn = document.getElementById('themeToggleBtn');
        if (toggleBtn) toggleBtn.click();
        return 'Theme toggled successfully.';
      },
      clear: () => {
        historyContainer.innerHTML = '';
        return '';
      },
      date: () => new Date().toString(),
      'sudo hire': () => {
        setTimeout(() => {
          window.location.href = `mailto:${CONFIG.DEVELOPER.email}?subject=Collaboration%20Opportunity&body=Hi%20Priyanshu,%20we%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect!`;
        }, 1200);
        return `🎉 ACCESS GRANTED! You have unlocked developer priority.\nOpening direct email channel to ${CONFIG.DEVELOPER.email}...`;
      }
    };

    function executeCommand(rawCmd) {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;

      commandHistory.push(rawCmd);
      historyIndex = commandHistory.length;

      // Create entry in history
      const entry = document.createElement('div');
      entry.className = 'term-entry';

      const echo = document.createElement('div');
      echo.className = 'term-cmd-echo';
      echo.innerHTML = `<span class="term-prompt">guest@codex:~$</span> ${escapeHTML(rawCmd)}`;
      entry.appendChild(echo);

      if (cmd === 'clear') {
        historyContainer.innerHTML = '';
        return;
      }

      let outputText = '';
      if (COMMANDS[cmd]) {
        outputText = COMMANDS[cmd]();
      } else if (cmd.startsWith('echo ')) {
        outputText = escapeHTML(rawCmd.substring(5));
      } else {
        outputText = `Command not found: "${escapeHTML(rawCmd)}". Type 'help' to inspect available commands.`;
      }

      if (outputText) {
        const out = document.createElement('div');
        out.className = 'term-output';
        // Auto link URLs
        out.innerHTML = formatOutputWithLinks(outputText);
        entry.appendChild(out);
      }

      historyContainer.appendChild(entry);
      screen.scrollTop = screen.scrollHeight;
    }

    function escapeHTML(str) {
      return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m]));
    }

    function formatOutputWithLinks(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    }

    // Input Keydown Handler
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value;
        input.value = '';
        executeCommand(val);
      } else if (e.key === 'ArrowUp') {
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          input.value = '';
        }
        e.preventDefault();
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        historyContainer.innerHTML = '';
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        historyContainer.innerHTML = '';
        showToast('Terminal screen cleared.', 'info', 'fas fa-eraser');
      });
    }

    // Click on Shortcut Chips
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.dataset.cmd;
        if (cmd) {
          executeCommand(cmd);
          input.focus();
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 8. One-Click Code Snippet Copy
  // ---------------------------------------------------------------------------
  function initCodeSnippetCopy() {
    const copyBtn = document.getElementById('copyCodeSnippetBtn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
      const snippet = `const developer = {
  name: "Priyanshu Kumar Maurya",
  degree: "BCA (Computer Applications)",
  location: "Jaunpur, UP, India",
  passion: ["Web Development", "Responsive UI/UX", "Creative Engineering"],
  coreStack: ["JavaScript", "HTML5/CSS3", "C/C++"],
  status: "Open for Internships & Collaborations"
};`;

      try {
        await navigator.clipboard.writeText(snippet);
        copyBtn.innerHTML = '<i class="fas fa-check text-emerald"></i>';
        showToast('Configuration snippet copied to clipboard! 📋', 'success', 'fas fa-check-circle');

        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2200);
      } catch (err) {
        showToast('Unable to copy code snippet.', 'warning', 'fas fa-exclamation-triangle');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 9. Contact Form Handler
  // ---------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'warning', 'fas fa-exclamation-circle');
        return;
      }

      showToast(`Thank you, ${name}! Your message regarding "${subject || 'Inquiry'}" has been sent. Priyanshu will get back to you at ${email} shortly! 🚀`, 'success', 'fas fa-paper-plane');
      form.reset();
    });
  }

  // ---------------------------------------------------------------------------
  // 10. Hero 3D Card Hover Perspective Effect
  // ---------------------------------------------------------------------------
  function initHeroPerspective() {
    const card = document.getElementById('heroCodeCard');
    if (!card || window.innerWidth < 1024) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = -(y / rect.height) * 8;
      const rotY = (x / rect.width) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  // ---------------------------------------------------------------------------
  // 11. App Bootstrap
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypewriter();
    initNavigation();
    initSkillsTabs();
    initTerminal();
    initCodeSnippetCopy();
    initContactForm();
    initHeroPerspective();
  });

})();
