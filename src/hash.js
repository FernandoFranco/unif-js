export default class Hash {
  constructor(sessions) {
    this.sessions = sessions;

    this.hashchange = $event => this.onHashChange($event);
  }

  getHashBySession(session) {
    return (session && session.dataset.unif) || null;
  }

  setHashBySession(session) {
    window.location.hash = session.dataset.unif;
  }

  getSessionByHash(hash) {
    const unif = (hash || location.hash || '').replace(/^#/, '');
    return this.sessions.list.find(({ dataset }) => dataset.unif === unif);
  }

  onHashChange() {
    const session = this.getSessionByHash();
    if (session) this.sessions.scrollTo(session);
  }

  start() {
    window.addEventListener('hashchange', this.hashchange, false);
  }

  stop() {
    window.removeEventListener('hashchange', this.hashchange, false);
  }
}
