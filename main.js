import { ChristmasTreeApp } from './index.js';

const app = new ChristmasTreeApp({
    terminalId: 'terminal',
    typewriterId: 'typewriter',
    logsId: 'logs',
    treeCanvasId: 'tree-canvas',
    snowCanvasId: 'snow-canvas',

    // ❄️ 눈 옵션 (호환되는 것만 사용)
    snowOptions: {
        color: 'rgba(255, 255, 255, 0.8)',
        minSize: 1,
        maxSize: 4,
        count: 200
    }
});

app.start();
