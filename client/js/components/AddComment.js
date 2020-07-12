import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Restaurant } from '../context/Restaurant';
import { User } from '../context/User';
import { BackButton } from './BackButton';
import { updateRestaurant } from '../api/restaurants';

export const AddComment = () => {
    const { restaurant, setRestaurant } = useContext(Restaurant);
    const { user } = useContext(User);

    const addComment = async (event, restaurant) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const entries = [...formData.entries()];
        restaurant.comments.push({grade: parseInt(entries[0][1]), comment: entries[1][1], username: user.name});
        const updatedRestaurant = await updateRestaurant(restaurant);
        setRestaurant(updatedRestaurant);
        route('/comments');
    }

    return (
        <div class="container  mx-auto mt-4">
            <h1 class="text-xl">Ajouter un commentaire au restaurant {restaurant.name}</h1>

            <form onSubmit={() => addComment(event, restaurant)} class="w-full max-w-sm">
                <div class="inline-block relative w-64 mt-4 mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="grade">
                        Note
                    </label>
                    <select name="grade" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-12 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="comment">
                        Commentaire
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="comment" type="text" />
                </div>
                <div class="md:flex md:items-center">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-8 rounded mt-4" /*onClick={() => addComment(restaurant)}*/>Commenter</button>
                    <BackButton />
                </div>
            </form>
        </div>
    )
}
