import { h } from 'preact';
import { restaurants } from '../data/restaurants';
import { useContext } from 'preact/hooks';
import { Restaurant } from '../context/Restaurant';
import { route } from 'preact-router';

export const ShowRestaurants = () => {
    const { setRestaurantId } = useContext(Restaurant);

    const loadOrderRestaurant = restaurantId => {
        setRestaurantId(restaurantId);
        route('/order');
    }

    return (
        <div class="container  mx-auto mt-4">
            <h1 class="text-xl">Nos restaurants</h1>

            <div class="flex space-x-8 mt-4">
                {restaurants.map(restaurant => (
                    <div class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" onClick={() => loadOrderRestaurant(restaurant.id)}>
                        <img class="h-200 w-200" src={restaurant.img} alt="Sunset in the mountains" />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{restaurant.name}</div>
                            <p class="text-gray-700 text-base">{restaurant.description}</p>
                        </div>
                        <div class="px-6 py-4 text-sm font-semibold text-gray-700">
                            {restaurant.address}, {restaurant.city} {restaurant.zipcode}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}