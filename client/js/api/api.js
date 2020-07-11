export const fetchApi = (url, urlMethod = 'GET', urlBody = {}) => {
    let options = {
        method: urlMethod,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (urlMethod !== 'GET') {
        options.body = JSON.stringify(urlBody);
    }

    return fetch(`http://0.0.0.0:9005/openeat-a325a/us-central1/api/${url}`, options).then(response => response.json())
    .then(response => response)
    .catch(error => console.error(error));
}