import { fetchApi } from './api';
import { idbOrders } from '../lib/idb.js';

export const fetchOrdersByUser = async () => {
    try {
        const userId = window.localStorage.getItem('userId');
        let response = [];

        if (!userId) {
            return response;
        }

        if (window.localStorage.getItem('connectionType') === 'online') {
            response = await fetchApi(`orders?user=${userId}`);

            if (!response) {
                throw new Error("Unable to reach the Firebase Cloud Functions server");
            }
        } else {
            const db = await idbOrders();
            const orders = await db.getAllFromIndex('orders', 'user', userId);
    
            response = orders;
        }

        return response;
    } catch (error) {
        console.error(error.message);
    }
};

export const addOrder = async (order) => {
    const connectionType = window.localStorage.getItem('connectionType');

    order.id = Date.now();
    order.isSync = connectionType === 'online' ? 'true' : 'false';

    try {
        const db = await idbOrders();

        await db.add('orders', order);

        if (connectionType === 'online') {
            await fetchApi('orders', 'POST', order);
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const syncOrders = async () => {
    const db = await idbOrders();
    const foundOrders = await db.getAllFromIndex('orders', 'isSync', 'false');

    foundOrders.forEach(async order => {
        const foundOrder = await fetchApi(`orders?id=${order.id}`);

        if (foundOrder.id) {
            await fetchApi(`orders/${foundOrder.docId}`, 'PUT', order);
        } else {
            await fetchApi('orders', 'POST', order);
        }

        const tx = db.transaction('orders', 'readwrite').objectStore('orders');
        const idbOrder = await tx.get(order.id);
        idbOrder.isSync = 'true';
        await tx.put(idbOrder);
        tx.done;
    });

}
