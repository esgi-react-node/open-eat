export const fetchApi = (url, urlMethod = 'GET', urlBody = {}) => {
    console.group("DEBUG NODE_ENV");
    console.log(JSON.stringify(process.env.NODE_ENV));
    console.groupEnd();

    let options = {
        method: urlMethod,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (urlMethod !== 'GET') {
        options.body = JSON.stringify(urlBody);
    }

    return fetch(fromCloundFunction, options)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(error));
}
