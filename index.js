import mouseMove from './src/events/mouse';
import { Observable } from 'rxjs';

const circle = document.getElementsByClassName('circle')[0];
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
