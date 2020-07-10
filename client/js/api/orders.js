import { fetchApi } from './api';
import { initDb } from '../lib/db.js';

export const syncOrder = async (order) => {
    order.isSync = 'true';
    
    const foundOrder = await fetchApi(`?id=${order.id}`);

    if (foundOrder.id) {
        await fetchApi(`/${foundOrder.docId}`, 'PUT', order);
    } else {
        await fetchApi('', 'POST', order);
    }
}

export const fetchOrders = async () => {
    try {
        const response = await fetchApi('/');

        if (!response) {
            throw new Error("Unable to reach the Firebase Cloud Functions server");
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
};

export const fetchOrdersByUser = async () => {
    try {
        const userId = window.localStorage.getItem('userId');

        if (!userId) {
            return [];
        }

        const response = await fetchApi(`?user=${userId}`);

        if (!response) {
            throw new Error("Unable to reach the Firebase Cloud Functions server");
        }

        return response;
    } catch (error) {
        console.error(error.message);
    }
};

export const fetchOrder = async (orderId) => {
    try {
        if (!orderId) {
            return {};
        }

        const response = await fetchApi(`/${orderId}`);

        if (!response) {
            throw new Error("Unable to reach the Firebase Cloud Functions server");
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
};

export const addOrder = async (order) => {
    const connectionType = window.localStorage.getItem('connectionType');

    order.id = Date.now();
    order.isSync = connectionType === 'online' ? 'true' : 'false';

    try {
        const db = await initDb();

        await db.add('orders', order);

        if (connectionType === 'online') {
            await fetchApi('', 'POST', order);
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const updateOrder = async (order) => {
    try {
        await fetchApi(`/${order.id}`, 'PUT', order);
    } catch (error) {
        console.error(error.message);
    }
};

export const deleteOrder = async (orderId) => {
    const connectionType = window.localStorage.getItem('connectionType');
    
    try {
        const db = await initDb();

        if (connectionType === 'online') {
            await fetchApi(`/${orderId}`, 'DELETE');

            db.transaction("orders", "readwrite").objectStore("orders").delete(orderId);
        } else {
            const orders = await db.getAllFromIndex('orders', 'id', orderId);
    
            const tx = db.transaction('orders', 'readwrite').objectStore('orders');
    
            orders.forEach(async ({id}) => {
                const order = await tx.get(id);
                order.isSync = 'false';
                order.removed = 'true';
                await tx.put(order);
            });
    
            tx.done;
        }

    } catch (error) {
        console.error(error.message);
    }
};
