export const drivePoints = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
export const checkPoints = [`sightseeing`, `restaurant`, `check-in`];
export const pointCities = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Madrid`, `Prague`];
export const QUANTITY_PHOTOS = 10;
export const ZERO = 0;
export const MAX_OFFERS = 2;
export const MAX_DESCRIPTIONS = 3;
export const allDescriptions = [
  `Dolore ut ut culpa ex dolor commodo elit quis dolor cillum exercitation magna ut.`,
  `Lorem ipsum duis sed laborum consectetur qui dolore adipisicing nisi quis.`,
  `Esse in ad ea consequat commodo dolore sunt magna esse labore commodo fugiat anim voluptate est sit ad velit.`,
  `Aliqua aute ullamco tempor nulla id excepteur adipisicing est consectetur ullamco commodo sit dolor proident occaecat.`,
  `Do ut esse occaecat laborum sed est velit laborum ut aute sed eu voluptate adipisicing dolore.`
];

export const allOffers = [
  {type: `luggage`, title: `Add luggage`, price: 10},
  {type: `comfort`, title: `Switch to comfort class`, price: 150},
  {type: `meal`, title: `Add meal`, price: 2},
  {type: `seats`, title: `Choose seats`, price: 9},
  {type: `train`, title: `Travel by train`, price: 40}
];
// функция подстановки времени сейчас
export let now = new Date();

now = (now.getDate() + `/` + (now.getMonth() + 1) + `/` + (now.getFullYear() - 1) + ` ` + now.getHours() + `:` + (now.getMinutes() < 9 ? `0` + now.getMinutes() : now.getMinutes()));

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция изменения формата времени

export const formatTime = (date, time) => {
  let editFormTime = (date.getDate() + `/` + (date.getMonth() + 1) + `/` + (date.getFullYear() - 1) + ` ` + time);
  return editFormTime;
};
// 2 функции случайного перемешивания массива
export const getShuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const shuffleArray = (arr, quantity) => {
  getShuffle(arr);
  return arr
    .slice(ZERO, quantity);
};

// функция случайного создания массива
export const quantityPhotos = new Array(getRandom(ZERO, QUANTITY_PHOTOS)).fill(``);
