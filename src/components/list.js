import AbstractComponent from './abstract.js';

const createListTemplate = () =>
  `<ul class="trip-days">
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">2</span>
        <time class="day__date" datetime="2019-03-19">MAR 19</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">3</span>
        <time class="day__date" datetime="2019-03-18">MAR 20</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>
  </ul>`;

export default class List extends AbstractComponent {

  getTemplate() {
    return createListTemplate();
  }
}
