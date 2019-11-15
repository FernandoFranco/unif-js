export default class WheelEvents {
  constructor(sessions) {
    this.sessions = sessions;
    this.minDiff = Number(config.minTouchMove || 50);

    this.touchstart = $event => this.onTouchStart($event);
    this.touchmove = $event => this.onTouchMove($event);
    this.touchend = $event => this.onTouchEnd($event);
    this.touchcancel = $event => this.onTouchCancel($event);

    this.resetValues();
  }

  onTouchStart($event) {
    this.startY = $event.touches[0].screenY;
  }

  onTouchMove($event) {
    $event.preventDefault();
    this.lastY = $event.touches[0].screenY;
  }

  onTouchEnd($event) {
    const { startY, lastY } = this;
    this.resetValues();

    if (!startY || !lastY || (Math.abs(startY - lastY) < this.minDiff)) return;

    if (startY > lastY) {
      this.sessions.scrollNextSession();
    } else if (startY < lastY) {
      this.sessions.scrollPreviousSession();
    }
  }

  onTouchCancel($event) {
    $event.preventDefault();
    this.resetValues();
  }

  resetValues() {
    this.startY = null;
    this.lastY = null;
  }

  start() {
    window.addEventListener('touchstart', this.touchstart, { passive: false });
    window.addEventListener('touchmove', this.touchmove, { passive: false });
    window.addEventListener('touchend', this.touchend, { passive: false });
    window.addEventListener('touchcancel', this.touchcancel, { passive: false });
  }

  stop() {
    window.removeEventListener('touchstart', this.touchmove, { passive: false });
    window.removeEventListener('touchmove', this.touchmove, { passive: false });
    window.removeEventListener('touchend', this.touchmove, { passive: false });
    window.removeEventListener('touchcancel', this.touchmove, { passive: false });
  }
}
