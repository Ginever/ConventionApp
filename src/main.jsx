import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import store from './app/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './components/register/Register'

const router = createBrowserRouter([
  {
    path: "/ConventionApp/",
    element: <App />,
  },
  {
    path: "/ConventionApp/signIn",
    element: <SignIn />
  },
  {
    path: "/ConventionApp/signUp",
    element: <SignUp />
  },
  {
    path: "/ConventionApp/register",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
  ,
)
