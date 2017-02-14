const square = document.querySelector('.square');
let times = 0;
const moveRight = () => {
  ++times;
  if (times === 5) {
    window.clearInterval(interval);
  }
  const margin = square.style.marginLeft.split('px')[0];
  const newMargin = Number(margin) + 100;
  square.style.marginLeft = newMargin + 'px';
};
const interval = window.setInterval(moveRight, 1000);
