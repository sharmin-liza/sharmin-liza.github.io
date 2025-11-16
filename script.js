document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Smooth scrolling for anchor links
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

  // Highlight active nav link based on visible section
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('nav a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`nav a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => sectionObserver.observe(section));
  
  // Chatbot functionality
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotContainer = document.querySelector('.chatbot-container');
  const closeChatbot = document.querySelector('.close-chatbot');
  const sendMessageBtn = document.querySelector('.send-message');
  const chatInput = document.querySelector('.chatbot-input input');
  const chatMessages = document.querySelector('.chatbot-messages');
  
  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', function() {
    chatbotContainer.classList.toggle('active');
  });
  
  closeChatbot.addEventListener('click', function() {
    chatbotContainer.classList.remove('active');
  });
  
  // Send message function
  function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === '') return;
    
    // Add user message
    addMessage(messageText, 'user');
    chatInput.value = '';
    
    // Simulate bot thinking with typing placeholder
    const placeholder = document.createElement('div');
    placeholder.classList.add('chatbot-message', 'bot', 'typing');
    placeholder.innerHTML = `<p>...</p>`;
    chatMessages.appendChild(placeholder);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      placeholder.classList.remove('typing');
      placeholder.innerHTML = `<p>${botResponse}</p>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 900 + Math.min(1200, messageText.length * 40));
  }
  
  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message', sender);
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Get bot response
  function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    
    const greetings = ['hi', 'hello', 'hey', 'greetings'];
    const aboutQuestions = ['who are you', 'what are you', 'about you'];
    const portfolioQuestions = ['projects', 'skills', 'experience', 'work'];
    const contactQuestions = ['contact', 'email', 'phone', 'reach', 'get in touch'];
    const helpQuestions = ['help', 'what can you do', 'options'];

    // experience specific keywords
    const youthKeywords = ['youth', 'innovation lab', 'winner', '2023'];
    const internshipKeywords = ['intern', 'internship', 'codealpha', 'code alpha'];
    const uctcKeywords = ['uctc', 'computer club', 'research', 'secretary'];
    
    if (greetings.some(word => userMessage.includes(word))) {
      return "Hello there! I'm Liza's AI assistant. How can I help you today?";
    } else if (aboutQuestions.some(phrase => userMessage.includes(phrase))) {
      return "I'm an AI assistant here to help you learn more about Sharmin Akter Liza and her work in data science and AI.";
    } else if (portfolioQuestions.some(word => userMessage.includes(word))) {
      return "Liza has worked on several projects including Air Quality Prediction, Network Intrusion Detection, and Iris Data Classification. You can check them out in the Projects section!";
    } else if (contactQuestions.some(word => userMessage.includes(word))) {
      return "You can contact Liza via email at rhsliza9@gmail.com or through her LinkedIn profile. All contact information is available in the Contact section.";
    } else if (youthKeywords.some(w => userMessage.includes(w))) {
      return "Sharmin was a winner at the Youth Led Innovation Lab in 2023 — recognized for applying AI to practical problems.";
    } else if (internshipKeywords.some(w => userMessage.includes(w))) {
      return "She completed a Data Science internship at CodeAlpha working on data cleaning, EDA, and model prototyping.";
    } else if (uctcKeywords.some(w => userMessage.includes(w))) {
      return "Sharmin serves as Research & Innovation Secretary at the UCTC Computer Club, organizing workshops and mentoring peers.";
    } else if (helpQuestions.some(word => userMessage.includes(word))) {
      return "I can tell you about Liza's skills, projects, education, and how to contact her. Just ask!";
    } else if (userMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I'm sorry, I didn't understand that. I can tell you about Liza's skills, projects, or how to contact her. What would you like to know?";
    }
  }
  
  // Send message on button click
  sendMessageBtn.addEventListener('click', sendMessage);
  
  // Send message on Enter key
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Add initial bot greeting
  setTimeout(() => {
    addMessage("Hello! I'm Liza's AI assistant. How can I help you today?", 'bot');
  }, 1000);
  
  // Download CV function
  window.downloadCV = function() {
    // In a real implementation, this would link to your actual CV file
    alert('CV download would start here. In a real implementation, this would link to your CV file.');
    // window.open("path/to/your/cv.pdf", "_blank");
  };
  
  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skills-grid li, .project, .education-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.skills-grid li, .project, .education-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});
