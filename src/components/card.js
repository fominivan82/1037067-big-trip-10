import {sumTime, getPoint} from './../mock/cardmock.js';
import {createElement} from '../utils.js';


const createCardOffers = (offers) => {
  return offers
    .map((offer) => {
      const {title, price} = offer;
      return (
        `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
       </li>`
      );
    })
    .join(`\n`);
};

const createCard = (offer) => {

  const {type, value, startDate, endDate, startTime, endTime, price, offers, to} = offer;
  const insertCardOffers = createCardOffers(offers);
  const insertCardTime = sumTime(startTime, endTime);
  const insertgetPoint = getPoint(type, to, value);
  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${insertgetPoint}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDate}${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDate}${endTime}">${endTime}</time>
        </p>
        <p class="event__duration">${insertCardTime}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${insertCardOffers}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class Card {
  constructor(arr) {
    this._arr = arr;
    this._element = null;
  }

  getTemplate() {
    return createCard(this._arr);
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
