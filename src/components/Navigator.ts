import { CHANGE_CATEGORY } from '../constants/index.js';
import Component from './root/Component.js';

interface Props {
  route: string;
}

interface NavigationItem {
  'category-name': string;
  text: string;
}

export default class Navigator extends Component {
  private navItem: NavigationItem[];

  constructor(element: Element, props: Props | object) {
    super(element, props);
  }

  initialized() {
    this.navItem = [
      { 'category-name': 'espresso', text: '☕ 에스프레소' },
      { 'category-name': 'frappuccino', text: '🥤 프라푸치노' },
      { 'category-name': 'blended', text: '🍹 블렌디드' },
      { 'category-name': 'teavana', text: '🫖 티바나' },
      { 'category-name': 'desert', text: '🍰 디저트' },
    ];
  }

  template() {
    return `
    ${this.navItem
      .map(category => {
        return `
        <button data-category-name="${category['category-name']}" class="cafe-category-name btn bg-white shadow mx-1">
        ${category.text}
        </button>
        `;
      })
      .join('')}
    `;
  }

  mount() {
    const $$navButton = this._utils.$$('.cafe-category-name');
    $$navButton.forEach(($button: HTMLButtonElement) => {
      $button.addEventListener('click', event => {
        const target = event.target as HTMLButtonElement;
        if (
          target.dataset['categoryName'] !==
          this._store.getState()['currentCategory']
        ) {
          this._store.dispatch({
            type: CHANGE_CATEGORY,
            currentCategory: target.dataset.categoryName as string,
            currentCategoryText: (target.textContent as string).trim(),
          });
        }
      });
    });
  }
}
