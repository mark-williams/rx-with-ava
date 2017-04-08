import { Observable } from 'rxjs';

const mouseMoves = (ele) => (Observable.fromEvent(ele, 'mousemove'));

export default mouseMoves;
