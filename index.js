import { Observable } from 'rxjs';

const apiUri = 'https://api.github.com/users';

const moreButton = document.getElementById('more');
const moreClick = Observable.fromEvent(moreButton, 'click');
const clearButton = document.getElementById('clear');
const clearClick = Observable.fromEvent(clearButton, 'click');
const resultsTarget = document.getElementById('results');

let lastId = 0;

moreClick.subscribe(() => {
  getData().subscribe(data => appendData(data));
});

clearClick.subscribe(() => {
  resultsTarget.innerText = '';
});

const getData = () => {
  return Observable.create(obs => {
    const uri = apiUri + `?since=${lastId}`;
    fetch(uri).then(resp => {
      resp.json()
      .then(data => {
        obs.next(data);
        lastId += getLastDataId(data);
      });
    });
  });
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
