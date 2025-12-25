export class Snow {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.flakes = [];
    this.width = 0;
    this.height = 0;
    
    // Customization options
    this.options = {
      color: options.color || "rgba(255, 255, 255, 0.8)",
      minSize: options.minSize || 1,
      maxSize: options.maxSize || 3,
      count: options.count || 200,
      type: options.type || "circle", // "circle" or "tree"
      ...options
    };

    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.initFlakes();
    this.isRunning = false;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initFlakes() {
    this.flakes = [];
    for (let i = 0; i < this.options.count; i++) {
        this.flakes.push(this.createFlake());
    }
  }

  createFlake() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
      speed: Math.random() * 1 + 0.5,
      wind: Math.random() * 0.5 - 0.25,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05
    };
  }

  drawTree(x, y, size) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size);
    this.ctx.lineTo(x + size * 0.5, y);
    this.ctx.lineTo(x - size * 0.5, y);
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size * 0.5);
    this.ctx.lineTo(x + size * 0.7, y + size * 0.5);
    this.ctx.lineTo(x - size * 0.7, y + size * 0.5);
    this.ctx.closePath();
    this.ctx.fill();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.options.color;
    
    this.flakes.forEach(f => {
      if (this.options.type === "tree") {
        this.drawTree(f.x, f.y, f.radius * 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      f.y += f.speed;
      f.x += f.wind;
      
      if (f.y > this.height) {
        f.y = -10;
        f.x = Math.random() * this.width;
      }
      if (f.x > this.width) f.x = 0;
      if (f.x < 0) f.x = this.width;
    });
    
    requestAnimationFrame(() => this.animate());
  }
}
