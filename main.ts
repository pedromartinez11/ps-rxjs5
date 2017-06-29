import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

const retryStrategy = ({attemps = 3, delay = 1000}) => {
    return (errors) => {
        return errors
            .scan((acc, theErr) => {
                console.log(`cur acc: ${acc}, val: ${theErr}`);
                return acc + 1;
            }, 0)
            .takeWhile((acc) => {
                return acc < attemps;
            })
            .delay(delay);
    };
};

const load = (url: string) => {
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(retryStrategy({attemps: 5, delay: 2000}));
};

const renderMoviesFromData = movies => {
    movies.forEach(m => {
        const div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}

click
    .flatMap(ev => load("moviess.json"))
    .subscribe(
        data => renderMoviesFromData(data),
        e => console.log('error: ', e),
        () => console.log('complete')
    );