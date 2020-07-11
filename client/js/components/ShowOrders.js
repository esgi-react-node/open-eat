import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { fetchOrdersByUser, deleteOrder as deleteOrderApi } from '../api/orders';

export const ShowOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrdersByUser().then(orders => {
            setOrders(orders);
        });
    }, []);

    const deleteOrder = async (orderId, orders, setOrders) => {
        setOrders(orders.filter(order => order.id !== order.id));
        await deleteOrderApi(orderId);
    }

    return (
        <div class="container  mx-auto mt-4">
            <h1 class="text-xl">Vos commandes</h1>

            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Commande</th>
                        <th class="px-4 py-2">Total</th>
                        <th class="px-4 py-2">Actions</th>
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
                            <td class="px-4 py-2 text-center">
                            <span class="material-icons text-red-700 cursor-pointer" onClick={() => deleteOrder(order.id, orders, setOrders)}>delete_outline</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}