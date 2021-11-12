export default class MenuList {
  private $element: Element;
  private items: Array<string>;

  constructor(element: Element) {
    this.$element = element;
    this.items = [];
    this.render();
  }

  template() {
    return `
    ${this.items
      .map((item, index) => {
        return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name" key=${index}>${item}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>
        `;
      })
      .join('')}
    `;
  }

  getItems(): Array<string> {
    return this.items;
  }

  get itemCount(): number {
    return this.items.length;
  }

  addItem(item: string, callback: (data: number) => void) {
    this.items = [item, ...this.items];
    this.render();
    if (callback) callback(this.itemCount);
  }

  editedItem(index: number, text: string, callback: (data: number) => void) {
    const editedItem = prompt('메뉴 이름을 수정하시겠어요?', text) ?? text;
    this.items[index] = editedItem;
    this.render();
    if (callback) callback(this.itemCount);
  }

  deletedItem(index: number, callback: (data: number) => void) {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;
    this.items = this.items.filter((item, i) => i !== index);
    this.render();
    if (callback) callback(this.itemCount);
  }

  render() {
    this.$element.innerHTML = this.template();
  }
}
