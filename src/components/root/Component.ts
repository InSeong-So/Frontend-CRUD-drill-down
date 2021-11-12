import utils from '../../utils/index.js';
import store from '../../store/index.js';
import changeToDiff from './index.js';

interface Props {
  route: string;
}

interface Store {
  dispatch: (action: any) => void;
  publish: any;
  getState: () => DynamicStateProps;
}

interface DynamicProps {
  [key: string]: (...data: any) => any;
}

interface DynamicStateProps {
  [key: string | symbol]: any;
}

export default class Component {
  private $element: Element;
  public _props: Props | object;
  public _utils: DynamicProps;
  public _store: Store;

  constructor(public element: Element, props: Props | object) {
    this.$element = element;
    this._props = props;
    this._utils = utils;
    this._store = store;
    this.initialized();
    this.render();
  }

  initialized() {
    return;
  }

  template(): string {
    return '';
  }

  render() {
    changeToDiff(this.$element, this.template());
    this.mount();
  }

  mount() {
    return;
  }
}
