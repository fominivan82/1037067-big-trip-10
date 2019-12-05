import {createSiteMenuTemplate} from './components/site-menu.js';
import {createRouteTemplate} from './components/route.js';
import {createFilterTemplate} from './components/filter.js';
import {createEditFormTemplate} from './components/editform.js';
import {createCardTemplate} from './components/card.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteRouteElement = document.querySelector(`.trip-main__trip-info`);
const siteMenuElement = document.querySelector(`.trip-main__trip-controls > h2:nth-child(1)`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls > h2:nth-child(2)`);


render(siteRouteElement, createRouteTemplate(), `beforeend`);
render(siteMenuElement, createSiteMenuTemplate(), `afterend`);
render(siteFilterElement, createFilterTemplate(), `afterend`);

const taskEditForm = document.querySelector(`.trip-events`);
render(taskEditForm, createEditFormTemplate(), `beforeend`);

const taskCardElement = taskEditForm.querySelector(`.trip-events__item`);
render(taskCardElement, createCardTemplate(), `afterend`);
