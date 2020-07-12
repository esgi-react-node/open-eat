import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { fetchOrdersByUser } from '../api/orders';
import { BackButton } from './BackButton';

export const ShowOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrdersByUser().then(orders => {
            setOrders(orders);
        });
    }, []);

    return (
        <div class="container  mx-auto mt-4">
            <h1 class="text-xl">Vos commandes</h1>

            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Commande</th>
                        <th class="px-4 py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr key={order.id}>
                            <td class="px-4 py-2 text-center">
                                {order.order.map((product, index) => {
                                    if (index != (order.order.length - 1)) {
                                        return (
                                            <span>{product.quantity} x {product.name}, </span>
                                        )
                                    } else {
                                        return (
                                            <span>{product.quantity} x {product.name}</span>
                                        )
                                    }
                                })}
                            </td>
                            <td class="px-4 py-2 text-center">{order.total} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BackButton />
        </div>
    )
}
