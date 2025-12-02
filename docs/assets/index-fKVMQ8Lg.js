(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();class j{tabs=new Map;smokeContainer=null;embersContainer=null;isInitialized=!1;constructor(){this.init()}init(){this.isInitialized||(this.setupEventListeners(),this.generateRandomPatterns(),this.isInitialized=!0)}setupEventListeners(){document.addEventListener("click",s=>{const a=s.target;a.classList.contains("tab-close")&&this.closeTab(a)}),window.addEventListener("resize",()=>{this.handleResize()})}closeTab(s){const a=s.closest(".browser-tab");if(!a)return;const i=a.getAttribute("data-tab-id");i&&this.tabs.delete(i),a.style.animation="tabClose 0.5s ease forwards",setTimeout(()=>{a.remove(),this.checkAllTabsClosed()},500)}checkAllTabsClosed(){document.querySelectorAll(".browser-tab").length===0&&this.triggerAllTabsClosed()}triggerAllTabsClosed(){const s=new CustomEvent("allTabsClosed");document.dispatchEvent(s),console.log("All browser tabs have been closed!")}generateRandomSmoke(){if(this.smokeContainer=document.querySelector(".smoke-container"),!this.smokeContainer)return;this.smokeContainer.innerHTML="";const s=Math.floor(Math.random()*3)+6;for(let a=0;a<s;a++){const i=document.createElement("div");i.className="smoke-cloud";const t=Math.floor(Math.random()*150)+100,e=Math.floor(Math.random()*80)+10,n=Math.floor(Math.random()*15),p=Math.floor(Math.random()*10)+20;i.style.cssText=`
        --cloud-size: ${t}px;
        --cloud-left: ${e}%;
        --cloud-delay: ${n}s;
        --cloud-duration: ${p}s;
      `,this.smokeContainer.appendChild(i)}}generateRandomParticles(){if(this.embersContainer=document.querySelector(".floating-embers"),!this.embersContainer)return;this.embersContainer.innerHTML="";const s=Math.floor(Math.random()*6)+15;for(let a=0;a<s;a++){const i=document.createElement("div");i.className="ember-particle";const t=Math.floor(Math.random()*4)+2,e=Math.floor(Math.random()*95)+2,n=Math.floor(Math.random()*10),p=Math.floor(Math.random()*15)+10;i.style.cssText=`
        --particle-size: ${t}px;
        --particle-left: ${e}%;
        --particle-delay: ${n}s;
        --particle-duration: ${p}s;
      `,this.embersContainer.appendChild(i)}}generateRandomPatterns(){this.generateRandomSmoke(),this.generateRandomParticles()}handleResize(){this.generateRandomPatterns()}createTab(s){const a=document.createElement("div");a.className=`browser-tab ${s.hasLoading?"loading-tab":""}`,a.setAttribute("data-tab-id",s.id),a.style.cssText=`
      --delay: ${s.position.delay};
      --x: ${s.position.x};
      --y: ${s.position.y};
      --drift-x: ${s.position.driftX};
      --drift-y: ${s.position.driftY};
      --rotation: ${s.position.rotation};
      --float-height: ${s.position.floatHeight};
      --float-speed: ${s.position.floatSpeed};
    `,a.innerHTML=`
      <div class="tab-header">
        <div class="tab-favicon">${s.favicon}</div>
        <div class="tab-title">${s.title}</div>
        <div class="tab-close">×</div>
      </div>
      ${s.hasLoading?`
        <div class="tab-loading-bar">
          <div class="loading-progress" style="--load-time: ${s.loadTime||"2s"};"></div>
        </div>
      `:""}
    `;const i=document.querySelector(".floating-browser-tabs");return i&&i.appendChild(a),this.tabs.set(s.id,a),a}getTab(s){return this.tabs.get(s)}closeTabById(s){const a=this.tabs.get(s);if(a){const i=a.querySelector(".tab-close");i&&this.closeTab(i)}}closeAllTabs(){this.tabs.forEach((s,a)=>{this.closeTabById(a)})}restartAnimations(){this.tabs.forEach(s=>{s.style.animation="none",setTimeout(()=>{s.style.animation=""},10)})}getStats(){const s=document.querySelectorAll(".browser-tab"),a=Array.from(s).filter(i=>i.style.display!=="none"&&!i.style.animation.includes("tabClose"));return{totalTabs:s.length,closedTabs:s.length-a.length}}destroy(){this.tabs.clear(),this.isInitialized=!1,document.removeEventListener("click",()=>{}),window.removeEventListener("resize",()=>{})}}document.addEventListener("DOMContentLoaded",()=>{const $=new j;window.animatedBackgrounds=$,setInterval(()=>{$.generateRandomPatterns()},3e4)});const G={instagram:{autoplay:!0,autoplaySpeed:4e3},stories:{autoplay:!0,autoplaySpeed:5e3},destinations:{autoplay:!0,autoplaySpeed:4500}};class X{sections=[];currentSection="";animatedBackgrounds=null;carousels=new Map;isScrolling=!1;constructor(){this.init()}async init(){try{this.createAppStructure(),await this.initializeComponents(),this.startAnimations(),this.showApp(),console.log("🚀 WanderList запущен успешно!")}catch(s){console.error("❌ Ошибка инициализации:",s)}}createAppStructure(){const s=document.getElementById("app");s&&(s.innerHTML=`
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>

      <nav class="story-nav">
        <div class="story-nav__brand">WanderList</div>
        <div class="story-nav__progress">
          <span class="story-nav__dot story-nav__dot--active" data-section="hero"></span>
          <span class="story-nav__dot" data-section="routine"></span>
          <span class="story-nav__dot" data-section="dreams"></span>
          <span class="story-nav__dot" data-section="chaos"></span>
          <span class="story-nav__dot" data-section="solution"></span>
          <span class="story-nav__dot" data-section="stories"></span>
          <span class="story-nav__dot" data-section="success"></span>
          <span class="story-nav__dot" data-section="destinations"></span>
          <span class="story-nav__dot" data-section="final"></span>
        </div>
      </nav>

      <div id="sections-container"></div>

      <!-- Canvas ДОЛЖЕН быть здесь -->
    <canvas id="particle-canvas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;"></canvas>

      <footer class="story-footer">
        <div class="story-footer__content">
          <div class="story-footer__brand">WanderList</div>
          <div class="story-footer__tagline">
            Твое путешествие — это история. Начни писать ее сегодня.
          </div>
          <div class="story-footer__copyright">
            © 2025 Кейс для портфолио
          </div>
        </div>
      </footer>
    `)}async initializeComponents(){try{console.log("🚀 Начинаем инициализацию..."),await this.loadSections(),console.log("✅ Секции загружены"),this.animatedBackgrounds=new j,console.log("✅ Анимированные фоны готовы"),this.setupNavigation(),this.setupScroll(),this.setupHeroInteractions(),console.log("✅ Основные компоненты готовы"),setTimeout(()=>{this.initializeVerticalInstagramCarousel(),this.initializeHorizontalCarousels(),this.setupInteractivity(),this.setupSuccessSection(),this.setupInstagramInteractions(),console.log("✅ Все компоненты инициализированы")},2e3)}catch(s){console.error("❌ Ошибка инициализации:",s)}}debugParticles(){const s=document.getElementById("particle-canvas");if(!s){console.error("❌ Canvas не найден при отладке");return}const a=s.getContext("2d");if(!a){console.error("❌ Context не доступен при отладке");return}console.log("🔍 Отладка ParticleSystem:"),console.log("Canvas size:",s.width,"x",s.height),console.log("Canvas visible:",s.offsetWidth,"x",s.offsetHeight),console.log("Canvas style:",s.style.cssText),a.fillStyle="rgba(255, 0, 0, 0.5)",a.beginPath(),a.arc(100,100,20,0,Math.PI*2),a.fill(),console.log("✅ Тестовый круг нарисован")}loadSections(){return new Promise(s=>{console.log("📄 Загрузка секций...");const a=[this.createHeroSection(),this.createRoutineSection(),this.createDreamsSection(),this.createChaosSection(),this.createSolutionSection(),this.createStoriesSection(),this.createSuccessSection(),this.createDestinationsSection(),this.createFinalSection()],i=document.getElementById("sections-container");i&&(i.innerHTML=a.join(""),console.log("✅ HTML секций добавлен в DOM")),this.sections=a.map((t,e)=>{const n=["hero","routine","dreams","chaos","solution","stories","success","destinations","final"][e],p=document.getElementById(n);return p||console.warn(`⚠️ Секция ${n} не найдена в DOM`),{id:n,element:p,isActive:e===0}}),console.log(`✅ Загружено ${this.sections.length} секций`),s()})}createHeroSection(){return`
    <section class="story-section" id="hero">
      <div class="hero-background">
        <div class="story-section__background">
          <div class="animated-background gradient-1"></div>
          <div class="background-pattern hero-mountain-pattern"></div>
        </div>
        
        <!-- IT Elements -->
        <div class="hero-it-elements">
          <div class="it-element it-element--code">&lt;code&gt;</div>
          <div class="it-element it-element--brackets">{ }</div>
          <div class="it-element it-element--gear">⚙️</div>
          <div class="it-element it-element--server">🖥️</div>
          <div class="it-element it-element--binary">101010</div>
        </div>
        
        <!-- Floating emojis -->
        <div class="floating-elements">
          <div class="floating-element">💻</div>
          <div class="floating-element">🚀</div>
          <div class="floating-element">⚡</div>
          <div class="floating-element">🔧</div>
          <div class="floating-element">📱</div>
          <div class="floating-element">🌐</div>
        </div>
      </div>
      
      <!-- Остальной контент героя без изменений -->
      <div class="hero-main-content">
        <!-- Бейдж -->
        <div class="hero-badge pre-animate">
          <span class="badge-icon">⭐</span>
          Основано на реальных событиях
        </div>
        
        <!-- Аватар -->
        <div class="hero-avatar pre-animate">
          <div class="avatar-container">
            <img src="/images/characters/anton-avatar.png" alt="Антон" class="avatar-image">
            <div class="avatar-glow"></div>
          </div>
          <div class="avatar-badge">IT</div>
          <div class="avatar-status">Готов к приключениям</div>
        </div>
        
        <!-- Заголовки -->
        <div class="hero-titles pre-animate">
          <h1 class="hero-main-title">
            <span class="title-line">Привет, я</span>
            <span class="title-accent">Антон</span>
          </h1>
        </div>
        
        <!-- Подзаголовок -->
        <div class="hero-subtitle pre-animate">
          <div class="subtitle-line">Екатеринбург • Менеджер в IT-компании</div>
          <div class="subtitle-tagline">Мечтатель в мире кода</div>
        </div>
        
        <!-- Цитата -->
        <div class="hero-quote pre-animate">
          <div class="quote-content">
            "Кажется, я знаю каждый пиксель своего офиса...<br>
            Но мечтаю увидеть <span class="text-highlight">настоящие горы</span>, а не их фотографии."
          </div>
        </div>
        
        <!-- Статистика -->
        <div class="hero-stats pre-animate">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">💻</div>
              <div class="stat-number">5+</div>
              <div class="stat-label">лет в IT</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">📱</div>
              <div class="stat-number">247</div>
              <div class="stat-label">сохраненных постов</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">✈️</div>
              <div class="stat-number">0</div>
              <div class="stat-label">реальных поездок</div>
            </div>
          </div>
        </div>
        
        <!-- Кнопка CTA -->
        <div class="hero-cta pre-animate">
          <button class="cta-button" data-target="routine">
            <span class="button-text">Узнать мою историю</span>
            <span class="button-icon">→</span>
          </button>
        </div>
      </div>
      
      <!-- Индикатор прокрутки -->
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
      </div>
    </section>
  `}createRoutineSection(){return`
   <section class="story-section" id="routine">
  <div class="story-section__background">
    <div class="animated-background gradient-routine-dark"></div>
    <div class="background-overlay routine-overlay"></div>
    <div class="fog-overlay"></div>
    
    <!-- Статичные конвейерные ленты -->
    <div class="conveyor-system">
      <div class="conveyor-belt conveyor-1"></div>
      <div class="conveyor-belt conveyor-2"></div>
      <div class="conveyor-belt conveyor-3"></div>
      <div class="conveyor-belt conveyor-4"></div>
      <div class="conveyor-belt conveyor-5"></div>
    </div>
    
    <!-- Элементы едут по конвейерам -->
    <div class="conveyor-items-container">
      <!-- Конвейер 1 -->
      <div class="conveyor-track conveyor-track-1">
        <div class="moving-item">⏰</div>
        <div class="moving-item">📄</div>
        <div class="moving-item">📊</div>
      </div>
      
      <!-- Конвейер 2 -->
      <div class="conveyor-track conveyor-track-2">
        <div class="moving-item">💼</div>
        <div class="moving-item">📧</div>
        <div class="moving-item">📋</div>
      </div>
      
      <!-- Конвейер 3 -->
      <div class="conveyor-track conveyor-track-3">
        <div class="moving-item">☕</div>
        <div class="moving-item">📱</div>
        <div class="moving-item">🖥️</div>
      </div>
      
      <!-- Конвейер 4 -->
      <div class="conveyor-track conveyor-track-4">
        <div class="moving-item">🚇</div>
        <div class="moving-item">🍽️</div>
        <div class="moving-item">📺</div>
      </div>
      
      <!-- Конвейер 5 -->
      <div class="conveyor-track conveyor-track-5">
        <div class="moving-item">😴</div>
        <div class="moving-item">💭</div>
        <div class="moving-item">🔄</div>
      </div>
    </div>
    
    <!-- Дни недели -->
    <div class="week-days">
      <div class="week-day">ПОНЕДЕЛЬНИК</div>
      <div class="week-day">ВТОРНИК</div>
      <div class="week-day">СРЕДА</div>
      <div class="week-day">ЧЕТВЕРГ</div>
      <div class="week-day">ПЯТНИЦА</div>
    </div>
    
    <!-- Обновленные временные метки -->
    <div class="time-labels">
      <div class="time-label" data-time="06:30">
        <span class="time">06:30</span>
        <span class="activity">Будильник</span>
      </div>
      <div class="time-label" data-time="08:00">
        <span class="time">08:00</span>
        <span class="activity">Дорога</span>
      </div>
      <div class="time-label" data-time="09:00">
        <span class="time">09:00</span>
        <span class="activity">Работа</span>
      </div>
      <div class="time-label" data-time="13:00">
        <span class="time">13:00</span>
        <span class="activity">Обед</span>
      </div>
      <div class="time-label" data-time="17:00">
        <span class="time">17:00</span>
        <span class="activity">Конец</span>
      </div>
      <div class="time-label" data-time="19:00">
        <span class="time">19:00</span>
        <span class="activity">Ужин</span>
      </div>
      <div class="time-label" data-time="22:00">
        <span class="time">22:00</span>
        <span class="activity">Соцсети</span>
      </div>
      <div class="time-label" data-time="23:30">
        <span class="time">23:30</span>
        <span class="activity">Сон</span>
      </div>
    </div>
  </div>
    
      
      <div class="story-section__container">
        <div class="content-block content-block--centered pre-animate">
          <div class="content-badge pre-animate">
            <span class="badge__icon">⏰</span>
            Глава 1: Цикл рутины
          </div>
          
          <h2 class="content-title pre-animate">Один и тот же день</h2>
          <div class="content-subtitle pre-animate">Изо дня в день, из недели в неделю</div>

          <!-- Улучшенный таймлайн -->
          <div class="enhanced-timeline pre-animate">
            <!-- Утро -->
            <div class="timeline-phase morning-phase active" data-phase="morning"id="phase-morning">
              <div class="phase-header">
                <div class="phase-icon">🌅</div>
                <div class="phase-title">Утро</div>
                <div class="phase-time">06:30 - 09:00</div>
              </div>
              
              <div class="phase-content">
                <div class="routine-steps">
                  <div class="routine-step" data-step="1">
                    <div class="step-marker">
                      <div class="step-number">1</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">06:30</div>
                      <div class="step-title">Будильник</div>
                      <div class="step-quote">"Опять эти серые утра... Выключу еще на 10 минут"</div>
                      <div class="step-image">
                        <img src="/images/routine/alarm-clock.png" alt="Будильник утро">
                        <div class="image-overlay">
                          <div class="overlay-text">5 раз нажать "Отложить"</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="2">
                    <div class="step-marker">
                      <div class="step-number">2</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">07:00</div>
                      <div class="step-title">Кофе и новости</div>
                      <div class="step-quote">"Тот же кофе, те же новости... Может, сегодня что-то изменится?"</div>
                      <div class="step-image">
                        <img src="/images/routine/morning-coffee.png" alt="Утренний кофе">
                        <div class="image-overlay">
                          <div class="overlay-text">3 чашки кофе</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="3">
                    <div class="step-marker">
                      <div class="step-number">3</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">08:00</div>
                      <div class="step-title">Дорога на работу</div>
                      <div class="step-quote">"Пробки, метро, толпа... Все как вчера, как позавчера"</div>
                      <div class="step-image">
                        <img src="/images/routine/commute.png" alt="Дорога на работу">
                        <div class="image-overlay">
                          <div class="overlay-text">45 минут в пути</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Рабочий день -->
            <div class="timeline-phase work-phase" data-phase="work" id="phase-work">
              <div class="phase-header">
                <div class="phase-icon">💼</div>
                <div class="phase-title">Работа</div>
                <div class="phase-time">09:00 - 18:00</div>
              </div>
              
              <div class="phase-content">
                <div class="routine-steps">
                  <div class="routine-step" data-step="4">
                    <div class="step-marker">
                      <div class="step-number">4</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">09:15</div>
                      <div class="step-title">Планерка</div>
                      <div class="step-quote">"Спринт, бэклог, дедлайны... Те же слова каждый день"</div>
                      <div class="step-image">
                        <img src="/images/routine/meeting.png" alt="Планерка">
                        <div class="image-overlay">
                          <div class="overlay-text">1 час совещаний</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="5">
                    <div class="step-marker">
                      <div class="step-number">5</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">11:00</div>
                      <div class="step-title">Код, баги, задачи</div>
                      <div class="step-quote">"Сижу перед монитором, а в голове - горы Алтая..."</div>
                      <div class="step-image">
                        <img src="/images/routine/coding.png" alt="Работа за компьютером">
                        <div class="image-overlay">
                          <div class="overlay-text">247 строк кода</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="6">
                    <div class="step-marker">
                      <div class="step-number">6</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">13:00</div>
                      <div class="step-title">Обеденный перерыв</div>
                      <div class="step-quote">"Снова тот же ланч-бокс... Листаю инстаграм с красивыми местами"</div>
                      <div class="step-image">
                        <img src="/images/routine/lunch-break.png" alt="Обеденный перерыв">
                        <div class="image-overlay">
                          <div class="overlay-text">15 сохраненных постов</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="7">
                    <div class="step-marker">
                      <div class="step-number">7</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">15:00</div>
                      <div class="step-title">Послеобеденный спад</div>
                      <div class="step-quote">"Глаза слипаются... Мечтаю оказаться где-нибудь на берегу озера"</div>
                      <div class="step-image">
                        <img src="/images/routine/afternoon-slump.png" alt="Послеобеденный спад">
                        <div class="image-overlay">
                          <div class="overlay-text">3 чашки кофе</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="8">
                    <div class="step-marker">
                      <div class="step-number">8</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">17:30</div>
                      <div class="step-title">Конец рабочего дня</div>
                      <div class="step-quote">"Еще один день прошел... А мечты все там же - в телефоне"</div>
                      <div class="step-image">
                        <img src="/images/routine/end-of-work.png" alt="Конец рабочего дня">
                        <div class="image-overlay">
                          <div class="overlay-text">8 часов за монитором</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Вечер -->
            <div class="timeline-phase evening-phase" data-phase="evening" id="phase-evening">
              <div class="phase-header">
                <div class="phase-icon">🌙</div>
                <div class="phase-title">Вечер</div>
                <div class="phase-time">18:00 - 23:00</div>
              </div>
              
              <div class="phase-content">
                <div class="routine-steps">
                  <div class="routine-step" data-step="9">
                    <div class="step-marker">
                      <div class="step-number">9</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">19:00</div>
                      <div class="step-title">Дорога домой</div>
                      <div class="step-quote">"Та же толпа, те же лица... Все куда-то спешат"</div>
                      <div class="step-image">
                        <img src="/images/routine/evening-commute.png" alt="Дорога домой">
                        <div class="image-overlay">
                          <div class="overlay-text">50 минут в метро</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="10">
                    <div class="step-marker">
                      <div class="step-number">10</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">20:30</div>
                      <div class="step-title">Ужин и сериалы</div>
                      <div class="step-quote">"Доставка, Netflix... Снова вижу красивые места на экране"</div>
                      <div class="step-image">
                        <img src="/images/routine/dinner-netflix.png" alt="Ужин и сериалы">
                        <div class="image-overlay">
                          <div class="overlay-text">3 серии подряд</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="11">
                    <div class="step-marker">
                      <div class="step-number">11</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">22:00</div>
                      <div class="step-title">Соцсети перед сном</div>
                      <div class="step-quote">"Листаю красивые фото... Завтра точно начну планировать поездку"</div>
                      <div class="step-image">
                        <img src="/images/routine/social-media-bed.png" alt="Соцсети перед сном">
                        <div class="image-overlay">
                          <div class="overlay-text">47 новых сохранений</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="routine-step" data-step="12">
                    <div class="step-marker">
                      <div class="step-number">12</div>
                      <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                      <div class="step-time">23:30</div>
                      <div class="step-title">Сон</div>
                      <div class="step-quote">"Засыпаю с мыслями о горах... Завтра все будет по-другому"</div>
                      <div class="step-image">
                        <img src="/images/routine/sleep-dreams.png" alt="Сон и мечты">
                        <div class="image-overlay">
                          <div class="overlay-text">Мечты о путешествиях</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Навигация по фазам -->
          <div class="timeline-navigation pre-animate">
            <button class="nav-btn active" data-phase="morning">
              <span class="nav-icon">🌅</span>
              <span class="nav-text">Утро</span>
            </button>
            <button class="nav-btn" data-phase="work">
              <span class="nav-icon">💼</span>
              <span class="nav-text">Работа</span>
            </button>
            <button class="nav-btn" data-phase="evening">
              <span class="nav-icon">🌙</span>
              <span class="nav-text">Вечер</span>
            </button>
          </div>

          <!-- Статистика рутины -->
          <div class="routine-stats pre-animate">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">⏱️</div>
                <div class="stat-number">12</div>
                <div class="stat-label">часов рутины</div>
                <div class="stat-desc">Каждый день</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📱</div>
                <div class="stat-number">247</div>
                <div class="stat-label">сохраненных постов</div>
                <div class="stat-desc">Мечты в телефоне</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🚶</div>
                <div class="stat-number">2.5</div>
                <div class="stat-label">часа в дороге</div>
                <div class="stat-desc">Туда и обратно</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">💭</div>
                <div class="stat-number">0</div>
                <div class="stat-label">реальных поездок</div>
                <div class="stat-desc">Только мечты</div>
              </div>
            </div>
          </div>

          <div class="content-cta pre-animate">
            <button class="btn btn--primary" data-target="dreams">
              <span class="btn__text">Разорвать цикл</span>
              <span class="btn__icon">⚡</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `}createDreamsSection(){return`
    <section class="story-section" id="dreams">
     <div class="story-section__background">
  <div class="cosmic-background"></div>
  <div class="stars-layer"></div>

  <!-- Луна сверху справа -->
<div class="cosmic-moon">
  <!-- Большие кратеры -->
  <div class="moon-crater crater-1"></div>
  <div class="moon-crater crater-2"></div>
  <div class="moon-crater crater-3"></div>
  <div class="moon-crater crater-4"></div>
  <div class="moon-crater crater-5"></div>
  
  <!-- Средние кратеры -->
  <div class="moon-crater crater-6"></div>
  <div class="moon-crater crater-7"></div>
  <div class="moon-crater crater-8"></div>
  <div class="moon-crater crater-9"></div>
  <div class="moon-crater crater-10"></div>
  
  <!-- Маленькие кратеры -->
  <div class="moon-crater crater-11"></div>
  <div class="moon-crater crater-12"></div>
  <div class="moon-crater crater-13"></div>
  <div class="moon-crater crater-14"></div>
  <div class="moon-crater crater-15"></div>
  
  <div class="moon-shine"></div>
  <div class="moon-sparkle sparkle-1"></div>
  <div class="moon-sparkle sparkle-2"></div>
  <div class="moon-sparkle sparkle-3"></div>
  <div class="moon-sparkle sparkle-4"></div>
  <div class="moon-sparkle sparkle-5"></div>
  <div class="moon-sparkle sparkle-6"></div>
  <div class="moon-glow"></div>
</div>

<!-- Добавь этот блок в .story-section__background -->
<div class="cosmic-astronauts">
<div class="cosmic-astronaut">
  <div class="astronaut-suit">
    <div class="astronaut-tether"></div>
    <div class="astronaut-backpack"></div>
    <div class="astronaut-torso">
      <div class="astronaut-reflection"></div>
    </div>
    <div class="astronaut-arm arm-left"></div>
    <div class="astronaut-arm arm-right"></div>
    <div class="astronaut-leg leg-left"></div>
    <div class="astronaut-leg leg-right"></div>
    <div class="astronaut-breath"></div>
  </div>
</div>
<div class="cosmic-astronaut">
  <div class="astronaut-suit">
    <div class="astronaut-tether"></div>
    <div class="astronaut-backpack"></div>
    <div class="astronaut-torso">
      <div class="astronaut-reflection"></div>
    </div>
    <div class="astronaut-arm arm-left"></div>
    <div class="astronaut-arm arm-right"></div>
    <div class="astronaut-leg leg-left"></div>
    <div class="astronaut-leg leg-right"></div>
    <div class="astronaut-breath"></div>
  </div>
</div>
<div class="cosmic-astronaut">
  <div class="astronaut-suit">
    <div class="astronaut-tether"></div>
    <div class="astronaut-backpack"></div>
    <div class="astronaut-torso">
      <div class="astronaut-reflection"></div>
    </div>
    <div class="astronaut-arm arm-left"></div>
    <div class="astronaut-arm arm-right"></div>
    <div class="astronaut-leg leg-left"></div>
    <div class="astronaut-leg leg-right"></div>
    <div class="astronaut-breath"></div>
  </div>
</div>
</div>


<!-- Добавь этот блок в .story-section__background -->
<div class="cosmic-shuttle">
  <div class="shuttle-assembly">
    <div class="external-tank"></div>
    <div class="solid-booster booster-left"></div>
    <div class="solid-booster booster-right"></div>
    <div class="orbiter">
      <div class="orbiter-body"></div>
      <div class="orbiter-wing wing-main"></div>
      <div class="orbiter-wing wing-vertical"></div>
      <div class="orbiter-engine engine-left"></div>
      <div class="orbiter-engine engine-right"></div>
    </div>
    <div class="shuttle-attachment attachment-left"></div>
    <div class="shuttle-attachment attachment-right"></div>
    <div class="shuttle-attachment attachment-orbiter"></div>
    <div class="shuttle-exhaust"></div>
    <div class="shuttle-lights">
      <div class="shuttle-light light-red"></div>
      <div class="shuttle-light light-green"></div>
    </div>
  </div>
</div>
  
<!-- Земля снизу слева -->
<div class="cosmic-earth">
  <div class="earth-landmass"></div>
  <div class="earth-detail"></div>
  <div class="earth-ice"></div>
  <div class="earth-clouds"></div>
  <div class="earth-atmosphere"></div>
  <div class="earth-specular"></div>
  <div class="earth-glow"></div>
</div>
  
  <!-- Кометы -->
  <div class="comet-wrapper">
    <div class="cosmic-comet comet-1">
      <div class="comet-core"></div>
      <div class="comet-tail"></div>
      <div class="comet-glow"></div>
    </div>
    <div class="cosmic-comet comet-2">
      <div class="comet-core"></div>
      <div class="comet-tail"></div>
      <div class="comet-glow"></div>
    </div>
  </div>
  
  <!-- Падающие звезды -->
  <div class="shooting-stars-container">
    <div class="shooting-star star-1"></div>
    <div class="shooting-star star-2"></div>
    <div class="shooting-star star-3"></div>
  </div>
</div>
      
      <div class="story-section__container">
        <div class="content-block content-block--centered pre-animate">
          <div class="content-badge pre-animate">
            <span class="badge__icon">🌌</span>
            Глава 2: Мир мечты
          </div>
          
          <h2 class="content-title pre-animate">Сохраненные мечты</h2>
          <div class="content-subtitle pre-animate">В моем цифровом альбоме желаний</div>
          
          <div class="content-quote pre-animate">
            <div class="quote__text">
              "247 сохраненных постов... Каждый — окно в другой мир. 
              Алтайские рассветы, карельские озера, петербургские мосты... 
              Они живут в моем телефоне, но не в моей жизни."
            </div>
          </div>

          <!-- 3D Phone с вертикальной Instagram каруселью -->
          <div class="dreams-phone-container pre-animate">
            <div class="phone-container-3d dreams-phone">
              <div class="phone">
                <div class="phone-front"></div>
                <div class="phone-back"></div>
                
                <div class="phone-frame left"></div>
                <div class="phone-frame right"></div>
                <div class="phone-frame top"></div>
                <div class="phone-frame bottom"></div>
                
                <div class="phone-notch"></div>
                <div class="phone-screen">
                  <div class="vertical-instagram-carousel">
                    <div class="carousel-container">
                      <div class="carousel-track" id="instagram-track">
                        <!-- Post 1: Алтай от travel_russia -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <!-- Шапка поста -->
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/travel_russia.jpg" alt="Travel Russia">
                              </div>
                              <div class="post-user">travel_russia</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <!-- Основное изображение поста -->
                            <div class="post-image">
                              <img src="/images/dreams/dream-1.png" alt="Горный пейзаж Алтая">
                            </div>
                            
                            <!-- Панель действий - БОЛЬШИЕ И ЗАМЕТНЫЕ КНОПКИ -->
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <!-- Счетчик лайков -->
                            <div class="post-likes">
                              <div class="likes-count">12,847 отметок "Нравится"</div>
                            </div>
                            
                            <!-- Описание поста -->
                            <div class="post-caption">
                              <span class="caption-user">travel_russia</span>
                              <span class="caption-text">Рассвет в горах Алтая - зрелище, которое меняет жизнь навсегда 🌄</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <!-- Комментарии -->
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">explore_russia</span>
                                  <span class="comment-text">Был там прошлым летом! Незабываемые эмоции! ❤️</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">nature_lover</span>
                                  <span class="comment-text">Как раз планирую поездку! Посоветуйте маршрут 🗺️</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">adventure_seeker</span>
                                  <span class="comment-text">Воздух там невероятный! Чувствуешь себя по-настоящему живым 🌬️</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (127)</span>
                              </div>
                            </div>
                            
                            <!-- Время публикации -->
                            <div class="post-time">
                              <span class="time-ago">2 часа назад</span>
                            </div>
                            
                            <!-- Поле добавления комментария -->
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Post 2: Петербург от explore_russia -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/explore_russia.jpg" alt="Explore Russia">
                              </div>
                              <div class="post-user">explore_russia</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-2.png" alt="Осенний Петербург">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">8,432 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">explore_russia</span>
                              <span class="caption-text">Осенний Петербург — город в золотых тонах, полный романтики и истории 🍂</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">travel_russia</span>
                                  <span class="comment-text">Идеальное время для посещения! Туристов меньше, а красота та же ✨</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">city_explorer</span>
                                  <span class="comment-text">Обожаю белые ночи в Питере! Это что-то волшебное 🌃</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (89)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">5 часов назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>

                        <!-- Post 3: Байкал от nature_lover -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/nature_lover.jpg" alt="Nature Lover">
                              </div>
                              <div class="post-user">nature_lover</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-3.png" alt="Озеро Байкал">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">15,239 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">nature_lover</span>
                              <span class="caption-text">Байкал - жемчужина Сибири. Вода настолько чистая, что видно дно на 40 метрах! 💎</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">adventure_seeker</span>
                                  <span class="comment-text">Плавал на каяке по Байкалу - незабываемо! Вода кристально чистая 🚣</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">travel_russia</span>
                                  <span class="comment-text">Обязательно попробуйте омуля! Местная рыба - просто объедение 🐟</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (156)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">1 день назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>

                        <!-- Post 4: Камчатка от adventure_seeker -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/adventure_seeker.jpg" alt="Adventure Seeker">
                              </div>
                              <div class="post-user">adventure_seeker</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-4.png" alt="Вулканы Камчатки">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">9,876 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">adventure_seeker</span>
                              <span class="caption-text">Камчатка - край огня и льда. Подъем на вулкан того стоит! 🌋</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">nature_lover</span>
                                  <span class="comment-text">Гейзеры Долины гейзеров - это нечто! Земля буквально дышит! ♨️</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">travel_russia</span>
                                  <span class="comment-text">Не забудьте посетить Курильское озеро - медвежье царство! 🐻</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (94)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">3 дня назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>

                        <!-- Post 5: Кавказ от extreme_travel -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/extreme_travel.jpg" alt="Extreme Travel">
                              </div>
                              <div class="post-user">extreme_travel</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-5.png" alt="Горы Кавказа">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">7,543 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">extreme_travel</span>
                              <span class="caption-text">Кавказские горы - для настоящих искателей приключений! Эльбрус ждет смельчаков ⛰️</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">adventure_seeker</span>
                                  <span class="comment-text">Поднимался на Эльбрус в прошлом году - виды с вершины бесценны! 🏔️</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">nature_lover</span>
                                  <span class="comment-text">Домбайская поляна весной - это море цветов и водопадов! 🌸</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (67)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">1 неделю назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>

                        <!-- Post 6: Золотое кольцо от history_buff -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/history_buff.jpg" alt="History Buff">
                              </div>
                              <div class="post-user">history_buff</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-6.png" alt="Золотое кольцо России">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">6,789 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">history_buff</span>
                              <span class="caption-text">Золотое кольцо - путешествие в прошлое России. Каждый город - живая история 🏛️</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">city_explorer</span>
                                  <span class="comment-text">Суздаль - самый атмосферный город! Сохранен дух древней Руси 🏮</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">travel_russia</span>
                                  <span class="comment-text">Ростовский кремль - обязателен к посещению! Архитектура впечатляет 🏰</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (73)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">2 недели назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>

                        <!-- Post 7: Карелия от nature_lover -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/nature_lover.jpg" alt="Nature Lover">
                              </div>
                              <div class="post-user">nature_lover</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-7.png" alt="Озера Карелии">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">11,234 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">nature_lover</span>
                              <span class="caption-text">Карелия - страна тысячи озер. Тишина и спокойствие, которых так не хватает в городе 🌲</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">adventure_seeker</span>
                                  <span class="comment-text">Сплавлялись по рекам Карелии - адреналин и красота в одном флаконе! 🚣</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">travel_russia</span>
                                  <span class="comment-text">Кижи - архитектурное чудо! Деревянные церкви просто поражают 🪵</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (89)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">3 дня назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>

                        <!-- Post 8: Крым от travel_russia -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/travel_russia.jpg" alt="Travel Russia">
                              </div>
                              <div class="post-user">travel_russia</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-8.png" alt="Побережье Крыма">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">14,567 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">travel_russia</span>
                              <span class="caption-text">Крым - русская ривьера! Лазурное море, горы и богатая история в одном месте 🌊</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">explore_russia</span>
                                  <span class="comment-text">Ласточкино гнездо - must see! Вид на море просто захватывает дух 🏰</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">nature_lover</span>
                                  <span class="comment-text">Никитский ботанический сад весной - настоящее цветочное безумие! 🌺</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (204)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">4 дня назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>

                        <!-- Post 9: Урал от explore_russia -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/explore_russia.jpg" alt="Explore Russia">
                              </div>
                              <div class="post-user">explore_russia</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-9.png" alt="Уральские горы">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">5,432 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">explore_russia</span>
                              <span class="caption-text">Урал - каменный пояс России. Здесь Европа встречается с Азией 🗻</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">adventure_seeker</span>
                                  <span class="comment-text">Скалы Чертово Городище - отличное место для скалолазания! 🧗</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">travel_russia</span>
                                  <span class="comment-text">Озеро Тургояк называют младшим братом Байкала - вода кристально чистая! 💧</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (58)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">1 неделю назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>

                        <!-- Post 10: Дальний Восток от adventure_seeker -->
                        <div class="carousel-slide">
                          <div class="instagram-post">
                            <div class="post-animation-overlay">
                              <div class="animation-icon heart">❤️</div>
                              <div class="animation-icon comment">💬</div>
                              <div class="animation-icon share">📤</div>
                            </div>
                            
                            <div class="post-header">
                              <div class="post-avatar">
                                <img src="/images/avatars/adventure_seeker.jpg" alt="Adventure Seeker">
                              </div>
                              <div class="post-user">adventure_seeker</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="/images/dreams/dream-10.png" alt="Дальний Восток">
                            </div>
                            
                            <div class="post-actions">
                              <div class="actions-left">
                                <button class="action like">🤍</button>
                                <button class="action comment">💬</button>
                                <button class="action share">📤</button>
                              </div>
                              <div class="actions-right">
                                <button class="action save">📑</button>
                              </div>
                            </div>
                            
                            <div class="post-likes">
                              <div class="likes-count">4,321 отметок "Нравится"</div>
                            </div>
                            
                            <div class="post-caption">
                              <span class="caption-user">adventure_seeker</span>
                              <span class="caption-text">Дальний Восток - край земли, где природа сохранила свою первозданную красоту 🌅</span>
                              <span class="caption-more">ещё</span>
                            </div>
                            
                            <div class="post-comments">
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">extreme_travel</span>
                                  <span class="comment-text">Остров Сахалин - уникальная природа и рыбалка мечты! 🎣</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="comment">
                                <div class="comment-content">
                                  <span class="comment-user">travel_russia</span>
                                  <span class="comment-text">Владивосток - российский Сан-Франциско! Мосты и океан впечатляют 🌉</span>
                                </div>
                                <button class="comment-like">🤍</button>
                              </div>
                              <div class="view-all-comments">
                                <span class="view-all-text">Посмотреть все комментарии (42)</span>
                              </div>
                            </div>
                            
                            <div class="post-time">
                              <span class="time-ago">2 недели назад</span>
                            </div>
                            
                            <div class="post-add-comment">
                              <div class="add-comment-input">
                                <div class="emoji-picker">😊</div>
                                <input type="text" placeholder="Добавьте комментарий...">
                              </div>
                              <button class="post-button" disabled>Опубликовать</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="phone-carousel-nav">
              <div class="carousel-dots" id="instagram-dots"></div>
              <div class="phone-instruction">
                <span class="instruction-icon">👆</span>
                <span>Листай вверх/вниз</span>
              </div>
            </div>
          </div>

          <div class="content-cta pre-animate">
            <button class="btn btn--primary" data-target="chaos">
              <span class="btn__text">Поделиться мечтой</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `}createChaosSection(){return`
    <section class="story-section" id="chaos">
  <div class="story-section__background">
    <!-- Темный градиентный фон -->
    <div class="animated-background dark-fire-gradient"></div>
    
    <!-- Детализированные эффекты огня -->
    <div class="fire-container">
      <div class="fire-base fire-layer-1"></div>
      <div class="fire-base fire-layer-2"></div>
      <div class="fire-base fire-layer-3"></div>
      <div class="fire-flame flame-1"></div>
      <div class="fire-flame flame-2"></div>
      <div class="fire-flame flame-3"></div>
      <div class="fire-spark spark-1"></div>
      <div class="fire-spark spark-2"></div>
      <div class="fire-spark spark-3"></div>
    </div>
    
    <!-- Эффекты дыма -->
    <div class="smoke-container">
      <div class="smoke-cloud cloud-1"></div>
      <div class="smoke-cloud cloud-2"></div>
      <div class="smoke-cloud cloud-3"></div>
      <div class="smoke-cloud cloud-4"></div>
    </div>
    
    <!-- Эффекты частиц -->
    <div class="floating-embers"></div>
    <div class="glow-particles"></div>
  </div>
  
  <!-- Детализированные летающие вкладки -->
  <div class="floating-browser-tabs">
    <div class="browser-tab loading-tab" style="--delay: 0s; --x: 8%; --y: 12%; --drift-x: 15vw; --drift-y: -8vh; --rotation: 5deg;">
      <div class="tab-header">
        <div class="tab-favicon">🌐</div>
        <div class="tab-title">Booking.com - Отели...</div>
        <div class="tab-close">×</div>
      </div>
      <div class="tab-loading-bar">
        <div class="loading-progress" style="--load-time: 2s;"></div>
      </div>
    </div>
    
    <div class="browser-tab" style="--delay: 1.5s; --x: 88%; --y: 18%; --drift-x: -12vw; --drift-y: 10vh; --rotation: -3deg;">
      <div class="tab-header">
        <div class="tab-favicon">✈️</div>
        <div class="tab-title">Aviasales - Авиаби...</div>
        <div class="tab-close">×</div>
      </div>
    </div>
    
    <div class="browser-tab loading-tab" style="--delay: 3s; --x: 12%; --y: 75%; --drift-x: 8vw; --drift-y: -12vh; --rotation: 2deg;">
      <div class="tab-header">
        <div class="tab-favicon">🏨</div>
        <div class="tab-title">Tripadvisor - Отзы...</div>
        <div class="tab-close">×</div>
      </div>
      <div class="tab-loading-bar">
        <div class="loading-progress" style="--load-time: 3s;"></div>
      </div>
    </div>
    
    <div class="browser-tab" style="--delay: 4.5s; --x: 78%; --y: 68%; --drift-x: -10vw; --drift-y: 6vh; --rotation: -4deg;">
      <div class="tab-header">
        <div class="tab-favicon">🗺️</div>
        <div class="tab-title">Google Maps - Марш...</div>
        <div class="tab-close">×</div>
      </div>
    </div>
    
    <div class="browser-tab loading-tab" style="--delay: 6s; --x: 28%; --y: 28%; --drift-x: 5vw; --drift-y: -15vh; --rotation: 6deg;">
      <div class="tab-header">
        <div class="tab-favicon">🏠</div>
        <div class="tab-title">Airbnb - Аренда...</div>
        <div class="tab-close">×</div>
      </div>
      <div class="tab-loading-bar">
        <div class="loading-progress" style="--load-time: 2.5s;"></div>
      </div>
    </div>
    
    <div class="browser-tab" style="--delay: 7.5s; --x: 65%; --y: 48%; --drift-x: -8vw; --drift-y: 8vh; --rotation: -2deg;">
      <div class="tab-header">
        <div class="tab-favicon">📅</div>
        <div class="tab-title">Ostrovok - Брониро...</div>
        <div class="tab-close">×</div>
      </div>
    </div>
    
    <div class="browser-tab loading-tab" style="--delay: 9s; --x: 18%; --y: 55%; --drift-x: 12vw; --drift-y: -5vh; --rotation: 3deg;">
      <div class="tab-header">
        <div class="tab-favicon">🚗</div>
        <div class="tab-title">RentalCars - Прокат...</div>
        <div class="tab-close">×</div>
      </div>
      <div class="tab-loading-bar">
        <div class="loading-progress" style="--load-time: 1.5s;"></div>
      </div>
    </div>
    
    <div class="browser-tab" style="--delay: 10.5s; --x: 82%; --y: 35%; --drift-x: -15vw; --drift-y: 4vh; --rotation: -5deg;">
      <div class="tab-header">
        <div class="tab-favicon">💰</div>
        <div class="tab-title">Сравнение цен - 8 с...</div>
        <div class="tab-close">×</div>
      </div>
    </div>
  </div>
      
      <div class="story-section__container">
        <div class="content-block content-block--centered pre-animate">
          <div class="content-badge pre-animate">
            <span class="badge__icon">🔥</span>
            Глава 3: Хаос
          </div>
          
          <h2 class="content-title pre-animate">Попытка №1</h2>
          <div class="content-subtitle pre-animate">
            "Решил спланировать поездку на выходные. <br>
            Открыл браузер... и погрузился в информационный ад."
          </div>

          <div class="content-quote pre-animate">
            <div class="quote__text">
              "15+ вкладок браузера, 3 часа поиска, 0 купленных билетов"
            </div>
          </div>

          <div class="chaos-visual pre-animate" style="max-width: 600px; margin: 2rem auto;">
            <div class="chaos-image">
              <img src="/images/chaos/chaos-before.png" alt="Хаос планирования" style="width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
            </div>
            <div class="image-caption" style="text-align: center; margin-top: 1rem; opacity: 0.8; font-style: italic;">
              "Слишком много вариантов, слишком много отзывов. Я просто закрыл ноутбук и пошел спать."
            </div>
          </div>

          <div class="stats-grid pre-animate">
            <div class="stat-item">
              <div class="stat__icon">📊</div>
              <div class="stat__number">15+</div>
              <div class="stat__label">вкладок браузера</div>
            </div>
            <div class="stat-item">
              <div class="stat__icon">⏰</div>
              <div class="stat__number">3 часа</div>
              <div class="stat__label">поиска</div>
            </div>
            <div class="stat-item">
              <div class="stat__icon">😫</div>
              <div class="stat__number">0</div>
              <div class="stat__label">билетов куплено</div>
            </div>
          </div>

          <div class="content-cta pre-animate">
            <button class="btn btn--primary" data-target="solution">
              <span class="btn__text">Найти решение</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `}createSolutionSection(){return`
      <section class="story-section solution-section" id="solution">
  <div class="solution-background">
    <!-- Квантовые ядра -->
    <div class="quantum-cores">
      <div class="quantum-core core-1"></div>
      <div class="quantum-core core-2"></div>
      <div class="quantum-core core-3"></div>
    </div>
    
    <!-- Голографическая матрица -->
    <div class="hologram-matrix">
      <div class="matrix-grid"></div>
      <div class="matrix-scanline"></div>
    </div>
    
    <!-- Нейронные связи -->
    <div class="neural-connections">
      <div class="connection-node node-1" data-glowing="true"></div>
      <div class="connection-node node-2" data-glowing="true"></div>
      <div class="connection-node node-3" data-glowing="true"></div>
      <div class="connection-node node-4" data-glowing="true"></div>
      <div class="connection-node node-5" data-glowing="true"></div>
      <div class="connection-node node-6" data-glowing="true"></div>
    </div>
    
    <!-- Плавающие голограммы -->
    <div class="hologram-elements">
      <div class="hologram hologram-1" data-type="chip"></div>
      <div class="hologram hologram-2" data-type="data"></div>
      <div class="hologram hologram-3" data-type="ai"></div>
    </div>
    
    <!-- Энергетические волны -->
    <div class="energy-waves">
      <div class="energy-wave wave-1"></div>
      <div class="energy-wave wave-2"></div>
      <div class="energy-wave wave-3"></div>
    </div>
    
    <!-- Частицы света -->
    <div class="light-particles"></div>
  </div>
        <div class="floating-elements">
          <div class="floating-element">📱</div>
          <div class="floating-element">✨</div>
          <div class="floating-element">🎯</div>
          <div class="floating-element">🚀</div>
        </div>
        
        <div class="story-section__container">
          <div class="content-block content-block--split pre-animate">
            <div class="content-block__left">
              <div class="phone-container-3d pre-animate">
              <div class="phone">
                <!-- Основные грани телефона -->
                <div class="phone-front"></div>
                <div class="phone-back"></div>
                
                <!-- Боковые рамки -->
                <div class="phone-frame left"></div>
                <div class="phone-frame right"></div>
                <div class="phone-frame top"></div>
                <div class="phone-frame bottom"></div>
                
                <!-- Детали -->
                <div class="phone-notch"></div>
                <div class="phone-screen">
                  <div class="app-interface">
                    <div class="app-header">
                      <div class="app-title">WanderList</div>
                      <div class="app-subtitle">Мой первый маршрут</div>
                    </div>
                    <div class="app-content">
                      <div class="feature-item" data-feature="altai">
                        <div class="feature-icon">🏔️</div>
                        <div class="feature-text">Алтай • 5 дней</div>
                      </div>
                      <div class="feature-item" data-feature="transport">
                        <div class="feature-icon">🚗</div>
                        <div class="feature-text">Транспорт</div>
                      </div>
                      <div class="feature-item" data-feature="hotel">
                        <div class="feature-icon">🏨</div>
                        <div class="feature-text">Проживание</div>
                      </div>
                      <div class="feature-item" data-feature="companions">
                        <div class="feature-icon">👥</div>
                        <div class="feature-text">3 попутчика</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
            
            <div class="content-block__right">
              <div class="content-badge pre-animate">
                <span class="badge__icon">🎯</span>
                Глава 4: Открытие
              </div>
              
              <h2 class="content-title pre-animate">Знакомство с WanderList</h2>
              <div class="content-subtitle pre-animate">Первые шаги в мир простого планирования</div>

              <div class="content-quote pre-animate">
                <div class="quote__text">
                  "Впервые за долгое время я чувствую, что моя мечта об Алтае становится реальностью. Это так просто!"
                </div>
                <div class="quote__author">
                  <div class="author__avatar">
                    <img src="/images/characters/anton-avatar.png" alt="Антон">
                  </div>
                  <div class="author__info">
                    <div class="author__name">Антон</div>
                    <div class="author__status">Начинающий путешественник</div>
                  </div>
                </div>
              </div>

              <div class="content-cta pre-animate">
                <button class="btn btn--primary" data-target="stories">
                  <span class="btn__text">Посмотреть истории успеха</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}createStoriesSection(){return`
    <section class="story-section" id="stories">
  <!-- Основной градиентный фон -->
  <div class="animated-background_stories">
    <!-- Добавляем дополнительные элементы для фона -->
    <div class="bg-particle bg-particle--1"></div>
    <div class="bg-particle bg-particle--2"></div>
    <div class="bg-particle bg-particle--3"></div>
    <div class="bg-particle bg-particle--4"></div>
    <div class="bg-particle bg-particle--5"></div>
    
    <!-- Сетка из тонких линий -->
    <div class="bg-grid"></div>
    
    <!-- Световые блики -->
    <div class="bg-shine bg-shine--1"></div>
    <div class="bg-shine bg-shine--2"></div>
    <div class="bg-shine bg-shine--3"></div>
    
    <!-- Орбитальные элементы -->
    <div class="bg-orbit bg-orbit--1"></div>
    <div class="bg-orbit bg-orbit--2"></div>
    <div class="bg-orbit bg-orbit--3"></div>
  </div>
  
  <!-- Существующие плавающие элементы -->
  <div class="floating-elements">
    <div class="floating-element">🌟</div>
    <div class="floating-element">✨</div>
    <div class="floating-element">💫</div>
    <div class="floating-element">🎉</div>
  </div>
        
        <div class="story-section__container">
          <div class="content-block content-block--centered pre-animate">
            <div class="content-badge pre-animate">
              <span class="badge__icon">🌟</span>
              Истории успеха
            </div>
            
            <h2 class="content-title pre-animate">Нас уже 50,000+</h2>
            <div class="content-subtitle pre-animate">Присоединяйся к сообществу путешественников</div>

            <div class="carousel-section stories-carousel pre-animate">
              <div class="carousel-container">
                <div class="carousel-track" id="stories-track">
                  <!-- Story 1: Мария -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/maria-avatar.png" alt="Мария">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Мария, 25 лет</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Москва</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Дизайнер</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>12 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "За год с WanderList я посетила больше стран, чем за предыдущие 5 лет мечтаний. 
                          Из офисного работника в digital nomad - все благодаря простому планированию."
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">12</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">47</div>
                            <div class="stat-label">друзей в пути</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">6</div>
                            <div class="stat-label">стран</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Первая поездка</span>
                            <span class="achievement">🌍 Путешественник</span>
                            <span class="achievement">📸 Фотограф</span>
                            <span class="achievement">👥 Лидер группы</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Story 2: Дмитрий -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/dmitry-avatar.png" alt="Дмитрий">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Дмитрий, 32 года</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Новосибирск</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Разработчик</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>8 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "Работал в офисе 24/7, пока не открыл для себя путешествия по России. 
                          Теперь каждые 2 месяца - новое приключение где-то в нашей необъятной стране."
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">8</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">23</div>
                            <div class="stat-label">попутчика</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">15к+</div>
                            <div class="stat-label">км пути</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Исследователь</span>
                            <span class="achievement">🇷🇺 По России</span>
                            <span class="achievement">🚗 Водитель</span>
                            <span class="achievement">📅 Регулярный</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Story 3: Анна -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/anna-avatar.png" alt="Анна">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Анна, 28 лет</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Казань</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Маркетолог</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>15 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "Нашла свою команду путешественников через приложение. 
                          Вместе открыли самые красивые места России о которых даже не подозревала!"
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">15</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">8</div>
                            <div class="stat-label">друзей</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">12к+</div>
                            <div class="stat-label">воспоминаний</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Социальный</span>
                            <span class="achievement">👫 Командный</span>
                            <span class="achievement">📷 Контент-мейкер</span>
                            <span class="achievement">🎯 Организатор</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Stories 4-10 - аналогичная структура с разными персонажами -->
                  <!-- Story 4: Алексей -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/story-4.png" alt="Алексей">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Алексей, 35 лет</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Екатеринбург</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Инженер</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>10 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "С женой открыли для себя автопутешествия по России. Каждые выходные - новое открытие!"
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">10</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">2</div>
                            <div class="stat-label">попутчика</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">8к+</div>
                            <div class="stat-label">км пути</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Семейный</span>
                            <span class="achievement">🚗 Автопутешественник</span>
                            <span class="achievement">🏕️ Кемпер</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Story 5: Ольга -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/story-5.png" alt="Ольга">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Ольга, 26 лет</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Санкт-Петербург</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Фотограф</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>18 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "Превратила хобби в профессию. Теперь мои фото из путешествий продаются по всему миру!"
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">18</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">500+</div>
                            <div class="stat-label">фото продано</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">25</div>
                            <div class="stat-label">стран</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Профессионал</span>
                            <span class="achievement">📷 Фотограф</span>
                            <span class="achievement">🌍 Международный</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Story 6: Сергей -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/story-6.png" alt="Сергей">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Сергей, 41 год</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Краснодар</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Предприниматель</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>6 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "После 20 лет в бизнесе открыл для себя мир путешествий. Лучшее решение в жизни!"
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">6</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">12</div>
                            <div class="stat-label">новых друзей</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">3</div>
                            <div class="stat-label">континента</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Открытие</span>
                            <span class="achievement">🌎 Мировой</span>
                            <span class="achievement">💼 Бизнес</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Story 7: Елена -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/story-7.png" alt="Елена">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Елена, 29 лет</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Нижний Новгород</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Учитель</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>9 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "Путешествую с учениками, показываю им настоящую Россию. Образование через приключения!"
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">9</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">45</div>
                            <div class="stat-label">учеников</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">15</div>
                            <div class="stat-label">городов</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Образование</span>
                            <span class="achievement">👨‍🏫 Учитель</span>
                            <span class="achievement">🎯 Организатор</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Story 8: Иван -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/story-8.png" alt="Иван">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Иван, 33 года</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Владивосток</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Моряк</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>7 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "После моря открыл для себя сухопутные путешествия. Россия невероятно разнообразна!"
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">7</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">11к+</div>
                            <div class="stat-label">км по России</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">21</div>
                            <div class="stat-label">регион</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Исследователь</span>
                            <span class="achievement">🇷🇺 По России</span>
                            <span class="achievement">🗺️ Навигатор</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Story 9: Татьяна -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/story-9.png" alt="Татьяна">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Татьяна, 31 год</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Сочи</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Фитнес-тренер</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>13 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "Совмещаю путешествия с активным отдыхом. Горные походы, велотуры, сплавы - все возможно!"
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">13</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">8</div>
                            <div class="stat-label">видов спорта</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">35</div>
                            <div class="stat-label">единомышленников</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Активный</span>
                            <span class="achievement">🏔️ Альпинист</span>
                            <span class="achievement">🚴 Велосипедист</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Story 10: Михаил -->
                  <div class="carousel-slide">
                    <div class="story-card">
                      <div class="story-header">
                        <div class="story-avatar">
                          <img src="/images/stories/story-10.png" alt="Михаил">
                        </div>
                        <div class="story-info">
                          <div class="story-name">Михаил, 27 лет</div>
                          <div class="story-meta">
                            <div class="meta-item">
                              <span class="meta-icon">📍</span>
                              <span>Калининград</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">💼</span>
                              <span>Студент</span>
                            </div>
                            <div class="meta-item">
                              <span class="meta-icon">⭐</span>
                              <span>11 поездок</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="story-content">
                        <div class="story-quote">
                          "Путешествую на стипендию, нашел способ увидеть всю Россию без больших затрат!"
                        </div>
                        <div class="story-stats">
                          <div class="stat-item">
                            <div class="stat-number">11</div>
                            <div class="stat-label">поездок</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">15к</div>
                            <div class="stat-label">бюджет в рублях</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">18</div>
                            <div class="stat-label">городов</div>
                          </div>
                        </div>
                        <div class="story-achievements">
                          <div class="achievements-title">Достижения:</div>
                          <div class="achievements-list">
                            <span class="achievement">🏆 Бюджетный</span>
                            <span class="achievement">🎓 Студент</span>
                            <span class="achievement">💸 Экономный</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-nav">
                  <div class="carousel-dots" id="stories-dots">
                    <!-- Точки будут сгенерированы через JavaScript -->
                  </div>
                </div>
              </div>
            </div>

            <div class="content-cta pre-animate">
              <button class="btn btn--primary" data-target="success">
                <span class="btn__text">Увидеть результат</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    `}createSuccessSection(){return`
     <section class="story-section" id="success">
  <!-- Основной анимированный фон для success секции -->
  <div class="story-section__background">
    <div class="animated-background gradient-3">
      <!-- Горные элементы фона -->
      <div class="bg-mountain bg-mountain--1"></div>
      <div class="bg-mountain bg-mountain--2"></div>
      <div class="bg-mountain bg-mountain--3"></div>
      
      <!-- Озера и водные элементы -->
      <div class="bg-lake"></div>
      <div class="bg-waterfall"></div>
      
      <!-- Парящие облака -->
      <div class="bg-cloud bg-cloud--1"></div>
      <div class="bg-cloud bg-cloud--2"></div>
      <div class="bg-cloud bg-cloud--3"></div>
      <div class="bg-cloud bg-cloud--4"></div>
      
      <!-- Звезды и световые точки -->
      <div class="bg-star bg-star--1"></div>
      <div class="bg-star bg-star--2"></div>
      <div class="bg-star bg-star--3"></div>
      <div class="bg-star bg-star--4"></div>
      <div class="bg-star bg-star--5"></div>
      <div class="bg-star bg-star--6"></div>
      
      <!-- Солнце/Луна -->
      <div class="bg-sun"></div>
      
      <!-- Деревья -->
      <div class="bg-tree bg-tree--1"></div>
      <div class="bg-tree bg-tree--2"></div>
      <div class="bg-tree bg-tree--3"></div>
      
      <!-- Туман/дымка -->
      <div class="bg-mist"></div>
    </div>
    <div class="background-pattern success-stars-pattern"></div>
  </div>
  
  <!-- Остальная разметка секции остается без изменений -->
  <div class="floating-elements">
    <div class="floating-element">🏔️</div>
    <div class="floating-element">🌲</div>
    <div class="floating-element">🚗</div>
    <div class="floating-element">✨</div>
    <div class="floating-element">📸</div>
    <div class="floating-element">🌟</div>
  </div>
  
        
        <div class="story-section__container">
          <div class="content-block content-block--centered pre-animate">
            <div class="content-badge pre-animate">
              <span class="badge__icon">✨</span>
              Эпилог: Мечта сбылась
            </div>
            
            <h2 class="content-title pre-animate">Алтай: первое путешествие</h2>
            <div class="content-subtitle pre-animate">7 дней, которые изменили всё</div>

            <!-- Hero Video/GIF Placeholder -->
            <div class="trip-hero pre-animate">
              <div class="hero-media">
                <div class="media-container">
                  <img src="/images/trips/altai-main.jpg" alt="Алтай" class="hero-image">
                  <div class="media-overlay">
                    <div class="play-button">
                      <div class="play-icon">▶</div>
                      <span>Смотреть видео</span>
                    </div>
                  </div>
                </div>
                <div class="image-caption">
                  "Вот он, настоящий Алтай! Стоило каждого дня ожидания"
                </div>
              </div>
            </div>

            <!-- Interactive Timeline -->
            <div class="interactive-timeline pre-animate">
              <div class="timeline-header">
                <h3 class="timeline-title">Маршрут мечты</h3>
                <div class="timeline-stats">
                  <div class="stat">
                    <div class="stat-number">7</div>
                    <div class="stat-label">дней</div>
                  </div>
                  <div class="stat">
                    <div class="stat-number">1,850</div>
                    <div class="stat-label">км</div>
                  </div>
                  <div class="stat">
                    <div class="stat-number">12</div>
                    <div class="stat-label">локаций</div>
                  </div>
                </div>
              </div>

              <div class="timeline-container">
                <!-- Day 1 -->
                <div class="timeline-day active" data-day="1">
                  <div class="day-marker">
                    <div class="day-number">1</div>
                    <div class="day-title">Прибытие</div>
                  </div>
                  <div class="day-content">
                    <div class="day-media">
                      <div class="media-gallery">
                        <img src="/images/trips/day1-1.png" alt="Аэропорт Горно-Алтайска" class="gallery-image active">
                        <img src="/images/trips/day1-2.png" alt="Дорога до базы" class="gallery-image">
                        <img src="/images/trips/day1-3.png" alt="Первые горные виды" class="gallery-image">
                      </div>
                      <div class="gallery-nav">
                        <button class="gallery-prev">‹</button>
                        <div class="gallery-dots">
                          <span class="dot active"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </div>
                        <button class="gallery-next">›</button>
                      </div>
                    </div>
                    <div class="day-info">
                      <h4 class="day-location">Горно-Алтайск → Чемал</h4>
                      <div class="day-highlights">
                        <div class="highlight">
                          <span class="highlight-icon">✈️</span>
                          <span>Перелет и трансфер</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🏔️</span>
                          <span>Первые горные виды</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🏡</span>
                          <span>Заселение на базе</span>
                        </div>
                      </div>
                      <div class="day-quote">
                        "Самолет приземлился... И вот я здесь! Настоящий горный воздух, не из окна офиса"
                      </div>
                      <div class="day-stats">
                        <div class="day-stat">
                          <div class="stat-value">4 ч</div>
                          <div class="stat-label">в пути</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">250 км</div>
                          <div class="stat-label">дороги</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">+1,200 м</div>
                          <div class="stat-label">высота</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Day 2 -->
                <div class="timeline-day" data-day="2">
                  <div class="day-marker">
                    <div class="day-number">2</div>
                    <div class="day-title">Чуйский тракт</div>
                  </div>
                  <div class="day-content">
                    <div class="day-media">
                      <div class="media-gallery">
                        <img src="/images/trips/day2-1.png" alt="Чуйский тракт - горная дорога" class="gallery-image active">
                        <img src="/images/trips/day2-2.png" alt="Семинский перевал" class="gallery-image">
                        <img src="/images/trips/day2-3.png" alt="Панорама гор" class="gallery-image">
                      </div>
                      <div class="gallery-nav">
                        <button class="gallery-prev">‹</button>
                        <div class="gallery-dots">
                          <span class="dot active"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </div>
                        <button class="gallery-next">›</button>
                      </div>
                    </div>
                    <div class="day-info">
                      <h4 class="day-location">Чуйский тракт • Семинский перевал</h4>
                      <div class="day-highlights">
                        <div class="highlight">
                          <span class="highlight-icon">🛣️</span>
                          <span>Легендарная дорога</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🏞️</span>
                          <span>Смотровые площадки</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">📸</span>
                          <span>Фотосессия</span>
                        </div>
                      </div>
                      <div class="day-quote">
                        "Чуйский тракт — это не просто дорога, это история. Каждый поворот открывает новый мир"
                      </div>
                      <div class="day-stats">
                        <div class="day-stat">
                          <div class="stat-value">8 ч</div>
                          <div class="stat-label">экскурсия</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">320 км</div>
                          <div class="stat-label">маршрут</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">+1,700 м</div>
                          <div class="stat-label">перевал</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Day 3 -->
                <div class="timeline-day" data-day="3">
                  <div class="day-marker">
                    <div class="day-number">3</div>
                    <div class="day-title">Телецкое озеро</div>
                  </div>
                  <div class="day-content">
                    <div class="day-media">
                      <div class="media-gallery">
                        <img src="/images/trips/day3-1.png" alt="Телецкое озеро - панорама" class="gallery-image active">
                        <img src="/images/trips/day3-2.png" alt="Водопад Корбу" class="gallery-image">
                        <img src="/images/trips/day3-3.png" alt="Закат на озере" class="gallery-image">
                      </div>
                      <div class="gallery-nav">
                        <button class="gallery-prev">‹</button>
                        <div class="gallery-dots">
                          <span class="dot active"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </div>
                        <button class="gallery-next">›</button>
                      </div>
                    </div>
                    <div class="day-info">
                      <h4 class="day-location">Артыбаш • Водопад Корбу</h4>
                      <div class="day-highlights">
                        <div class="highlight">
                          <span class="highlight-icon">🚤</span>
                          <span>Прогулка на катере</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">💦</span>
                          <span>Водопад Корбу</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🌅</span>
                          <span>Закат на озере</span>
                        </div>
                      </div>
                      <div class="day-quote">
                        "Телецкое озеро — алмаз Алтая. Вода такая чистая, что видно дно на 15 метрах!"
                      </div>
                      <div class="day-stats">
                        <div class="day-stat">
                          <div class="stat-value">6 ч</div>
                          <div class="stat-label">на воде</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">85 км</div>
                          <div class="stat-label">по озеру</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">434 м</div>
                          <div class="stat-label">глубина</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Day 4 -->
                <div class="timeline-day" data-day="4">
                  <div class="day-marker">
                    <div class="day-number">4</div>
                    <div class="day-title">Горные озера</div>
                  </div>
                  <div class="day-content">
                    <div class="day-media">
                      <div class="media-gallery">
                        <img src="/images/trips/day4-1.png" alt="Манжерокское озеро" class="gallery-image active">
                        <img src="/images/trips/day4-2.png" alt="Каракольские озера" class="gallery-image">
                        <img src="/images/trips/day4-3.png" alt="Озеро в горах" class="gallery-image">
                      </div>
                      <div class="gallery-nav">
                        <button class="gallery-prev">‹</button>
                        <div class="gallery-dots">
                          <span class="dot active"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </div>
                        <button class="gallery-next">›</button>
                      </div>
                    </div>
                    <div class="day-info">
                      <h4 class="day-location">Манжерок • Каракольские озера</h4>
                      <div class="day-highlights">
                        <div class="highlight">
                          <span class="highlight-icon">🏞️</span>
                          <span>Манжерокское озеро</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">💧</span>
                          <span>Каракольские озера</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🚡</span>
                          <span>Канатная дорога</span>
                        </div>
                      </div>
                      <div class="day-quote">
                        "Семь озер как семь сапфиров в горной короне Алтая. Красота, от которой захватывает дух!"
                      </div>
                      <div class="day-stats">
                        <div class="day-stat">
                          <div class="stat-value">7 ч</div>
                          <div class="stat-label">треккинг</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">15 км</div>
                          <div class="stat-label">пеший маршрут</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">+800 м</div>
                          <div class="stat-label">подъем</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Day 5 -->
                <div class="timeline-day" data-day="5">
                  <div class="day-marker">
                    <div class="day-number">5</div>
                    <div class="day-title">Водопады</div>
                  </div>
                  <div class="day-content">
                    <div class="day-media">
                      <div class="media-gallery">
                        <img src="/images/trips/day5-1.png" alt="Водопад Учар" class="gallery-image active">
                        <img src="/images/trips/day5-2.png" alt="Водопад Камышлинский" class="gallery-image">
                        <img src="/images/trips/day5-3.png" alt="Горная река" class="gallery-image">
                      </div>
                      <div class="gallery-nav">
                        <button class="gallery-prev">‹</button>
                        <div class="gallery-dots">
                          <span class="dot active"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </div>
                        <button class="gallery-next">›</button>
                      </div>
                    </div>
                    <div class="day-info">
                      <h4 class="day-location">Водопад Учар • Камышлинский</h4>
                      <div class="day-highlights">
                        <div class="highlight">
                          <span class="highlight-icon">💦</span>
                          <span>Водопад Учар</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🌊</span>
                          <span>Камышлинский водопад</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🚶</span>
                          <span>Пеший поход</span>
                        </div>
                      </div>
                      <div class="day-quote">
                        "Грохот падающей воды, брызги на лице... Природа показывает свою мощь и величие!"
                      </div>
                      <div class="day-stats">
                        <div class="day-stat">
                          <div class="stat-value">6 ч</div>
                          <div class="stat-label">поход</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">12 км</div>
                          <div class="stat-label">пешком</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">160 м</div>
                          <div class="stat-label">высота водопада</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Day 6 -->
                <div class="timeline-day" data-day="6">
                  <div class="day-marker">
                    <div class="day-number">6</div>
                    <div class="day-title">Горные вершины</div>
                  </div>
                  <div class="day-content">
                    <div class="day-media">
                      <div class="media-gallery">
                        <img src="/images/trips/day6-1.png" alt="Восхождение на гору" class="gallery-image active">
                        <img src="/images/trips/day6-2.png" alt="Вид с вершины" class="gallery-image">
                        <img src="/images/trips/day6-3.png" alt="Альпийские луга" class="gallery-image">
                      </div>
                      <div class="gallery-nav">
                        <button class="gallery-prev">‹</button>
                        <div class="gallery-dots">
                          <span class="dot active"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </div>
                        <button class="gallery-next">›</button>
                      </div>
                    </div>
                    <div class="day-info">
                      <h4 class="day-location">Гора Сарлык • Альпийские луга</h4>
                      <div class="day-highlights">
                        <div class="highlight">
                          <span class="highlight-icon">⛰️</span>
                          <span>Восхождение</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🏕️</span>
                          <span>Альпийские луга</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">🦅</span>
                          <span>Орлы в небе</span>
                        </div>
                      </div>
                      <div class="day-quote">
                        "На вершине мира! Вид, ради которого стоит пройти каждый шаг этого пути"
                      </div>
                      <div class="day-stats">
                        <div class="day-stat">
                          <div class="stat-value">9 ч</div>
                          <div class="stat-label">восхождение</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">+2,500 м</div>
                          <div class="stat-label">высота</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">18 км</div>
                          <div class="stat-label">маршрут</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Day 7 -->
                <div class="timeline-day" data-day="7">
                  <div class="day-marker">
                    <div class="day-number">7</div>
                    <div class="day-title">Возвращение</div>
                  </div>
                  <div class="day-content">
                    <div class="day-media">
                      <div class="media-gallery">
                        <img src="/images/trips/day7-1.png" alt="Прощальный закат" class="gallery-image active">
                        <img src="/images/trips/day7-2.png" alt="Дорога домой" class="gallery-image">
                        <img src="/images/trips/day7-3.png" alt="Групповое фото" class="gallery-image">
                      </div>
                      <div class="gallery-nav">
                        <button class="gallery-prev">‹</button>
                        <div class="gallery-dots">
                          <span class="dot active"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </div>
                        <button class="gallery-next">›</button>
                      </div>
                    </div>
                    <div class="day-info">
                      <h4 class="day-location">Прощание с Алтаем</h4>
                      <div class="day-highlights">
                        <div class="highlight">
                          <span class="highlight-icon">🌅</span>
                          <span>Последний закат</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">📸</span>
                          <span>Групповые фото</span>
                        </div>
                        <div class="highlight">
                          <span class="highlight-icon">✈️</span>
                          <span>Вылет домой</span>
                        </div>
                      </div>
                      <div class="day-quote">
                        "Эта неделя изменила меня навсегда. Алтай стал не просто местом на карте, а частью моей души"
                      </div>
                      <div class="day-stats">
                        <div class="day-stat">
                          <div class="stat-value">7 дней</div>
                          <div class="stat-label">путешествия</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">847</div>
                          <div class="stat-label">фотографий</div>
                        </div>
                        <div class="day-stat">
                          <div class="stat-value">4</div>
                          <div class="stat-label">новых друга</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="timeline-progress">
                <div class="progress-days">
                  <span class="progress-day active">Д1</span>
                  <span class="progress-day">Д2</span>
                  <span class="progress-day">Д3</span>
                  <span class="progress-day">Д4</span>
                  <span class="progress-day">Д5</span>
                  <span class="progress-day">Д6</span>
                  <span class="progress-day">Д7</span>
                </div>
              </div>
            </div>

            <!-- Team Section - Redesigned -->
            <div class="content-team pre-animate">
              <h3 class="content-title">Наша команда мечты</h3>
              <div class="team-subtitle">4 человека, 1 цель — незабываемое приключение</div>
              
              <div class="team-showcase">
                <div class="team-main">
                  <div class="team-member featured">
                    <div class="member-avatar">
                      <img src="/images/characters/anton-avatar.png" alt="Антон">
                      <div class="member-status online"></div>
                    </div>
                    <div class="member-info">
                      <div class="member-name">Антон</div>
                      <div class="member-role">Организатор • IT-специалист</div>
                      <div class="member-bio">"Из офисного работника в путешественника. WanderList сделал это возможным!"</div>
                      <div class="member-stats">
                        <div class="member-stat">
                          <div class="stat-value">1-я</div>
                          <div class="stat-label">поездка</div>
                        </div>
                        <div class="member-stat">
                          <div class="stat-value">247 → 1</div>
                          <div class="stat-label">мечта → реальность</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="team-companions">
                  <div class="companion-row">
                    <div class="team-member companion">
                      <div class="member-avatar">
                        <img src="/images/characters/alex-avatar.png" alt="Алекс">
                        <div class="member-badge">👑</div>
                      </div>
                      <div class="member-info">
                        <div class="member-name">Алекс</div>
                        <div class="member-role">Гид • Альпинист</div>
                        <div class="member-specialty">Знает каждую тропу Алтая</div>
                      </div>
                    </div>

                    <div class="team-member companion">
                      <div class="member-avatar">
                        <img src="/images/characters/maria-avatar.png" alt="Мария">
                        <div class="member-badge">📸</div>
                      </div>
                      <div class="member-info">
                        <div class="member-name">Мария</div>
                        <div class="member-role">Фотограф • Блогер</div>
                        <div class="member-specialty">Поймала лучшие кадры</div>
                      </div>
                    </div>
                  </div>

                  <div class="companion-row">
                    <div class="team-member companion">
                      <div class="member-avatar">
                        <img src="/images/characters/olga-avatar.png" alt="Ольга">
                        <div class="member-badge">💫</div>
                      </div>
                      <div class="member-info">
                        <div class="member-name">Ольга</div>
                        <div class="member-role">Координатор • Повар</div>
                        <div class="member-specialty">Нашла самые уютные места</div>
                      </div>
                    </div>

                    <div class="team-member companion add-member">
                      <div class="member-avatar">
                        <div class="add-icon">+</div>
                      </div>
                      <div class="member-info">
                        <div class="member-name">Твое место</div>
                        <div class="member-role">Следующий попутчик</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Achievement Stats -->
            <div class="achievement-stats pre-animate">
              <div class="achievement-grid">
                <div class="achievement-card">
                  <div class="achievement-icon">🏔️</div>
                  <div class="achievement-content">
                    <div class="achievement-number">12</div>
                    <div class="achievement-label">горных вершин</div>
                    <div class="achievement-desc">Покоренных высот</div>
                  </div>
                </div>

                <div class="achievement-card">
                  <div class="achievement-icon">📸</div>
                  <div class="achievement-content">
                    <div class="achievement-number">847</div>
                    <div class="achievement-label">фотографий</div>
                    <div class="achievement-desc">Ярких моментов</div>
                  </div>
                </div>

                <div class="achievement-card">
                  <div class="achievement-icon">🚗</div>
                  <div class="achievement-content">
                    <div class="achievement-number">1,850</div>
                    <div class="achievement-label">километров</div>
                    <div class="achievement-desc">Пути приключений</div>
                  </div>
                </div>

                <div class="achievement-card">
                  <div class="achievement-icon">🌟</div>
                  <div class="achievement-content">
                    <div class="achievement-number">1-я</div>
                    <div class="achievement-label">поездка</div>
                    <div class="achievement-desc">Из многих</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transformational Quote -->
            <div class="transformation-quote pre-animate">
              <div class="quote-container">
                <div class="quote-avatar">
                  <img src="/images/characters/anton-avatar.png" alt="Антон">
                </div>
                <div class="quote-content">
                  <div class="quote-text">
                    "Эта поездка изменила всё. Я нашел не просто красивые места — я нашел себя. 
                    Из офисного работника, знавшего каждый пиксель монитора, я превратился в путешественника, 
                    увидевшего настоящие горы. WanderList не просто помог спланировать маршрут — 
                    он помог найти друзей и понять, что настоящая жизнь там, за пределами привычного комфорта."
                  </div>
                  <div class="quote-author">
                    <div class="author-name">Антон</div>
                    <div class="author-status">Теперь опытный путешественник</div>
                  </div>
                  <div class="quote-badges">
                    <span class="badge">🏆 Первое путешествие</span>
                    <span class="badge">🌄 Покоритель гор</span>
                    <span class="badge">📸 Фотограф</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Final CTA -->
            <div class="success-cta pre-animate">
              <div class="cta-container">
                <h3 class="cta-title">Твоя очередь!</h3>
                <p class="cta-subtitle">Присоединяйся к 50,000+ путешественников</p>
                
                <div class="cta-features">
                  <div class="feature">
                    <span class="feature-icon">🚀</span>
                    <span class="feature-text">Быстрое планирование</span>
                  </div>
                  <div class="feature">
                    <span class="feature-icon">👥</span>
                    <span class="feature-text">Найди попутчиков</span>
                  </div>
                  <div class="feature">
                    <span class="feature-icon">💰</span>
                    <span class="feature-text">Лучшие цены</span>
                  </div>
                </div>

                <div class="cta-buttons">
                  <button class="btn btn--primary btn--large" data-target="destinations">
                    <span class="btn__icon">🗺️</span>
                    <span class="btn__text">Выбрать направление</span>
                  </button>
                  <button class="btn btn--secondary btn--large" data-target="final">
                    <span class="btn__icon">🚀</span>
                    <span class="btn__text">Начать планировать</span>
                  </button>
                </div>

                <div class="cta-stats">
                  <div class="stat">
                    <div class="stat-number">50K+</div>
                    <div class="stat-label">путешественников</div>
                  </div>
                  <div class="stat">
                    <div class="stat-number">1,200+</div>
                    <div class="stat-label">маршрутов</div>
                  </div>
                  <div class="stat">
                    <div class="stat-number">4.9 ★</div>
                    <div class="stat-label">рейтинг</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}createDestinationsSection(){return`
      <section class="story-section" id="destinations">
        <div class="animated-background" style="background: linear-gradient(-45deg, #0a0a0a, #1a1a2e, #2d3748, #744210); background-size: 400% 400%; animation: gradientShift 15s ease infinite;"></div>
        <div class="floating-elements">
          <div class="floating-element">🗺️</div>
          <div class="floating-element">🏔️</div>
          <div class="floating-element">🌊</div>
          <div class="floating-element">🏛️</div>
        </div>
        
        <div class="story-section__container">
          <div class="content-block content-block--centered pre-animate">
            <div class="content-badge pre-animate">
              <span class="badge__icon">🗺️</span>
              Куда дальше?
            </div>
            
            <h2 class="content-title pre-animate">Следующие приключения</h2>
            <div class="content-subtitle pre-animate">Открой для себя новые направления</div>

            <div class="carousel-section destinations-carousel pre-animate">
              <div class="carousel-container">
                <div class="carousel-track" id="destinations-track">
                  <!-- Destination 1: Алтай -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/altai.jpg" alt="Алтай">
                        <div class="destination-price">от 25 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.9</span>
                          <span>(127 отзывов)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Алтай</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Республика Алтай, Россия</span>
                        </div>
                        <div class="destination-description">
                          Горные пейзажи, чистейшие озера и древние леса. Идеально для любителей активного отдыха и природы.
                        </div>
                        <div class="destination-features">
                          <span class="feature">🏔️ Горный треккинг</span>
                          <span class="feature">🏞️ Озера и водопады</span>
                          <span class="feature">🦌 Дикая природа</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">5-7 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">2-6 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Средний</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Destination 2: Байкал -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/baikal.jpg" alt="Байкал">
                        <div class="destination-price">от 32 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.8</span>
                          <span>(94 отзыва)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Байкал</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Иркутская область, Россия</span>
                        </div>
                        <div class="destination-description">
                          Самое глубокое озеро в мире с кристально чистой водой. Уникальная природа и богатая культура.
                        </div>
                        <div class="destination-features">
                          <span class="feature">🌊 Круиз по озеру</span>
                          <span class="feature">🚂 Байкальская железная дорога</span>
                          <span class="feature">🎣 Рыбалка</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">4-6 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">3-8 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Лёгкий</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Destination 3: Камчатка -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/kamchatka.jpg" alt="Камчатка">
                        <div class="destination-price">от 68 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.9</span>
                          <span>(56 отзывов)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Камчатка</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Камчатский край, Россия</span>
                        </div>
                        <div class="destination-description">
                          Земля вулканов и гейзеров. Экстремальный отдых для настоящих искателей приключений.
                        </div>
                        <div class="destination-features">
                          <span class="feature">🌋 Вулканы</span>
                          <span class="feature">♨️ Гейзеры</span>
                          <span class="feature">🐻 Медведи</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">7-10 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">4-12 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Сложный</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Destination 4: Кавказ -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/caucasus.jpg" alt="Кавказ">
                        <div class="destination-price">от 28 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.7</span>
                          <span>(89 отзывов)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Кавказ</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Северный Кавказ, Россия</span>
                        </div>
                        <div class="destination-description">
                          Величественные горы, альпийские луга и древние культуры. Рай для альпинистов и треккеров.
                        </div>
                        <div class="destination-features">
                          <span class="feature">⛰️ Альпинизм</span>
                          <span class="feature">🌄 Альпийские луга</span>
                          <span class="feature">🏕️ Кемпинг</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">6-8 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">3-10 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Средний</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Destination 5: Золотое кольцо -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/golden-ring.jpg" alt="Золотое кольцо">
                        <div class="destination-price">от 18 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.6</span>
                          <span>(156 отзывов)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Золотое кольцо</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Центральная Россия</span>
                        </div>
                        <div class="destination-description">
                          Древние города России с богатой историей и архитектурой. Путешествие в прошлое страны.
                        </div>
                        <div class="destination-features">
                          <span class="feature">🏛️ Архитектура</span>
                          <span class="feature">📜 История</span>
                          <span class="feature">🕌 Монастыри</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">4-5 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">2-15 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Лёгкий</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Destination 6: Карелия -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/karelia.jpg" alt="Карелия">
                        <div class="destination-price">от 22 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.8</span>
                          <span>(73 отзыва)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Карелия</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Республика Карелия, Россия</span>
                        </div>
                        <div class="destination-description">
                          Страна озер и лесов, древние петроглифы и уникальная природа русского севера.
                        </div>
                        <div class="destination-features">
                          <span class="feature">🏞️ Озера</span>
                          <span class="feature">🌲 Леса</span>
                          <span class="feature">🛶 Каякинг</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">5-7 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">2-8 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Лёгкий</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Destination 7: Крым -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/crimea.jpg" alt="Крым">
                        <div class="destination-price">от 20 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.7</span>
                          <span>(204 отзыва)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Крым</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Крымский полуостров</span>
                        </div>
                        <div class="destination-description">
                          Теплое море, горные пейзажи и богатая история. Идеально для пляжного отдыха и экскурсий.
                        </div>
                        <div class="destination-features">
                          <span class="feature">🏖️ Пляжи</span>
                          <span class="feature">🏰 Дворцы</span>
                          <span class="feature">🍇 Виноделие</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">7-10 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">2-12 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Лёгкий</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Destination 8: Урал -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/urals.jpg" alt="Урал">
                        <div class="destination-price">от 26 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.5</span>
                          <span>(67 отзывов)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Урал</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Уральские горы, Россия</span>
                        </div>
                        <div class="destination-description">
                          Древние горы, богатые полезными ископаемыми, и уникальная природа границы Европы и Азии.
                        </div>
                        <div class="destination-features">
                          <span class="feature">⛏️ Геология</span>
                          <span class="feature">🏔️ Горы</span>
                          <span class="feature">🌳 Заповедники</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">5-6 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">3-8 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Средний</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Destination 9: Дальний Восток -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/far-east.jpg" alt="Дальний Восток">
                        <div class="destination-price">от 45 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.8</span>
                          <span>(42 отзыва)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Дальний Восток</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Дальний Восток, Россия</span>
                        </div>
                        <div class="destination-description">
                          Дикая природа, вулканы и уникальная культура. Для тех, кто ищет настоящие приключения.
                        </div>
                        <div class="destination-features">
                          <span class="feature">🌋 Вулканы</span>
                          <span class="feature">🐯 Дикая природа</span>
                          <span class="feature">🏞️ Национальные парки</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">8-12 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">4-10 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Сложный</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Destination 10: Сибирь -->
                  <div class="carousel-slide">
                    <div class="destination-card">
                      <div class="destination-image">
                        <img src="/images/destinations/siberia.jpg" alt="Сибирь">
                        <div class="destination-price">от 35 000 ₽</div>
                        <div class="destination-rating">
                          <span>⭐ 4.6</span>
                          <span>(58 отзывов)</span>
                        </div>
                      </div>
                      <div class="destination-content">
                        <div class="destination-title">Сибирь</div>
                        <div class="destination-location">
                          <span>📍</span>
                          <span>Сибирь, Россия</span>
                        </div>
                        <div class="destination-description">
                          Бескрайние просторы, могучие реки и суровая красота. Путешествие в сердце России.
                        </div>
                        <div class="destination-features">
                          <span class="feature">🌲 Тайга</span>
                          <span class="feature">🚣 Реки</span>
                          <span class="feature">🏕️ Экспедиции</span>
                        </div>
                        <div class="destination-stats">
                          <div class="stat">
                            <div class="stat-value">7-9 дней</div>
                            <div class="stat-label">Длительность</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">3-12 чел</div>
                            <div class="stat-label">Группа</div>
                          </div>
                          <div class="stat">
                            <div class="stat-value">Средний</div>
                            <div class="stat-label">Уровень</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-nav">
                  <div class="carousel-dots" id="destinations-dots">
                    <!-- Точки будут сгенерированы через JavaScript -->
                  </div>
                </div>
              </div>
            </div>

            <div class="content-cta pre-animate">
              <button class="btn btn--primary btn--large" data-target="final">
                <span class="btn__text">Начать планировать</span>
                <span class="btn__icon">🚀</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    `}createFinalSection(){return`
      <section class="story-section" id="final">
        <div class="animated-background" style="background: linear-gradient(-45deg, #0a0a0a, #1a1a2e, #2d3748, #2c5aa0); background-size: 400% 400%; animation: gradientShift 15s ease infinite;"></div>
        <div class="floating-elements">
          <div class="floating-element">✈️</div>
          <div class="floating-element">🗺️</div>
          <div class="floating-element">🏔️</div>
          <div class="floating-element">🌊</div>
          <div class="floating-element">🚀</div>
          <div class="floating-element">🎉</div>
        </div>
        
        <div class="story-section__container">
          <div class="content-block content-block--centered pre-animate">
            <div class="content-badge pre-animate">
              <span class="badge__icon">🎉</span>
              Начни сейчас
            </div>
            
            <h2 class="content-title pre-animate">Твое путешествие ждет</h2>
            <div class="content-subtitle pre-animate">Присоединяйся к 50,000+ путешественников</div>

            <div class="content-quote pre-animate">
              <div class="quote__text">
                WanderList уже помог тысячам людей превратить мечты в маршруты, 
                а планы - в незабываемые приключения по всему миру
              </div>
            </div>

            <div class="stats-grid pre-animate">
              <div class="stat-item">
                <div class="stat__number">50K+</div>
                <div class="stat__label">путешественников</div>
              </div>
              <div class="stat-item">
                <div class="stat__number">150+</div>
                <div class="stat__label">стран</div>
              </div>
              <div class="stat-item">
                <div class="stat__number">25K+</div>
                <div class="stat__label">маршрутов</div>
              </div>
            </div>

            <div class="content-cta pre-animate">
              <h3 class="cta-title">Начни свое приключение сегодня!</h3>
              <p class="cta-text">Скачай приложение и открой мир путешествий</p>
              
              <div class="download-buttons">
                <a href="#" class="download-btn">
                  <span class="store-icon">📱</span>
                  <div class="store-info">
                    <div class="store-name">Download on the</div>
                    <div class="store-platform">App Store</div>
                  </div>
                </a>
                
                <a href="#" class="download-btn">
                  <span class="store-icon">🤖</span>
                  <div class="store-info">
                    <div class="store-name">Get it on</div>
                    <div class="store-platform">Google Play</div>
                  </div>
                </a>
              </div>

              <button class="btn btn--primary btn--large" id="start-planning">
                <span class="btn__icon">🚀</span>
                <span class="btn__text">Начать планировать онлайн</span>
              </button>
              
              <p class="cta-note">Мгновенный доступ • Бесплатно • Все функции</p>
            </div>
          </div>
        </div>
      </section>
    `}setupInstagramInteractions(){console.log("📱 Настройка Instagram взаимодействий..."),document.addEventListener("click",s=>{const a=s.target,i=a.closest(".action.like");if(i){this.handlePostLike(i);return}const t=a.closest(".comment-like");if(t){this.handleCommentLike(t);return}const e=a.closest(".action.comment");if(e){this.handlePostComment(e);return}const n=a.closest(".action.share");if(n){this.handlePostShare(n);return}const p=a.closest(".action.save");if(p){this.handlePostSave(p);return}}),document.addEventListener("input",s=>{const a=s.target;a.matches(".post-add-comment input")&&this.handleCommentInput(a)})}handlePostLike(s){const a=s.classList.contains("active"),i=s.closest(".instagram-post"),t=i?.querySelector(".post-animation-overlay"),e=t?.querySelector(".animation-icon.heart");a?(s.classList.remove("active"),s.innerHTML="🤍",s.style.color="",this.updateLikesCount(i,-1)):(s.classList.add("active"),s.innerHTML="❤️",s.style.color="#ed4956",t&&e&&this.showBigAnimation(t,e,"heart"),this.updateLikesCount(i,1),navigator.vibrate&&navigator.vibrate([50,30,50]))}handleCommentLike(s){s.classList.contains("active")?(s.classList.remove("active"),s.innerHTML="🤍",s.style.color=""):(s.classList.add("active"),s.innerHTML="❤️",s.style.color="#ed4956"),navigator.vibrate&&navigator.vibrate(20)}handlePostComment(s){const a=s.closest(".instagram-post"),i=a?.querySelector(".post-add-comment input"),t=a?.querySelector(".post-animation-overlay"),e=t?.querySelector(".animation-icon.comment");t&&e&&this.showBigAnimation(t,e,"comment"),i&&i.focus(),navigator.vibrate&&navigator.vibrate(30)}handlePostShare(s){const a=s.closest(".instagram-post")?.querySelector(".post-animation-overlay"),i=a?.querySelector(".animation-icon.share");a&&i&&this.showBigAnimation(a,i,"share"),this.showToast("📤 Пост добавлен в вашу историю"),navigator.vibrate&&navigator.vibrate([20,20,20])}handlePostSave(s){s.classList.contains("active")?(s.classList.remove("active"),s.innerHTML="📑",s.style.color="",this.showToast("📑 Пост удален из сохраненных")):(s.classList.add("active"),s.innerHTML="📕",s.style.color="#0095f6",this.showToast("📑 Пост сохранен")),navigator.vibrate&&navigator.vibrate(20)}handleCommentInput(s){const a=s.closest(".post-add-comment")?.querySelector(".post-button");a&&(s.value.trim().length>0?a.style.opacity="1":a.style.opacity="0.4")}updateLikesCount(s,a){if(!s)return;const i=s.querySelector(".likes-count");if(!i)return;const e=(i.textContent||"").match(/([\d,]+)/);if(e){let n=parseInt(e[1].replace(/,/g,""));n=Math.max(0,n+a);const p=n.toLocaleString("ru-RU");i.textContent=`${p} отметок "Нравится"`}}showBigAnimation(s,a,i){console.log(`🎬 Показываем анимацию: ${i}`),s.querySelectorAll(".animation-icon").forEach(t=>{t.classList.remove("show")}),s.classList.add("active"),setTimeout(()=>{a.classList.add("show")},50),setTimeout(()=>{a.style.animation="bigIconDisappear 0.5s ease forwards",setTimeout(()=>{a.classList.remove("show"),s.classList.remove("active"),a.style.animation=""},500)},1500)}setupHeroInteractions(){const s=document.querySelector(".hero-avatar .avatar-image");s&&(s.addEventListener("mouseenter",()=>{s.style.transform="scale(1.1) rotate(5deg)"}),s.addEventListener("mouseleave",()=>{s.style.animation="avatarFloat 6s ease-in-out infinite"}));const a=document.querySelector(".hero-cta .cta-button");a&&a.addEventListener("click",()=>{const e=a.getAttribute("data-target");e&&this.scrollToSection(e)});const i=document.querySelector(".scroll-indicator");i&&i.addEventListener("click",()=>{this.scrollToSection("routine")}),document.querySelectorAll(".hero-stats .stat-item").forEach(e=>{e.addEventListener("mouseenter",()=>{e.classList.add("stat-hover")}),e.addEventListener("mouseleave",()=>{e.classList.remove("stat-hover")})})}addAutoplayIndicator(s,a){const i=document.getElementById(s);if(!i)return;const t=document.createElement("div");t.className="carousel-autoplay-indicator";for(let e=0;e<a;e++){const n=document.createElement("div");n.className=`autoplay-dot ${e===0?"active":""}`,t.appendChild(n)}i.parentElement?.appendChild(t)}addCarouselTooltips(){document.querySelectorAll(".carousel-container").forEach(a=>{const i=document.createElement("div");i.className="carousel-tooltip",i.innerHTML="← Перетащите для навигации →",i.style.cssText=`
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    `,a.appendChild(i),localStorage.getItem("carouselTooltipSeen")||setTimeout(()=>{i.style.opacity="1",setTimeout(()=>{i.style.opacity="0",localStorage.setItem("carouselTooltipSeen","true")},3e3)},1e3)})}setupSuccessSection(){console.log("🎯 Настройка интерактивной секции успеха...");const s=document.querySelectorAll(".timeline-day"),a=document.querySelectorAll(".progress-day"),i=document.querySelector(".progress-fill"),t=v=>{console.log(`🔄 Переключаемся на день ${v}`),s.forEach(y=>{y.classList.remove("active")});const o=document.querySelector(`[data-day="${v}"]`);o&&o.classList.add("active");const r=(v-1)/6*100;i&&(i.style.width=`${r}%`),a.forEach(y=>y.classList.remove("active"));const h=document.querySelector(`.progress-day:nth-child(${v})`);h&&h.classList.add("active"),e()},e=()=>{document.querySelectorAll(".media-gallery").forEach(v=>{const o=v.querySelectorAll(".gallery-image"),r=v.parentElement?.querySelectorAll(".dot");o.forEach((h,y)=>{h.classList.remove("active"),y===0&&h.classList.add("active")}),r?.forEach((h,y)=>{h.classList.remove("active"),y===0&&h.classList.add("active")})})};a.forEach((v,o)=>{v.addEventListener("click",()=>{t(o+1),x()}),v.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),t(o+1),x())})});const n=v=>{const o=v.querySelectorAll(".gallery-image"),r=v.parentElement?.querySelectorAll(".dot"),h=v.parentElement?.querySelector(".gallery-prev"),y=v.parentElement?.querySelector(".gallery-next");let L=0,A=null;const q=m=>{o.forEach(T=>T.classList.remove("active")),r?.forEach(T=>T.classList.remove("active")),o[m].classList.add("active"),r?.[m]?.classList.add("active"),L=m},C=()=>{I(),A=window.setInterval(()=>{const m=(L+1)%o.length;q(m)},2e3)},I=()=>{A&&(clearInterval(A),A=null)};h?.addEventListener("click",()=>{I();const m=(L-1+o.length)%o.length;q(m),C()}),y?.addEventListener("click",()=>{I();const m=(L+1)%o.length;q(m),C()}),r?.forEach((m,T)=>{m.addEventListener("click",()=>{I(),q(T),C()})});let E=0,c=0;v.addEventListener("touchstart",m=>{E=m.touches[0].clientX,I()}),v.addEventListener("touchend",m=>{c=m.changedTouches[0].clientX,g(),C()});const g=()=>{const m=E-c;if(Math.abs(m)>50)if(m>0){const P=(L+1)%o.length;q(P)}else{const P=(L-1+o.length)%o.length;q(P)}};v.addEventListener("mouseenter",I),v.addEventListener("mouseleave",C),C()};document.querySelectorAll(".media-gallery").forEach(v=>{n(v)});let p=null;const k=()=>{let v=1;p=window.setInterval(()=>{v=v>6?1:v+1,t(v)},6e3)},x=()=>{p&&(clearInterval(p),p=null)};k(),document.querySelectorAll(".progress-day, .gallery-prev, .gallery-next, .dot").forEach(v=>{v.addEventListener("click",x),v.addEventListener("touchstart",x)}),document.addEventListener("keydown",v=>{const o=document.querySelector(".timeline-day.active");if(!o)return;const r=parseInt(o.getAttribute("data-day")||"1");switch(v.key){case"ArrowLeft":v.preventDefault();const h=r>1?r-1:7;t(h),x();break;case"ArrowRight":v.preventDefault();const y=r<7?r+1:1;t(y),x();break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":v.preventDefault(),t(parseInt(v.key)),x();break}});const S=document.createElement("style");S.textContent=`
        .progress-day {
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        
        .progress-day::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .progress-day:hover::before {
            left: 100%;
        }
        
        .progress-day:hover {
            transform: scale(1.1);
            background: rgba(255,255,255,0.1) !important;
        }
        
        .progress-day.active {
            background: linear-gradient(135deg, #667eea, #f093fb) !important;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .gallery-prev, .gallery-next {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .gallery-prev::before, .gallery-next::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255,255,255,0.1);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .gallery-prev:hover::before, .gallery-next:hover::before {
            opacity: 1;
        }
        
        .gallery-prev:hover, .gallery-next:hover {
            background: rgba(255,255,255,0.2) !important;
            transform: scale(1.1);
        }
        
        .gallery-prev:active, .gallery-next:active {
            transform: scale(0.95);
        }
        
        .dot {
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
        }
        
        .dot::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        }
        
        .dot:hover::before {
            width: 20px;
            height: 20px;
        }
        
        .dot:hover {
            transform: scale(1.3);
            background: rgba(255,255,255,0.6) !important;
        }
        
        .dot.active {
            background: #f093fb !important;
            transform: scale(1.2);
            box-shadow: 0 2px 8px rgba(240, 147, 251, 0.4);
        }
        
        .team-member {
            transition: all 0.3s ease;
        }
        
        .team-member:hover {
            transform: translateY(-5px);
        }
        
        .achievement-card {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .achievement-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            transform: rotate(45deg);
            transition: all 0.6s ease;
        }
        
        .achievement-card:hover::before {
            left: 100%;
            top: 100%;
        }
        
        .achievement-card:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .timeline-day {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }
        
        .timeline-day.active {
            opacity: 1;
            transform: translateY(0);
        }
    `,document.head.appendChild(S),console.log("✅ Интерактивная секция успеха настроена: фото каждые 2с, дни каждые 6с")}setupStoriesCarousel(){this.setupCarousel("stories","stories-track","stories-dots"),this.addAutoplayIndicator("stories-track",10)}setupDestinationsCarousel(){this.setupCarousel("destinations","destinations-track","destinations-dots"),this.addAutoplayIndicator("destinations-track",10)}setupCarousel(s,a,i){const t=document.getElementById(a),e=document.getElementById(i);if(!t||!e){console.error(`❌ Не найдены элементы для карусели ${s}`);return}const n=t.parentElement;if(!n)return;const p=Array.from(t.querySelectorAll(".carousel-slide")),k=p.length;if(k===0)return;e.innerHTML="";for(let d=0;d<k;d++){const u=document.createElement("button");u.className=`carousel-dot ${d===0?"active":""}`,u.setAttribute("data-index",d.toString()),u.setAttribute("aria-label",`Перейти к слайду ${d+1}`),e.appendChild(u)}const x=Array.from(e.querySelectorAll(".carousel-dot")),w=G[s];let S=0,v=!1,o=0,r=0,h=0,y=!1,L,A=!1;const q=()=>{p.forEach(d=>{const u=d.querySelector(".glow-effect");u&&u.remove();const f=document.createElement("div");switch(f.className="glow-effect",s){case"instagram":f.style.borderRadius="20px";break;case"stories":f.style.borderRadius="25px";break;case"destinations":f.style.borderRadius="25px";break}d.appendChild(f)})},C=d=>{const u=n.clientWidth,f=p[0]?.clientWidth||400;return u/2-f/2-d*(f+60)},I=()=>{p.forEach((d,u)=>{d.classList.remove("active","neighbor","prev","next"),u===S?d.classList.add("active"):u===(S-1+k)%k?d.classList.add("neighbor","prev"):u===(S+1)%k&&d.classList.add("neighbor","next")}),x.forEach((d,u)=>{d.classList.toggle("active",u===S)})},E=(d=!0)=>{if(!v)if(v=!0,r=C(S),d?t.style.transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)":t.style.transition="none",t.style.transform=`translateX(${r}px)`,I(),d){const u=()=>{t.removeEventListener("transitionend",u),v=!1};t.addEventListener("transitionend",u)}else v=!1},c=d=>{v||(S=(d+k)%k,E(),l())},g=()=>{v||(S=(S+1)%k,E(),l())},m=()=>{v||(S=(S-1+k)%k,E(),l())},T=()=>{!w.autoplay||A||(P(),L=window.setInterval(()=>{g()},w.autoplaySpeed))},P=()=>{L&&clearInterval(L)},M=()=>{A=!0,P()},z=()=>{A=!1,T()},l=()=>{M(),setTimeout(()=>{z()},5e3)},b=d=>{y=!0,t.style.cursor="grabbing",o=d.clientX,h=r,M(),d.preventDefault()},_=d=>{if(!y)return;const f=d.clientX-o;r=h+f,t.style.transition="none",t.style.transform=`translateX(${r}px)`},D=()=>{if(!y)return;y=!1,t.style.cursor="grab";const d=r-h,f=n.clientWidth*.1;Math.abs(d)>f?d<0?g():m():E(),l()},B=d=>{o=d.touches[0].clientX,h=r,M()},H=d=>{const f=d.touches[0].clientX-o;r=h+f,t.style.transition="none",t.style.transform=`translateX(${r}px)`},R=()=>{const d=r-h,f=n.clientWidth*.05;Math.abs(d)>f?d<0?g():m():E(),l()},W=d=>{const u=n.getBoundingClientRect();if(!(d.clientX>=u.left&&d.clientX<=u.right&&d.clientY>=u.top&&d.clientY<=u.bottom))return;d.preventDefault(),M();let Y=Math.abs(d.deltaX)>Math.abs(d.deltaY)?d.deltaX:d.deltaY;Y>30?g():Y<-30&&m(),l()},N=d=>{if(n.getBoundingClientRect(),!!(document.activeElement===n||n.contains(document.activeElement))){if(M(),d.key==="ArrowLeft")d.preventDefault(),m();else if(d.key==="ArrowRight")d.preventDefault(),g();else if(d.key>="1"&&d.key<="9"){d.preventDefault();const f=parseInt(d.key)-1;f<k&&c(f)}l()}};t.addEventListener("mousedown",b),document.addEventListener("mousemove",_),document.addEventListener("mouseup",D),t.addEventListener("touchstart",B,{passive:!1}),t.addEventListener("touchmove",H,{passive:!1}),t.addEventListener("touchend",R),n.addEventListener("wheel",W,{passive:!1}),document.addEventListener("keydown",N),x.forEach((d,u)=>{d.addEventListener("click",()=>{M(),c(u),l()}),d.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),M(),c(u),l())})});const O=()=>{E(!1)};window.addEventListener("resize",O),n.addEventListener("mouseenter",M),n.addEventListener("mouseleave",z),q(),E(!1),T(),console.log(`✅ Карусель ${s} готова с исправлениями`)}initializeCarousels(){console.log("🎠 Инициализация исправленных каруселей..."),setTimeout(()=>{this.setupVerticalInstagramCarousel(),this.setupCarousel("stories","stories-track","stories-dots"),this.setupCarousel("destinations","destinations-track","destinations-dots"),console.log("✅ Исправленные карусели готовы")},500)}initializeVerticalInstagramCarousel(){console.log("📱 Инициализация вертикальной Instagram карусели...");const s=document.getElementById("instagram-track"),a=document.getElementById("instagram-dots");if(!s||!a){console.error("❌ Не найдены элементы вертикальной Instagram карусели");return}const t=Array.from(s.querySelectorAll(".carousel-slide")).length;if(t===0)return;a.innerHTML="";for(let l=0;l<t;l++){const b=document.createElement("button");b.className=`carousel-dot ${l===0?"active":""}`,b.setAttribute("data-index",l.toString()),b.setAttribute("aria-label",`Перейти к посту ${l+1}`),a.appendChild(b)}const e=Array.from(a.querySelectorAll(".carousel-dot"));let n=0,p=0,k=0,x=!1,w=!1;const S=()=>{const l=s.closest(".phone-screen");return l?l.clientHeight:640},v=l=>{const b=S();return-l*b},o=(l=!0)=>{w||(w=!0,k=v(n),l?s.style.transition="transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)":s.style.transition="none",s.style.transform=`translateY(${k}px)`,e.forEach((b,_)=>{b.classList.toggle("active",_===n)}),L(),l?setTimeout(()=>{w=!1},500):w=!1)},r=l=>{w||l<0||l>=t||(n=l,o())},h=()=>{w||n>=t-1||(n++,o())},y=()=>{w||n<=0||(n--,o())},L=()=>{document.querySelectorAll(".instagram-post").forEach(b=>{const _=b.querySelectorAll(".comment"),D=b.querySelector(".view-all-comments");if(_.forEach((B,H)=>{H>0&&(B.style.display="none")}),_.length>1&&D){D.style.display="flex";const B=D.querySelector(".view-all-text");B&&(B.textContent=`Посмотреть все комментарии (${_.length-1})`)}else D&&(D.style.display="none")})},A=()=>{document.addEventListener("click",l=>{const _=l.target.closest(".view-all-comments");if(_){const D=_.closest(".instagram-post");if(D){const B=D.querySelectorAll(".comment"),H=_;B.forEach(R=>{R.style.display="flex"}),H.style.display="none"}}})},q=l=>{x=!0,p=l.touches[0].clientY,s.style.transition="none",l.preventDefault()},C=l=>{if(!x)return;const b=l.touches[0].clientY,_=p-b;s.style.transform=`translateY(${k-_}px)`,l.preventDefault()},I=l=>{if(!x)return;x=!1;const b=l.changedTouches[0].clientY,_=p-b;Math.abs(_)>50?_>0?h():y():o()},E=l=>{l.preventDefault(),l.deltaY>30?h():l.deltaY<-30&&y()};s.addEventListener("touchstart",q,{passive:!1}),s.addEventListener("touchmove",C,{passive:!1}),s.addEventListener("touchend",I),s.addEventListener("wheel",E,{passive:!1}),e.forEach((l,b)=>{l.addEventListener("click",()=>{r(b)})});const c=l=>{const b=s.closest(".dreams-phone-container");if(!b)return;const _=b.getBoundingClientRect();_.top<window.innerHeight&&_.bottom>0&&(l.key==="ArrowDown"||l.key==="PageDown"?(l.preventDefault(),h()):l.key==="ArrowUp"||l.key==="PageUp"?(l.preventDefault(),y()):l.key==="Home"?(l.preventDefault(),r(0)):l.key==="End"&&(l.preventDefault(),r(t-1)))};document.addEventListener("keydown",c);let g;const m=()=>{T(),g=window.setInterval(()=>{h()},5e3)},T=()=>{g&&clearInterval(g)},P=new IntersectionObserver(l=>{l.forEach(b=>{b.isIntersecting?m():T()})}),M=s.closest(".dreams-phone-container");M&&P.observe(M);const z=()=>{o(!1)};window.addEventListener("resize",z),A(),o(!1),L(),console.log(`✅ Вертикальная Instagram карусель готова: ${t} постов, скрытые комментарии`)}initializeHorizontalCarousels(){console.log("🎠 Инициализация горизонтальных каруселей..."),this.setupCarousel("stories","stories-track","stories-dots"),this.setupCarousel("destinations","destinations-track","destinations-dots"),console.log("✅ Горизонтальные карусели готовы")}setupVerticalInstagramCarousel(){const s=document.getElementById("instagram-track"),a=document.getElementById("instagram-dots");if(!s||!a){console.error("❌ Не найдены элементы для вертикальной Instagram карусели");return}const t=Array.from(s.querySelectorAll(".carousel-slide")).length;if(t===0)return;a.innerHTML="";for(let c=0;c<t;c++){const g=document.createElement("button");g.className=`carousel-dot ${c===0?"active":""}`,g.setAttribute("data-index",c.toString()),g.setAttribute("aria-label",`Перейти к посту ${c+1}`),a.appendChild(g)}const e=Array.from(a.querySelectorAll(".carousel-dot"));let n=0,p=0,k=0,x=!1,w=!1;const S=()=>{const c=s.closest(".phone-screen");return c?c.clientHeight:640},v=c=>{const g=S();return-c*g},o=(c=!0)=>{w||(w=!0,k=v(n),c?s.style.transition="transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)":s.style.transition="none",s.style.transform=`translateY(${k}px)`,e.forEach((g,m)=>{g.classList.toggle("active",m===n)}),c?setTimeout(()=>{w=!1},500):w=!1)},r=c=>{w||c<0||c>=t||(n=c,o())},h=()=>{w||n>=t-1||(n++,o())},y=()=>{w||n<=0||(n--,o())},L=c=>{x=!0,p=c.touches[0].clientY,s.style.transition="none",c.preventDefault()},A=c=>{if(!x)return;const g=c.touches[0].clientY,m=p-g;s.style.transform=`translateY(${k-m}px)`,c.preventDefault()},q=c=>{if(!x)return;x=!1;const g=c.changedTouches[0].clientY,m=p-g;Math.abs(m)>50?m>0?h():y():o()},C=c=>{c.preventDefault(),c.deltaY>30?h():c.deltaY<-30&&y()};s.addEventListener("touchstart",L,{passive:!1}),s.addEventListener("touchmove",A,{passive:!1}),s.addEventListener("touchend",q),s.addEventListener("wheel",C,{passive:!1}),e.forEach((c,g)=>{c.addEventListener("click",()=>{r(g)})});const I=c=>{const g=s.closest(".dreams-phone-container");if(!g)return;const m=g.getBoundingClientRect();m.top<window.innerHeight&&m.bottom>0&&(c.key==="ArrowDown"||c.key==="PageDown"?(c.preventDefault(),h()):c.key==="ArrowUp"||c.key==="PageUp"?(c.preventDefault(),y()):c.key==="Home"?(c.preventDefault(),r(0)):c.key==="End"&&(c.preventDefault(),r(t-1)))};document.addEventListener("keydown",I);const E=()=>{o(!1)};window.addEventListener("resize",E),o(!1),console.log(`✅ Вертикальная Instagram карусель готова: ${t} постов`)}finalizeCarouselSetup(){setTimeout(()=>{document.querySelectorAll(".carousel-track").forEach(i=>{const t=i;t.style.overflow="visible",t.style.width="max-content"}),document.querySelectorAll(".carousel-slide").forEach(i=>{const t=i;t.style.visibility="visible",t.style.opacity="1"}),console.log("🎯 Карусели полностью настроены")},300)}forceCarouselFix(){setTimeout(()=>{console.log("🔧 Принудительное исправление каруселей..."),this.setupCarousel("stories","stories-track","stories-dots"),this.setupCarousel("destinations","destinations-track","destinations-dots"),document.querySelectorAll(".carousel-container").forEach(i=>{const t=i;t.style.overflow="visible",t.style.zIndex="10"}),document.querySelectorAll(".carousel-dots").forEach(i=>{const t=i;t.style.zIndex="100",t.style.position="relative"}),console.log("✅ Карусели полностью исправлены")},1e3)}setupNavigation(){document.querySelectorAll(".story-nav__dot").forEach(i=>{i.addEventListener("click",()=>{const t=i.getAttribute("data-section");t&&this.scrollToSection(t)})}),document.addEventListener("click",i=>{const e=i.target.closest(".btn[data-target]");if(e){const n=e.getAttribute("data-target");n&&this.scrollToSection(n)}});const a=document.getElementById("start-planning");a&&a.addEventListener("click",()=>{this.showToast("🚀 Начинаем планировать ваше путешествие!")})}setupScroll(){let s=!1;const a=()=>{const t=document.querySelector(".progress-fill");if(t){const e=window.scrollY||document.documentElement.scrollTop,n=document.documentElement.scrollHeight-window.innerHeight,p=Math.min(100,Math.max(0,e/n*100));t.style.width=`${p}%`}},i=()=>{s||(requestAnimationFrame(()=>{a(),this.updateActiveSection(),s=!1}),s=!0)};window.addEventListener("scroll",i,{passive:!0})}setupInteractivity(){document.querySelectorAll(".feature-item").forEach(i=>{i.addEventListener("mouseenter",()=>{const t=i.getAttribute("data-feature");this.animatePhoneFeature(t)}),i.addEventListener("mouseleave",()=>{this.resetPhoneAnimation()})}),this.setupTimelineNavigation(),document.querySelectorAll(".post-actions .action").forEach(i=>{i.addEventListener("click",function(){this.textContent==="❤️"&&(this.style.transform="scale(1.3)",setTimeout(()=>{this.style.transform="scale(1)"},200))})})}setupTimelineNavigation(){const s=document.querySelectorAll(".nav-btn"),a=document.querySelectorAll(".timeline-phase");s.forEach(i=>{i.addEventListener("click",()=>{const t=i.getAttribute("data-phase");s.forEach(e=>e.classList.remove("active")),i.classList.add("active"),a.forEach(e=>{e.classList.remove("active"),e.getAttribute("data-phase")===t&&e.classList.add("active")}),this.scrollToFirstStep(t),this.animateTimelineTransition(t)})}),this.setupStepHoverEffects()}scrollToFirstStep(s){if(!s)return;const a=document.querySelector(`.timeline-phase[data-phase="${s}"]`);if(!a)return;const i=a.querySelector(".routine-step");if(!i)return;const t=i.getBoundingClientRect(),n=window.scrollY+t.top-100;window.scrollTo({top:n,behavior:"smooth"})}updateUrlHash(s){history.pushState?history.pushState(null,null,`#${s}`):window.location.hash=s}animateTimelineTransition(s){const a=document.querySelector(`.timeline-phase[data-phase="${s}"]`);a&&(a.classList.add("phase-transitioning"),setTimeout(()=>{a.classList.remove("phase-transitioning")},600));const i=document.querySelector(`.nav-btn[data-phase="${s}"]`);i&&(i.classList.add("button-pulse"),setTimeout(()=>{i.classList.remove("button-pulse")},300))}setupStepHoverEffects(){const s=document.querySelectorAll(".routine-step");s.forEach(a=>{a.addEventListener("mouseenter",()=>{s.forEach(i=>i.classList.remove("active")),a.classList.add("active")}),a.addEventListener("mouseleave",()=>{a.classList.remove("active")})})}animatePhoneFeature(s){const a=document.querySelector(".phone");if(a)switch(s){case"altai":a.style.animation="phone3d 2s ease-in-out";break;case"transport":a.style.transform="rotateY(20deg) rotateX(-10deg) scale(1.05)";break;case"hotel":a.style.transform="rotateY(-20deg) rotateX(10deg) scale(1.05)";break;case"companions":a.style.animation="phone3d 1.5s ease-in-out";break}}resetPhoneAnimation(){const s=document.querySelector(".phone");s&&(s.style.animation="phone3d 8s ease-in-out infinite",s.style.transform="")}scrollToSection(s){const a=document.getElementById(s);a&&(this.isScrolling=!0,a.scrollIntoView({behavior:"smooth",block:"start"}),setTimeout(()=>{this.isScrolling=!1},1e3))}updateActiveSection(){if(this.isScrolling)return;const s=window.scrollY+window.innerHeight/2;this.sections.forEach(a=>{const i=a.element.getBoundingClientRect(),t=i.top+window.scrollY,e=t+i.height;s>=t&&s<e&&this.currentSection!==a.id&&this.setActiveSection(a.id)})}setActiveSection(s){this.currentSection=s,document.querySelectorAll(".story-nav__dot").forEach(i=>{i.classList.remove("story-nav__dot--active")});const a=document.querySelector(`[data-section="${s}"]`);a&&a.classList.add("story-nav__dot--active"),this.animateSectionContent(s)}animateSectionContent(s){const a=document.getElementById(s);if(!a)return;a.querySelectorAll(".pre-animate").forEach((t,e)=>{setTimeout(()=>{t.classList.remove("pre-animate"),t.classList.add("animate-in")},e*100)})}startAnimations(){this.setActiveSection("hero"),this.particleSystem?.start()}showApp(){setTimeout(()=>{document.body.classList.add("loaded"),setTimeout(()=>{const s=document.getElementById("loadingScreen");s&&s.remove()},800)},2e3)}showToast(s){const a=document.createElement("div");a.style.cssText=`
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.95);
      color: #333;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
    `,a.textContent=s,document.body.appendChild(a),setTimeout(()=>a.style.transform="translateX(0)",10),setTimeout(()=>{a.style.transform="translateX(100%)",setTimeout(()=>a.remove(),300)},3e3)}}document.addEventListener("DOMContentLoaded",()=>{new X});window.WanderListApp=X;
