import EditForm from '../components/editform.js';
import Card from '../components/card.js';
import {RenderPosition, render, replace, renderIns, delElements} from '../utils/render.js';
import Route from '../components/route.js';
import SortForm, {SortType} from '../components/sortform.js';
import List from '../components/list.js';
import NoPoints from '../components/no-points.js';
import {createArr} from '../mock/cardmock.js';

// функция отрисовки карточк и формы
const renderCard = (arr, cardElement) => {


  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const taskComponent = new Card(arr);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new EditForm(arr);

  taskEditComponent.setSubmitHandler(replaceEditToTask);

  render(cardElement, taskComponent, RenderPosition.BEFOREEND);
};

export default class TripController {

  constructor(container) {
    this._container = container;

    this._noPoints = new NoPoints();
    this._sortForm = new SortForm();
    this._list = new List();
    this._route = new Route();
  }

  renderMain(cards) {

    const container = this._container;
    const isAllTasksArchived = cards.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noPoints, RenderPosition.BEFOREEND);
      return;
    }

    const siteRouteElement = document.querySelector(`.trip-main__trip-info`);
    const siteRouteElementPosition = document.querySelector(`.trip-info__cost`);
    renderIns(siteRouteElement, this._route, siteRouteElementPosition);
    render(container, this._sortForm, RenderPosition.AFTERBEGIN);
    render(container, this._list, RenderPosition.BEFOREEND);

    const siteCardElements = document.querySelectorAll(`.trip-events__list`);
    const allObj = createArr(siteCardElements, cards);

    // вставляем карточки в список

    const renderAllObj = (cardElements, siteElements) => {
      cardElements.forEach((cardElement, i) => {

        cardElement.forEach((card) => {
          renderCard(card, siteElements[i]);
        });
      });
    };

    renderAllObj(allObj, siteCardElements);

    this._sortForm.setSortTypeChangeHandler((sortType) => {
      let newArray = [];

      switch (sortType) {
        case SortType.PRICE_UP:
          newArray = [];
          allObj.map((cardElement) => {
            newArray.push(cardElement.slice().sort((a, b) => b.price - a.price));
          });
          break;

        case SortType.TIME_UP:
          newArray = [];
          allObj.map((cardElement) => {
            newArray.push(cardElement.slice().sort((a, b) => b.timeMinuteValue - a.timeMinuteValue));
          });
          break;
        case SortType.DEFAULT:
          newArray = allObj;
          break;
      }
      const delObj = document.querySelectorAll(`.trip-events__item`);
      delElements(delObj);
      renderAllObj(newArray, siteCardElements);
    });


  }
}
