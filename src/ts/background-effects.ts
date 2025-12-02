// ===== TYPES =====
interface TabPosition {
  x: string;
  y: string;
  driftX: string;
  driftY: string;
  rotation: string;
  floatHeight: string;
  floatSpeed: string;
  delay: string;
}

interface TabConfig {
  id: string;
  favicon: string;
  title: string;
  hasLoading: boolean;
  loadTime?: string;
  position: TabPosition;
}

// ===== ANIMATED BACKGROUNDS MANAGER =====
class AnimatedBackgrounds {
  private tabs: Map<string, HTMLElement> = new Map();
  private smokeContainer: HTMLElement | null = null;
  private embersContainer: HTMLElement | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  // Инициализация менеджера
  private init(): void {
    if (this.isInitialized) return;

    this.setupEventListeners();
    this.generateRandomPatterns();
    this.isInitialized = true;
  }

  // Настройка обработчиков событий
  private setupEventListeners(): void {
    document.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("tab-close")) {
        this.closeTab(target);
      }
    });

    // Реинициализация при изменении размера окна
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  // Закрытие вкладки
  public closeTab(closeButton: HTMLElement): void {
    const tab = closeButton.closest(".browser-tab") as HTMLElement;
    if (!tab) return;

    const tabId = tab.getAttribute("data-tab-id");
    if (tabId) {
      this.tabs.delete(tabId);
    }

    // Анимация закрытия
    tab.style.animation = "tabClose 0.5s ease forwards";

    // Удаление из DOM после анимации
    setTimeout(() => {
      tab.remove();
      this.checkAllTabsClosed();
    }, 500);
  }

  // Проверка, все ли вкладки закрыты
  private checkAllTabsClosed(): void {
    const remainingTabs = document.querySelectorAll(".browser-tab");
    if (remainingTabs.length === 0) {
      this.triggerAllTabsClosed();
    }
  }

  // Событие когда все вкладки закрыты
  private triggerAllTabsClosed(): void {
    const event = new CustomEvent("allTabsClosed");
    document.dispatchEvent(event);

    // Можно добавить дополнительную логику здесь
    console.log("All browser tabs have been closed!");
  }

  // Генерация рандомных облаков дыма
  public generateRandomSmoke(): void {
    this.smokeContainer = document.querySelector(".smoke-container");
    if (!this.smokeContainer) return;

    this.smokeContainer.innerHTML = "";

    // Создаем 6-8 рандомных облаков
    const cloudCount = Math.floor(Math.random() * 3) + 6;

    for (let i = 0; i < cloudCount; i++) {
      const cloud = document.createElement("div");
      cloud.className = "smoke-cloud";

      // Рандомные параметры
      const size = Math.floor(Math.random() * 150) + 100;
      const left = Math.floor(Math.random() * 80) + 10;
      const delay = Math.floor(Math.random() * 15);
      const duration = Math.floor(Math.random() * 10) + 20;

      cloud.style.cssText = `
        --cloud-size: ${size}px;
        --cloud-left: ${left}%;
        --cloud-delay: ${delay}s;
        --cloud-duration: ${duration}s;
      `;

      this.smokeContainer.appendChild(cloud);
    }
  }

  // Генерация рандомных частиц
  public generateRandomParticles(): void {
    this.embersContainer = document.querySelector(".floating-embers");
    if (!this.embersContainer) return;

    this.embersContainer.innerHTML = "";

    // Создаем 15-20 рандомных частиц
    const particleCount = Math.floor(Math.random() * 6) + 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "ember-particle";

      // Рандомные параметры
      const size = Math.floor(Math.random() * 4) + 2;
      const left = Math.floor(Math.random() * 95) + 2;
      const delay = Math.floor(Math.random() * 10);
      const duration = Math.floor(Math.random() * 15) + 10;

      particle.style.cssText = `
        --particle-size: ${size}px;
        --particle-left: ${left}%;
        --particle-delay: ${delay}s;
        --particle-duration: ${duration}s;
      `;

      this.embersContainer.appendChild(particle);
    }
  }

  // Общая генерация рандомных паттернов
  public generateRandomPatterns(): void {
    this.generateRandomSmoke();
    this.generateRandomParticles();
  }

  // Обработка изменения размера окна
  private handleResize(): void {
    // Перегенерируем паттерны при изменении размера для адаптивности
    this.generateRandomPatterns();
  }

  // Динамическое создание вкладки
  public createTab(config: TabConfig): HTMLElement {
    const tab = document.createElement("div");
    tab.className = `browser-tab ${config.hasLoading ? "loading-tab" : ""}`;
    tab.setAttribute("data-tab-id", config.id);

    // Установка позиции и анимации
    tab.style.cssText = `
      --delay: ${config.position.delay};
      --x: ${config.position.x};
      --y: ${config.position.y};
      --drift-x: ${config.position.driftX};
      --drift-y: ${config.position.driftY};
      --rotation: ${config.position.rotation};
      --float-height: ${config.position.floatHeight};
      --float-speed: ${config.position.floatSpeed};
    `;

    // Создание содержимого вкладки
    tab.innerHTML = `
      <div class="tab-header">
        <div class="tab-favicon">${config.favicon}</div>
        <div class="tab-title">${config.title}</div>
        <div class="tab-close">×</div>
      </div>
      ${
        config.hasLoading
          ? `
        <div class="tab-loading-bar">
          <div class="loading-progress" style="--load-time: ${
            config.loadTime || "2s"
          };"></div>
        </div>
      `
          : ""
      }
    `;

    // Добавление в DOM
    const tabsContainer = document.querySelector(".floating-browser-tabs");
    if (tabsContainer) {
      tabsContainer.appendChild(tab);
    }

    // Сохранение ссылки
    this.tabs.set(config.id, tab);

    return tab;
  }

  // Получение вкладки по ID
  public getTab(tabId: string): HTMLElement | undefined {
    return this.tabs.get(tabId);
  }

  // Закрытие вкладки по ID
  public closeTabById(tabId: string): void {
    const tab = this.tabs.get(tabId);
    if (tab) {
      const closeButton = tab.querySelector(".tab-close") as HTMLElement;
      if (closeButton) {
        this.closeTab(closeButton);
      }
    }
  }

  // Закрытие всех вкладок
  public closeAllTabs(): void {
    this.tabs.forEach((tab, tabId) => {
      this.closeTabById(tabId);
    });
  }

  // Перезапуск анимаций (например, при повторном посещении страницы)
  public restartAnimations(): void {
    this.tabs.forEach((tab) => {
      tab.style.animation = "none";
      setTimeout(() => {
        tab.style.animation = "";
      }, 10);
    });
  }

  // Получение статистики
  public getStats(): { totalTabs: number; closedTabs: number } {
    const allTabs = document.querySelectorAll(".browser-tab");
    const visibleTabs = Array.from(allTabs).filter(
      (tab) =>
        tab.style.display !== "none" &&
        !tab.style.animation.includes("tabClose")
    );

    return {
      totalTabs: allTabs.length,
      closedTabs: allTabs.length - visibleTabs.length,
    };
  }

  // Уничтожение менеджера (cleanup)
  public destroy(): void {
    this.tabs.clear();
    this.isInitialized = false;

    // Удаление обработчиков событий
    document.removeEventListener("click", () => {});
    window.removeEventListener("resize", () => {});
  }
}

// ===== GLOBAL INSTANCE =====
// Создаем глобальный экземпляр для легкого доступа
declare global {
  interface Window {
    animatedBackgrounds: AnimatedBackgrounds;
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const backgroundsManager = new AnimatedBackgrounds();
  window.animatedBackgrounds = backgroundsManager;

  // Автогенерация паттернов каждые 30 секунд
  setInterval(() => {
    backgroundsManager.generateRandomPatterns();
  }, 30000);

  // Пример создания вкладки программно
  /*
  backgroundsManager.createTab({
    id: 'custom-tab',
    favicon: '🔥',
    title: 'Custom Tab - Example...',
    hasLoading: true,
    loadTime: '2.5s',
    position: {
      x: '50%',
      y: '50%',
      driftX: '10vw',
      driftY: '-8vh',
      rotation: '3deg',
      floatHeight: '15px',
      floatSpeed: '6s',
      delay: '0s'
    }
  });
  */
});

// Экспорт для использования в основном приложении
export default AnimatedBackgrounds;
