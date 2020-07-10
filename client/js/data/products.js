const products = {
    1: [
        {
            "id": 1,
            "name": "Pizza 4 fromages",
            "price": 2
        },
        {
            "id": 2,
            "name": "Pizza Raclette",
            "price": 7
        },
        {
            "id": 3,
            "name": "Pizza Savoyarde",
            "price": 4
        }
    ],
    2: [
        {
            "id": 4,
            "name": "Pâtes bolognaise",
            "price": 2
        },
        {
            "id": 5,
            "name": "Pâtes Carbonara",
            "price": 7
        },
        {
            "id": 6,
            "name": "Pâtes au pesto ",
            "price": 4
        }
    ]
}

export const getProducts = index => {
    return products[index];
}