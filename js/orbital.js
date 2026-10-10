/* ==========================================================================
   OXNULL ORBITAL TRACKS & TRAJECTORY CONTROLLER
   7 Domain HUD Drawers • Interactive Mini-Labs • Countdown Timer
   ========================================================================== */

const TRACK_DATA = {
  1: {
    id: "TRK-01",
    name: "Awareness",
    classification: "Unrestricted",
    classType: "unrestricted",
    subtitle: "Baseline Cyber Hygiene & Social Vector Defense",
    overview: "In a zero-gravity combat theater, humans remain the most vulnerable vector. Track 1 equips operatives with the cognitive defenses to identify deceptive signals, social engineering ploys, spear-phishing payloads, and enterprise hygiene breaches before bad actors breach the perimeter.",
    curriculum: [
      { title: "Spear-Phishing Deconstruction", desc: "Dissect SPF/DKIM/DMARC headers, weaponized attachments, and homograph domain impersonation." },
      { title: "Psychological Attack Vectors", desc: "Analyze urgency triggers, authority impersonation, and zero-day pretexting tactics." },
      { title: "Credential Hygiene & Zero-Trust MFA", desc: "Deploy FIDO2 WebAuthn keys, passkeys, and resist adversary-in-the-middle (AitM) phishing." },
      { title: "Active Community Cyber Drills", desc: "Conduct authorized organization-wide simulation drills and incident reporting protocols." }
    ],
    tools: ["GoPhish", "Sublime Security", "KnowBe4 Sandbox", "YubiKey Manager", "Cofense Reporter"],
    lead: "Operative AURA // Security Culture Architect",
    labType: "awareness"
  },
  2: {
    id: "TRK-02",
    name: "Explore",
    classification: "Unrestricted",
    classType: "unrestricted",
    subtitle: "Foundational Sandboxes, Tooling & Linux Internals",
    overview: "The proving grounds for emerging operatives. Defy gravity by mastering the core command-line tools of cyberspace. Master POSIX internals, network sniffing basics, virtual machine isolation, and dive into introductory CTF challenges across jeopardy categories.",
    curriculum: [
      { title: "Linux Kernel & Shell Mastery", desc: "Bash automation, permissions, procfs inspection, systemd forensics, and vim wizardry." },
      { title: "Network Protocol Deconstruction", desc: "TCP/IP three-way handshakes, ARP spoofing defenses, and raw packet crafting with Scapy." },
      { title: "Introductory CTF War Games", desc: "OverTheWire Bandit walkthroughs, PicoCTF jeopardy mastery, and web request manipulation." },
      { title: "Security Tooling Arsenal", desc: "Nmap port reconnaissance, Netcat listener payloads, Wireshark packet capture, and curl headers." }
    ],
    tools: ["Communication", "Public speaking", "Presentation", "Leadership", "Team work", "Event management", "Discover interests"],
    lead: "Operative CIPHER_0 // Cadet Squadron Commander",
    labType: "explore"
  },
  3: {
    id: "TRK-03",
    name: "Blue Team & Red Team",
    classification: "Top Secret",
    classType: "top-secret",
    subtitle: "Adversary Emulation vs. Active Kinetic Defense",
    overview: "Orbital warfare between offensive breachers and vigilant guardians. Red Team emulates nation-state threat actors utilizing stealth persistence and living-off-the-land techniques; Blue Team leverages SIEM telemetry, EDR hooks, and threat hunting to isolate and terminate the adversary.",
    curriculum: [
      { title: "Red Team: Adversary Emulation", desc: "MITRE ATT&CK tactics, C2 infrastructure setup, DLL side-loading, and evasive payloads." },
      { title: "Blue Team: SIEM Telemetry & Detection", desc: "Splunk query language, Elastic Security, Sigma rules, and Windows Event Log hunting." },
      { title: "Active Threat Hunting", desc: "YARA signature generation, memory process injection detection, and anomalous beacon hunting." },
      { title: "Live War Room Simulation", desc: "Real-time attack vs defense exercises on isolated virtual cloud networks." }
    ],
    tools: ["Splunk SIEM", "Sliver C2", "BloodHound", "Elastic EDR", "Mimikatz", "Atomic Red Team", "Sigma"],
    lead: "Operative VALKYRIE // Kinetic Operations Lead",
    labType: "redblue"
  },
  4: {
    id: "TRK-04",
    name: "Digital Forensics",
    classification: "Confidential",
    classType: "confidential",
    subtitle: "Memory Dump Carving & Cyber Crime Reconstruction",
    overview: "When an intrusion occurs in deep space, digital forensic analysts reconstruct the flight trajectory. Extract volatile artifacts from raw RAM, carve file systems, extract browser histories, decode steganographic payloads, and establish immutable chronological evidence timelines.",
    curriculum: [
      { title: "Volatile Memory Forensics", desc: "Carve raw RAM with Volatility 3, extract injected shellcode, vad tags, and credentials." },
      { title: "Disk Imaging & Artifact Carving", desc: "Bit-stream raw dd images, NTFS MFT parsing, Shimcache, Amcache, and USN journal analysis." },
      { title: "Network Forensics & PCAP Deep Dive", desc: "Reconstruct exfiltrated data streams, TLS session decrypts, and C2 beacon rhythms." },
      { title: "Steganography & Hidden Data", desc: "LSB pixel analysis, audio spectrum carving, and zip archive metadata inspection." }
    ],
    tools: ["Volatility 3", "Autopsy", "FTK Imager", "Wireshark", "Binwalk", "StegSolve", "X-Ways"],
    lead: "Operative GHOST_TRACE // Chief Forensic Investigator",
    labType: "forensics"
  },
  5: {
    id: "TRK-05",
    name: "Cryptography",
    classification: "Top Secret",
    classType: "top-secret",
    subtitle: "Mathematical Fortresses, Post-Quantum & Protocol Attacks",
    overview: "The pure mathematical backbone that keeps gravitational entropy at bay. Master both classical and contemporary cipher mechanisms. Exploit padding oracle vulnerabilities, break poorly seeded RSA primes, dive into Elliptic Curve cryptography, and prepare defenses for the Post-Quantum era.",
    curriculum: [
      { title: "Symmetric Ciphers & Padding Oracles", desc: "AES-CBC bit-flipping, ECB penguin leaks, CTR mode keystream reuse, and Galois GCM integrity." },
      { title: "Asymmetric Cryptography (RSA & ECC)", desc: "Coppersmith theorem, Wiener's small private exponent attack, and ECDSA nonce reuse." },
      { title: "Hash Collisions & Length Extension", desc: "Merkle-Damgård property exploits, SHA-1 collision theory, and HMAC authenticators." },
      { title: "Post-Quantum Cryptography (PQC)", desc: "Lattice-based cryptography, CRYSTALS-Kyber, Dilithium signatures, and quantum resistance." }
    ],
    tools: ["SageMath", "Python Cryptography", "CyberChef", "Hashcat", "John the Ripper", "OpenSSL"],
    lead: "Operative EULER_NULL // Cryptographic Theorist",
    labType: "crypto"
  },
  6: {
    id: "TRK-06",
    name: "Cloud Security",
    classification: "Confidential",
    classType: "confidential",
    subtitle: "Orbital Infrastructure, IAM Hardening & Container Defense",
    overview: "Securing the boundless cloud expanse. Modern cyber infrastructure relies on microservices, serverless Lambdas, and Kubernetes clusters. Learn to exploit and fortify IAM role assumptions, detect misconfigured S3 buckets, prevent container breakout, and secure CI/CD pipelines.",
    curriculum: [
      { title: "Cloud Identity & Access (IAM)", desc: "AWS IAM privilege escalation paths, cross-account trust policies, and GCP service accounts." },
      { title: "Container Runtime Defense", desc: "Docker socket breakout, privileged container escapes, and Linux cgroup isolation testing." },
      { title: "Kubernetes Cluster Hardening", desc: "Admission controllers, RBAC audit, Falco eBPF runtime detection, and NetworkPolicies." },
      { title: "Infrastructure as Code (IaC) Security", desc: "Terraform drift analysis, Checkov policy-as-code, and secret leakage prevention." }
    ],
    tools: ["AWS CLI", "Falco eBPF", "Trivy", "Kube-bench", "Terraform", "BloodHound (Azure/AWS)", "Prowler"],
    lead: "Operative NEBULA_SEC // Cloud Defense Architect",
    labType: "cloud"
  },
  7: {
    id: "TRK-07",
    name: "Security Architecture",
    classification: "Top Secret",
    classType: "top-secret",
    subtitle: "Zero Trust Foundations, Threat Modeling & Resilient Design",
    overview: "The grand orbital blueprint. Security is not an afterthought bolt-on; it is built into the molecular structure of the system. Master STRIDE threat modeling, micro-segmentation, zero-trust authentication boundaries, fault-tolerant cryptographic fabrics, and resilient disaster recovery.",
    curriculum: [
      { title: "STRIDE Threat Modeling Framework", desc: "Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation." },
      { title: "Zero Trust Architecture (ZTA)", desc: "NIST SP 800-207 standards, continuous authentication, identity-aware proxies, and mTLS." },
      { title: "Network Micro-Segmentation", desc: "Software-defined perimeters, ingress/egress filtering, and isolated enclave architectures." },
      { title: "Systemic Resilience & Anti-Fragility", desc: "Chaos engineering for security, Byzantine fault tolerance, and cold disaster recovery." }
    ],
    tools: ["Microsoft Threat Modeling Tool", "OWASP Threat Dragon", "Istio Service Mesh", "Spire SPIFFE", "Draw.io"],
    lead: "Operative ARCHON // Principal Cyber Architect",
    labType: "arch"
  }
};

class OrbitalTracksManager {
  constructor() {
    this.modal = document.getElementById('hud-detail-modal');
    this.closeBtn = document.getElementById('btn-close-drawer');
    this.drawerContent = document.getElementById('drawer-dynamic-content');
    
    this.init();
  }

  init() {
    this.bindCardEvents();
    this.bindModalEvents();
  }

  bindCardEvents() {
    const cards = document.querySelectorAll('.track-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const trackId = card.getAttribute('data-track-id');
        if (trackId && TRACK_DATA[trackId]) {
          if (window.cyberAudio) window.cyberAudio.playHover();
          this.openTrackDrawer(TRACK_DATA[trackId]);
        }
      });
    });
  }

  bindModalEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeTrackDrawer());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeTrackDrawer();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('open')) {
        this.closeTrackDrawer();
      }
    });
  }

  openTrackDrawer(data) {
    if (!this.drawerContent) return;

    this.drawerContent.innerHTML = `
      <div class="drawer-header">
        <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.8rem;">
          <span class="track-id-badge">${data.id}</span>
          <span class="track-classification classification-${data.classType}">${data.classification}</span>
        </div>
        <h2 style="font-size: 2.2rem; color: #fff; margin-bottom: 0.4rem;">${data.name}</h2>
        <p style="font-family: var(--font-mono); color: var(--neon-cyan); font-size: 0.95rem; margin-bottom: 1.2rem;">// ${data.subtitle}</p>
        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem;">${data.overview}</p>
      </div>

      <h3 class="drawer-section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        CURRICULUM MILESTONES
      </h3>
      <div class="drawer-curriculum-list">
        ${data.curriculum.map(item => `
          <div class="drawer-curriculum-item">
            <strong>${item.title}</strong>
            <p style="color: var(--text-secondary);">${item.desc}</p>
          </div>
        `).join('')}
      </div>

      <h3 class="drawer-section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        TACTICAL TOOL ARSENAL
      </h3>
      <div class="drawer-tools-grid">
        ${data.tools.map(tool => `<span class="drawer-tool-pill">${tool}</span>`).join('')}
      </div>
    `;

    this.modal.classList.add('open');
  }

  closeTrackDrawer() {
    if (this.modal) {
      this.modal.classList.remove('open');
    }
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.orbitalTracks = new OrbitalTracksManager();
});
