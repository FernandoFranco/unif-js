export default class WheelEvents {
  constructor(sections) {
    this.sections = sections;

    this.wheelEvent = $event => this.onWheel($event);
  }

  onWheel($event) {
    $event.preventDefault();
    if ($event.deltaY > 0) this.sections.scrollNextSection();
    if ($event.deltaY < 0) this.sections.scrollPreviousSection();
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
