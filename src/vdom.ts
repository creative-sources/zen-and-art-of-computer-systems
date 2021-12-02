import {of, BehaviorSubject} from 'rxjs';

var ö = (function () {
  ('use strict');

  let ä = (x: any) => new BehaviorSubject(x);
  /**
   * Create the constructor
   * @param {String} selector The selector to use
   */
  var Constructor: any = function (this: any, selector: string) {
    if (selector === 'document') {
      this.elems = [document];
    } else if (selector === 'window') {
      this.elems = [window];
    } else if (selector === 'body') {
      this.elems = [document.body];
    } else if (selector === '#root') {
      this.elems = document.querySelector('#root');
    } else {
      this.elems = document.querySelectorAll(selector);
    }
  };

  /**
   * Observer
   *
   * */

  Constructor.prototype.observer = function () {
    return ä(this);
  };

  /**
  /**
   * Run a callback on each item
   * @param  {Function} callback The callback function to run
   */
  Constructor.prototype.each = function (callback: (arg0: any, arg1: number) => void) {
    if (!callback || typeof callback !== 'function') return;
    for (var i = 0; i < this.elems.length; i++) {
      callback(this.elems[i], i);
    }
    return this;
  };
  /**
   * Subscribe to an event
   * @param  {String}   eventName The event name
   * @param  {Function} callback  The callback function to run
   * @return {Object}             The instance
   * @example
   * var vdom = new VDOM('body');
   * vdom.on('click', function(e) {
   *  console.log(e);
   * });
   */
  Constructor.prototype.on = function (eventName: string, callback: (arg0: any) => void) {
    if (!callback || typeof callback !== 'function') return;
    this.each(function (elem: any) {
      elem.addEventListener(eventName, callback);
    });
    return this;
  };

  Constructor.prototype.off = function (eventName: string, callback: (arg0: any) => void) {
    if (!callback || typeof callback !== 'function') return;
    this.each(function (elem: any) {
      elem.removeEventListener(eventName, callback);
    });
    return this;
  };

  Constructor.prototype.trigger = function (eventName: string, data: any) {
    this.each(function (elem: any) {
      var event = new CustomEvent(eventName, {
        detail: data,
        bubbles: true,
        cancelable: true,
      });
      elem.dispatchEvent(event);
    });
    return this;
  };

  Constructor.prototype.html = function (html: string) {
    this.each(function (elem: any) {
      elem.innerHTML = html;
    });
    return this;
  };

  Constructor.prototype.of = function (selector: string) {
    let elem = new Constructor(selector);
    const elem$ = of(elem);

    return elem$;
  };

  /**
   * Do ajax stuff
   * @param  {String} url The URL to get
   */
  Constructor.prototype.ajax = function (url: any) {
    // Do some XHR/Fetch thing here
    console.log(url);
  };

  /**
   * Add a class to elements
   * @param {String} className The class name
   */
  Constructor.prototype.addClass = function (className: any) {
    this.each(function (item: {classList: {add: (arg0: any) => void}}) {
      item.classList.add(className);
    });
    return this;
  };

  /**
   * Remove a class to elements
   * @param {String} className The class name
   */
  Constructor.prototype.removeClass = function (className: any) {
    this.each(function (item: {classList: {remove: (arg0: any) => void}}) {
      item.classList.remove(className);
    });
    return this;
  };
  /**
   * Remove a class to elements
   * @param {String} className The class name
   */
  Constructor.prototype.addNode = function (node: Node) {
    this.each(function (item: {appendChild: (arg0: any) => void}) {
      item.appendChild(node);
    });
    return this;
  };

  Constructor.prototype.rawRender = function (elems: any) {
    return JSON.stringify(this.elems);
  };

  var instantiate = function (selector: any) {
    return new Constructor(selector);
  };

  return instantiate;
})();
const vdom = ö('#root');
export default vdom;
