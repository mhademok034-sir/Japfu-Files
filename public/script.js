class DigitalVault {
  constructor() {
    this.vault = document.getElementById('vault');
    this.lockScreen = document.getElementById('lockScreen');
    this.videoContainer = document.getElementById('videoContainer');
    this.video = document.getElementById('vaultVideo');
    this.hoursEl = document.getElementById('hours');
    this.minutesEl = document.getElementById('minutes');
    this.secondsEl = document.getElementById('seconds');
    this.messageEl = document.querySelector('.message');

    this.interval = null;
    console.log('🔒 Vault initialized');
    this.init();
  }

  async init() {
    console.log('🚀 Checking status...');
    try {
      await this.checkStatus();
    } catch (error) {
      console.error('❌ Init failed:', error);
      this.messageEl.textContent = '🔄 Connecting to server...';
      setTimeout(() => this.init(), 2000);
    }
  }

  async checkStatus() {
    console.log('📡 Fetching /api/status...');
    try {
      const response = await fetch('/api/status', {
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' }
      });

      console.log('📊 Status response:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Status data:', data);

      if (data.released) {
        await this.unlockVault();
      } else {
        this.updateCountdown(data);
        // Check every 1 second
        this.interval = setInterval(() => this.checkStatus(), 1000);
      }
    } catch (error) {
      console.error('❌ Status check failed:', error);
      this.messageEl.textContent = '🔄 Retrying in 2s...';
      setTimeout(() => this.checkStatus(), 2000);
    }
  }

  updateCountdown(data) {
    this.hoursEl.textContent = data.hours.toString().padStart(2, '0');
    this.minutesEl.textContent = data.minutes.toString().padStart(2, '0');
    this.secondsEl.textContent = data.seconds.toString().padStart(2, '0');
    
    this.messageEl.textContent = `${data.hours}h ${data.minutes}m ${data.seconds}s remaining`;
  }

  async unlockVault() {
    console.log('🔓 Unlocking vault...');
    if (this.interval) clearInterval(this.interval);

    try {
      const response = await fetch('/api/video-link');
      const data = await response.json();
      
      this.video.src = data.videoUrl;
      this.video.load();
      
      this.vault.classList.add('unlocked');
      this.lockScreen.style.opacity = '0';
      setTimeout(() => {
        this.lockScreen.style.display = 'none';
        this.videoContainer.classList.add('show');
      }, 800);
      
    } catch (error) {
      console.error('❌ Unlock failed:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new DigitalVault());
