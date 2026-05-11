class DigitalVault {
  constructor() {
    this.vault = document.getElementById('vault');
    this.lockScreen = document.getElementById('lockScreen');
    this.videoContainer = document.getElementById('videoContainer');
    this.video = document.getElementById('vaultVideo');
    this.countdownEl = document.getElementById('countdown');
    this.hoursEl = document.getElementById('hours');
    this.minutesEl = document.getElementById('minutes');
    this.secondsEl = document.getElementById('seconds');
    this.messageEl = document.querySelector('.message');

    this.interval = null;
    this.init();
  }

  async init() {
    try {
      await this.checkStatus();
    } catch (error) {
      console.error('Failed to initialize vault:', error);
      this.messageEl.textContent = 'Connection error. Retrying...';
      setTimeout(() => this.init(), 5000);
    }
  }

  async checkStatus() {
    const response = await fetch('/api/status');
    const data = await response.json();

    if (data.released) {
      await this.unlockVault();
    } else {
      this.updateCountdown(data);
      this.interval = setInterval(() => this.checkStatus(), 1000);
    }
  }

  updateCountdown(data) {
    this.hoursEl.textContent = data.hours.toString().padStart(2, '0');
    this.minutesEl.textContent = data.minutes.toString().padStart(2, '0');
    this.secondsEl.textContent = data.seconds.toString().padStart(2, '0');
    
    this.messageEl.textContent = `${data.hours}h ${data.minutes}m ${data.seconds}s remaining`;
  }

  async unlockVault() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    try {
      const response = await fetch('/api/video-link');
      
      if (response.status === 403) {
        // Double-check in case of race condition
        setTimeout(() => this.checkStatus(), 1000);
        return;
      }

      const { videoUrl } = await response.json();
      
      // Security: Only set src after server validation
      this.video.src = videoUrl;
      this.video.load();
      
      // Animate unlock
      this.vault.classList.add('unlocked');
      this.lockScreen.style.opacity = '0';
      setTimeout(() => {
        this.lockScreen.style.display = 'none';
        this.videoContainer.classList.add('show');
        this.video.play().catch(() => {}); // Autoplay with user interaction fallback
      }, 800);
      
    } catch (error) {
      console.error('Failed to unlock vault:', error);
      this.messageEl.textContent = 'Unlock failed. Refresh to retry.';
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DigitalVault();
});
