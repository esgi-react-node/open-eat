import checkConnectivity from './network.js';

window.addEventListener('load', async () => {
    generateLink('https://fonts.googleapis.com/icon?family=Material+Icons&display=swap')
    generateLink('./resources/css/materialize.min.css');
    generateLink('./css/app.css');

    const link = document.createElement('script');
    link.src = './resources/js/materialize.min.js';
    document.head.appendChild(link);

    checkConnectivity({
        interval: 2000
    });
    
    document.addEventListener('connection-changed', async e => {
        let root = document.documentElement;
        
        if (e.detail) {
            root.style.setProperty('--app-blue', '#007eef');
            console.log('online')
        } else {
            root.style.setProperty('--app-blue', '#7D7D7D');
            console.log('offline')
        }
    });
});

function generateLink(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}
