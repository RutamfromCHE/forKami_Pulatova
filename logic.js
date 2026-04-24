/* ═══════════════════════════════════════════
   main.js — Репетитор по математике
   Модули:
   1. Бургер-меню
   2. Scroll-reveal (IntersectionObserver)
   3. Форма отправки email
═══════════════════════════════════════════ */


/* ─── 1. Бургер-меню ─── */
(function initBurgerMenu() {
    const burger = document.getElementById('burgerBtn');
    const menu   = document.getElementById('mobileMenu');
  
    if (!burger || !menu) return;
  
    /** Открыть / закрыть меню */
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      menu.style.display = 'block';
    });
  
    /** Закрыть меню (вызывается из inline onclick на ссылках) */
    window.closeMenu = function () {
      menu.classList.remove('open');
      burger.classList.remove('open');
    };
  
    /** Закрыть при клике вне меню */
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        window.closeMenu();
      }
    });
  })();
  
  
  /* ─── 2. Scroll-reveal ─── */
  (function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // срабатывает один раз
        }
      });
    }, { threshold: 0.12 });
  
    elements.forEach((el) => observer.observe(el));
  })();
  
  
  /* ─── 3. Форма отправки email ─── */
  (function initContactForm() {
    const sendBtn     = document.getElementById('sendBtn');
    const successMsg  = document.getElementById('formSuccess');
  
    if (!sendBtn) return;
  
    /** Простая валидация поля */
    function isEmpty(value) {
      return !value || value.trim() === '';
    }
  
    /** Подсветить поле с ошибкой */
    function markError(id, hasError) {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.borderColor = hasError ? '#e03048' : '';
    }
  
    /** Собрать данные формы и открыть почтовый клиент */
    function handleSend() {
      const name  = document.getElementById('fieldName').value.trim();
      const email = document.getElementById('fieldEmail').value.trim();
      const msg   = document.getElementById('fieldMsg').value.trim();
  
      // Валидация
      let hasErrors = false;
      [['fieldName', name], ['fieldEmail', email], ['fieldMsg', msg]].forEach(([id, val]) => {
        const bad = isEmpty(val);
        markError(id, bad);
        if (bad) hasErrors = true;
      });
  
      if (hasErrors) {
        alert('Пожалуйста, заполните все поля.');
        return;
      }
  
      // Формируем mailto-ссылку
      const to      = 'anna.sokolova@example.com'; // ← замените на реальный адрес
      const subject = encodeURIComponent('Запрос с сайта от ' + name);
      const body    = encodeURIComponent(
        'Имя: '  + name  + '\n' +
        'Email: ' + email + '\n\n' +
        msg
      );
  
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  
      // Показать сообщение об успехе и заблокировать кнопку
      if (successMsg) successMsg.style.display = 'block';
      sendBtn.disabled = true;
      sendBtn.style.opacity = '0.6';
    }
  
    // Назначаем обработчик через JS, не через inline onclick
    sendBtn.addEventListener('click', handleSend);
  })();