import {createBrowserRouter} from 'react-router';
import Register from './feat/auth/pages/register.jsx';
import Login from './feat/auth/pages/login.jsx';
import Home from './feat/home/pages/home.jsx';
import CreateRoom from './feat/rooms/pages/create-room.jsx';
import PrivateRoute from './routes/privateRoute.jsx';
import PublicRoute from './routes/publicRoute.jsx';
export const router = createBrowserRouter([
    
    {
        path:'/register',
        element:<PublicRoute><Register/></PublicRoute>
    },
    {
        path:'/',
        element:  <PublicRoute><Login/></PublicRoute>
    },
    {
        path:'/create-room',
        element: <PrivateRoute><CreateRoom/></PrivateRoute>
    }
])