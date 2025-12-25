import { ChristmasTreeApp } from './index.js';

const app = new ChristmasTreeApp({
    terminalId: 'terminal',
    typewriterId: 'typewriter',
    logsId: 'logs',
    treeCanvasId: 'tree-canvas',
    snowCanvasId: 'snow-canvas',
    installCountId: 'install-count',
    snowOptions: {
        type: 'tree',
        color: 'rgba(0, 255, 100, 0.4)',
        minSize: 2,
        maxSize: 5
    }
});

app.start();
