import page from "page";
import checkConnectivity from './network.js';
import {Renderer} from "../lib/dom.js";

window.addEventListener('load', async () => {
    generateLink('https://fonts.googleapis.com/icon?family=Material+Icons&display=swap')
    generateLink('./resources/css/materialize.min.css');
    generateLink('./css/app.css');

    const link = document.createElement('script');
    link.src = './resources/js/materialize.min.js';
    document.head.appendChild(link);

    checkConnectivity();
    
    document.addEventListener('connection-changed', async e => {
        const navbar = document.getElementById('navbar');
        const lostConnectionIcon = document.getElementById('lostConnection');

        if (e.detail) {
            if (navbar.className !== 'blue') {
                navbar.setAttribute('class', 'blue')
                lostConnectionIcon.style.visibility = 'hidden'
            }
        } else {
            if (navbar.className !== 'grey') {
                navbar.setAttribute('class', 'grey')
                lostConnectionIcon.style.visibility = 'visible'
            }
        }
    });

});

function generateLink(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

const renderer = new Renderer(document.getElementById("root"));

page("/", () => {
    renderer.render(`
        <div>
            <h1>Home page</h1>
            <a href="/signin">Signin page</a>
        </div>
    `);
});

page("/signin", () => {
    renderer.render(`
        <div>
            <h1>Signin page</h1>
            <a href="/">Home page</a>
        </div>
    `);
});

page();
