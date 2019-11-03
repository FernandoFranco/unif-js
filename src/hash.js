export default class Hash {
  constructor(sections) {
    this.sections = sections;

    this.hashchange = $event => this.onHashChange($event);
  }

  setHashBySection(section) {
    window.location.hash = section.dataset.unif;
  }

  getSectionByHash() {
    const hash = (location.hash || '').replace(/^#/, '');
    return this.sections.list.find(({ dataset }) => dataset.unif === hash);
  }

  onHashChange() {
    const section = this.getSectionByHash();
    if (section) this.sections.scrollTo(section);
  }

  start() {
    window.addEventListener('hashchange', this.hashchange, false);
  }

  stop() {
    window.removeEventListener('hashchange', this.hashchange, false);
  }
}
