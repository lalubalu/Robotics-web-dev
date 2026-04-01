/* ============================================
   BUILD ROBOTICS STUDIO - Particle / Circuit Animation
   ============================================ */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.nodes = [];
    this.mouse = { x: -9999, y: -9999 };
    this.animFrame = null;
    this.init();
    this.bindEvents();
  }

  init() {
    this.resize();
    this.createNodes();
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.W = this.canvas.width;
    this.H = this.canvas.height;
  }

  createNodes() {
    const count = Math.min(Math.floor((this.W * this.H) / 18000), 80);
    this.nodes = [];
    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        color: Math.random() > 0.7 ? '#00ff88' : Math.random() > 0.5 ? '#7c3aed' : '#00d4ff'
      });
    }
  }

  createParticles() {
    const count = Math.min(Math.floor((this.W * this.H) / 25000), 30);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.makeParticle());
    }
  }

  makeParticle() {
    return {
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.5 + 0.3),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.6 ? '#00d4ff' : '#00ff88',
      trail: []
    };
  }

  drawNodes() {
    const ctx = this.ctx;
    const maxDist = 150;
    const mouseMaxDist = 200;

    // Draw connections
    for (let i = 0; i < this.nodes.length; i++) {
      const n1 = this.nodes[i];

      for (let j = i + 1; j < this.nodes.length; j++) {
        const n2 = this.nodes[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Mouse interaction
      const mdx = n1.x - this.mouse.x;
      const mdy = n1.y - this.mouse.y;
      const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mouseDist < mouseMaxDist) {
        const alpha = (1 - mouseDist / mouseMaxDist) * 0.5;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(this.mouse.x, this.mouse.y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Draw nodes
    for (const node of this.nodes) {
      node.pulse += node.pulseSpeed;
      const pulseAlpha = 0.5 + 0.5 * Math.sin(node.pulse);
      const pulseSize = node.r + Math.sin(node.pulse) * 1.5;

      // Outer glow
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 6);
      const color = node.color === '#00d4ff' ? '0, 212, 255' : node.color === '#00ff88' ? '0, 255, 136' : '124, 58, 237';
      gradient.addColorStop(0, `rgba(${color}, ${pulseAlpha * 0.3})`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize * 6, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = pulseAlpha * 0.8;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  updateNodes() {
    for (const node of this.nodes) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > this.W) node.vx *= -1;
      if (node.y < 0 || node.y > this.H) node.vy *= -1;

      // Mouse repulsion
      const dx = node.x - this.mouse.x;
      const dy = node.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.5;
        node.vx += (dx / dist) * force;
        node.vy += (dy / dist) * force;
        // Clamp velocity
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 2) { node.vx = (node.vx / speed) * 2; node.vy = (node.vy / speed) * 2; }
      }
    }
  }

  drawParticles() {
    for (const p of this.particles) {
      // Trail
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 8) p.trail.shift();

      for (let i = 0; i < p.trail.length - 1; i++) {
        const alpha = (i / p.trail.length) * p.opacity * 0.4;
        this.ctx.beginPath();
        this.ctx.moveTo(p.trail[i].x, p.trail[i].y);
        this.ctx.lineTo(p.trail[i+1].x, p.trail[i+1].y);
        this.ctx.strokeStyle = p.color === '#00d4ff' ? `rgba(0, 212, 255, ${alpha})` : `rgba(0, 255, 136, ${alpha})`;
        this.ctx.lineWidth = p.size * 0.5;
        this.ctx.stroke();
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      const color = p.color === '#00d4ff' ? '0, 212, 255' : '0, 255, 136';
      this.ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
      this.ctx.fill();
    }
  }

  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity -= 0.002;

      if (p.y < -10 || p.opacity <= 0) {
        this.particles[i] = this.makeParticle();
        this.particles[i].y = this.H + 10;
        this.particles[i].opacity = Math.random() * 0.3 + 0.1;
      }
    }
  }

  drawCircuitLines() {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.03)';
    ctx.lineWidth = 1;

    // Horizontal segments
    const step = 80;
    for (let y = step; y < this.H; y += step * 3) {
      let x = 0;
      while (x < this.W) {
        const len = Math.random() * 120 + 40;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + len, y);
        ctx.stroke();

        // Corner
        if (Math.random() > 0.5) {
          const dir = Math.random() > 0.5 ? 1 : -1;
          const vLen = Math.random() * 40 + 20;
          ctx.beginPath();
          ctx.moveTo(x + len, y);
          ctx.lineTo(x + len, y + vLen * dir);
          ctx.stroke();
        }
        x += len + Math.random() * 60 + 20;
      }
    }
  }

  animate() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    this.drawCircuitLines();
    this.updateNodes();
    this.drawNodes();
    this.updateParticles();
    this.drawParticles();

    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createNodes();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });
  }

  destroy() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}

// Scanning line effect
class ScanLine {
  constructor() {
    this.el = document.createElement('div');
    this.el.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6), transparent);
      z-index: 9998; pointer-events: none;
      animation: scanner 8s linear infinite;
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.4);
    `;
    document.body.appendChild(this.el);
  }
}
