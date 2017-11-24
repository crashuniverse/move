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
  for(let i = 0; i < n-1; i++) {
    shadows.style.boxShadow = shadows.style.boxShadow +
      `, rgba(192, 57, 43, 1) 0px ${30 + 20 * i}px 0px 5px`;
  }
}

drawSquares(NUMBER_OF_SQUARES, 'green');
drawShadows(NUMBER_OF_SQUARES);

const squares = document.querySelectorAll('.square');
const timesSquares = {};
const intervalsSquares = {};

const moveSquaresRight = (square, index) => {
  timesSquares[index] = timesSquares[index] + 1;
  if (timesSquares[index] === TIMES_MOVE) {
    window.clearInterval(intervalsSquares[index]);
  }
  const translate = square.style.transform.match(/translateX\((.*)px\)/);
  const newTranslate = Number(translate && translate[1]) + MOVE_BY_PX;
  square.style.transform = `translateX(${newTranslate}px)`;
};

console.time('renderBlocks');
squares.forEach((square, index) => {
  timesSquares[index] = 0;
  intervalsSquares[index] = window.setInterval(() => {
    moveSquaresRight(square, index);
  }, 0);
})
console.timeEnd('renderBlocks');

const shadowsElement = document.querySelector('.shadows');
const shadowsString = shadowsElement.style.boxShadow;
const shadows = shadowsString.split('px, ');
const timesShadows = {};
const intervalsShadows = {};
console.time('renderShadows');

const moveShadowsRight = (shadow, index) => {
  timesShadows[index] = timesShadows[index] + 1;
  if (timesShadows[index] === TIMES_MOVE) {
    window.clearInterval(intervalsShadows[index]);
  }
  xPosition = `${timesShadows[index]}px`;
  yPosition = shadows[index].match(/(\d+)px/g)[1];
  shadows[index] = `rgb(192, 57, 43) ${xPosition} ${yPosition} 0px 5px`;

  let newShadowString = '';
  shadows.forEach((shadow) => {
    if (newShadowString === '') {
      newShadowString = shadow;
    } else {
      newShadowString = `${newShadowString}, ${shadow}`;
    }
  })
  shadowsElement.style.boxShadow = newShadowString;
}

shadows.forEach((shadow, index) => {
  timesShadows[index] = 0;
  intervalsShadows[index] = window.setInterval(() => {
    moveShadowsRight(shadow, index);
  }, 0);
});

console.timeEnd('renderShadows');
