import { Observable } from 'rxjs';

const createFromArray = (arr) => {
  return  Observable.from(arr);
};

const fibonaccis = Observable.create((observer) => {
  const last = [0, 1];

  const intervalId = setInterval(() => {
    let number = last[0] + last[1];
    if (number > 100) {
      clearInterval(intervalId);
      observer.complete();
    }
    last[0] = last[1];
    last[1] = number;
    observer.next(number);
  }, 10);
});

export { createFromArray, fibonaccis };
