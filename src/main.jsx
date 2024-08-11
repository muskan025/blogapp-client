 import { createRoot } from 'react-dom/client'
 import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/Home.jsx'
import ExploreBlogs from './pages/ExploreBlogs.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import AboutUs from './pages/AboutUs.jsx'
import './styles/index.module.css'
import EditProfile from './components/editProfile/EditProfile.jsx'
import SingleBlog from './pages/SingleBlog.jsx'
import ViewerProfile from './pages/ViewerProfile.jsx'
import CreateBlog from './pages/CreateBlog.jsx'
import { store } from './reduxToolkit/store.js'
import {Provider} from 'react-redux'
import PrivateRoute from './components/PrivateRoute.jsx'
import { PersistGate } from 'redux-persist/integration/react'   
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

const router = createBrowserRouter([
  {
    element: <App/>,
    errorElement:<Error/>,
    children : [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/about-us',
        element:<AboutUs/>
      },
      {
        path:'/explore-blogs',
        element:<ExploreBlogs/>
      },
      {
        path:'/blog/:blogId',
        element:<SingleBlog/>
      },
      {
         element:<PrivateRoute/>,
         children:[
          {
            path: '/create-blog/:username',
            element: <CreateBlog />
          },
          // {
          //   path: '/profile/:username',
          //   element: <EditProfile/>
          // },
         ]
      },
      {
            path: '/profile/:username',
            element: <ViewerProfile/>
          },
      {
        path:'/sign-up',
        element:<SignUp/>
      },
      {
        path:'/login',
        element:<Login/>
      },
    ]
  }
], {
  scrollRestoration: 'top',
})

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
 