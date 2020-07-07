export const fetchOrders = async() => {
    fetch('http://localhost:3000/orders/show/1')
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    })
}
