export const login = async () => {
    await loadFirebaseAuth()
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account'
    });

    firebase.auth().signInWithPopup(provider).then(function(result) {
        /**
         * user.getDisplayName()
         * user.getEmail()
         * user.getImageUrl()
         */
        document.getElementById('login').style.visibility = 'hidden';
        document.getElementById('logout').style.visibility = 'visible';

        const picture = document.getElementById("picture");

        if (picture && result && result.user && result.user.photoURL) {
            picture.setAttribute("src", result.user.photoURL);
        }

        const name = document.getElementById("name");

        if (picture && result && result.user && result.user.displayName) {
            name.innerHTML = result.user.displayName;
        }
    }).catch(function(error) {
        // ...
    });
}

export const logout = async () => {
    await loadFirebaseAuth()
    firebase.auth().signOut().then(function() {
        document.getElementById('login').style.visibility = 'visible';
        document.getElementById('logout').style.visibility = 'hidden';
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
