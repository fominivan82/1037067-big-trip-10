import AbstractComponent from './abstract.js';

const createRouteTemplate = () =>
  `<div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
  </div>`;

export default class Route extends AbstractComponent {

  getTemplate() {
    return createRouteTemplate();
  }
}
