/* ==========================================================================
   OXNULL TERMINAL UPLINK & CLEARANCE PORTAL
   Interactive Bash Shell • Form Validation • Holographic Pass Generation
   ========================================================================== */

class TerminalUplink {
  constructor() {
    this.stream = document.getElementById('terminal-stream');
    this.form = document.getElementById('bash-recruitment-form');
    this.passCard = document.getElementById('clearance-pass-card');
    this.cliInput = document.getElementById('cli-command-input');
    
    this.commandHistory = [];
    this.historyIndex = -1;

    this.init();
  }

  init() {
    this.bindFormEvents();
    this.bindCLIEvents();
    this.logInitialBootMessage();
  }

  logInitialBootMessage() {
    if (!this.stream) return;
    this.appendStreamLine('SYSTEM: OXNULL Zero-Gravity Uplink v4.8.2 Initialized.', 'info');
    this.appendStreamLine('ENCRYPTION: Quantum-Resistant AES-256-GCM Handshake Verified.', 'success');
    this.appendStreamLine('STATUS: Operative Clearance Gate is currently OPEN. Type "help" or complete bash credentials below.', 'normal');
  }

  appendStreamLine(text, type = 'normal') {
    if (!this.stream) return;
    const line = document.createElement('div');
    line.className = `terminal-stream-line ${type}`;
    line.textContent = `> ${text}`;
    this.stream.appendChild(line);
    this.stream.scrollTop = this.stream.scrollHeight;
  }

  bindCLIEvents() {
    if (!this.cliInput) return;

    this.cliInput.addEventListener('keydown', (e) => {
      if (window.cyberAudio) window.cyberAudio.playKeystroke();

      if (e.key === 'Enter') {
        const cmd = this.cliInput.value.trim();
        this.cliInput.value = '';
        if (cmd) {
          this.commandHistory.push(cmd);
          this.historyIndex = this.commandHistory.length;
          this.executeCommand(cmd);
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.cliInput.value = this.commandHistory[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.cliInput.value = this.commandHistory[this.historyIndex] || '';
        } else {
          this.historyIndex = this.commandHistory.length;
          this.cliInput.value = '';
        }
      }
    });
  }

  executeCommand(rawCmd) {
    const parts = rawCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    this.appendStreamLine(`oper@oxnull:~$ ${rawCmd}`, 'normal');

    switch (command) {
      case 'help':
        this.appendStreamLine('AVAILABLE DIRECTIVES:', 'info');
        this.appendStreamLine('  help               - Display this help briefing', 'normal');
        this.appendStreamLine('  tracks             - Inspect the 7 Orbital Cyber Tracks', 'normal');
        this.appendStreamLine('  status             - Telemetry readout & orbital altitude', 'normal');
        this.appendStreamLine('  pulse              - Detonate a zero-G shockwave', 'normal');
        this.appendStreamLine('  zero-g             - Toggle or invert gravitational physics', 'normal');
        this.appendStreamLine('  clear              - Purge terminal buffer', 'normal');
        this.appendStreamLine('  apply              - Focus recruitment application fields', 'normal');
        this.appendStreamLine('  whoami             - Identify active session operative', 'normal');
        break;

      case 'tracks':
        this.appendStreamLine('ORBITAL DOMAINS (07 TRACKS):', 'info');
        this.appendStreamLine('  [01] Awareness          - Social engineering & baseline hygiene', 'normal');
        this.appendStreamLine('  [02] Explore            - Beginner sandboxes & Linux tooling', 'normal');
        this.appendStreamLine('  [03] Blue & Red Team    - Adversary emulation vs active defense', 'normal');
        this.appendStreamLine('  [04] Digital Forensics  - Memory dumps & artifact carving', 'normal');
        this.appendStreamLine('  [05] Cryptography       - RSA/ECC attacks & cipher breaking', 'normal');
        this.appendStreamLine('  [06] Cloud Security     - AWS/GCP/K8s container runtime defense', 'normal');
        this.appendStreamLine('  [07] Security Arch      - Zero Trust & STRIDE threat modeling', 'normal');
        break;

      case 'status':
        this.appendStreamLine('TELEMETRY STATUS: DEFCON 1 // SYS NOMINAL', 'success');
        this.appendStreamLine('ORBIT: 420.69 km // GRAVITATIONAL CONSTANT G = 0.00 m/s²', 'info');
        this.appendStreamLine('ACTIVE OPERATIVES: 842+ // GLOBAL CTF RANK: #04', 'normal');
        break;

      case 'pulse':
        if (window.zeroGPhysics) {
          window.zeroGPhysics.triggerShockwave(window.innerWidth / 2, window.innerHeight / 2, 1.4);
        }
        this.appendStreamLine('GRAVITATIONAL SHOCKWAVE DISCHARGED!', 'warn');
        break;

      case 'zero-g':
        if (window.zeroGPhysics) {
          window.zeroGPhysics.invertGravity();
        }
        this.appendStreamLine('GRAVITATIONAL VECTORS INVERTED // MASS DISPLACEMENT APPLIED.', 'warn');
        break;

      case 'clear':
        if (this.stream) this.stream.innerHTML = '';
        break;

      case 'apply':
        const firstInput = document.getElementById('applicant-callsign');
        if (firstInput) {
          firstInput.focus();
          firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        this.appendStreamLine('READY FOR APPLICANT INPUT. PROCEED WITH CLEARANCE FIELDS.', 'info');
        break;

      case 'whoami':
        this.appendStreamLine('SESSION: UNVERIFIED CADET // CLEARANCE: LEVEL 0 (PENDING SUBMISSION)', 'info');
        break;

      default:
        this.appendStreamLine(`Command not recognized: "${command}". Type "help" for options.`, 'error');
        break;
    }
  }

  bindFormEvents() {
    if (!this.form) return;

    this.form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('keydown', () => {
        if (window.cyberAudio) window.cyberAudio.playKeystroke();
      });
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const callsign = document.getElementById('applicant-callsign').value.trim() || 'OPERATIVE_NULL';
      const email = document.getElementById('applicant-email').value.trim() || 'anon@oxnull.org';
      const track = document.getElementById('applicant-track').value || 'Track 2: Explore';
      const tier = document.getElementById('applicant-tier').value || 'Cyber Cadet';
      const intel = document.getElementById('applicant-intel').value.trim() || 'Zero-gravity security enthusiast.';
      const pgp = document.getElementById('applicant-pgp').value.trim() || '0x4F9B7C12';

      this.appendStreamLine(`TRANSMITTING CLEARANCE APPLICATION FOR [${callsign}]...`, 'warn');
      this.appendStreamLine(`ALLOCATING ORBITAL SECTOR IN [${track}]...`, 'info');

      // Trigger massive particle shockwave explosion
      const rect = this.form.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      if (window.zeroGPhysics) {
        window.zeroGPhysics.triggerShockwave(centerX, centerY, 2.2);
        // Secondary pulse 150ms later for double explosion effect
        setTimeout(() => {
          window.zeroGPhysics.triggerShockwave(centerX, centerY, 1.8);
        }, 180);
      }

      // Audio celebration
      if (window.cyberAudio) {
        window.cyberAudio.playClearance();
      }

      // Generate Pass
      setTimeout(() => {
        this.appendStreamLine(`✓ CLEARANCE GRANTED: AGENT ID OXN-${Math.floor(1000 + Math.random() * 9000)}.`, 'success');
        this.renderClearancePass({ callsign, email, track, tier, intel, pgp });
      }, 400);
    });
  }

  renderClearancePass(data) {
    if (!this.passCard) return;

    const passId = `OXN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const hash = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    document.getElementById('pass-id-val').textContent = passId;
    document.getElementById('pass-callsign-val').textContent = data.callsign.toUpperCase();
    document.getElementById('pass-track-val').textContent = data.track;
    document.getElementById('pass-tier-val').textContent = data.tier.toUpperCase();
    document.getElementById('pass-hash-val').textContent = hash;
    document.getElementById('pass-auth-date').textContent = new Date().toISOString().split('T')[0];

    this.passCard.classList.add('active');
    this.passCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.terminalUplink = new TerminalUplink();
});
