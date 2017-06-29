import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(document, 'click');

const load = (url: string) => {
    console.log('load() outer() ');
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            const data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });

        xhr.open("GET", url);
        xhr.send();
    })
};

const renderMoviesFromData = movies => {
    movies.forEach(m => {
        const div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}

click
    .flatMap(ev => load("movies.json"))
    .subscribe(
        data => renderMoviesFromData(data),
        e => console.log('error: ', e),
        () => console.log('complete')
    );