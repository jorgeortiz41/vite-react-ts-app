import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Map from './components/Map.tsx'
import ErrorPage from './error-page.tsx'

const router = createBrowserRouter([
  { 
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>, 
  },
  {
    path: '/map',
    element: <Map/>,
    errorElement: <ErrorPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router}/>
)
