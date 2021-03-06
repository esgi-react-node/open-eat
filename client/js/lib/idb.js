import {openDB} from 'idb';

export const idbOrders = async () => {
    return openDB('orders', 1, {
        upgrade(db) {
            const store = db.createObjectStore('orders', {
                keyPath: 'id',
            });

            store.createIndex('id', 'id');
            store.createIndex('user', 'user');
            store.createIndex('isSync', 'isSync');
        }
    });
}

export const idbUsers = async () => {
    return openDB('users', 1, {
        upgrade(db) {
            const store = db.createObjectStore('users', {
                keyPath: 'id',
            });

            store.createIndex('id', 'id');
            store.createIndex('isSync', 'isSync');
        }
    });
}

export const idbRestaurants = async () => {
    return openDB('restaurants', 1, {
        upgrade(db) {
            const store = db.createObjectStore('restaurants', {
                keyPath: 'id',
            });

            store.createIndex('id', 'id');
            store.createIndex('isSync', 'isSync');
        }
    });
}