import {Observable} from 'rxjs';

let numbers = [1, 5, 10];


/** 'observer' param has the .next(val), error(err), complete() methods */
let source = Observable.create((observer) => {
    let i = 0;

    const produceValue = () => {
        const curVal = numbers[i];

        observer.next(curVal);
        i++;
        if (i < numbers.length) {
            // there' more values to process
            setTimeout(produceValue, 2000);
        } else {
            // we're done
            observer.complete();
        }
    }

    produceValue();
});

// simple subscribe that just takes in 3 functions: next(value), error(err), complete();
// it automatically creates an Observer!
source.subscribe(
    (value) => console.log(`value: ${value}`),
    (err) => console.log(`error: ${err}`),
    () => console.log('complete')
);