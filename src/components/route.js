import {createElement} from '../utils.js';

const createRouteTemplate = () =>
  `<div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
  </div>
</section>`;

export default class Route {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRouteTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
