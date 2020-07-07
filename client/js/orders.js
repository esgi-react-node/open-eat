export const fetchOrders = async () => {
    try {
        const response = await fetch("http://0.0.0.0:9005/openeat-a325a/us-central1/orders");

        if (!response.ok) {
            throw new Error("Unable to reach the Firebase Cloud Functions server");
        }

        const json = await response.json();

        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
};
