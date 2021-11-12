interface Props {
  route: string;
}

export default class Component {
  private $element: Element;
  private _props: Props;

  constructor(public element: Element, props: Props) {
    this.$element = element;
    this._props = props;
    this.initialized();
    this.render();
  }

  initialized(): void {
    return;
  }

  template(): string {
    return '';
  }

  render(): void {
    this.mount();
    return;
  }

  mount(): void {
    return;
  }
}
