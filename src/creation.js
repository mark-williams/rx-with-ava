import { Observable } from 'rxjs';

const createFromArray = (arr) => {
  return  Observable.from(arr);
};

const fibonaccis = Observable.create((observer) => {
  const last = [0, 1];

  const intervalId = setInterval(() => {
    let number = last[0] + last[1];
    if (number > 100) {
      observer.complete();
      clearInterval(intervalId);
    }
    last[0] = last[1];
    last[1] = number;
    observer.next(number);
  }, 10);
});

const filterEvens = (obs) => {
  return obs.filter((n) => (n % 2 === 0));
};

export { createFromArray, fibonaccis, filterEvens };
