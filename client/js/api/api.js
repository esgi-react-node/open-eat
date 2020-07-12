export const fetchApi = (url, urlMethod = 'GET', urlBody = {}) => {
    const fromCloudFunction = process.env.NODE_ENV === "production"
    ? `https://us-central1-openeat-a325a.cloudfunctions.net/api/${url}`
    : `http://0.0.0.0:9005/openeat-a325a/us-central1/api/${url}`;

    let options = {
        method: urlMethod,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (urlMethod !== 'GET') {
        options.body = JSON.stringify(urlBody);
    }

    return fetch(fromCloudFunction, options)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(error));
}
