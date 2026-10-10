/* ==========================================================================
   OXNULL ZERO-GRAVITY PHYSICS ENGINE
   Canvas Particle Field • Global Click Shockwave • DOM Element Repulsion
   ========================================================================== */

class ZeroGPhysicsEngine {
  constructor() {
    this.canvas = document.getElementById('canvas-zero-g');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.shockwaves = [];
    this.debrisElements = [];
    
    this.mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
      isHovering: false
    };

    this.config = {
      particleCount: 85,
      maxDistanceConstellation: 110,
      gravityInverted: false,
      physicsEnabled: true,
      damping: 0.96,
      springConstant: 0.05
    };

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.spawnParticles();
    this.cacheDOMDebris();
    this.bindEvents();
    this.animate();
  }

  resizeCanvas() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  spawnParticles() {
    this.particles = [];
    const count = window.innerWidth < 768 ? 40 : this.config.particleCount;
    const glyphs = ['0', '1', 'x', '+', 'λ', '0xNULL', '∅', '⌘', '::'];

    // Keep particle float calm and stable
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.0 + 0.8,
        glyph: Math.random() > 0.65 ? glyphs[Math.floor(Math.random() * glyphs.length)] : null,
        baseColor: Math.random() > 0.35 ? '#00f0ff' : (Math.random() > 0.5 ? '#00ff66' : '#ffffff'),
        alpha: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
        mass: Math.random() * 1.5 + 0.8
      });
    }
  }

  cacheDOMDebris() {
    // Stable DOM: elements remain in their layout positions
    this.debrisElements = [];
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.isHovering = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.isHovering = false;
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Note: Click and touch shockwave scattering effects have been removed to keep gravity stable
  }

  triggerShockwave(x, y, power = 1.0) {
    // No-op: Click scattering effect removed per user directive
  }

  spawnDOMRing(x, y) {
    // No-op
  }

  updateDOMDebris() {
    // Stable layout: DOM elements remain anchored in place
  }


  invertGravity() {
    this.config.gravityInverted = !this.config.gravityInverted;
    document.body.classList.toggle('gravity-inverted', this.config.gravityInverted);

    // Give an upward or downward velocity kick
    const kick = this.config.gravityInverted ? -12 : 12;
    this.particles.forEach(p => {
      p.vy += kick * (Math.random() * 0.8 + 0.4);
    });

    this.debrisElements.forEach(item => {
      item.vy += kick * 1.5;
      item.vRot += (Math.random() - 0.5) * 8;
    });

    if (window.cyberAudio) {
      window.cyberAudio.playAlarm();
    }
  }

  togglePhysics(enable) {
    this.config.physicsEnabled = enable !== undefined ? enable : !this.config.physicsEnabled;
    document.body.classList.toggle('zero-g-disabled', !this.config.physicsEnabled);
    if (!this.config.physicsEnabled) {
      this.debrisElements.forEach(item => {
        item.xOffset = 0;
        item.yOffset = 0;
        item.vx = 0;
        item.vy = 0;
        item.rot = 0;
        item.element.style.transform = '';
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.ctx.clearRect(0, 0, this.width, this.height);

    if (!this.config.physicsEnabled) return;

    // 1. Update and Render Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha -= 0.018;

      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
        this.shockwaves.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 240, 255, ${sw.alpha})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.stroke();

      // Inner glow ring
      this.ctx.beginPath();
      this.ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 255, 102, ${sw.alpha * 0.5})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.restore();
    }

    // 2. Update and Render Particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Zero-G Sinusoidal Float
      p.phase += 0.02;
      const floatDriftY = Math.sin(p.phase) * 0.25 * (this.config.gravityInverted ? -1 : 1);
      const floatDriftX = Math.cos(p.phase * 0.7) * 0.15;

      p.x += p.vx + floatDriftX;
      p.y += p.vy + floatDriftY;

      // Dampen velocities back to weightless drift
      p.vx *= 0.985;
      p.vy *= 0.985;

      // Wrap around canvas screen edges
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;

      // Cursor Gravitational Interaction
      if (this.mouse.isHovering) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.mouse.radius && dist > 1) {
          // Gravitational repulsor with smooth falloff
          const force = (1 - dist / this.mouse.radius) * 1.8;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }
      }

      // Draw Particle
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;

      if (p.glyph) {
        this.ctx.font = '10px JetBrains Mono, monospace';
        this.ctx.fillStyle = p.baseColor;
        this.ctx.fillText(p.glyph, p.x, p.y);
      } else {
        this.ctx.fillStyle = p.baseColor;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Glowing core for larger stars
        if (p.radius > 2) {
          this.ctx.shadowBlur = 8;
          this.ctx.shadowColor = p.baseColor;
          this.ctx.fill();
        }
      }
      this.ctx.restore();

      // Constellation Lines Between Nearby Particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < this.config.maxDistanceConstellation) {
          const lineAlpha = (1 - dist / this.config.maxDistanceConstellation) * 0.16;
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    // 3. Update DOM Element Spring Physics
    this.updateDOMDebris();
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.zeroGPhysics = new ZeroGPhysicsEngine();
});
