export default class WheelEvents {
  constructor(sessions) {
    this.sessions = sessions;

    this.wheelEvent = $event => this.onWheel($event);
  }

  onWheel($event) {
    $event.preventDefault();
    if ($event.deltaY > 0) this.sessions.scrollNextSession();
    if ($event.deltaY < 0) this.sessions.scrollPreviousSession();
  }

  start() {
    window.addEventListener('wheel', this.wheelEvent, { passive: false });
    document.addEventListener('wheel', this.wheelEvent, { passive: false });
  }

  stop() {
    window.removeEventListener('wheel', this.wheelEvent, { passive: false });
    document.removeEventListener('wheel', this.wheelEvent, { passive: false });
  }
}
