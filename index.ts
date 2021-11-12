import { $ } from './src/utils/index.js';
import MenuList from './src/components/MenuList.js';

const $inputItem = $('#espresso-menu-name') as HTMLInputElement;
const $menuAddButton = $('#espresso-menu-submit-button') as HTMLButtonElement;
const $list = $('#espresso-menu-list') as HTMLUListElement;

const menuList = new MenuList($list);

window.addEventListener('keypress', event => {
  if (event.key === 'Enter') event.preventDefault();
});

$inputItem.addEventListener('keypress', (event: KeyboardEvent) => {
  if (event.key !== 'Enter') return;
  if (!$inputItem.value) return;
  event.preventDefault();
  menuList.addItem($inputItem.value, setMenuCount);
  $inputItem.value = '';
});

$menuAddButton.addEventListener('click', (event: Event) => {
  event.preventDefault();
  if (!$inputItem.value) return;
  menuList.addItem($inputItem.value, setMenuCount);
  $inputItem.value = '';
});

$list.addEventListener('click', (event: Event) => {
  const $target = event.target as HTMLButtonElement;
  event.preventDefault();
  if ($target.matches('.menu-edit-button')) {
    const $span = ($target.previousSibling as HTMLElement)
      .previousSibling as HTMLSpanElement;

    const targetItemIndex = $span.getAttribute('key') as string;
    const targetItemText = $span.textContent as string;

    menuList.editedItem(+targetItemIndex, targetItemText, setMenuCount);
  } else if ($target.matches('.menu-remove-button')) {
    const $span = (
      (($target.previousSibling as HTMLElement).previousSibling as HTMLElement)
        .previousSibling as HTMLElement
    ).previousSibling as HTMLSpanElement;

    const targetItemIndex = $span.getAttribute('key') as string;

    menuList.deletedItem(+targetItemIndex, setMenuCount);
  }
});

const setMenuCount = (count: number): void => {
  const $menuCount = $('.menu-count') as HTMLSpanElement;
  $menuCount.innerHTML = `총 ${count}개`;
};
