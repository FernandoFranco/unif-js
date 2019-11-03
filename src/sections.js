import { timingSafeEqual } from "crypto";

export default class list {
  constructor(containerQuerySelector, config) {
    this.container = document.querySelector(containerQuerySelector);
    if (!this.container) throw new Error('Container not found');

    this.onScroll = config.onScroll;
    this.load();
  }

  load() {
    this.list = Array.from(this.container.querySelectorAll('.unif-section'));
    this.list.forEach((section, index) => {
      section.dataset.unif = section.dataset.unif || section.id ||`page${index + 1}`;
      section.id = `section-${index + 1}`;
    });
  }

  scrollTo(section) {
    const timer = (new Date()).getTime();
    if ((timer - (this.timer || 0)) < 200) return;
    this.timer = timer;

    this.onScroll({ from: this.current, to: section });

    this.current = section;
    section.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  scrollNextSection() {
    const nextIndex = this.list.indexOf(this.current) + 1;
    if (nextIndex === this.list.length) return;
    this.scrollTo(this.list[nextIndex]);
  }

  scrollPreviousSection() {
    const previousIndex = this.list.indexOf(this.current) - 1;
    if (previousIndex < 0) return;
    this.scrollTo(this.list[previousIndex]);
  }
  
  scrollToFirst() {
    this.scrollTo(this.list[0]);
  }

  scrollToLast() {
    this.scrollTo(this.list[this.list.length - 1]);
  }
}
