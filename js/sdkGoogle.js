export const login = async () => {
    await loadFirebaseAuth()
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account'
    });

    firebase.auth().signInWithPopup(provider).then(function(result) {
        document.getElementById('login').classList.add('hidden');
        document.getElementById('logout').classList.remove('hidden');

        const avatar = document.getElementById("avatar");

        if (avatar && result && result.user && result.user.photoURL) {
            avatar.setAttribute("src", result.user.photoURL);
            avatar.classList.add('rounded-full');
            avatar.classList.remove('hidden');
        }

        const name = document.getElementById("name");

        if (avatar && result && result.user && result.user.displayName) {
            name.innerHTML = result.user.displayName;
            name.classList.remove('hidden');
        }
    }).catch(function(error) {
        // ...
    });
}

export const logout = async () => {
    await loadFirebaseAuth()
    firebase.auth().signOut().then(function() {
        document.getElementById('login').classList.remove('hidden');
        document.getElementById('logout').classList.add('hidden');

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
    }).catch(function(error) {
        // An error happened.
    });
}

const loadFirebaseAuth = () => {
    return new Promise((resolve) => {
        const script = document.querySelector('[src="https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js"]',)

        if (!script) {
            const script = document.createElement('script');
            script.setAttribute('src', 'https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js');
            script.addEventListener('load', resolve)

            document.body.appendChild(script);
        } else {
            resolve();
        }
    });
};
