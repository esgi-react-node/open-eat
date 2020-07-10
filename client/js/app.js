'use-strict';

import { h, render, Component } from 'preact';
import { useState } from 'preact/hooks';
import Router from 'preact-router';
import '../css/app.css';
import checkConnectivity from './lib/network.js';
import { checkConnectedUser } from './lib/sdkGoogle.js';
import { initFirebase } from "./lib/firebase";
import { Header } from './components/Header';
import { NewOrder } from './components/NewOrder';
import { ShowOrders } from './components/ShowOrders';
import { ShowRestaurants } from './components/ShowRestaurants';
import { Restaurant } from './context/Restaurant';

initFirebase();
checkConnectivity();
checkConnectedUser();

class App extends Component {
    render() {
        const [restaurantId, setRestaurantId] = useState(0);

        return (
            <div class="app">
                <Header />
                <Restaurant.Provider value={{restaurantId, setRestaurantId}}>
                    <Router>
                        <ShowRestaurants path="/restaurants" />
                        <NewOrder path="/order" />
                        <ShowOrders path="/orders" />
                    </Router>
                </Restaurant.Provider>
            </div>
        );
    }
}

render(<App />, document.body);
