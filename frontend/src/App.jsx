import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import  AppProviders from './providers/AppProviders.jsx';

function App() {


  return (
    <>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>


    </>
  )
}

export default App
