export default class Hash {
  constructor(sessions) {
    this.sessions = sessions;

    this.hashchange = $event => this.onHashChange($event);
  }

  getHashBySession(session) {
    return (session && session.dataset.unif) || null;
  }

  setHashBySection(session) {
    window.location.hash = session.dataset.unif;
  }

  getSectionByHash(hash) {
    const unif = (hash || location.hash || '').replace(/^#/, '');
    return this.sessions.list.find(({ dataset }) => dataset.unif === unif);
  }

  onHashChange() {
    const session = this.getSectionByHash();
    if (session) this.sessions.scrollTo(section);
  }

  start() {
    window.addEventListener('hashchange', this.hashchange, false);
  }

  stop() {
    window.removeEventListener('hashchange', this.hashchange, false);
  }
}
