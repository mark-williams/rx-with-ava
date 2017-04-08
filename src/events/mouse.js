import { Observable } from 'rxjs';

const mouseMoves = Observable.fromEvent(document, 'mousemove');

export default mouseMoves;
