import { Observable } from 'rxjs';

let circle = document.getElementById('circle');

/** 'observer' param has the .next(val), error(err), complete() methods */
let source = Observable.fromEvent(document, 'mousemove')
    .map((ev: MouseEvent) => {
        return {
            x: ev.clientX,
            y: ev.clientY
        }
    })
    .filter(val => val.x < 500 && val.y < 500)
    .delay(300);

const onNext = (value) => {
    circle.style.left = value.x + 'px';
    circle.style.top = value.y + 'px';
};

// simple subscribe that just takes in 3 functions: next(value), error(err), complete();
// it automatically creates an Observer!
source.subscribe(
    onNext,
    (err) => console.log(`error: ${err}`),
    () => console.log('complete')
);

// output 10, 20
// 2 (doubled from 1) is skipped because it was filtered out