import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import PokemonInfoPage from './pages/PokemonInfoPage.jsx'
import Homepage from './HomePage'

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/:pokePage", element: <Homepage pageNum={":pokePage"} />},
  { path: "/info", element: <PokemonInfoPage /> },
  { path: "/info/:pokeId", element: <PokemonInfoPage pokeId={":pokeId"}/> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
