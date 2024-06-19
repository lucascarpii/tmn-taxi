import { MapView } from "./Components/MapView"
import { StepsToTrip } from "./Components/StepsToTrip"
import { GeoProvider } from "./Context"

function App() {

  return (
    <GeoProvider>
      <MapView />
      <StepsToTrip />
    </GeoProvider>
  )
}

export default App
