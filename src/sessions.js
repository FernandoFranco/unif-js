import { timingSafeEqual } from "crypto";

export default class list {
  constructor(selector, config) {
    this.container = selector;
    if (typeof selector === 'string') this.container = document.querySelector(selector);
    if (!this.container) throw new Error('Container not found');

    this.onScroll = config.onScroll;
    this.sessionSelector = config.sessionSelector;
    this.load();
  }

  load() {
    this.list = Array.from(this.container.querySelectorAll(this.sessionSelector));
    this.list.forEach((session, index) => {
      session.dataset.unif = session.dataset.unif || session.id ||`page${index + 1}`;
      session.id = `session-${index + 1}`;
    });
  }

  scrollTo(session) {
    const timer = (new Date()).getTime();
    if ((timer - (this.timer || 0)) < 200) return;
    this.timer = timer;

    this.onScroll({ from: this.current, to: session });

    this.current = session;
    session.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  scrollNextSession() {
    const nextIndex = this.list.indexOf(this.current) + 1;
    if (nextIndex === this.list.length) return;
    this.scrollTo(this.list[nextIndex]);
  }

  scrollPreviousSession() {
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
