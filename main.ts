import {Observable} from 'rxjs';

let numbers = [1, 5, 10];


/** 'observer' param has the .next(val), error(err), complete() methods */

let source = Observable.create((observer) => {
    numbers.forEach((num) => {
        if (num === 5) {
            observer.error(`oh no! the num was ${num}`);
        }

        observer.next(num);
    });

    observer.complete();
});

// simple subscribe that just takes in 3 functions: next(value), error(err), complete();
source.subscribe(
    (value) => console.log(`value: ${value}`),
    (err) => console.log(`error: ${err}`),
    () => console.log('complete')
);