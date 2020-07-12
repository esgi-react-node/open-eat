import { fetchApi } from './api';
import { idbRestaurants } from '../lib/idb'
import { Restaurant } from '../context/Restaurant';

export const getRestaurants = async () => {
    if (window.localStorage.getItem('connectionType') === 'online') {
        const restaurants = await fetchApi('restaurants');

        const db = await idbRestaurants();

        restaurants.forEach(async restaurant => {
            const foundRestaurant = await db.getFromIndex('restaurants', 'id', restaurant.id)

            if (!foundRestaurant) {
                await db.add('restaurants', restaurant);
            }
        })

        return restaurants;
    } else {
        const db = await idbRestaurants();
        const restaurants = await db.getAll('restaurants');
        return restaurants;
    }
}

export const updateRestaurant = async restaurant => {
    const connectionType = window.localStorage.getItem('connectionType');
    const db = await idbRestaurants();
    const tx = db.transaction('restaurants', 'readwrite').objectStore('restaurants');
    
    const idbRestautant = await tx.get(restaurant.id);
    idbRestautant.comments = restaurant.comments;
    idbRestautant.isSync = connectionType === 'online' ? 'true' : 'false';
    await tx.put(idbRestautant);
    
    tx.done;

    if (connectionType === 'online') {
        const updatedRestaurant = await fetchApi(`restaurants/${restaurant.id}`, 'PUT', restaurant);
        return updatedRestaurant;
    } else {
        return idbRestautant;
    }
}

export const syncRestaurants = async () => {
    const db = await idbRestaurants();
    const foundRestaurants = await db.getAllFromIndex('restaurants', 'isSync', 'false');
    
    foundRestaurants.forEach(async restaurant => {
        await fetchApi(`restaurants/${restaurant.id}`, 'PUT', restaurant);
        const tx = db.transaction('restaurants', 'readwrite').objectStore('restaurants');
        const dbRestaurant = await tx.get(restaurant.id);
        dbRestaurant.isSync = 'true';
        await tx.put(dbRestaurant);
        tx.done;
    });
}