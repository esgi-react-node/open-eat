import checkConnectivity from './network.js';
import '../css/app.css';

window.addEventListener('load', async () => {
    checkConnectivity();
    
    document.addEventListener('connection-changed', async e => {
        const navbar = document.getElementById('navbar');
        const lostConnectionIcon = document.getElementById('lostConnection');

        if (e.detail) {
            navbar.classList.remove('bg-gray-500')
            navbar.classList.add('bg-teal-500')
            lostConnectionIcon.style.visibility = 'hidden'
        } else {
            navbar.classList.remove('bg-teal-500')
            navbar.classList.add('bg-gray-500')
            lostConnectionIcon.style.visibility = 'visible'
        }
    });
});
