import { h } from 'preact';
import { restaurants as initialRestaurants } from '../data/restaurants';
import { useContext, useState } from 'preact/hooks';
import { Restaurant } from '../context/Restaurant';
import { route } from 'preact-router';
import { getUser, updateUser } from '../api/users';
import { User } from '../context/User';

export const ShowRestaurants = () => {
    const { setRestaurant } = useContext(Restaurant);
    const [restaurants, setRestaurants] = useState(initialRestaurants);
    const {user, setUser} = useContext(User);

    const loadOrderRestaurant = restaurant => {
        setRestaurant(restaurant);
        route('/order');
    }

    const showComments = restaurant => {
        setRestaurant(restaurant);
        route('/comments');
    }

    const addComment = restaurant => {
        setRestaurant(restaurant);
        route('/comment');
    }

    const updateFavorite = (restaurantId, user, setUser) => {
        const favorites = user.favorites;
        const index = favorites.indexOf(restaurantId);
        
        if (index !== -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(restaurantId);
        }

        const newUser = {...user, favorites: favorites};

        setUser(newUser);
        updateUser(newUser);
    }

    const filterFavoriteRestaurants = (event, favorites, restaurants, setRestaurants) => {
        if (event.currentTarget.checked) {
            const newListRestaurants = restaurants.filter(restaurant => favorites.includes(restaurant.id))
            setRestaurants(newListRestaurants);
        } else {
            setRestaurants(initialRestaurants);
        }
    }

    const filterNameRestaurants = (event, setRestaurants) => {
        if (event.currentTarget.value === '') {
            setRestaurants(initialRestaurants);
        } else {
            const newListRestaurants = initialRestaurants.filter(restaurant => restaurant.name.match(event.currentTarget.value))
            setRestaurants(newListRestaurants);
        }
    }

    return (
        <div class="container  mx-auto mt-4">
            <h1 class="text-xl">Nos restaurants</h1>

            <div class="w-full max-w-xs mt-4 mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="restaurantName">
                    Recherche d'un restaurant
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="restaurantName" type="text" placeholder="Nom du restaurant" onKeyUp={() => filterNameRestaurants(event, setRestaurants)}/>
            </div>
 
            <label class="md:w-2/3 mb-4 block text-gray-500 font-bold cursor-pointer">
                <input class="mr-2 leading-tight cursor-pointer" type="checkbox" onClick={() => filterFavoriteRestaurants(event, user.favorites, restaurants, setRestaurants)}/>
                <span class="text-sm">
                    Filtrer les restaurants favoris
                </span>
            </label>

            <div class="flex space-x-8 mt-4">
                {restaurants && restaurants.length > 0 && restaurants.map(restaurant => (
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                        <div class="cursor-pointer" onClick={() => loadOrderRestaurant(restaurant)}>
                            <img class="h-200 w-200" src={restaurant.img} alt="image restaurant" />
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">{restaurant.name}</div>
                                <p class="text-gray-700 text-base">{restaurant.description}</p>
                            </div>
                            <div class="px-6 py-4 text-sm font-semibold text-gray-700">
                                {restaurant.address}, {restaurant.city} {restaurant.zipcode}
                            </div>
                        </div>

                        {Object.prototype.hasOwnProperty.call(user, "id") && (
                            <div class="px-6 text-sm font-semibold text-gray-700">
                                {user && user.favorites && user.favorites.includes(restaurant.id) ? (
                                    <span class="material-icons text-red-700 cursor-pointer rounded-full hover:shadow-inner" onClick={() => updateFavorite(restaurant.id, user, setUser)}>favorite</span>
                                ) : (
                                    <span class="material-icons text-red-700 cursor-pointer rounded-full hover:shadow-inner" onClick={() => updateFavorite(restaurant.id, user, setUser)}>favorite_border</span>
                                )}
                                <span class="material-icons text-blue-700 cursor-pointer rounded-full hover:shadow-inner" onClick={() => showComments(restaurant.id)}>subject</span>
                                <span class="material-icons text-green-700 cursor-pointer rounded-full hover:shadow-inner" onClick={() => addComment(restaurant.id)}>create</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
