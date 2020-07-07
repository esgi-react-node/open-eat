import page from "page";
import checkConnectivity from './network.js';
import '../css/app.css';
import { checkConnectedUser, login, logout } from './sdkGoogle.js';
import { fetchOrders } from './orders';

window.addEventListener('load', async () => {
    checkConnectivity();
    
    document.addEventListener('connection-changed', async e => {
        const navbar = document.getElementById('navbar');
        const lostConnectionIcon = document.getElementById('lostConnection');

        if (e.detail) {
            navbar.classList.remove('bg-gray-500')
            navbar.classList.add('bg-teal-500');
            lostConnectionIcon.classList.add('hidden');
        } else {
            navbar.classList.remove('bg-teal-500')
            navbar.classList.add('bg-gray-500')
            lostConnectionIcon.classList.remove('hidden');
        }
    });

    checkConnectedUser();

    await fetchOrders();

    const loginButton = document.getElementById('login');
    loginButton.addEventListener('click', () => {
        login();
    });

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        logout();
    });
});