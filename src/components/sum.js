// функция подсчета полной стоимости поездки. Экспорт в main.
import AbstractComponent from './abstract.js';

const getAllCost = (elements) => {
  let sum = 0;
  elements.forEach((element) => {
    sum += +element.innerText;
  });
  return sum;
};

const createAllCost = (arr) => {

  const insertAllCost = getAllCost(arr);
  return (
    `${insertAllCost}`
  );
};

export default class AllCost extends AbstractComponent {
  constructor(arr) {
    super();
    this._arr = arr;
  }

  getTemplate() {
    return createAllCost(this._arr);
  }
}
