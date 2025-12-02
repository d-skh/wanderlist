import "./scss/main.scss";
import AnimatedBackgrounds from "./ts/background-effects";

// ===== INTERFACES =====
interface Section {
  id: string;
  element: HTMLElement;
  isActive: boolean;
}

interface Carousel {
  container: HTMLElement;
  track: HTMLElement;
  slides: HTMLElement[];
  currentIndex: number;
  autoplayInterval?: number;
}

// ===== CAROUSEL CONFIGURATIONS =====
interface CarouselConfig {
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const CAROUSEL_CONFIGS = {
  instagram: {
    autoplay: true,
    autoplaySpeed: 4000,
  },
  stories: {
    autoplay: true,
    autoplaySpeed: 5000,
  },
  destinations: {
    autoplay: true,
    autoplaySpeed: 4500,
  },
};
// ===== MAIN APP CLASS =====
class WanderListApp {
  private sections: Section[] = [];
  private currentSection: string = "";
  private animatedBackgrounds: AnimatedBackgrounds | null = null;
  private carousels: Map<string, Carousel> = new Map();
  private isScrolling: boolean = false;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      this.createAppStructure();
      await this.initializeComponents();
      this.startAnimations();
      this.showApp();
      console.log("🚀 WanderList запущен успешно!");
    } catch (error) {
      console.error("❌ Ошибка инициализации:", error);
    }
  }

  private createAppStructure(): void {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `
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
    `;
  }

  private async initializeComponents(): Promise<void> {
    try {
      console.log("🚀 Начинаем инициализацию...");

      // 1. Сначала секции
      await this.loadSections();
      console.log("✅ Секции загружены");

      this.animatedBackgrounds = new AnimatedBackgrounds();
      console.log("✅ Анимированные фоны готовы");

      // 2. Потом основные компоненты
      this.setupNavigation();
      this.setupScroll();
      this.setupHeroInteractions();

      console.log("✅ Основные компоненты готовы");

      // 4. Остальные компоненты после
      setTimeout(() => {
        this.initializeVerticalInstagramCarousel();
        this.initializeHorizontalCarousels();
        this.setupInteractivity();
        this.setupSuccessSection();
        this.setupInstagramInteractions();

        console.log("✅ Все компоненты инициализированы");
      }, 2000);
    } catch (error) {
      console.error("❌ Ошибка инициализации:", error);
    }
  }

  private debugParticles(): void {
    const canvas = document.getElementById(
      "particle-canvas"
    ) as HTMLCanvasElement;
    if (!canvas) {
      console.error("❌ Canvas не найден при отладке");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("❌ Context не доступен при отладке");
      return;
    }

    console.log("🔍 Отладка ParticleSystem:");
    console.log("Canvas size:", canvas.width, "x", canvas.height);
    console.log(
      "Canvas visible:",
      canvas.offsetWidth,
      "x",
      canvas.offsetHeight
    );
    console.log("Canvas style:", canvas.style.cssText);

    // Рисуем тестовый круг
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.arc(100, 100, 20, 0, Math.PI * 2);
    ctx.fill();

    console.log("✅ Тестовый круг нарисован");
  }

  private loadSections(): Promise<void> {
    return new Promise((resolve) => {
      console.log("📄 Загрузка секций...");

      const sections = [
        this.createHeroSection(),
        this.createRoutineSection(),
        this.createDreamsSection(),
        this.createChaosSection(),
        this.createSolutionSection(),
        this.createStoriesSection(),
        this.createSuccessSection(),
        this.createDestinationsSection(),
        this.createFinalSection(),
      ];

      const container = document.getElementById("sections-container");
      if (container) {
        container.innerHTML = sections.join("");
        console.log("✅ HTML секций добавлен в DOM");
      }

      this.sections = sections.map((_, index) => {
        const sectionId = [
          "hero",
          "routine",
          "dreams",
          "chaos",
          "solution",
          "stories",
          "success",
          "destinations",
          "final",
        ][index];
        const element = document.getElementById(sectionId);

        if (!element) {
          console.warn(`⚠️ Секция ${sectionId} не найдена в DOM`);
        }

        return {
          id: sectionId,
          element: element!,
          isActive: index === 0,
        };
      });

      console.log(`✅ Загружено ${this.sections.length} секций`);
      resolve();
    });
  }

  private createHeroSection(): string {
    return `
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
            <img src="./images/characters/anton-avatar.png" alt="Антон" class="avatar-image">
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
  `;
  }

  private createRoutineSection(): string {
    return `
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
                        <img src="./images/routine/alarm-clock.png" alt="Будильник утро">
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
                        <img src="./images/routine/morning-coffee.png" alt="Утренний кофе">
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
                        <img src="./images/routine/commute.png" alt="Дорога на работу">
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
                        <img src="./images/routine/meeting.png" alt="Планерка">
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
                        <img src="./images/routine/coding.png" alt="Работа за компьютером">
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
                        <img src="./images/routine/lunch-break.png" alt="Обеденный перерыв">
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
                        <img src="./images/routine/afternoon-slump.png" alt="Послеобеденный спад">
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
                        <img src="./images/routine/end-of-work.png" alt="Конец рабочего дня">
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
                        <img src="./images/routine/evening-commute.png" alt="Дорога домой">
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
                        <img src="./images/routine/dinner-netflix.png" alt="Ужин и сериалы">
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
                        <img src="./images/routine/social-media-bed.png" alt="Соцсети перед сном">
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
                        <img src="./images/routine/sleep-dreams.png" alt="Сон и мечты">
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
  `;
  }

  private createDreamsSection(): string {
    return `
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
                                <img src="./images/avatars/travel_russia.jpg" alt="Travel Russia">
                              </div>
                              <div class="post-user">travel_russia</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <!-- Основное изображение поста -->
                            <div class="post-image">
                              <img src="./images/dreams/dream-1.png" alt="Горный пейзаж Алтая">
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
                                <img src="./images/avatars/explore_russia.jpg" alt="Explore Russia">
                              </div>
                              <div class="post-user">explore_russia</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-2.png" alt="Осенний Петербург">
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
                                <img src="./images/avatars/nature_lover.jpg" alt="Nature Lover">
                              </div>
                              <div class="post-user">nature_lover</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-3.png" alt="Озеро Байкал">
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
                                <img src="./images/avatars/adventure_seeker.jpg" alt="Adventure Seeker">
                              </div>
                              <div class="post-user">adventure_seeker</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-4.png" alt="Вулканы Камчатки">
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
                                <img src="./images/avatars/extreme_travel.jpg" alt="Extreme Travel">
                              </div>
                              <div class="post-user">extreme_travel</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-5.png" alt="Горы Кавказа">
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
                                <img src="./images/avatars/history_buff.jpg" alt="History Buff">
                              </div>
                              <div class="post-user">history_buff</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-6.png" alt="Золотое кольцо России">
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
                                <img src="./images/avatars/nature_lover.jpg" alt="Nature Lover">
                              </div>
                              <div class="post-user">nature_lover</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-7.png" alt="Озера Карелии">
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
                                <img src="./images/avatars/travel_russia.jpg" alt="Travel Russia">
                              </div>
                              <div class="post-user">travel_russia</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-8.png" alt="Побережье Крыма">
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
                                <img src="./images/avatars/explore_russia.jpg" alt="Explore Russia">
                              </div>
                              <div class="post-user">explore_russia</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-9.png" alt="Уральские горы">
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
                                <img src="./images/avatars/adventure_seeker.jpg" alt="Adventure Seeker">
                              </div>
                              <div class="post-user">adventure_seeker</div>
                              <div class="post-more">⋯</div>
                            </div>
                            
                            <div class="post-image">
                              <img src="./images/dreams/dream-10.png" alt="Дальний Восток">
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
  `;
  }

  private createChaosSection(): string {
    return `
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
              <img src="./images/chaos/chaos-before.png" alt="Хаос планирования" style="width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
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
  `;
  }

  private createSolutionSection(): string {
    return `
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
                    <img src="./images/characters/anton-avatar.png" alt="Антон">
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
    `;
  }

  private createStoriesSection(): string {
    return `
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
                          <img src="./images/stories/maria-avatar.png" alt="Мария">
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
                          <img src="./images/stories/dmitry-avatar.png" alt="Дмитрий">
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
                          <img src="./images/stories/anna-avatar.png" alt="Анна">
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
                          <img src="./images/stories/story-4.png" alt="Алексей">
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
                          <img src="./images/stories/story-5.png" alt="Ольга">
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
                          <img src="./images/stories/story-6.png" alt="Сергей">
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
                          <img src="./images/stories/story-7.png" alt="Елена">
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
                          <img src="./images/stories/story-8.png" alt="Иван">
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
                          <img src="./images/stories/story-9.png" alt="Татьяна">
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
                          <img src="./images/stories/story-10.png" alt="Михаил">
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
    `;
  }

  private createSuccessSection(): string {
    return `
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
                  <img src="./images/trips/altai-main.jpg" alt="Алтай" class="hero-image">
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
                        <img src="./images/trips/day1-1.png" alt="Аэропорт Горно-Алтайска" class="gallery-image active">
                        <img src="./images/trips/day1-2.png" alt="Дорога до базы" class="gallery-image">
                        <img src="./images/trips/day1-3.png" alt="Первые горные виды" class="gallery-image">
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
                        <img src="./images/trips/day2-1.png" alt="Чуйский тракт - горная дорога" class="gallery-image active">
                        <img src="./images/trips/day2-2.png" alt="Семинский перевал" class="gallery-image">
                        <img src="./images/trips/day2-3.png" alt="Панорама гор" class="gallery-image">
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
                        <img src="./images/trips/day3-1.png" alt="Телецкое озеро - панорама" class="gallery-image active">
                        <img src="./images/trips/day3-2.png" alt="Водопад Корбу" class="gallery-image">
                        <img src="./images/trips/day3-3.png" alt="Закат на озере" class="gallery-image">
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
                        <img src="./images/trips/day4-1.png" alt="Манжерокское озеро" class="gallery-image active">
                        <img src="./images/trips/day4-2.png" alt="Каракольские озера" class="gallery-image">
                        <img src="./images/trips/day4-3.png" alt="Озеро в горах" class="gallery-image">
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
                        <img src="./images/trips/day5-1.png" alt="Водопад Учар" class="gallery-image active">
                        <img src="./images/trips/day5-2.png" alt="Водопад Камышлинский" class="gallery-image">
                        <img src="./images/trips/day5-3.png" alt="Горная река" class="gallery-image">
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
                        <img src="./images/trips/day6-1.png" alt="Восхождение на гору" class="gallery-image active">
                        <img src="./images/trips/day6-2.png" alt="Вид с вершины" class="gallery-image">
                        <img src="./images/trips/day6-3.png" alt="Альпийские луга" class="gallery-image">
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
                        <img src="./images/trips/day7-1.png" alt="Прощальный закат" class="gallery-image active">
                        <img src="./images/trips/day7-2.png" alt="Дорога домой" class="gallery-image">
                        <img src="./images/trips/day7-3.png" alt="Групповое фото" class="gallery-image">
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
                      <img src="./images/characters/anton-avatar.png" alt="Антон">
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
                        <img src="./images/characters/alex-avatar.png" alt="Алекс">
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
                        <img src="./images/characters/maria-avatar.png" alt="Мария">
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
                        <img src="./images/characters/olga-avatar.png" alt="Ольга">
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
                  <img src="./images/characters/anton-avatar.png" alt="Антон">
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
    `;
  }

  private createDestinationsSection(): string {
    return `
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
                        <img src="./images/destinations/altai.jpg" alt="Алтай">
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
                        <img src="./images/destinations/baikal.jpg" alt="Байкал">
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
                        <img src="./images/destinations/kamchatka.jpg" alt="Камчатка">
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
                        <img src="./images/destinations/caucasus.jpg" alt="Кавказ">
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
                        <img src="./images/destinations/golden-ring.jpg" alt="Золотое кольцо">
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
                        <img src="./images/destinations/karelia.jpg" alt="Карелия">
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
                        <img src="./images/destinations/crimea.jpg" alt="Крым">
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
                        <img src="./images/destinations/urals.jpg" alt="Урал">
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
                        <img src="./images/destinations/far-east.jpg" alt="Дальний Восток">
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
                        <img src="./images/destinations/siberia.jpg" alt="Сибирь">
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
    `;
  }

  private createFinalSection(): string {
    return `
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
    `;
  }

  private setupInstagramInteractions(): void {
    console.log("📱 Настройка Instagram взаимодействий...");

    // Обработчики для лайков постов
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      // Лайки постов
      const likeBtn = target.closest(".action.like") as HTMLElement;
      if (likeBtn) {
        this.handlePostLike(likeBtn);
        return;
      }

      // Лайки комментариев
      const commentLikeBtn = target.closest(".comment-like") as HTMLElement;
      if (commentLikeBtn) {
        this.handleCommentLike(commentLikeBtn);
        return;
      }

      // Комментирование
      const commentBtn = target.closest(".action.comment") as HTMLElement;
      if (commentBtn) {
        this.handlePostComment(commentBtn);
        return;
      }

      // Поделиться
      const shareBtn = target.closest(".action.share") as HTMLElement;
      if (shareBtn) {
        this.handlePostShare(shareBtn);
        return;
      }

      // Сохранение
      const saveBtn = target.closest(".action.save") as HTMLElement;
      if (saveBtn) {
        this.handlePostSave(saveBtn);
        return;
      }
    });

    // Обработчики для полей ввода комментариев
    document.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      if (target.matches(".post-add-comment input")) {
        this.handleCommentInput(target);
      }
    });
  }

  private handlePostLike(button: HTMLElement): void {
    const isActive = button.classList.contains("active");
    const post = button.closest(".instagram-post");
    const overlay = post?.querySelector(
      ".post-animation-overlay"
    ) as HTMLElement;
    const heartIcon = overlay?.querySelector(
      ".animation-icon.heart"
    ) as HTMLElement;

    if (!isActive) {
      // Активируем лайк
      button.classList.add("active");
      button.innerHTML = "❤️";
      button.style.color = "#ed4956";

      // Показываем большую анимацию
      if (overlay && heartIcon) {
        this.showBigAnimation(overlay, heartIcon, "heart");
      }

      // Обновляем счетчик лайков
      this.updateLikesCount(post, 1);

      // Вибрация
      if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
      }
    } else {
      // Деактивируем лайк
      button.classList.remove("active");
      button.innerHTML = "🤍";
      button.style.color = "";
      this.updateLikesCount(post, -1);
    }
  }

  private handleCommentLike(button: HTMLElement): void {
    const isActive = button.classList.contains("active");

    if (!isActive) {
      button.classList.add("active");
      button.innerHTML = "❤️";
      button.style.color = "#ed4956";
    } else {
      button.classList.remove("active");
      button.innerHTML = "🤍";
      button.style.color = "";
    }

    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  }

  private handlePostComment(button: HTMLElement): void {
    const post = button.closest(".instagram-post");
    const commentInput = post?.querySelector(
      ".post-add-comment input"
    ) as HTMLInputElement;
    const overlay = post?.querySelector(
      ".post-animation-overlay"
    ) as HTMLElement;
    const commentIcon = overlay?.querySelector(
      ".animation-icon.comment"
    ) as HTMLElement;

    // Показываем анимацию
    if (overlay && commentIcon) {
      this.showBigAnimation(overlay, commentIcon, "comment");
    }

    // Фокусируемся на поле ввода
    if (commentInput) {
      commentInput.focus();
    }

    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  }

  private handlePostShare(button: HTMLElement): void {
    const overlay = button
      .closest(".instagram-post")
      ?.querySelector(".post-animation-overlay") as HTMLElement;
    const shareIcon = overlay?.querySelector(
      ".animation-icon.share"
    ) as HTMLElement;

    if (overlay && shareIcon) {
      this.showBigAnimation(overlay, shareIcon, "share");
    }

    // Показываем toast о успешном шаринге
    this.showToast("📤 Пост добавлен в вашу историю");

    if (navigator.vibrate) {
      navigator.vibrate([20, 20, 20]);
    }
  }

  private handlePostSave(button: HTMLElement): void {
    const isActive = button.classList.contains("active");

    if (!isActive) {
      button.classList.add("active");
      button.innerHTML = "📕";
      button.style.color = "#0095f6";
      this.showToast("📑 Пост сохранен");
    } else {
      button.classList.remove("active");
      button.innerHTML = "📑";
      button.style.color = "";
      this.showToast("📑 Пост удален из сохраненных");
    }

    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  }

  private handleCommentInput(input: HTMLInputElement): void {
    const postButton = input
      .closest(".post-add-comment")
      ?.querySelector(".post-button") as HTMLButtonElement;

    if (postButton) {
      if (input.value.trim().length > 0) {
        postButton.style.opacity = "1";
      } else {
        postButton.style.opacity = "0.4";
      }
    }
  }

  private updateLikesCount(post: Element | null, change: number): void {
    if (!post) return;

    const likesElement = post.querySelector(".likes-count");
    if (!likesElement) return;

    const currentText = likesElement.textContent || "";
    const currentMatch = currentText.match(/([\d,]+)/);

    if (currentMatch) {
      let currentLikes = parseInt(currentMatch[1].replace(/,/g, ""));
      currentLikes = Math.max(0, currentLikes + change);

      const formattedLikes = currentLikes.toLocaleString("ru-RU");
      likesElement.textContent = `${formattedLikes} отметок "Нравится"`;
    }
  }

  private showBigAnimation(
    overlay: HTMLElement,
    icon: HTMLElement,
    type: string
  ): void {
    console.log(`🎬 Показываем анимацию: ${type}`);

    // Скрываем все иконки
    overlay.querySelectorAll(".animation-icon").forEach((el: Element) => {
      (el as HTMLElement).classList.remove("show");
    });

    // Показываем overlay
    overlay.classList.add("active");

    // Показываем нужную иконку
    setTimeout(() => {
      icon.classList.add("show");
    }, 50);

    // Скрываем через 1.5 секунды
    setTimeout(() => {
      icon.style.animation = "bigIconDisappear 0.5s ease forwards";

      setTimeout(() => {
        icon.classList.remove("show");
        overlay.classList.remove("active");
        icon.style.animation = "";
      }, 500);
    }, 1500);
  }

  private setupHeroInteractions(): void {
    // Анимация аватара при наведении
    const avatarImage = document.querySelector(
      ".hero-avatar .avatar-image"
    ) as HTMLElement;
    if (avatarImage) {
      avatarImage.addEventListener("mouseenter", () => {
        avatarImage.style.transform = "scale(1.1) rotate(5deg)";
      });

      avatarImage.addEventListener("mouseleave", () => {
        // Возвращаем к исходной анимации
        avatarImage.style.animation = "avatarFloat 6s ease-in-out infinite";
      });
    }

    // Обработчик для кнопки CTA
    const ctaButton = document.querySelector(
      ".hero-cta .cta-button"
    ) as HTMLButtonElement;
    if (ctaButton) {
      ctaButton.addEventListener("click", () => {
        const targetSection = ctaButton.getAttribute("data-target");
        if (targetSection) {
          this.scrollToSection(targetSection);
        }
      });
    }

    // Индикатор прокрутки
    const scrollIndicator = document.querySelector(
      ".scroll-indicator"
    ) as HTMLElement;
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        this.scrollToSection("routine");
      });
    }

    // Анимация статистики при наведении
    const statItems = document.querySelectorAll(".hero-stats .stat-item");
    statItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.classList.add("stat-hover");
      });

      item.addEventListener("mouseleave", () => {
        item.classList.remove("stat-hover");
      });
    });
  }

  private addAutoplayIndicator(trackId: string, totalSlides: number): void {
    const track = document.getElementById(trackId);
    if (!track) return;

    const indicator = document.createElement("div");
    indicator.className = "carousel-autoplay-indicator";

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = `autoplay-dot ${i === 0 ? "active" : ""}`;
      indicator.appendChild(dot);
    }

    track.parentElement?.appendChild(indicator);
  }

  // Добавить в метод initializeComponents():

  private addCarouselTooltips(): void {
    // Добавляем подсказки для навигации
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach((container) => {
      const tooltip = document.createElement("div");
      tooltip.className = "carousel-tooltip";
      tooltip.innerHTML = "← Перетащите для навигации →";
      tooltip.style.cssText = `
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
    `;

      container.appendChild(tooltip);

      // Показываем подсказку при первом посещении
      const hasSeenTooltip = localStorage.getItem("carouselTooltipSeen");
      if (!hasSeenTooltip) {
        setTimeout(() => {
          tooltip.style.opacity = "1";
          setTimeout(() => {
            tooltip.style.opacity = "0";
            localStorage.setItem("carouselTooltipSeen", "true");
          }, 3000);
        }, 1000);
      }
    });
  }

  private setupSuccessSection(): void {
    console.log("🎯 Настройка интерактивной секции успеха...");

    const timelineDays = document.querySelectorAll(".timeline-day");
    const progressDays = document.querySelectorAll(".progress-day");
    const progressFill = document.querySelector(
      ".progress-fill"
    ) as HTMLElement;

    // Функция для переключения дней
    const switchDay = (dayNumber: number): void => {
      console.log(`🔄 Переключаемся на день ${dayNumber}`);

      // Скрыть все дни
      timelineDays.forEach((day) => {
        day.classList.remove("active");
      });

      // Показать выбранный день
      const targetDay = document.querySelector(`[data-day="${dayNumber}"]`);
      if (targetDay) {
        targetDay.classList.add("active");
      }

      // Обновить прогресс
      const progressPercentage = ((dayNumber - 1) / 6) * 100;
      if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
      }

      // Обновить активные точки в прогрессе
      progressDays.forEach((day) => day.classList.remove("active"));
      const targetProgressDay = document.querySelector(
        `.progress-day:nth-child(${dayNumber})`
      );
      if (targetProgressDay) {
        targetProgressDay.classList.add("active");
      }

      // Сбросить галереи к первому изображению
      resetGalleries();
    };

    // Функция сброса галерей
    const resetGalleries = (): void => {
      document.querySelectorAll(".media-gallery").forEach((gallery) => {
        const images = gallery.querySelectorAll(".gallery-image");
        const dots = gallery.parentElement?.querySelectorAll(".dot");

        images.forEach((img, index) => {
          img.classList.remove("active");
          if (index === 0) img.classList.add("active");
        });

        dots?.forEach((dot, index) => {
          dot.classList.remove("active");
          if (index === 0) dot.classList.add("active");
        });
      });
    };

    // Обработчики для дней прогресса
    progressDays.forEach((day, index) => {
      day.addEventListener("click", () => {
        switchDay(index + 1);
        stopAutoPlay(); // Останавливаем авто-переключение дней при ручном клике
      });

      // Добавляем клавиатурную навигацию
      day.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          switchDay(index + 1);
          stopAutoPlay(); // Останавливаем авто-переключение дней при ручном клике
        }
      });
    });

    // Настройка галерей для каждого дня
    const setupGallery = (galleryElement: Element): void => {
      const images = galleryElement.querySelectorAll(".gallery-image");
      const dots = galleryElement.parentElement?.querySelectorAll(".dot");
      const prevBtn =
        galleryElement.parentElement?.querySelector(".gallery-prev");
      const nextBtn =
        galleryElement.parentElement?.querySelector(".gallery-next");

      let currentIndex = 0;
      let galleryInterval: number | null = null;

      const showImage = (index: number): void => {
        // Скрыть все изображения и точки
        images.forEach((img) => img.classList.remove("active"));
        dots?.forEach((dot) => dot.classList.remove("active"));

        // Показать выбранное изображение и точку
        images[index].classList.add("active");
        dots?.[index]?.classList.add("active");
        currentIndex = index;
      };

      const startGalleryAutoPlay = (): void => {
        stopGalleryAutoPlay(); // Остановить предыдущий интервал
        galleryInterval = window.setInterval(() => {
          const newIndex = (currentIndex + 1) % images.length;
          showImage(newIndex);
        }, 2000); // Меняем фото каждые 2 секунды
      };

      const stopGalleryAutoPlay = (): void => {
        if (galleryInterval) {
          clearInterval(galleryInterval);
          galleryInterval = null;
        }
      };

      // Обработчики для кнопок
      prevBtn?.addEventListener("click", () => {
        stopGalleryAutoPlay();
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(newIndex);
        startGalleryAutoPlay(); // Перезапускаем автоплей после ручного переключения
      });

      nextBtn?.addEventListener("click", () => {
        stopGalleryAutoPlay();
        const newIndex = (currentIndex + 1) % images.length;
        showImage(newIndex);
        startGalleryAutoPlay(); // Перезапускаем автоплей после ручного переключения
      });

      // Обработчики для точек
      dots?.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          stopGalleryAutoPlay();
          showImage(index);
          startGalleryAutoPlay(); // Перезапускаем автоплей после ручного переключения
        });
      });

      // Swipe для мобильных устройств
      let startX = 0;
      let endX = 0;

      galleryElement.addEventListener("touchstart", (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        stopGalleryAutoPlay();
      });

      galleryElement.addEventListener("touchend", (e: TouchEvent) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        startGalleryAutoPlay();
      });

      const handleSwipe = (): void => {
        const diff = startX - endX;
        const swipeThreshold = 50;

        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            // Swipe left - next
            const newIndex = (currentIndex + 1) % images.length;
            showImage(newIndex);
          } else {
            // Swipe right - previous
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(newIndex);
          }
        }
      };

      // Останавливаем автоплей при наведении
      galleryElement.addEventListener("mouseenter", stopGalleryAutoPlay);
      galleryElement.addEventListener("mouseleave", startGalleryAutoPlay);

      // Запускаем автоплей галереи
      startGalleryAutoPlay();
    };

    // Инициализация всех галерей
    document.querySelectorAll(".media-gallery").forEach((gallery) => {
      setupGallery(gallery);
    });

    // Автопереключение дней
    let autoPlayInterval: number | null = null;

    const startAutoPlay = (): void => {
      let currentDay = 1;
      autoPlayInterval = window.setInterval(() => {
        currentDay = currentDay > 6 ? 1 : currentDay + 1;
        switchDay(currentDay);
      }, 6000); // Меняем день каждые 6 секунд
    };

    const stopAutoPlay = (): void => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    };

    // Запускаем автоплей дней
    startAutoPlay();

    // Останавливаем автоплей дней при любом взаимодействии
    const interactiveElements = document.querySelectorAll(
      ".progress-day, .gallery-prev, .gallery-next, .dot"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("click", stopAutoPlay);
      element.addEventListener("touchstart", stopAutoPlay);
    });

    // Добавляем клавиатурную навигацию для всей секции
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const activeDayElement = document.querySelector(".timeline-day.active");
      if (!activeDayElement) return;

      const currentDay = parseInt(
        activeDayElement.getAttribute("data-day") || "1"
      );

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          const prevDay = currentDay > 1 ? currentDay - 1 : 7;
          switchDay(prevDay);
          stopAutoPlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          const nextDay = currentDay < 7 ? currentDay + 1 : 1;
          switchDay(nextDay);
          stopAutoPlay();
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
          e.preventDefault();
          switchDay(parseInt(e.key));
          stopAutoPlay();
          break;
      }
    });

    // Добавляем улучшенные стили
    const style = document.createElement("style");
    style.textContent = `
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
    `;
    document.head.appendChild(style);

    console.log(
      "✅ Интерактивная секция успеха настроена: фото каждые 2с, дни каждые 6с"
    );
  }

  // ===== UPDATED CAROUSEL METHODS =====

  private setupStoriesCarousel(): void {
    this.setupCarousel("stories", "stories-track", "stories-dots");
    this.addAutoplayIndicator("stories-track", 10);
  }

  private setupDestinationsCarousel(): void {
    this.setupCarousel(
      "destinations",
      "destinations-track",
      "destinations-dots"
    );
    this.addAutoplayIndicator("destinations-track", 10);
  }

  // ===== UPDATED CAROUSEL METHOD =====
  // ===== MAIN CAROUSEL METHOD =====
  // ===== UPDATED CAROUSEL METHOD =====
  private setupCarousel(
    type: keyof typeof CAROUSEL_CONFIGS,
    trackId: string,
    dotsId: string
  ): void {
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsId);

    if (!track || !dotsContainer) {
      console.error(`❌ Не найдены элементы для карусели ${type}`);
      return;
    }

    const container = track.parentElement;
    if (!container) return;

    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Создаем точки навигации
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("data-index", i.toString());
      dot.setAttribute("aria-label", `Перейти к слайду ${i + 1}`);
      dotsContainer.appendChild(dot);
    }

    const dots = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));
    const config = CAROUSEL_CONFIGS[type];

    let currentIndex = 0;
    let isAnimating = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let autoplayInterval: number;
    let isAutoplayPaused = false;

    // ФИКС: Убираем универсальное свечение и добавляем индивидуальное для каждого типа
    const addCustomGlow = (): void => {
      slides.forEach((slide) => {
        // Удаляем старые элементы свечения если есть
        const existingGlow = slide.querySelector(".glow-effect");
        if (existingGlow) existingGlow.remove();

        const glowElement = document.createElement("div");
        glowElement.className = "glow-effect";

        // Индивидуальные настройки свечения для разных каруселей
        switch (type) {
          case "instagram":
            glowElement.style.borderRadius = "20px";
            break;
          case "stories":
            glowElement.style.borderRadius = "25px";
            break;
          case "destinations":
            glowElement.style.borderRadius = "25px";
            break;
        }

        slide.appendChild(glowElement);
      });
    };

    // Расчет позиции для центрирования активного слайда
    const calculatePosition = (index: number): number => {
      const containerWidth = container.clientWidth;
      const slideWidth = slides[0]?.clientWidth || 400;
      const slideMargin = 60;

      // Центрируем активный слайд
      const targetPosition =
        containerWidth / 2 -
        slideWidth / 2 -
        index * (slideWidth + slideMargin);

      return targetPosition;
    };

    // ФИКС: Бесшовная навигация с правильным определением соседних слайдов
    const updateSlideClasses = (): void => {
      slides.forEach((slide, index) => {
        slide.classList.remove("active", "neighbor", "prev", "next");

        if (index === currentIndex) {
          slide.classList.add("active");
        } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
          slide.classList.add("neighbor", "prev");
        } else if (index === (currentIndex + 1) % totalSlides) {
          slide.classList.add("neighbor", "next");
        }
      });

      // Обновляем точки
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    };

    // Основное обновление карусели
    const updateCarousel = (animate: boolean = true): void => {
      if (isAnimating) return;
      isAnimating = true;

      currentTranslate = calculatePosition(currentIndex);

      if (animate) {
        track.style.transition =
          "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      } else {
        track.style.transition = "none";
      }

      track.style.transform = `translateX(${currentTranslate}px)`;
      updateSlideClasses();

      if (animate) {
        const handleTransitionEnd = () => {
          track.removeEventListener("transitionend", handleTransitionEnd);
          isAnimating = false;
        };

        track.addEventListener("transitionend", handleTransitionEnd);
      } else {
        isAnimating = false;
      }
    };

    // ФИКС: Правильная навигация с бесшовным переходом
    const goToSlide = (index: number): void => {
      if (isAnimating) return;
      currentIndex = (index + totalSlides) % totalSlides;
      updateCarousel();
      resetAutoplay();
    };

    const nextSlide = (): void => {
      if (isAnimating) return;
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
      resetAutoplay();
    };

    const prevSlide = (): void => {
      if (isAnimating) return;
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
      resetAutoplay();
    };

    // ФИКС: Улучшенный автоплей с паузой при взаимодействии
    const startAutoplay = (): void => {
      if (!config.autoplay || isAutoplayPaused) return;

      stopAutoplay();
      autoplayInterval = window.setInterval(() => {
        nextSlide();
      }, config.autoplaySpeed);
    };

    const stopAutoplay = (): void => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    const pauseAutoplay = (): void => {
      isAutoplayPaused = true;
      stopAutoplay();
    };

    const resumeAutoplay = (): void => {
      isAutoplayPaused = false;
      startAutoplay();
    };

    const resetAutoplay = (): void => {
      pauseAutoplay();
      // Возобновляем автоплей через 5 секунд после взаимодействия
      setTimeout(() => {
        resumeAutoplay();
      }, 5000);
    };

    // ФИКС: Правильное определение направления драга
    const handleMouseDown = (e: MouseEvent): void => {
      isDragging = true;
      track.style.cursor = "grabbing";
      startX = e.clientX;
      prevTranslate = currentTranslate;
      pauseAutoplay();
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;

      const currentX = e.clientX;
      const diff = currentX - startX; // Остается так
      currentTranslate = prevTranslate + diff;

      track.style.transition = "none";
      track.style.transform = `translateX(${currentTranslate}px)`;
    };

    const handleMouseUp = (): void => {
      if (!isDragging) return;

      isDragging = false;
      track.style.cursor = "grab";

      const movedBy = currentTranslate - prevTranslate;
      const containerWidth = container.clientWidth;
      const threshold = containerWidth * 0.1;

      // ФИКС: МЕНЯЕМ НАПРАВЛЕНИЕ - теперь правильно!
      if (Math.abs(movedBy) > threshold) {
        if (movedBy < 0) {
          // ← Было movedBy > 0
          // Драг влево - следующий слайд
          nextSlide();
        } else {
          // ← Было movedBy < 0
          // Драг вправо - предыдущий слайд
          prevSlide();
        }
      } else {
        updateCarousel();
      }

      resetAutoplay();
    };

    const handleTouchStart = (e: TouchEvent): void => {
      startX = e.touches[0].clientX;
      prevTranslate = currentTranslate;
      pauseAutoplay();
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      currentTranslate = prevTranslate + diff;

      track.style.transition = "none";
      track.style.transform = `translateX(${currentTranslate}px)`;
    };

    const handleTouchEnd = (): void => {
      const movedBy = currentTranslate - prevTranslate;
      const containerWidth = container.clientWidth;
      const threshold = containerWidth * 0.05;

      // ФИКС: МЕНЯЕМ НАПРАВЛЕНИЕ для touch
      if (Math.abs(movedBy) > threshold) {
        if (movedBy < 0) {
          // ← Было movedBy > 0
          // Свайп влево - следующий слайд
          nextSlide();
        } else {
          // ← Было movedBy < 0
          // Свайп вправо - предыдущий слайд
          prevSlide();
        }
      } else {
        updateCarousel();
      }

      resetAutoplay();
    };

    // Wheel события - плавный скролл
    const handleWheel = (e: WheelEvent): void => {
      const rect = container.getBoundingClientRect();
      const isOverCarousel =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isOverCarousel) return;

      e.preventDefault();
      pauseAutoplay();

      // ФИКС: МЕНЯЕМ НАПРАВЛЕНИЕ колесика
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      let scrollAmount = isHorizontalScroll ? e.deltaX : e.deltaY;

      if (scrollAmount > 30) {
        nextSlide(); // ← Меняем местами
      } else if (scrollAmount < -30) {
        prevSlide(); // ← Меняем местами
      }

      resetAutoplay();
    };

    // Keyboard события
    const handleKeyDown = (e: KeyboardEvent): void => {
      const rect = container.getBoundingClientRect();
      const isOverCarousel =
        document.activeElement === container ||
        container.contains(document.activeElement);

      if (!isOverCarousel) return;

      pauseAutoplay();

      // ФИКС: Оставляем стрелки как есть (обычно так интуитивно)
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide(); // Стрелка влево - предыдущий слайд ✓
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide(); // Стрелка вправо - следующий слайд ✓
      } else if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        if (index < totalSlides) {
          goToSlide(index);
        }
      }

      resetAutoplay();
    };

    // Добавляем обработчики
    track.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    track.addEventListener("touchstart", handleTouchStart, { passive: false });
    track.addEventListener("touchmove", handleTouchMove, { passive: false });
    track.addEventListener("touchend", handleTouchEnd);

    container.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    // Навигация по точкам
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        pauseAutoplay();
        goToSlide(index);
        resetAutoplay();
      });

      dot.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pauseAutoplay();
          goToSlide(index);
          resetAutoplay();
        }
      });
    });

    // Ресайз
    const handleResize = (): void => {
      updateCarousel(false);
    };
    window.addEventListener("resize", handleResize);

    // Автоплей при наведении
    container.addEventListener("mouseenter", pauseAutoplay);
    container.addEventListener("mouseleave", resumeAutoplay);

    // Инициализация
    addCustomGlow();
    updateCarousel(false);
    startAutoplay();

    console.log(`✅ Карусель ${type} готова с исправлениями`);
  }

  // ===== UPDATED CAROUSEL INITIALIZATION =====
  private initializeCarousels(): void {
    console.log("🎠 Инициализация исправленных каруселей...");

    // ФИКС: Добавляем задержку для полной загрузки DOM
    setTimeout(() => {
      this.setupVerticalInstagramCarousel();
      this.setupCarousel("stories", "stories-track", "stories-dots");
      this.setupCarousel(
        "destinations",
        "destinations-track",
        "destinations-dots"
      );

      console.log("✅ Исправленные карусели готовы");
    }, 500);
  }

  // ===== UPDATED VERTICAL INSTAGRAM CAROUSEL =====
  private initializeVerticalInstagramCarousel(): void {
    console.log("📱 Инициализация вертикальной Instagram карусели...");

    const track = document.getElementById("instagram-track");
    const dotsContainer = document.getElementById("instagram-dots");

    if (!track || !dotsContainer) {
      console.error("❌ Не найдены элементы вертикальной Instagram карусели");
      return;
    }

    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Создаем точки навигации
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("data-index", i.toString());
      dot.setAttribute("aria-label", `Перейти к посту ${i + 1}`);
      dotsContainer.appendChild(dot);
    }

    const dots = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));
    let currentIndex = 0;
    let startY = 0;
    let currentTranslate = 0;
    let isDragging = false;
    let isAnimating = false;

    // Получаем высоту экрана телефона
    const getPhoneScreenHeight = (): number => {
      const phoneScreen = track.closest(".phone-screen");
      return phoneScreen ? phoneScreen.clientHeight : 640;
    };

    // Расчет позиции для вертикальной прокрутки
    const calculatePosition = (index: number): number => {
      const screenHeight = getPhoneScreenHeight();
      return -index * screenHeight;
    };

    const updateCarousel = (animate: boolean = true): void => {
      if (isAnimating) return;
      isAnimating = true;

      currentTranslate = calculatePosition(currentIndex);

      if (animate) {
        track.style.transition =
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      } else {
        track.style.transition = "none";
      }

      track.style.transform = `translateY(${currentTranslate}px)`;

      // Обновляем точки
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });

      // Обновляем состояние комментариев для текущего поста
      updateCommentsState();

      if (animate) {
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      } else {
        isAnimating = false;
      }
    };

    const goToSlide = (index: number): void => {
      if (isAnimating || index < 0 || index >= totalSlides) return;
      currentIndex = index;
      updateCarousel();
    };

    const nextSlide = (): void => {
      if (isAnimating || currentIndex >= totalSlides - 1) return;
      currentIndex++;
      updateCarousel();
    };

    const prevSlide = (): void => {
      if (isAnimating || currentIndex <= 0) return;
      currentIndex--;
      updateCarousel();
    };

    // Функция для управления состоянием комментариев
    const updateCommentsState = (): void => {
      // Скрываем все комментарии кроме первого в каждом посте
      const allPosts = document.querySelectorAll(".instagram-post");
      allPosts.forEach((post) => {
        const comments = post.querySelectorAll(".comment");
        const viewAllBtn = post.querySelector(
          ".view-all-comments"
        ) as HTMLElement;

        // Скрываем все комментарии кроме первого
        comments.forEach((comment, index) => {
          if (index > 0) {
            (comment as HTMLElement).style.display = "none";
          }
        });

        // Показываем кнопку "Посмотреть все" если есть больше 1 комментария
        if (comments.length > 1 && viewAllBtn) {
          viewAllBtn.style.display = "flex";
          // Обновляем текст с количеством комментариев
          const viewAllText = viewAllBtn.querySelector(".view-all-text");
          if (viewAllText) {
            viewAllText.textContent = `Посмотреть все комментарии (${
              comments.length - 1
            })`;
          }
        } else if (viewAllBtn) {
          viewAllBtn.style.display = "none";
        }
      });
    };

    // Обработчик для кнопки "Посмотреть все комментарии"
    const setupCommentsInteractions = (): void => {
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const viewAllBtn = target.closest(".view-all-comments");

        if (viewAllBtn) {
          const post = viewAllBtn.closest(".instagram-post");
          if (post) {
            const comments = post.querySelectorAll(".comment");
            const viewAllBtnElement = viewAllBtn as HTMLElement;

            // Показываем все комментарии
            comments.forEach((comment) => {
              (comment as HTMLElement).style.display = "flex";
            });

            // Скрываем кнопку "Посмотреть все"
            viewAllBtnElement.style.display = "none";
          }
        }
      });
    };

    // Touch события для вертикального свайпа
    const handleTouchStart = (e: TouchEvent): void => {
      isDragging = true;
      startY = e.touches[0].clientY;
      track.style.transition = "none";
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent): void => {
      if (!isDragging) return;

      const currentY = e.touches[0].clientY;
      const diff = startY - currentY;

      track.style.transform = `translateY(${currentTranslate - diff}px)`;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent): void => {
      if (!isDragging) return;

      isDragging = false;

      const endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Свайп вверх - следующий слайд
          nextSlide();
        } else {
          // Свайп вниз - предыдущий слайд
          prevSlide();
        }
      } else {
        // Возвращаем к текущему слайду
        updateCarousel();
      }
    };

    // Wheel события для прокрутки колесиком мыши
    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();

      if (e.deltaY > 30) {
        // Прокрутка вниз - следующий слайд
        nextSlide();
      } else if (e.deltaY < -30) {
        // Прокрутка вверх - предыдущий слайд
        prevSlide();
      }
    };

    // Добавляем обработчики
    track.addEventListener("touchstart", handleTouchStart, { passive: false });
    track.addEventListener("touchmove", handleTouchMove, { passive: false });
    track.addEventListener("touchend", handleTouchEnd);

    track.addEventListener("wheel", handleWheel, { passive: false });

    // Навигация по точкам
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    // Keyboard навигация
    const handleKeyDown = (e: KeyboardEvent): void => {
      const phoneContainer = track.closest(".dreams-phone-container");
      if (!phoneContainer) return;

      const rect = phoneContainer.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isVisible) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Автоматическая прокрутка
    let autoplayInterval: number;

    const startAutoplay = (): void => {
      stopAutoplay();
      autoplayInterval = window.setInterval(() => {
        nextSlide();
      }, 5000); // Смена поста каждые 5 секунд
    };

    const stopAutoplay = (): void => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    // Запускаем автоплей при видимости
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      });
    });

    const phoneContainer = track.closest(".dreams-phone-container");
    if (phoneContainer) {
      observer.observe(phoneContainer);
    }

    // Ресайз
    const handleResize = (): void => {
      updateCarousel(false);
    };
    window.addEventListener("resize", handleResize);

    // Инициализация
    setupCommentsInteractions();
    updateCarousel(false);
    updateCommentsState();

    console.log(
      `✅ Вертикальная Instagram карусель готова: ${totalSlides} постов, скрытые комментарии`
    );
  }

  private initializeHorizontalCarousels(): void {
    console.log("🎠 Инициализация горизонтальных каруселей...");

    // Только для stories и destinations, НЕ для instagram
    this.setupCarousel("stories", "stories-track", "stories-dots");
    this.setupCarousel(
      "destinations",
      "destinations-track",
      "destinations-dots"
    );

    console.log("✅ Горизонтальные карусели готовы");
  }

  private setupVerticalInstagramCarousel(): void {
    const track = document.getElementById("instagram-track");
    const dotsContainer = document.getElementById("instagram-dots");

    if (!track || !dotsContainer) {
      console.error(
        "❌ Не найдены элементы для вертикальной Instagram карусели"
      );
      return;
    }

    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Создаем точки навигации
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("data-index", i.toString());
      dot.setAttribute("aria-label", `Перейти к посту ${i + 1}`);
      dotsContainer.appendChild(dot);
    }

    const dots = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));
    let currentIndex = 0;
    let startY = 0;
    let currentTranslate = 0;
    let isDragging = false;
    let isAnimating = false;

    // Получаем высоту экрана телефона
    const getPhoneScreenHeight = (): number => {
      const phoneScreen = track.closest(".phone-screen");
      return phoneScreen ? phoneScreen.clientHeight : 640;
    };

    // Расчет позиции для вертикальной прокрутки
    const calculatePosition = (index: number): number => {
      const screenHeight = getPhoneScreenHeight();
      return -index * screenHeight;
    };

    const updateCarousel = (animate: boolean = true): void => {
      if (isAnimating) return;
      isAnimating = true;

      currentTranslate = calculatePosition(currentIndex);

      if (animate) {
        track.style.transition =
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      } else {
        track.style.transition = "none";
      }

      track.style.transform = `translateY(${currentTranslate}px)`;

      // Обновляем точки
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });

      if (animate) {
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      } else {
        isAnimating = false;
      }
    };

    const goToSlide = (index: number): void => {
      if (isAnimating || index < 0 || index >= totalSlides) return;
      currentIndex = index;
      updateCarousel();
    };

    const nextSlide = (): void => {
      if (isAnimating || currentIndex >= totalSlides - 1) return;
      currentIndex++;
      updateCarousel();
    };

    const prevSlide = (): void => {
      if (isAnimating || currentIndex <= 0) return;
      currentIndex--;
      updateCarousel();
    };

    // Touch события для вертикального свайпа
    const handleTouchStart = (e: TouchEvent): void => {
      isDragging = true;
      startY = e.touches[0].clientY;
      track.style.transition = "none";
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent): void => {
      if (!isDragging) return;

      const currentY = e.touches[0].clientY;
      const diff = startY - currentY;

      track.style.transform = `translateY(${currentTranslate - diff}px)`;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent): void => {
      if (!isDragging) return;

      isDragging = false;

      const endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Свайп вверх - следующий слайд
          nextSlide();
        } else {
          // Свайп вниз - предыдущий слайд
          prevSlide();
        }
      } else {
        // Возвращаем к текущему слайду
        updateCarousel();
      }
    };

    // Wheel события для прокрутки колесиком мыши
    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();

      if (e.deltaY > 30) {
        // Прокрутка вниз - следующий слайд
        nextSlide();
      } else if (e.deltaY < -30) {
        // Прокрутка вверх - предыдущий слайд
        prevSlide();
      }
    };

    // Добавляем обработчики
    track.addEventListener("touchstart", handleTouchStart, { passive: false });
    track.addEventListener("touchmove", handleTouchMove, { passive: false });
    track.addEventListener("touchend", handleTouchEnd);

    track.addEventListener("wheel", handleWheel, { passive: false });

    // Навигация по точкам
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    // Keyboard навигация
    const handleKeyDown = (e: KeyboardEvent): void => {
      const phoneContainer = track.closest(".dreams-phone-container");
      if (!phoneContainer) return;

      const rect = phoneContainer.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isVisible) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Ресайз
    const handleResize = (): void => {
      updateCarousel(false);
    };
    window.addEventListener("resize", handleResize);

    // Инициализация
    updateCarousel(false);

    console.log(
      `✅ Вертикальная Instagram карусель готова: ${totalSlides} постов`
    );
  }

  private finalizeCarouselSetup(): void {
    setTimeout(() => {
      // Ensure all carousel tracks are visible and properly styled
      const tracks = document.querySelectorAll(".carousel-track");
      tracks.forEach((track) => {
        const element = track as HTMLElement;
        element.style.overflow = "visible";
        element.style.width = "max-content";
      });

      // Ensure all slides are visible
      const slides = document.querySelectorAll(".carousel-slide");
      slides.forEach((slide) => {
        const element = slide as HTMLElement;
        element.style.visibility = "visible";
        element.style.opacity = "1";
      });

      console.log("🎯 Карусели полностью настроены");
    }, 300);
  }

  private forceCarouselFix(): void {
    setTimeout(() => {
      console.log("🔧 Принудительное исправление каруселей...");

      // Переинициализация всех каруселей
      this.setupCarousel("stories", "stories-track", "stories-dots");
      this.setupCarousel(
        "destinations",
        "destinations-track",
        "destinations-dots"
      );

      // ФИКС: Дополнительные исправления для видимости
      const containers = document.querySelectorAll(".carousel-container");
      containers.forEach((container) => {
        const element = container as HTMLElement;
        element.style.overflow = "visible";
        element.style.zIndex = "10";
      });

      // ФИКС: Убеждаемся, что точки видны
      const dotsContainers = document.querySelectorAll(".carousel-dots");
      dotsContainers.forEach((dots) => {
        const element = dots as HTMLElement;
        element.style.zIndex = "100";
        element.style.position = "relative";
      });

      console.log("✅ Карусели полностью исправлены");
    }, 1000);
  }

  private setupNavigation(): void {
    const dots = document.querySelectorAll(".story-nav__dot");

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const targetSection = dot.getAttribute("data-section");
        if (targetSection) {
          this.scrollToSection(targetSection);
        }
      });
    });

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest(".btn[data-target]") as HTMLButtonElement;

      if (button) {
        const targetSection = button.getAttribute("data-target");
        if (targetSection) {
          this.scrollToSection(targetSection);
        }
      }
    });

    const startBtn = document.getElementById("start-planning");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        this.showToast("🚀 Начинаем планировать ваше путешествие!");
      });
    }
  }

  private setupScroll(): void {
    let ticking = false;

    const updateProgress = () => {
      const progressBar = document.querySelector(
        ".progress-fill"
      ) as HTMLElement;
      if (progressBar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(
          100,
          Math.max(0, (scrollTop / scrollHeight) * 100)
        );
        progressBar.style.width = `${progress}%`;
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          this.updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  private setupInteractivity(): void {
    // Phone feature interactions
    const features = document.querySelectorAll(".feature-item");
    features.forEach((feature) => {
      feature.addEventListener("mouseenter", () => {
        const featureType = feature.getAttribute("data-feature");
        this.animatePhoneFeature(featureType);
      });

      feature.addEventListener("mouseleave", () => {
        this.resetPhoneAnimation();
      });
    });

    // Timeline navigation
    this.setupTimelineNavigation();

    // Instagram like buttons
    const likeButtons = document.querySelectorAll(".post-actions .action");
    likeButtons.forEach((btn) => {
      btn.addEventListener("click", function (this: HTMLElement) {
        if (this.textContent === "❤️") {
          this.style.transform = "scale(1.3)";
          setTimeout(() => {
            this.style.transform = "scale(1)";
          }, 200);
        }
      });
    });
  }

  private setupTimelineNavigation(): void {
    const navButtons = document.querySelectorAll(".nav-btn");
    const phases = document.querySelectorAll(".timeline-phase");

    navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetPhase = btn.getAttribute("data-phase");

        // Update active button
        navButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Show target phase
        phases.forEach((phase) => {
          phase.classList.remove("active");
          if (phase.getAttribute("data-phase") === targetPhase) {
            phase.classList.add("active");
          }
        });

        // Прокрутка к первому элементу выбранной фазы
        this.scrollToFirstStep(targetPhase);

        // Добавляем визуальную обратную связь
        this.animateTimelineTransition(targetPhase);
      });
    });

    this.setupStepHoverEffects();
  }

  private scrollToFirstStep(phase: string | null): void {
    if (!phase) return;

    // Находим первый шаг в активной фазе
    const activePhase = document.querySelector(
      `.timeline-phase[data-phase="${phase}"]`
    );
    if (!activePhase) return;

    const firstStep = activePhase.querySelector(".routine-step");
    if (!firstStep) return;

    // Вычисляем позицию для прокрутки (первый шаг минус отступ)
    const firstStepRect = firstStep.getBoundingClientRect();
    const offset = 100; // Отступ от верха
    const targetScroll = window.scrollY + firstStepRect.top - offset;

    // Плавная прокрутка
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }

  private updateUrlHash(hash: string): void {
    // Обновляем URL без перезагрузки страницы
    if (history.pushState) {
      history.pushState(null, null, `#${hash}`);
    } else {
      window.location.hash = hash;
    }
  }

  private animateTimelineTransition(phase: string | null): void {
    // Добавляем класс анимации к активной фазе
    const activePhase = document.querySelector(
      `.timeline-phase[data-phase="${phase}"]`
    );
    if (activePhase) {
      activePhase.classList.add("phase-transitioning");
      setTimeout(() => {
        activePhase.classList.remove("phase-transitioning");
      }, 600);
    }

    // Визуальный эффект для активной кнопки
    const activeButton = document.querySelector(
      `.nav-btn[data-phase="${phase}"]`
    );
    if (activeButton) {
      activeButton.classList.add("button-pulse");
      setTimeout(() => {
        activeButton.classList.remove("button-pulse");
      }, 300);
    }
  }

  private setupStepHoverEffects(): void {
    const steps = document.querySelectorAll(".routine-step");

    steps.forEach((step) => {
      step.addEventListener("mouseenter", () => {
        // Убираем активный класс у всех шагов
        steps.forEach((s) => s.classList.remove("active"));
        // Добавляем только текущему
        step.classList.add("active");
      });

      step.addEventListener("mouseleave", () => {
        // Убираем активный класс при уходе мыши
        step.classList.remove("active");
      });
    });
  }

  private animatePhoneFeature(featureType: string | null): void {
    const phone = document.querySelector(".phone");
    if (!phone) return;

    switch (featureType) {
      case "altai":
        phone.style.animation = "phone3d 2s ease-in-out";
        break;
      case "transport":
        phone.style.transform = "rotateY(20deg) rotateX(-10deg) scale(1.05)";
        break;
      case "hotel":
        phone.style.transform = "rotateY(-20deg) rotateX(10deg) scale(1.05)";
        break;
      case "companions":
        phone.style.animation = "phone3d 1.5s ease-in-out";
        break;
    }
  }

  private resetPhoneAnimation(): void {
    const phone = document.querySelector(".phone");
    if (phone) {
      phone.style.animation = "phone3d 8s ease-in-out infinite";
      phone.style.transform = "";
    }
  }

  private scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      this.isScrolling = true;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        this.isScrolling = false;
      }, 1000);
    }
  }

  private updateActiveSection(): void {
    if (this.isScrolling) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    this.sections.forEach((section) => {
      const rect = section.element.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        if (this.currentSection !== section.id) {
          this.setActiveSection(section.id);
        }
      }
    });
  }

  private setActiveSection(sectionId: string): void {
    this.currentSection = sectionId;

    document.querySelectorAll(".story-nav__dot").forEach((dot) => {
      dot.classList.remove("story-nav__dot--active");
    });

    const activeDot = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeDot) {
      activeDot.classList.add("story-nav__dot--active");
    }

    this.animateSectionContent(sectionId);
  }

  private animateSectionContent(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const elements = section.querySelectorAll(".pre-animate");

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove("pre-animate");
        element.classList.add("animate-in");
      }, index * 100);
    });
  }

  private startAnimations(): void {
    this.setActiveSection("hero");
    this.particleSystem?.start();
  }

  private showApp(): void {
    setTimeout(() => {
      document.body.classList.add("loaded");
      setTimeout(() => {
        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) loadingScreen.remove();
      }, 800);
    }, 2000);
  }

  private showToast(message: string): void {
    const toast = document.createElement("div");
    toast.style.cssText = `
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
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => (toast.style.transform = "translateX(0)"), 10);

    setTimeout(() => {
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// ===== INITIALIZE APP =====
document.addEventListener("DOMContentLoaded", () => {
  new WanderListApp();
});

declare global {
  interface Window {
    WanderListApp: typeof WanderListApp;
  }
}

window.WanderListApp = WanderListApp;
