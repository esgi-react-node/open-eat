const products = {
    1: [
        {
            "id": 1,
            "name": "Pizza 4 fromages",
            "price": 12.50
        },
        {
            "id": 2,
            "name": "Pizza Raclette",
            "price": 13
        },
        {
            "id": 3,
            "name": "Pizza Savoyarde",
            "price": 13.50
        }
    ],
    2: [
        {
            "id": 4,
            "name": "Pâtes bolognaise",
            "price": 8
        },
        {
            "id": 5,
            "name": "Pâtes Carbonara",
            "price": 9.50
        },
        {
            "id": 6,
            "name": "Pâtes au pesto",
            "price": 7
        }
    ]
}

export const getProducts = index => {
    return products[index];
}