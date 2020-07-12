import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Restaurant } from '../context/Restaurant';
import { BackButton } from './BackButton';

export const ShowComments = () => {
    const { restaurant } = useContext(Restaurant);

    return (
        <div>
            {restaurant.name ? (
                <div class="container  mx-auto mt-4">
                    <h1 class="text-xl mb-4">Liste des commentaires du restaurant "{restaurant.name}"</h1>

                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4 mb-4" onClick={() => route('/comment')}>Écrire un commentaire</button>
        
                    {restaurant.comments.map(comment => (
                        <div>
                            <div>
                                <span class="text-lg">{comment.username}</span>
                                <span class="text-purple-500 ml-4">{comment.grade}/5</span>
                            </div>
                            <div class="text-gray-600">{comment.comment}</div>
                        </div>
                    ))}
                    <BackButton />
                </div>
            ) : (
                <BackButton />
            )}
        </div>
    )
}