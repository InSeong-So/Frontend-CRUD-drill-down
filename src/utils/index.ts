type AllDataType =
  | string
  | number
  | boolean
  | symbol
  | null
  | undefined
  | any[]
  | object
  | RegExp
  | Date;

export default {
  /**
   * 단일 요소 선택자
   *
   * @param {String} selector
   * @returns
   */
  $: (selector: string): Element => {
    return document.querySelector(selector) as Element;
  },

  /**
   * 현재 부모의 자식 선택자(형제)
   *
   * @param {Element} $element
   * @param {String} parent
   * @param {String} targetSelector
   * @returns
   */
  $sibling: ($element: HTMLElement, parent: string, targetSelector: string) => {
    return ($element.closest(parent) as HTMLElement).querySelector(
      targetSelector,
    );
  },

  /**
   * 복수 요소 선택자
   *
   * @param {String} selector
   * @returns
   */
  $$: (selector: string): NodeList => {
    return document.querySelectorAll(selector) as NodeList;
  },

  /**
   * 깊은 복사
   *
   * @param {Object} state
   * @returns
   */
  deepClone: (state: object): object => {
    return JSON.parse(JSON.stringify(state));
  },

  /**
   * 객체 동결
   *
   * @param {Object} state
   * @returns
   */
  objectFreeze: (state: object): object => {
    return Object.freeze(JSON.parse(JSON.stringify(state)));
  },

  /**
   * 타입 비교
   *
   * @param {Any} target
   * @param {String} type
   * @returns
   */
  isCorrectType: (target: AllDataType, type: string) => {
    return typeof target === type;
  },

  /**
   * 객체 비교
   *
   * @param {Object} object1
   * @param {Object} object2
   * @returns
   */
  isEqualsObject: (object1: object, object2: object): boolean => {
    return JSON.stringify(object1) === JSON.stringify(object2);
  },

  /**
   * 원시값 비교
   *
   * @param {Primitive Value} target1
   * @param {Primitive Value} target2
   * @returns
   */
  isNotEquals: (target1: string | number, target2: string | number) => {
    return target1 !== target2;
  },

  /**
   * 1프레임(16ms)당 1번만 실행되게 제어
   *
   * @param {Function} callback
   * @returns
   */
  debounce: (callback: () => void) => {
    let currentCallback: null | number = null;

    return () => {
      if (currentCallback) {
        cancelAnimationFrame(currentCallback);
        currentCallback = null;
      }
      currentCallback = requestAnimationFrame(() => callback());
    };
  },

  /**
   * MAX 반환
   *
   * @param {Number} target1
   * @param {Number} target2
   * @returns
   */
  getMaxLength: (target1 = 0, target2 = 1) => {
    return Math.max(target1, target2);
  },
};
