class DigitalVault {
  constructor() {
    this.hoursEl = document.getElementById('hours');
    this.minutesEl = document.getElementById('minutes');
    this.secondsEl = document.getElementById('seconds');
    this.messageEl = document.querySelector('.message');
    this.vault = document.getElementById('vault');
    this.lockScreen = document.getElementById('lockScreen');
    this.videoContainer = document.getElementById('videoContainer');
    this.video = document.getElementById('vaultVideo');

    this.interval = null;
    this.init();
  }

  async init() {
    console.log('⏰ 12-HOUR COUNTDOWN VAULT STARTED');
    await this.checkStatus();
  }

  async checkStatus() {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      console.log('📊 Server time left:', data);

      if (data.released) {
        await this.unlockVault();
      } else {
        this.updateDisplay(data);
        // Update every second
        this.interval = setInterval(() => this.checkStatus(), 1000);
      }
    } catch (error) {
      console.error('Connection error:', error);
      this.messageEl.textContent = '🔄 Reconnecting...';
      setTimeout(() => this.checkStatus(), 2000);
    }
  }

  updateDisplay(data) {
    // Animate numbers
    this.animateNumber(this.hoursEl, data.hours);
    this.animateNumber(this.minutesEl, data.minutes);
    this.animateNumber(this.secondsEl, data.seconds);
    
    this.messageEl.textContent = `Server-locked: ${data.hours}h ${data.minutes}m ${data.seconds}s remaining`;
  }

  animateNumber(element, newValue) {
    const oldValue = parseInt(element.textContent) || 0;
    if (oldValue !== newValue) {
      element.style.transform = 'scale(1.2)';
      setTimeout(() => element.style.transform = 'scale(1)', 150);
    }
    element.textContent = newValue.toString().padStart(2, '0');
  }

  async unlockVault() {
    console.log('🎉 12 HOURS UP - UNLOCKING!');
    clearInterval(this.interval);

    const response = await fetch('/api/video-link');
    const { videoUrl } = await response.json();
    
    this.video.src = videoUrl;
    
    // Epic unlock animation
    this.vault.classList.add('unlocked');
    this.lockScreen.style.transition = 'opacity 1s';
    this.lockScreen.style.opacity = '0';
    
    setTimeout(() => {
      this.lockScreen.style.display = 'none';
      this.videoContainer.classList.add('show');
      this.video.play().catch(e => console.log('Autoplay blocked'));
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => new DigitalVault());
