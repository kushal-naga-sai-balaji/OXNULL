/* ==========================================================================
   OXNULL MAIN APPLICATION CONTROLLER
   Navigation • Telemetry Counters • Sound & Physics Toggles • Radar HUD
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Enter Orbit Hero CTA
  const enterOrbitBtn = document.getElementById('btn-enter-orbit');
  if (enterOrbitBtn) {
    enterOrbitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const tracksSection = document.getElementById('tracks');
      if (tracksSection) {
        tracksSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 6. Navigation Smooth Scroll & Active Links
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 7. Footer Tactical Radar Simulation
  const radarCanvas = document.getElementById('footer-radar-canvas');
  if (radarCanvas) {
    const rCtx = radarCanvas.getContext('2d');
    const w = radarCanvas.width = 160;
    const h = radarCanvas.height = 160;
    const cx = w / 2;
    const cy = h / 2;
    let angle = 0;

    const blips = [
      { r: 45, theta: 1.2, alpha: 0.8 },
      { r: 65, theta: 3.4, alpha: 0.6 },
      { r: 25, theta: 5.1, alpha: 0.9 }
    ];

    const drawRadar = () => {
      rCtx.clearRect(0, 0, w, h);

      // Radar circles
      rCtx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      rCtx.lineWidth = 1;

      [25, 45, 65].forEach(radius => {
        rCtx.beginPath();
        rCtx.arc(cx, cy, radius, 0, Math.PI * 2);
        rCtx.stroke();
      });

      // Crosshairs
      rCtx.beginPath();
      rCtx.moveTo(cx, 10);
      rCtx.lineTo(cx, h - 10);
      rCtx.moveTo(10, cy);
      rCtx.lineTo(w - 10, cy);
      rCtx.stroke();

      // Rotating sweep line
      angle += 0.04;
      const xEnd = cx + Math.cos(angle) * 70;
      const yEnd = cy + Math.sin(angle) * 70;

      const grad = rCtx.createRadialGradient(cx, cy, 5, cx, cy, 70);
      grad.addColorStop(0, 'rgba(0, 255, 102, 0.4)');
      grad.addColorStop(1, 'rgba(0, 255, 102, 0)');

      rCtx.strokeStyle = 'rgba(0, 255, 102, 0.8)';
      rCtx.lineWidth = 1.5;
      rCtx.beginPath();
      rCtx.moveTo(cx, cy);
      rCtx.lineTo(xEnd, yEnd);
      rCtx.stroke();

      // Blips
      blips.forEach(b => {
        const bx = cx + Math.cos(b.theta) * b.r;
        const by = cy + Math.sin(b.theta) * b.r;
        rCtx.fillStyle = 'rgba(255, 0, 60, 0.85)';
        rCtx.beginPath();
        rCtx.arc(bx, by, 3, 0, Math.PI * 2);
        rCtx.fill();
      });

      requestAnimationFrame(drawRadar);
    };

    drawRadar();
  }

  // 9. Simulated Cyber Live Log Stream in Footer
  const logStreamEl = document.getElementById('footer-log-stream');
  if (logStreamEl) {
    const logs = [
      "ORBIT: Vector trajectory stabilized at 420.69km.",
      "INTRUSION_DEFENSE: Port 8443 SYN flood absorbed by eBPF filter.",
      "DEFCON: Level 1 maintained. All zero-gravity perimeters nominal.",
      "CRYPTO_ENGINE: Elliptic curve session keys rotated successfully.",
      "RADAR: 3 unauthenticated telemetry probes detected and null-routed.",
      "RECRUITMENT: New clearance requisition encrypted into queue."
    ];
    let logIndex = 0;
    setInterval(() => {
      const logLine = document.createElement('div');
      logLine.style.fontFamily = 'var(--font-mono)';
      logLine.style.fontSize = '0.72rem';
      logLine.style.color = 'var(--text-secondary)';
      logLine.style.marginBottom = '0.3rem';
      logLine.textContent = `[${new Date().toLocaleTimeString()}] ${logs[logIndex % logs.length]}`;
      logStreamEl.prepend(logLine);
      if (logStreamEl.children.length > 5) {
        logStreamEl.removeChild(logStreamEl.lastChild);
      }
      logIndex++;
    }, 3800);
  }
});
