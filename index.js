import { Observable } from 'rxjs';

const apiUri = 'https://api.github.com/users';

const moreButton = document.getElementById('more');
const moreClick = Observable.fromEvent(moreButton, 'click');
const clearButton = document.getElementById('clear');
const clearClick = Observable.fromEvent(clearButton, 'click');
const resultsTarget = document.getElementById('results');

let lastId = 0;
const getUri = () => {
  return apiUri + `?since=${lastId++}`;
};

moreClick.flatMap(() => (getData()))
  .subscribe(
    (d) => appendData(d),
    () => {}
  );

clearClick.subscribe(() => {
  resultsTarget.innerText = '';
});

const getData = () => {
  return Observable.fromPromise(
    fetch(getUri())
      .then((r) => r.json()))
      .retryWhen(retryStrategy(3, 500));
};

const retryStrategy = (retryCount, delay) => {
  return (errors) => {
    return errors
      .scan((retries) => {
        return retries + 1;
      }, 0)
      .takeWhile((retries) => (retries < retryCount))
      .delay(delay);
  };
};

const appendData = (data) => {
  data.forEach(appendUser);
  lastId += getLastDataId(data);
};

const appendUser = (user) => {
  const result = document.createElement('div');
  result.innerText = `${user.id} ${user.login}`;
  resultsTarget.appendChild(result);
};

const getLastDataId = (data) => (data[data.length - 1].id);
