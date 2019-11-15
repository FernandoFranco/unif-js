import Sessions from './sessions';
import Wheel from './wheel';
import Keys from './keys';
import Touch from './touch';
import Hash from './hash';

class UnifJS {
  constructor(selector, config = {}) {
    this.config = config;
    this.sessions = new Sessions(selector, {
      sessionSelector: config.sessionSelector || '.unif-session',
      onScroll: ({ from, to }) => {
        if (!config.disableHash && this.hash && to) this.hash.setHashBySession(to);
        if (config.onScroll instanceof Function) {
          config.onScroll({
            from: this.hash.getHashBySession(from),
            to: this.hash.getHashBySession(to),
          });
        }
      },
    });

    this.events = [];
    if (!config.disableWheel) this.events.push(new Wheel(this.sessions));
    if (!config.disableKeys) this.events.push(new Keys(this.sessions, config));
    if (!config.disableTouch) this.events.push(new Touch(this.sessions, config));

    this.hash = new Hash(this.sessions);
    if (!config.disableHash) this.events.push(this.hash);

    this.start();
  }

  start() {
    this.sessions.load();
    this.events.forEach(event => event.start());

    if (!this.config.disableHash) {
      setTimeout(() => {
        const session = this.hash.getSessionByHash();
        if (session) this.sessions.scrollTo(session);
        else this.sessions.scrollToFirst();
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
      session = this.sessions.list[sessionIdentifier];
    } else if (typeof sessionIdentifier === 'string') {
      session = this.hash.getSessionByHash(sessionIdentifier);
    }

    if (!session) return;
    this.sessions.scrollTo(session);
  }
}

window.UnifJS = UnifJS;
export default UnifJS;
