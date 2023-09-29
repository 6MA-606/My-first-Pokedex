import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import PokemonInfo from "./pages/PokemonInfo.jsx"
import Homepage from "./HomePage"

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/:pokePage", element: <Homepage pageNum={":pokePage"} /> },
  { path: "/info", element: <PokemonInfo /> },
  { path: "/info/:pokeId", element: <PokemonInfo pokeId={":pokeId"} /> },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
