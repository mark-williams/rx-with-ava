import mouseMoves from './src/events/mouse';

mouseMoves.subscribe(m => {
  console.log(m);
});
