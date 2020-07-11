import { addUser } from '../api/users';
import { User } from '../context/User';
import { useContext } from 'preact/hooks';
import { fetchApi } from '../api/api';

export const checkConnectedUser = async () => {
    await loadFirebaseAuth()
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            changeStateApp('online', user);
        } else {
            changeStateApp('offline');
        }
    });
}

export const login = async () => {
    if (window.localStorage.getItem('connectionType') === 'offline') {
        alert('Vous ne pouvez pas vous connecter en mode hors ligne.')
        return;
    }

    await loadFirebaseAuth()
    
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account'
    });

    firebase.auth().signInWithPopup(provider).then(async function(result) {
        changeStateApp('online', result.user);

        const {setUser} = useContext(User);

        const maybeUser = await fetchApi(`/users/${result.user.uid}`);

        if (maybeUser) {
            setUser({id: maybeUser.uid, name: maybeUser.displayName, favorites: maybeUser.favorites});
        } else {
            addUser(result.user);
        }
    }).catch(function(error) {
        console.error('Error occured while creating the popup to signin', error.code, error.message);
    });
}

export const logout = async () => {
    await loadFirebaseAuth()

    firebase.auth().signOut().then(function() {
        changeStateApp('offline');
    }).catch(function(error) {
        console.error('Error occured while sign out user', error.code, error.message);
    }).finally(() => {
        const {setUser} = useContext(User);

        setUser({});
    });
}

const loadFirebaseAuth = () => {
    return new Promise((resolve) => {
        const url = "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-auth.min.js";
        const script = document.querySelector('[src="${url}"]');

        if (!script) {
            const script = document.createElement('script');
            script.setAttribute('src', url);
            script.addEventListener('load', resolve)

            document.body.appendChild(script);
        } else {
            resolve();
        }
    });
};

const changeStateApp = (state, user) => {
    if (state === 'online') {
        document.getElementById('login').classList.add('hidden');
        document.getElementById('logout').classList.remove('hidden');

        window.localStorage.setItem('userId', user.uid);
    
        const avatar = document.getElementById("avatar");
    
        if (avatar && user.photoURL) {
            avatar.setAttribute("src", user.photoURL);
            avatar.classList.add('rounded-full');
            avatar.classList.remove('hidden');
        }
    
        const name = document.getElementById("name");
    
        if (avatar && user.displayName) {
            name.innerHTML = user.displayName;
            name.classList.remove('hidden');
        }
    } else if (state === 'offline') {
        document.getElementById('login').classList.remove('hidden');
        document.getElementById('logout').classList.add('hidden');

        window.localStorage.removeItem('userId');

        const avatar = document.getElementById("avatar");

        if (avatar) {
            avatar.setAttribute("src", "./icon-192x192.png");
            avatar.classList.remove('rounded-full');
            avatar.classList.add('hidden');
        }

        const name = document.getElementById("name");

        if (name) {
            name.innerHTML = "";
            name.classList.add('hidden');
        }
    }
}
