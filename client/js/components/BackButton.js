import { h } from 'preact';
import { Link } from 'preact-router/match';

export const BackButton = () => (
    <Link href="/restaurants">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Retour</button>
    </Link> 
)