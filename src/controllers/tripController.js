import EditForm from '../components/editform.js';
import Card from '../components/card.js';
import {RenderPosition, render, replace, renderIns} from '../utils/render.js';
import Route from '../components/route.js';
import SortForm from '../components/sortform.js';
import List from '../components/list.js';
import NoPoints from '../components/no-points.js';
import {getShuffle} from '../mock/editformmock.js';

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

  render(cards) {

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

    // вставляем карточки в список
    siteCardElements.forEach((cardElement) => {
      getShuffle(cards).slice(0, 4)
        .forEach((card) => {
          renderCard(card, cardElement);
        });
    });
  }
}
