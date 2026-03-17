import {createBrowserRouter} from 'react-router';
import Register from './feat/auth/pages/register.jsx';
import Login from './feat/auth/pages/login.jsx';
import PrivateRoute from './routes/privateRoute.jsx';
import PublicRoute from './routes/publicRoute.jsx';
import MainLayout from './components/layouts/MainLayout.jsx';
import { Dashboard, Bookings, Rooms, Guests, Services, Restaurant, Analytics, Settings } from './pages/index.js';

export const router = createBrowserRouter([
    
    {
        path:'/register',
        element:<PublicRoute><Register/></PublicRoute>
    },
    {
        path:'/',
        element:  <PublicRoute><Login/></PublicRoute>
    },
    
    // Protected routes with sidebar layout
    {
        element: <PrivateRoute><MainLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/bookings',
                element: <Bookings />
            },
            {
                path: '/rooms',
                element: <Rooms />
            },
            {
                path: '/guests',
                element: <Guests />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/restaurant',
                element: <Restaurant />
            },
            {
                path: '/analytics',
                element: <Analytics />
            },
            {
                path: '/settings',
                element: <Settings />
            }
        ]
    }
])
