import mouseMove from './src/events/mouse';
import { Observable } from 'rxjs';

const moreButton = document.getElementById('more');
const moreClick = Observable.fromEvent(moreButton, 'click');
const clearButton = document.getElementById('clear');
const clearClick = Observable.fromEvent(clearButton, 'click');
const resultsTarget = document.getElementById('results');

moreClick.subscribe(() => {
  appendData('wwww');
});

clearClick.subscribe(() => {
  resultsTarget.innerText = '';
});


const appendData = (data) => {
  const result = document.createElement('div');
  result.innerText = data;

  resultsTarget.appendChild(result);
};


const circles = document.getElementsByClassName('circle');
if (circles.length) {
  const circle = circles[0];
  mouseMove(document)
  .filter(e => {
    return (e.clientX > 20 && e.clientX < (window.innerWidth - 40)) &&
      (e.clientY > 20 && e.clientY < (window.innerHeight - 40));
  })
  .map(e => {
    return { x: e.clientX, y: e.clientY };
  })
  .delay(200)
  .subscribe(m => {
    circle.style.left = m.x;
    circle.style.top = m.y;
  });
}
