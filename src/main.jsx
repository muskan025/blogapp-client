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
import ViewerProfile from './pages/ViewerProfile.jsx'
import SingleBlog from './pages/SingleBlog.jsx'
import CreateBlog from './pages/CreateBlog.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
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
        path:'/create-blog',
        element:<CreateBlog/>
      },
      {
        path:'/sign-up',
        element:<SignUp/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/profile/:userId',
        element:<ViewerProfile/>
      },
    ]
  }
], {
  scrollRestoration: 'top',
})

const root = createRoot(document.getElementById('root'))

root.render(<RouterProvider router={router}/>)
