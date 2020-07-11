import { fetchApi } from './api';
import { idbUsers } from '../lib/idb.js';

export const getUser = async () => {
    try {
        const userId = window.localStorage.getItem('userId');
        let response = [];

        if (!userId) {
            return response;
        }
        
        if (window.localStorage.getItem('connectionType') === 'online') {
            response = await fetchApi(`users/${userId}`);
            if (!response) {
                throw new Error("Unable to reach the Firebase Cloud Functions server");
            }
        } else {
            const db = await idbUsers();
            const user = await db.getAllFromIndex('users', 'user', userId);
    
            response = user;
        }

        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export const addUser = async ({uid, displayName}) => {
    const connectionType = window.localStorage.getItem('connectionType');
    const user = {id: uid, name: displayName, favorites: []}

    user.isSync = connectionType === 'online' ? 'true' : 'false';

    try {
        const db = await idbUsers();
        const users = await db.getAllFromIndex('users', 'id', uid);
        
        if (!users) {
            await db.add('users', user);
    
            if (connectionType === 'online') {
                await fetchApi('users', 'POST', user);
            }
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const updateUser = async user => {
    try {
        if (window.localStorage.getItem('connectionType') === 'online') {
            await fetchApi(`users/${user.id}`, 'PUT', user);
        }

        const db = await idbUsers();
        const users = await db.getAllFromIndex('users', 'id', user.id);
    
        const tx = db.transaction('users', 'readwrite').objectStore('users');

        users.forEach(async ({id}) => {
            const idbUser = await tx.get(id);
            idbUser.favorites = user.favorites;
            idbUser.isSync = 'false';
            await tx.put(idbUser);
        });

        tx.done;
    } catch (error) {
        console.error(error.message);
    }
}