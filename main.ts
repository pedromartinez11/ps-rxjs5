import {Observable, Observer} from 'rxjs';

console.log('hello world');


let numbers = [1, 5, 10];

let source = Observable.from(numbers);

// simpler subscribe that just takes in 3 functions: next(value), error(err), complete();
source.subscribe(
    (value) => console.log(`[inline] value: ${value}`),
    (err) => console.log(`[inline] error: ${err}`),
    () => console.log('[inline] complete')
)

// formal class w/ interface that implements the Observer interface
class MyObserver implements Observer<number>{
    next(value) {
        console.log(`[MyObserver] value: ${value}`);
    }

    error(e) {
        console.log(`[MyObserver]error: ${e}`);
    }

    complete() {
        console.log('[MyObserver] complete');
    }
};

source.subscribe(new MyObserver());