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

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.2 + 0.8,
        glyph: Math.random() > 0.65 ? glyphs[Math.floor(Math.random() * glyphs.length)] : null,
        baseColor: Math.random() > 0.35 ? '#00f0ff' : (Math.random() > 0.5 ? '#00ff66' : '#ffffff'),
        alpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        mass: Math.random() * 1.5 + 0.8
      });
    }
  }

  cacheDOMDebris() {
    // Select floating UI cards and debris to participate in DOM physics
    const elements = document.querySelectorAll(
      '.track-card, .event-node-card, .floating-code-debris, .arsenal-card, .hero-directive-badge'
    );
    this.debrisElements = Array.from(elements).map(el => ({
      element: el,
      xOffset: 0,
      yOffset: 0,
      vx: 0,
      vy: 0,
      rot: 0,
      vRot: 0
    }));
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.cacheDOMDebris();
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

    // Global Click Physics: Emits gravitational pulse/shockwave
    window.addEventListener('click', (e) => {
      // Don't trigger if clicking interactive inputs or buttons directly to avoid jarring forms
      const isInput = e.target.closest('input, textarea, select');
      if (isInput) return;

      this.triggerShockwave(e.clientX, e.clientY, 1.0);
    });

    // Touch device support
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.mouse.x = touch.clientX;
        this.mouse.y = touch.clientY;
        this.triggerShockwave(touch.clientX, touch.clientY, 0.85);
      }
    }, { passive: true });
  }

  triggerShockwave(x, y, power = 1.0) {
    if (!this.config.physicsEnabled) return;

    // 1. Add Canvas Shockwave
    this.shockwaves.push({
      x,
      y,
      radius: 5,
      maxRadius: Math.max(this.width, this.height) * 0.6,
      speed: 16 * power,
      alpha: 0.85,
      color: '#00f0ff'
    });

    // 2. Spawn Visual DOM Shockwave Ring
    this.spawnDOMRing(x, y);

    // 3. Audio Shockwave Trigger
    if (window.cyberAudio) {
      window.cyberAudio.playShockwave();
    }

    // 4. Scatter Nearby Particles
    this.particles.forEach(p => {
      const dx = p.x - x;
      const dy = p.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 450) {
        const force = (1 - dist / 450) * 18 * power * (1 / p.mass);
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    });

    // 5. Physics Repulsion for Nearby Floating DOM Cards
    this.debrisElements.forEach(item => {
      const rect = item.element.getBoundingClientRect();
      const elemCenterX = rect.left + rect.width / 2;
      const elemCenterY = rect.top + rect.height / 2;
      
      const dx = elemCenterX - x;
      const dy = elemCenterY - y;
      const dist = Math.hypot(dx, dy) || 1;

      if (dist < 600) {
        const strength = (1 - dist / 600) * 24 * power;
        item.vx += (dx / dist) * strength;
        item.vy += (dy / dist) * strength;
        item.vRot += ((Math.random() - 0.5) * strength * 0.4);
      }
    });
  }

  spawnDOMRing(x, y) {
    const ring = document.createElement('div');
    ring.className = 'shockwave-effect-ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.width = '60px';
    ring.style.height = '60px';
    document.body.appendChild(ring);

    requestAnimationFrame(() => {
      ring.style.transform = 'translate(-50%, -50%) scale(10)';
      ring.style.opacity = '0';
    });

    setTimeout(() => {
      ring.remove();
    }, 850);
  }

  updateDOMDebris() {
    if (!this.config.physicsEnabled) return;

    this.debrisElements.forEach(item => {
      // Spring force returning to equilibrium (0, 0)
      const ax = -this.config.springConstant * item.xOffset;
      const ay = -this.config.springConstant * item.yOffset;
      const aRot = -this.config.springConstant * item.rot;

      item.vx = (item.vx + ax) * this.config.damping;
      item.vy = (item.vy + ay) * this.config.damping;
      item.vRot = (item.vRot + aRot) * this.config.damping;

      item.xOffset += item.vx;
      item.yOffset += item.vy;
      item.rot += item.vRot;

      // When velocities are very small, clamp to zero
      if (Math.abs(item.xOffset) < 0.1 && Math.abs(item.vx) < 0.05) {
        item.xOffset = 0;
        item.vx = 0;
      }
      if (Math.abs(item.yOffset) < 0.1 && Math.abs(item.vy) < 0.05) {
        item.yOffset = 0;
        item.vy = 0;
      }
      if (Math.abs(item.rot) < 0.1 && Math.abs(item.vRot) < 0.05) {
        item.rot = 0;
        item.vRot = 0;
      }

      if (item.xOffset !== 0 || item.yOffset !== 0 || item.rot !== 0) {
        item.element.style.transform = `translate3d(${item.xOffset.toFixed(2)}px, ${item.yOffset.toFixed(2)}px, 0) rotate(${item.rot.toFixed(2)}deg)`;
      } else {
        item.element.style.transform = '';
      }
    });
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
