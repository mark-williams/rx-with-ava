import { Observable } from 'rxjs';

const createObservable = (arr) => {
  return  Observable.from(arr);
};

export default createObservable;
