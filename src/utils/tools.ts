/**
 *
 * @param el HTMLElement to insert into the DOM
 * @returns void
 */
export const insert = (el: HTMLElement) => (child: any) => {
  el.appendChild(child);
};

/**
 *
 * @param el HTMLElement to remove from the DOM
 * @returns void
 *
 */
export const remove = (el: HTMLElement) => {
  el.remove();
};

/**
 *
 * @param el HTMLElement to listen to
 * @returns void
 */

export const listener = (el: HTMLElement) => (event: string, callback: () => void) => {
  el.addEventListener(event, callback);
};

export const removeListener = (el: HTMLElement) => (event: string, callback: () => void) => {
  el.removeEventListener(event, callback);
};

export const updateContent = (elem: HTMLElement) => (newContent: any) => {
  elem.innerHTML += newContent;
};

export const getElement = (el: string) => document.querySelector(el);

export const getElements = (el: string) => document.querySelectorAll(el);

export const getElementById = (el: string) => document.getElementById(el);

export const getElementByClass = (el: string) => document.getElementsByClassName(el);

export const getElementByTag = (el: string) => document.getElementsByTagName(el);

export const getElementByName = (el: string) => document.getElementsByName(el);

export const getElementByQuery = (el: string) => document.querySelector(el);

export const getElementByQueryAll = (el: string) => document.querySelectorAll(el);

export const toggleClass = (el: HTMLElement) => (className: string) => {
  el.classList.toggle(className);
};
