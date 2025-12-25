import { Terminal } from './terminal.js';
export { Terminal };
import { MatrixTree } from './tree.js';
export { MatrixTree };
import { Snow } from './snow.js';
export { Snow };
import { incrementGlobalInstalls, getGlobalInstalls } from './firebase.js';
export { incrementGlobalInstalls, getGlobalInstalls };

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
    const term = new Terminal(this.options.typewriterId, this.options.logsId, () => {
      const overlay = document.getElementById(this.options.terminalId);
      if (overlay) overlay.classList.add('fade-out');
      
      incrementGlobalInstalls().then(count => {
        const statsEl = document.getElementById(this.options.installCountId);
        if (statsEl) statsEl.textContent = count.toLocaleString();
      });

      setTimeout(() => {
        this.startScene();
      }, 1000);
    });
    term.start();
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
          void el.offsetWidth;
          el.classList.add('visible');
        }, index * 500);
      }
    });

    this.initEventListeners();
  }

  initEventListeners() {
    
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        location.reload();
      });
    }
  }
}
