import { Observable } from 'rxjs';

const apiUri = 'https://api.github.com/users';

const moreButton = document.getElementById('more');
const moreClick = Observable.fromEvent(moreButton, 'click');
const clearButton = document.getElementById('clear');
const clearClick = Observable.fromEvent(clearButton, 'click');
const resultsTarget = document.getElementById('results');

let lastId = 0;

moreClick.flatMap(() => (getData()))
  .subscribe(
    (d) => appendData(d),
    () => {}
  );

clearClick.subscribe(() => {
  resultsTarget.innerText = '';
});

const getData = () => {
  return Observable.create(obs => {
    const uri = apiUri + `?since=${lastId}`;
    fetch(uri)
      .then(resp => {
        if (resp.ok) {
          resp.json()
          .then(data => {
            obs.next(data);
            obs.complete();
            lastId += getLastDataId(data);
          });
        } else {
          obs.error(resp);
        }
      });
  }).retryWhen(retryStrategy());
};

const retryStrategy = () => {
  return (errors) => {
    return errors
      .scan((retries) => {
        return retries + 1;
      }, 0)
      .takeWhile((retries) => (retries < 3))
      .delay(1000);
  };
};

const getLastDataId = (data) => (data[data.length - 1].id);

const appendData = (data) => {
  data.forEach(appendUser);
};

const appendUser = (user) => {
  const result = document.createElement('div');
  result.innerText = `${user.id} ${user.login}`;
  resultsTarget.appendChild(result);
};
