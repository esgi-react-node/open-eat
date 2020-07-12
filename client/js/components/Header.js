import { h, Component } from 'preact';
import { login, logout } from '../lib/sdkGoogle';

export class Header extends Component {
    render() {
        return (
            <nav id="navbar" class="flex items-center justify-between bg-teal-500 p-6 text-white">
                <div class="flex items-center flex-shrink-0 mr-6">
                    <img alt="logo" class="mr-4" width="48" height="48" src="./icon-192x192.png" />
                    <h1 class="font-semibold text-xl tracking-tight"><a href="/">Open eat</a></h1>
                </div>
                <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-sm lg:flex-grow">
                        <a href="/restaurants" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Nos restaurants
                        </a>
                        <a href="/orders" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Vos commandes
                        </a>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <img alt="logoConnection" id="lostConnection" class="hidden mr-4" src="./cloud_off-24px.svg"/>
                            <button id="login" class="button" onClick={() => login()}>Login</button>
                            <button id="logout" class="button hidden mr-4" onClick={() => logout()}>Logout</button>
                            <span id="name" class="hidden"></span>
                            <img alt="avatar" id="avatar" class="hidden ml-4" width="48" height="48" src=""/>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
