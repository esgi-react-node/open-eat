export const initFirebase = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyD8WIcdDrNRFjJGhmX3mwG8_D-4QwdNlzs",
        authDomain: "openeat-a325a.firebaseapp.com",
        databaseURL: "https://openeat-a325a.firebaseio.com",
        projectId: "openeat-a325a",
        storageBucket: "openeat-a325a.appspot.com",
        messagingSenderId: "568497594623",
        appId: "1:568497594623:web:ff62a6c9cd3cb6dcad6cca",
        measurementId: "G-3VT0ZG2E0F"
    };

    firebase.initializeApp(firebaseConfig);
}