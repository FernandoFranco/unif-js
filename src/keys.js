export default class WheelEvents {
  constructor(sections, config) {
    this.sections = sections;

    this.keyArrowUp = 38;
    this.keyArrowDown = 40;

    this.keyPageUp = 33;
    this.keyPageDown = 34;

    this.keySpaceBar = 32;

    this.keyHome = 36;
    this.keyEnd = 35;

    this.upKeys = [];
    this.downKeys = [];

    if (!config.disableArrowKeys) {
      this.upKeys.push(this.keyArrowUp);
      this.downKeys.push(this.keyArrowDown);
    }

    if (!config.disablePageKeys) {
      this.upKeys.push(this.keyPageUp);
      this.downKeys.push(this.keyPageDown);
    }

    if (!config.disableSpaceBarKey) {
      this.downKeys.push(this.keySpaceBar);
    }

    this.keys = [...this.upKeys, ...this.downKeys];

    if (!config.disableHomeEndKeys) {
      this.keys.push(this.keyHome);
      this.keys.push(this.keyEnd);
    }

    this.keydown = $event => this.onKeyDown($event);
  }

  onKeyDown($event) {
    if (this.keys.includes($event.keyCode)) {
      $event.preventDefault();

      if (this.upKeys.includes($event.keyCode)) this.sections.scrollPreviousSection();
      else if (this.downKeys.includes($event.keyCode)) this.sections.scrollNextSection();
      else if ($event.keyCode === this.keyHome) this.sections.scrollToFirst();
      else if ($event.keyCode === this.keyEnd) this.sections.scrollToLast();
    }
  }

  start() {
    window.addEventListener('keydown', this.keydown);
  }

  stop() {
    window.removeEventListener('keydown', this.keydown);
  }
}
