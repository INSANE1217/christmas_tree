import { Terminal } from './terminal.js';
export { Terminal };
import { MatrixTree } from './tree.js';
export { MatrixTree };
import { Snow } from './snow.js';
export { Snow };

import './style.css';

// Dummy functions for npm package (no Firebase)
const noopAsync = async () => 0;
export const incrementGlobalInstalls = noopAsync;
export const getGlobalInstalls = noopAsync;

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
    const shareBtn = document.getElementById(this.options.shareBtnId || 'share-btn');
    const resetBtn = document.getElementById(this.options.resetBtnId || 'reset-btn');

    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const shareData = {
          title: 'npm install christmas-tree',
          text: 'Installs the most advanced Christmas tree directly to your browser. #coding #christmas #javascript',
          url: window.location.href
        };

        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log('Share canceled');
          }
        } else {
          navigator.clipboard.writeText(window.location.href);
          const originalText = shareBtn.textContent;
          shareBtn.textContent = "Copied!";
          setTimeout(() => {
            shareBtn.textContent = originalText;
          }, 2000);
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        location.reload();
      });
    }
  }
}
