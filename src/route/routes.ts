import { Home } from "../components/home/Home";
import Login from "../components/login/Login";
import Stream from "../components/stream/Stream";
import Todo from "../components/todo/Todos";
import { User } from "../components/user/Users";
import Weather from "../components/weather/Weather";
import { RouteType } from "../types/types";

export const routes: RouteType[] = [
    {
        type: 'private',
        Component: Home,
        path: '/home',
        name: 'Home',
    },
    // {
    //     type: 'private',
    //     Component: Home,
    //     path: '/',
    //     name: 'Home',
    // },
    {
        type: 'private',
        Component: Todo,
        path: '/todo',
        name: 'Todos',

    },
    {
        type: 'private',
        Component: Stream,
        path: '/stream',
        name: 'Stream',

    },
    {
        type: 'private',
        Component: Weather,
        path: '/weather',
        name: 'Weather',

    },
    {
        type: 'private',
        Component: User,
        path: '/users',
        name: 'Users'
        
    }
    // ,
    // {
    //     type: 'private',
    //     Component: Login,
    //     path: '/login',
    //     name: 'Login'
    // }
    // ,
    // {
    //     type: 'public',
    //     Component: null,
    //     path: '*',
    //     name: 'Not Found'
    // }
]