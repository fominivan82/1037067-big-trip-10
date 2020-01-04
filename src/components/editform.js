import {MAX_OFFERS, drivePoints, checkPoints, pointCities, allOffers, shuffleArray, MAX_DESCRIPTIONS, allDescriptions, now, quantityPhotos} from '../mock/editformmock.js';

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

const createTime = (time) => {
  return (
    `${time}`
  );
};

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

export const createEditFormTemplate = () => {

  const drivePoint = createPointTypes(drivePoints);
  const checkPoint = createPointTypes(checkPoints);
  const pointCiti = createCities(pointCities);
  const urlPhoto = createPhotos(quantityPhotos);
  const insertDescription = createDescriptions(shuffleArray(allDescriptions, MAX_DESCRIPTIONS));
  const showTime = createTime(now);
  const insertOffers = createOffers(shuffleArray(allOffers, MAX_OFFERS));
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>
      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn" for="sort-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>
      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
    <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
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
            Sightseeing at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
          <datalist id="destination-list-1">
          ${pointCiti}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${showTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${showTime}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
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
    </form>`);
};
