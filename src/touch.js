export default class WheelEvents {
  constructor(sessions) {
    this.sessions = sessions;

    this.touchstart = $event => this.onTouchStart($event);
    this.touchmove = $event => this.onTouchMove($event);
    this.touchend = $event => this.onTouchEnd($event);
    this.touchcancel = $event => this.onTouchCancel($event);
  }

  onTouchStart($event) {
    $event.preventDefault();
    this.startY = $event.touches[0].screenY;
  }

  onTouchMove($event) {
    $event.preventDefault();
    this.lastY = $event.touches[0].screenY;
  }

  onTouchEnd($event) {
    $event.preventDefault();
    if (this.startY > this.lastY) {
      this.sessions.scrollNextSession();
    } else if (this.startY < this.lastY) {
      this.sessions.scrollPreviousSession();
    }
  }

  onTouchCancel($event) {
    $event.preventDefault();
    this.startY = 0;
    this.lastY = 0;
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
