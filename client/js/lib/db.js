import {openDB} from 'idb';

export const initDb = async () => {
    return openDB('orders', 1, {
        upgrade(db) {
            const store = db.createObjectStore('orders', {
                keyPath: 'id',
            });

            store.createIndex('id', 'id');
            store.createIndex('isSync', 'isSync');
        }
    });
}