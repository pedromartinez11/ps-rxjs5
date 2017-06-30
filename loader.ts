import { Observable } from "rxjs/Rx";

export const retryStrategy = ({ attemps = 3, delay = 1000 } = {}) => {
    return (errors) => {
        return errors
            .scan((acc, theErr) => {
                // console.log('retryStragegy .scan() cur acc:', acc, ', theErr: ', theErr);

                acc++;
                if (acc < attemps) {
                    return acc;
                } else {
                    throw new Error(theErr);
                }
            }, 0)
            .takeWhile((acc) => {
                return acc < attemps;
            })
            .delay(delay);
    };
};

export const loadWithFetch = (url: string) => {
    return Observable.defer(() => {
        return Observable.fromPromise(
            fetch(url)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(response);
                    }
                })
        );
    }).retryWhen(retryStrategy());
};

export const loadXHR = (url: string) => {
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest();

        const loadHandler = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        };
        xhr.addEventListener('load', loadHandler);

        xhr.open("GET", url);
        xhr.send();

        return () => {
            // handle cancel & cleanup
            console.log('cleanup');
            xhr.removeEventListener('load', loadHandler);
            xhr.abort();
        };

    }).retryWhen(retryStrategy({ attemps: 5, delay: 2000 }));
};
