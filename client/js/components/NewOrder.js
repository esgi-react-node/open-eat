import { h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { addOrder } from '../api/orders';
import { getProducts } from '../data/products';
import { Restaurant } from '../context/Restaurant';
import { BackButton } from './BackButton';

export const NewOrder = () => {
    const [cart, setCart] = useState({products: [], total: 0});
    const {restaurantId} = useContext(Restaurant);
    const products = getProducts(restaurantId)

    if (!products) {
        return (
            <div class="container  mx-auto mt-4">
                <h1 class="text-xl">Commande</h1>
                <p>Vous devez sélectionner un restaurant avant de pouvoir commander!</p>
                <BackButton />
            </div>
        )
    }

    return (
        <div class="container  mx-auto mt-4">
            <h1 class="text-xl">Commande</h1>

            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Produit</th>
                        <th class="px-4 py-2">Prix</th>
                        <th class="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td class="px-4 py-2 text-center">{product.name}</td>
                            <td class="px-4 py-2 text-center">{product.price} €</td>
                            <td class="px-4 py-2 text-center">
                                <span style={{cursor: 'pointer'}} onClick={() => addProduct(cart, setCart, product)}>+</span>
                                <span class="ml-4" style={{cursor: 'pointer'}} onClick={() => removeProduct(cart, setCart, product)}>-</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 class="text-xl mt-4">Panier</h2>

            <table>
                <thead>
                    <tr>
                        <th class="px-4 py-2">Produit</th>
                        <th class="px-4 py-2">Prix unitaire</th>
                        <th class="px-4 py-2">Quantité</th>
                        <th class="px-4 py-2">Total produit</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.products.map(product => (
                        <tr key={product.id}>
                            <td class="px-4 py-2 text-center">{product.name}</td>
                            <td class="px-4 py-2 text-center">{product.price} €</td>
                            <td class="px-4 py-2 text-center">{product.quantity}</td>
                            <td class="px-4 py-2 text-center">{product.price * product.quantity} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 class="text-xl mt-4">Total</h2>
            {cart.total} €
            
            <br></br>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => validateCart(cart, setCart)}>
                Valider panier
            </button>
            <BackButton />
        </div>
    )
}

const addProduct = (cart, setCart, product) => {
    const foundProduct = cart.products.find(productCart => productCart.name === product.name)

    if (foundProduct) {
        foundProduct.quantity += 1
        const newTotal = cart.total + foundProduct.price
        setCart({products: [...cart.products], total: newTotal})
    } else {
        const newTotal = cart.total + product.price
        setCart({products: [...cart.products, {...product, quantity: 1}], total: newTotal})
    }
}

const removeProduct = (cart, setCart, product) => {
    const foundProduct = cart.products.find(productCart => productCart.name === product.name)

    if (foundProduct) {
        foundProduct.quantity -= 1
        const newTotal = cart.total - foundProduct.price
        const newCart = cart.products.filter(productCart => productCart.name !== product.name)
        
        if (foundProduct.quantity === 0) {
            setCart({products: newCart, total: newTotal})
        } else {
            setCart({products: [...newCart, foundProduct], total: newTotal})
        }

    }
}

const validateCart = (cart, setCart) => {
    const user = window.localStorage.getItem('userId');
    if (cart.products.length > 0 && user) {
        const order = {"order":[...cart.products], "total": cart.total, "user": user};
    
        addOrder(order);
        setCart({products: [], total: 0});
    }
}