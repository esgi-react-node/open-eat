import { idbOrders } from './idb.js';
import { syncOrder, deleteOrder } from '../api/orders';

const image = new Image();
let tStart = null;
let tEnd = null;
let abortFallback = false;
let counter = 0;
let arrTimes = [];

export default function checkConnectivity() {
    setCheckConnectivity();
    
    document.addEventListener('connection-changed', async e => {
        const navbar = document.getElementById('navbar');
        const lostConnectionIcon = document.getElementById('lostConnection');

        if (e.detail) {
            navbar.classList.remove('bg-gray-500')
            navbar.classList.add('bg-teal-500');
            lostConnectionIcon.classList.add('hidden');

            if (window.localStorage.getItem('connectionType') !== 'online') {
                window.localStorage.setItem('connectionType', 'online')

                await syncData();
            }

        } else {
            navbar.classList.remove('bg-teal-500')
            navbar.classList.add('bg-gray-500')
            lostConnectionIcon.classList.remove('hidden');

            if (window.localStorage.getItem('connectionType') !== 'offline') {
                window.localStorage.setItem('connectionType', 'offline')
            }
        }
    });
}

async function syncData() {
    const db = await idbOrders();

    // Update orders
    const orders = await db.getAllFromIndex('orders', 'isSync', 'false');
    const ordersId = [];

    orders.forEach(async order => {
        ordersId.push(order.id);
        await syncOrder(order);
    });

    const tx = db.transaction('orders', 'readwrite').objectStore('orders');

    ordersId.forEach(async id => {
        const order = await tx.get(id);
        order.isSync = 'true';
        await tx.put(order);
    })

    tx.done;

    // Delete orders
    orders = await db.getAllFromIndex('orders', 'removed', 'true');
    ordersId = [];

    orders.forEach(async ({id}) => {
        await deleteOrder(id);
        db.transaction("orders", "readwrite").objectStore("orders").delete(id);
    });
}

function setCheckConnectivity(url = 'https://www.google.com/images/phd/px.gif', timeToCount = 3, threshold = 3000, interval = 2000) {
    reset();

    if (navigator.onLine) {
        changeConnectivity(true);
    } else {
        timeoutFallback(threshold);
    }

    window.addEventListener('online', () => changeConnectivity(true));
    window.addEventListener('offline', () => timeoutFallback(threshold));

    timeoutFallback(threshold);
    checkLatency(url, timeToCount, threshold, avg => handleLatency(avg, threshold));
    setInterval(() => {
        reset();
        timeoutFallback(threshold);
        checkLatency(url, timeToCount, threshold, avg => handleLatency(avg, threshold));
    }, interval);
}

function checkLatency(url, timeToCount, threshold, cb) {
    tStart = Date.now();
    
    if (counter < timeToCount) {
        image.src = `${url}?t=${tStart}`;
        image.onload = function() {
            abortFallback = true;
            tEnd = Date.now();
            const time = tEnd - tStart;
            arrTimes.push(time);
            counter++;
            checkLatency(url, timeToCount, threshold, cb);
        };
        image.onerror = function() {
            abortFallback = false;
        };
    } else {
        const sum = arrTimes.reduce((a, b) => a + b);
        const avg = sum / arrTimes.length;
        cb(avg);
    }
}

function handleLatency(avg, threshold) {
    const isConnectedFast = avg <= threshold;
    changeConnectivity(isConnectedFast);
}

function changeConnectivity(state) {
    const event = new CustomEvent('connection-changed', {
        detail: state
    });
    document.dispatchEvent(event);
}

function timeoutFallback(threshold) {
    setTimeout(() => {
        if (!abortFallback) {
            changeConnectivity(false);
        }
    }, threshold + 1);
}

function reset() {
    arrTimes = [];
    counter = 0;
    abortFallback = false;
}
