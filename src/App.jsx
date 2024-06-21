import { GeoProvider } from "./Context"

// Pages
import { Home } from "./Pages/Home"
import { Reservas } from "./Pages/Reservas"
import { Actividad } from "./Pages/Actividad"
import { Cuenta } from "./Pages/Cuenta"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { BottomNav } from "./Components/BottomNav"

function App() {

  const AppRoutes = () => {
    let routes = useRoutes([
      { path: '/', element: <Home /> },
      { path: '/reservas', element: <Reservas /> },
      { path: '/actividad', element: <Actividad /> },
      { path: '/cuenta', element: <Cuenta /> },
    ])
    return routes
  }

  return (
    <GeoProvider>
      <BrowserRouter>
        <AppRoutes />
        <BottomNav />
      </BrowserRouter>
    </GeoProvider>
  )
}


export default App
