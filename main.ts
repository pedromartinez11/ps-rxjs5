import { Observable } from 'rxjs';
import { loadWithFetch } from "./loader";


let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

const renderMoviesFromData = movies => {
    movies.forEach(m => {
        const div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// this should not do a network request since nothing subscribes to it
loadWithFetch('moviess.json')
    .subscribe(
        renderMoviesFromData,
        err => console.log('error: ', err),
        () => console.log('complete')
    );

click
    .flatMap(ev => loadWithFetch("moviess.json"))
    .subscribe(
        data => renderMoviesFromData(data),
        e => console.log('error: ', e),
        () => console.log('complete')
    );