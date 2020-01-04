// функция подсчета полной стоимости поездки. Экспорт в main.

export const insertAllCost = (elements) => {
  let sum = 0;
  elements.forEach((element) => {
    sum += +element.innerText;
  });
  return sum;
};
