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
import { ShowComments } from './components/ShowComments';
import { AddComment } from './components/AddComment';
import { Restaurant } from './context/Restaurant';

initFirebase();
checkConnectivity();
checkConnectedUser();

class App extends Component {
    render() {
        const [restaurant, setRestaurant] = useState({});

        return (
            <div class="app">
                <Header />
                <Restaurant.Provider value={{restaurant, setRestaurant}}>
                    <Router>
                        <ShowRestaurants path="/restaurants" />
                        <NewOrder path="/order" />
                        <ShowOrders path="/orders" />
                        <ShowComments path="/comments" />
                        <AddComment path="/comment" />
                    </Router>
                </Restaurant.Provider>
            </div>
        );
    }
}

render(<App />, document.body);
