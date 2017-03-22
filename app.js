const NUMBER_OF_SQUARES = 100;
const TIMES_MOVE = 800;
const MOVE_BY_PX = 1;

const drawSquares = (n) => {
  for(let i = 0; i < n; i++) {
    const e = document.createElement('div');
    e.className = 'square';
    e.id = 'square' + i;
    const container = document.querySelector('.container');
    container.appendChild(e);
  }
}

drawSquares(NUMBER_OF_SQUARES);

const squares = document.querySelectorAll('.square');
const times = {};
const intervals = {};

const moveRight = (square, index) => {
  times[index] = times[index] + 1;
  if (times[index] === TIMES_MOVE) {
    window.clearInterval(intervals[index]);
  }
  const translate = square.style.transform.match(/translateX\((.*)px\)/);
  const newTranslate = Number(translate && translate[1]) + MOVE_BY_PX;
  square.style.transform = `translateX(${newTranslate}px)`;
};

console.time('prepareForRender');
squares.forEach((square, index) => {
  times[index] = 0;
  intervals[index] = window.setInterval(() => {
    moveRight(square, index);
  }, 0);
})
console.timeEnd('prepareForRender');
