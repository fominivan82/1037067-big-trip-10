import {allOffers, drivePoints, checkPoints, pointCities, getRandom, shuffleArray} from './editformmock.js';

const MAX_PRICE = 600;

// функции случайного времени дата пока нормально не используется
const getRandomDate = () => {
  const date = new Date();

  date.setFullYear(getRandom(2019, 2021), getRandom(0, 11), getRandom(1, 31));

  return date;
};

const getRandomTime = (funchour, funcminutes) => {

  let time = ((funchour <= 9 ? `0` + funchour : funchour) + `:` + (funcminutes <= 9 ? `0` + funcminutes : funcminutes));

  return time;
};

// функция правильного написания точек маршрута

export const getPoint = (type, to, value) => {
  let time = ((`check-in` === type || `sightseeing` === type || `restaurant` === type ? `${type}` : `${type}${to}${value}`));
  return time;
};

export const getPointEditForm = (type, to) => {
  let time = ((`check-in` === type || `sightseeing` === type || `restaurant` === type ? `${type}` : `${type}${to}`));
  return time;
};
// функция правильного написания точек маршрута и гордов для карточки редактирования

export const getPointCities = (point) => {
  let time = ((`check-in` === point || `sightseeing` === point || `restaurant` === point ? ` ` : shuffleArray(pointCities, 1)));
  return time;
};

// собираем массивы и функцию для строки в дне
let allPoints = drivePoints.concat(checkPoints);


export let allObjPoints = allPoints.map((point) => ({
  type: point,
  to: ` to `,
  value: getPointCities(point),
  startDate: getRandomDate(),
  endDate: getRandomDate(),
  startTime: getRandomTime(getRandom(0, 23), getRandom(0, 59)),
  endTime: getRandomTime(getRandom(0, 23), getRandom(0, 59)),
  price: getRandom(0, MAX_PRICE),
  offers: shuffleArray(allOffers, getRandom(0, 3)),
  isArchive: 0 // временно для испытания заглушки  1, пока не сделал календарь)
}));

// функция количества затраченного времени и нужное форматирование
export const sumTime = (startTime, endTime) => {
  const x = (+endTime.charAt(0) * 10 + +endTime.charAt(1)) * 60 + +endTime.charAt(3) * 10 + +endTime.charAt(4);
  const y = (+startTime.charAt(0) * 10 + +startTime.charAt(1)) * 60 + +startTime.charAt(3) * 10 + +startTime.charAt(4);
  let time = ((x - y) < 0 ? 1440 + (x - y) : (x - y));

  const h = Math.trunc(time / 60);
  if (h) {
    let m = (time % 60 <= 9 ? `0` + time % 60 : time % 60);

    time = h + `H ` + m + `M`;
  } else {
    time = time + `M`;
  }
  return time;
};
