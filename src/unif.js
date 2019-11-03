import Sections from './sections';
import Wheel from './wheel';
import Keys from './keys';
import Touch from './touch';
import Hash from './hash';

class UnifJS {
  constructor(querySelector, config = {}) {
    this.sections = new Sections(querySelector, {
      onScroll: ({ to }) => {
        if (this.hash && to) this.hash.setHashBySection(to);
      },
    });

    this.events = [];
    if (!config.disableWheel) this.events.push(new Wheel(this.sections));
    if (!config.disableKeys) this.events.push(new Keys(this.sections, config));
    if (!config.disableTouch) this.events.push(new Touch(this.sections));

    if (!config.disableHash) {
      this.hash = new Hash(this.sections);
      this.events.push(this.hash);
    }

    this.start();
  }

  start() {
    this.sections.load();
    this.events.forEach(event => event.start());

    setTimeout(() => {
      const section = this.hash.getSectionByHash();
      if (section) this.sections.scrollTo(section);
      else this.sections.scrollToFirst();
    }, 300);
  }

  stop() {
    this.events.forEach(event => event.stop());
  }

  reload() {
    this.stop();
    setTimeout(() => { this.start(); }, 200);
  }
}

window.UnifJS = UnifJS;
export default UnifJS;
