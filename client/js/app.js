'use-strict';

import "../css/app.css";

import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Router from 'preact-router';
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
import { User } from './context/User';

class App extends Component {
    render() {
        const localStorage = window.localStorage;
        const [restaurant, setRestaurant] = useState(JSON.parse(localStorage.getItem("restaurant")) ?? {});
        const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) ?? {});

        useEffect(() => {
            localStorage.setItem("user", JSON.stringify(user));
        }, [user]);

        useEffect(() => {
            localStorage.setItem("restaurant", JSON.stringify(restaurant));
        }, [restaurant]);

        return (
            <div class="app">
                <Header />
                <User.Provider value={{user, setUser}}>
                    <Restaurant.Provider value={{restaurant, setRestaurant}}>
                        <Router>
                            <ShowRestaurants path="/restaurants" />
                            <NewOrder path="/order" />
                            <ShowOrders path="/orders" />
                            <ShowComments path="/comments" />
                            <AddComment path="/comment" />
                        </Router>
                    </Restaurant.Provider>
                </User.Provider>
            </div>
        );
    }
}

function loadScript(url) {
    return new Promise((resolve) => {
        const script = document.createElement("script");

        script.setAttribute("async", true);
        script.setAttribute("src", url);

        document.body.appendChild(script);

        script.addEventListener("load", resolve);
    });
}

function loadStylesheet(url) {
    return new Promise((resolve) => {
        const stylesheet = document.createElement("link");

        stylesheet.setAttribute("rel", "stylesheet");
        stylesheet.setAttribute("href", url);

        document.body.appendChild(stylesheet);

        stylesheet.addEventListener("load", resolve);
    });
}

window.addEventListener("load", () => {
    Promise.all([
        loadStylesheet("/main.css"),
        loadStylesheet("https://fonts.googleapis.com/icon?family=Material+Icons"),
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js"),
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-messaging.min.js")
    ]).then(() => {
        initFirebase();
        checkConnectivity();
        checkConnectedUser();

        render(<App />, document.body);
    });


    if (navigator?.serviceWorker) {
        navigator.serviceWorker.register("service-worker.js").then(() => {
            console.log("Successfully registered the Service Worker.");
        }).catch(() => {
            console.error("Failed to register the service worker");
        });
    }
});
