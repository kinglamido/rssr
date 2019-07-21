import Home from './Components/Home'
import About from './Components/About'
import NotFound from './Components/NotFound'
import Root from './Components/Root'
import Login from './Components/SignIn'
import Layout from './Components/Layout'

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Layout
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '*',
        restricted: false,
        component: NotFound
      },
      {
        path: '/login',
        restricted: false,
        component: Login
      }
    ]
  }
]

export default routes
