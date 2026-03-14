import {createBrowserRouter} from 'react-router';
import Register from './feat/auth/pages/register.jsx';
import Login from './feat/auth/pages/login.jsx';
import Home from './feat/home/pages/home.jsx';
export const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/login',
        element:  <Login/>
    }
])