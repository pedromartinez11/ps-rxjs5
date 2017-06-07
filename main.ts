import { Observable } from 'rxjs';

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
            setTimeout(produceValue, 300);
        } else {
            // we're done
            observer.complete();
        }
    }

    produceValue();
}).map(n => {
    // double each val
    return n * 2;
}).filter(n => {
    // only keep items greater than 4
    return n > 4;
});;

// simple subscribe that just takes in 3 functions: next(value), error(err), complete();
// it automatically creates an Observer!
source.subscribe(
    (value) => console.log(`value: ${value}`),
    (err) => console.log(`error: ${err}`),
    () => console.log('complete')
);

// output 10, 20
// 2 (doubled from 1) is skipped because it was filtered out