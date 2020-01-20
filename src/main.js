import SiteMenu from './components/site-menu.js';
import Route from './components/route.js';
import Filter from './components/filter.js';
import SortForm from './components/sortform.js';
import EditForm from './components/editform.js';
import List from './components/list.js';
import Card from './components/card.js';
import NoPoints from './components/no-points.js';
import {insertAllCost} from './sum.js';
import {RenderPosition, render, renderIns} from './utils.js';
import {allObjPoints} from './mock/cardmock.js';
import {getShuffle} from './mock/editformmock.js';

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
    cardElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    cardElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new Card(arr);

  const editButton = taskComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new EditForm(arr);

  const editForm = taskEditComponent.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, replaceEditToTask);

  render(cardElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteRouteElement = document.querySelector(`.trip-main__trip-info`);
const siteRouteElementPosition = document.querySelector(`.trip-info__cost`);
const siteMenuElement = document.querySelector(`.trip-main__trip-controls`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls > h2:nth-child(2)`);


renderIns(siteMenuElement, new SiteMenu().getElement(), siteFilterElement);
renderIns(siteMenuElement, new Filter().getElement(), null);

const taskEditForm = document.querySelector(`.trip-events`);


const isAllTasksArchived = allObjPoints.every((task) => task.isArchive);

if (isAllTasksArchived) {
  render(taskEditForm, new NoPoints().getElement(), RenderPosition.BEFOREEND);
} else {
  renderIns(siteRouteElement, new Route().getElement(), siteRouteElementPosition);
  render(taskEditForm, new SortForm().getElement(), RenderPosition.AFTERBEGIN);
  render(taskEditForm, new List().getElement(), RenderPosition.BEFOREEND);

  const siteCardElements = document.querySelectorAll(`.trip-events__list`);

  // вставляем карточки в список
  siteCardElements.forEach((cardElement) => {
    getShuffle(allObjPoints).slice(0, 4)
      .forEach((task) => {
        renderCard(task, cardElement);
      });
  });
}

// вставляем итоговую сумму путешествия
const sumCost = document.querySelectorAll(`.event__price-value`);
const insertSumCost = document.querySelector(`.trip-info__cost-value`);

render(insertSumCost, insertAllCost(sumCost), RenderPosition.BEFOREEND);

