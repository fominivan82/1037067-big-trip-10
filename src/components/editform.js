import {drivePoints, checkPoints, pointCities, shuffleArray, MAX_DESCRIPTIONS, allDescriptions, quantityPhotos, formatTime} from '../mock/editformmock.js';
import {getPointEditForm} from './../mock/cardmock.js';
import {createElement} from '../utils.js';

const createOffers = (offers) => {
  return offers
    .map((offer) => {
      const {type, title, price} = offer;
      return (
        `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}">
        <label class="event__offer-label" for="event-offer-${type}-1">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
      );
    })
    .join(`\n`);
};

const createDescriptions = (descriptions) => {

  return descriptions
    .map((description) => {
      return (
        `${description}`
      );
    })
    .join(`\n`);
};

const createPhotos = (photos) => {
  return photos
    .map(() => {
      return (
        `<img class="event__photo" src="http://picsum.photos/300/150?r=${Math.random()}" alt="Фото с мероприятия">`
      );
    })
    .join(`\n`);
};

// const createTime = (time) => {
//   return (
//     `${time}`
//   );
// };

const createCities = (cities) => {
  return cities
    .map((citi) => {
      return (
        `<option value="${citi}"></option>`
      );
    })
    .join(`\n`);
};

const createPointTypes = (points) => {
  return points
    .map((point) => {
      return (
        `<div class="event__type-item">
          <input
          id="event-type-${point}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${point}"
          />
          <label
          class="event__type-label
          event__type-label--${point}"
          for="event-type-${point}-1">${point}</label>
        </div>`
      );
    })
    .join(`\n`);
};

const createEditFormTemplate = (offer) => {

  const {type, value, startDate, endDate, startTime, endTime, offers, price, to} = offer;

  const drivePoint = createPointTypes(drivePoints);
  const checkPoint = createPointTypes(checkPoints);
  const pointCiti = createCities(pointCities);
  const urlPhoto = createPhotos(quantityPhotos);
  const insertDescription = createDescriptions(shuffleArray(allDescriptions, MAX_DESCRIPTIONS));
  // const showTime = createTime(now);
  const insertOffers = createOffers(offers);
  const insertgetPoint = getPointEditForm(type, to);
  const insertStartDate = formatTime(startDate, startTime);
  const insertEndDate = formatTime(endDate, endTime);

  return (
    `<div>
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${drivePoint}
              </fieldset>
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${checkPoint}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${insertgetPoint}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${value}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${pointCiti}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${insertStartDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${insertEndDate}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${insertOffers}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${insertDescription}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${urlPhoto}
              </div>
            </div>
          </section>
        </section>
      </form>
    </div>`);
};

export default class EditForm {
  constructor(arr) {
    this._arr = arr;
    this._element = null;
  }

  getTemplate() {
    return createEditFormTemplate(this._arr);
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
