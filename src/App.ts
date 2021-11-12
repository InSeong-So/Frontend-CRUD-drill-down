import Component from './components/root/Component.js';
import Navigator from './components/Navigator.js';
import Management from './components/Management.js';

interface Props {
  route: string;
}

export default class App extends Component {
  private title: string;

  constructor(element: Element, props: Props | object) {
    super(element, props);
    this.title = '🌝 문벅스 메뉴 관리';
  }

  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4">
          <a href="/" class="text-black">
            <h1 class="text-center font-bold">${this.title}</h1>
          </a>
          <nav class="d-flex justify-center flex-wrap"></nav>
        </header>
        <main class="mt-10 d-flex justify-center"></main>
      </div>
    </div>
    `;
  }

  mount() {
    const $nav = this._utils.$('nav') as HTMLElement;
    new Navigator($nav, {});
    this._store.publish({
      ['rerender']: () => {
        const $main = this._utils.$('main');
        new Management($main, {});
      },
    });
  }
}
