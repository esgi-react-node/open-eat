import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { Restaurant } from '../context/Restaurant';
import { restaurants } from '../data/restaurants';

export const ShowComments = () => {
    const {restaurant} = useContext(Restaurant);

    return (
        <div class="container  mx-auto mt-4">
            <h1 class="text-xl">Liste des commentaires du restaurant {restaurant.name}</h1>
        </div>
    )
}