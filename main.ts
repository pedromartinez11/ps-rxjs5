import {Observable} from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(document, 'click');

const load = (url: string) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        const movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            const div = document.createElement('div');
            div.innerText = m.title;
            output.appendChild(div);
        });
    });

    xhr.open("GET", url);
    xhr.send();
};

click.subscribe(
    ev => load('movies.json'),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);
