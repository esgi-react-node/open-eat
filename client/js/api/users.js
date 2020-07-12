import { fetchApi } from './api';
import { idbUsers } from '../lib/idb.js';
import { User } from '../context/User';
import { useContext } from 'preact/hooks';

export const getUser = async () => {
    try {
        const userId = window.localStorage.getItem('userId');
        let response = {};

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
    const user = {id: uid, name: displayName, favorites: [], isSync: connectionType === 'online' ? 'true' : 'false'};
    const {setUser} = useContext(User);

    
    try {
        const db = await idbUsers();

        await db.add('users', user);

        if (connectionType === 'online') {
            await fetchApi('users', 'POST', user);
        }

        setUser(user);
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
        const tx = db.transaction('users', 'readwrite').objectStore('users');

        const idbUser = await tx.get(user.id);
        idbUser.favorites = user.favorites;
        idbUser.isSync = 'false';
        await tx.put(idbUser);

        tx.done;
    } catch (error) {
        console.error(error.message);
    }
}

export const syncUsers = async () => {
    const db = await idbUsers();
    const foundUsers = await db.getAllFromIndex('users', 'isSync', 'false');
    
    foundUsers.forEach(async user => {
        await fetchApi(`users/${user.id}`, 'PUT', user);
        const tx = db.transaction('users', 'readwrite').objectStore('users');
        const dbUser = await tx.get(user.id);
        dbUser.isSync = 'true';
        await tx.put(dbUser);
        tx.done;
    });
}
