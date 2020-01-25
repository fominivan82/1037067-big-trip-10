import SiteMenu from './components/site-menu.js';
import Filter from './components/filter.js';
import AllCost from './components/sum.js';
import {RenderPosition, render, renderIns} from './utils/render.js';
import TripController from './controllers/tripController.js';
import {allObjPoints} from './mock/cardmock.js';

const siteMenuElement = document.querySelector(`.trip-main__trip-controls`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls > h2:nth-child(2)`);

renderIns(siteMenuElement, new SiteMenu(), siteFilterElement);
renderIns(siteMenuElement, new Filter(), null);

const taskEditForm = document.querySelector(`.trip-events`);
const tripController = new TripController(taskEditForm);

tripController.renderMain(allObjPoints);

// вставляем итоговую сумму путешествия
const sumCost = document.querySelectorAll(`.event__price-value`);
const insertSumCost = document.querySelector(`.trip-info__cost-value`);

render(insertSumCost, new AllCost(sumCost), RenderPosition.BEFOREEND);
