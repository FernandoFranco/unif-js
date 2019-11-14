import Sections from './sections';
import Wheel from './wheel';
import Keys from './keys';
import Touch from './touch';
import Hash from './hash';

class UnifJS {
  constructor(selector, config = {}) {
    this.config = config;
    this.sections = new Sections(selector, {
      sectionSelector: config.sectionSelector || '.unif-section',
      onScroll: ({ from, to }) => {
        if (!config.disableHash && this.hash && to) this.hash.setHashBySection(to);
        if (config.onScroll instanceof Function) {
          config.onScroll({
            from: this.hash.getHashBySession(from),
            to: this.hash.getHashBySession(to),
          });
        }
      },
    });

    this.events = [];
    if (!config.disableWheel) this.events.push(new Wheel(this.sections));
    if (!config.disableKeys) this.events.push(new Keys(this.sections, config));
    if (!config.disableTouch) this.events.push(new Touch(this.sections));

    this.hash = new Hash(this.sections);
    if (!config.disableHash) this.events.push(this.hash);

    this.start();
  }

  start() {
    this.sections.load();
    this.events.forEach(event => event.start());

    if (!this.config.disableHash) {
      setTimeout(() => {
        const section = this.hash.getSectionByHash();
        if (section) this.sections.scrollTo(section);
        else this.sections.scrollToFirst();
      }, 300);
    }
  }

  stop() {
    this.events.forEach(event => event.stop());
  }

  reload() {
    this.stop();
    setTimeout(() => { this.start(); }, 200);
  }

  setConfig(attr, value) {
    this.config[attr] = value;
  }

  setSession(sessionIdentifier) {
    let session = null;
    if (typeof sessionIdentifier === 'number') {
      session = this.sections.list[sessionIdentifier];
    } else if (typeof sessionIdentifier === 'string') {
      session = this.hash.getSectionByHash(sessionIdentifier);
    }

    if (!session) return;
    this.sections.scrollTo(session);
  }
}

window.UnifJS = UnifJS;
export default UnifJS;
