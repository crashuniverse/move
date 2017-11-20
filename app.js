const NUMBER_OF_SQUARES = 50;
const TIMES_MOVE = 890;
const MOVE_BY_PX = 1;

const drawSquares = (n, color) => {
  for(let i = 0; i < n; i++) {
    const e = document.createElement('div');
    e.className = `square ${color}`;
    e.id = `square_${color}_${i}`;
    const container = document.querySelector('.container');
    container.appendChild(e);
  }
}

const drawShadows = (n) => {
  const container = document.querySelector('.container');
  const e = document.createElement('div');
  e.className = `shadows`;
  container.appendChild(e);
  const shadows = document.querySelector('.shadows');
  shadows.style.boxShadow = 'rgba(192, 57, 43, 1) 0px 10px 0px 5px';
  for(let i = 0; i < n; i++) {
    shadows.style.boxShadow = shadows.style.boxShadow +
      `, rgba(192, 57, 43, 1) 0px ${30 + 20 * i}px 0px 5px`;
  }
}

drawSquares(NUMBER_OF_SQUARES, 'green');
drawShadows(NUMBER_OF_SQUARES);

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

console.time('renderBlocks');
squares.forEach((square, index) => {
  times[index] = 0;
  intervals[index] = window.setInterval(() => {
    moveRight(square, index);
  }, 0);
})
console.timeEnd('renderBlocks');
