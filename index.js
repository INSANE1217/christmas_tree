import { Terminal } from './terminal.js';
import { MatrixTree } from './tree.js';
import { Snow } from './snow.js';
import { incrementGlobalInstalls } from './firebase.js';
import './style.css';

export class ChristmasTreeApp {
  constructor(options = {}) {
    this.options = {
      terminalId: options.terminalId || 'terminal',
      typewriterId: options.typewriterId || 'typewriter',
      logsId: options.logsId || 'logs',
      treeCanvasId: options.treeCanvasId || 'tree-canvas',
      snowCanvasId: options.snowCanvasId || 'snow-canvas',
      installCountId: options.installCountId || 'install-count',
      snowOptions: options.snowOptions || {},
      ...options
    };
  }

  start() {
    this.terminalPhase();
  }

  terminalPhase() {
    const term = new Terminal(
      this.options.typewriterId,
      this.options.logsId,
      () => {}
    );

    term.start();

    // 🔥 연출이 멈추지 않도록 강제 진행
    setTimeout(() => {
      const overlay = document.getElementById(this.options.terminalId);
      if (overlay) overlay.classList.add('fade-out');

      incrementGlobalInstalls()
        .then(count => {
          const statsEl = document.getElementById(this.options.installCountId);
          if (statsEl) statsEl.textContent = count.toLocaleString();
        })
        .catch(() => {});

      this.startScene();
    }, 3000);
  }

  startScene() {
    this.tree = new MatrixTree(this.options.treeCanvasId);
    this.tree.animate();

    this.snow = new Snow(this.options.snowCanvasId, this.options.snowOptions);
    this.snow.start();

    this.showUI();
  }

  showUI() {
    const elements = ['title', 'stats', 'reset-btn', 'share-btn', 'footer'];

    elements.forEach((id, index) => {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.classList.remove('hidden');
          el.classList.add('visible');
        }, index * 400);
      }
    });

    this.initEventListeners();
  }

  initEventListeners() {
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        location.reload();
      });
    }
  }
}
