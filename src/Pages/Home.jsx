import { MapView } from "../Components/MapView"
import { StepsToTrip } from "../Components/StepsToTrip"
import { BottomNav } from "../Components/BottomNav"

export const Home = () => {
  return (
    <>
      <MapView />
      <StepsToTrip />
      <BottomNav />
    </>
  )
}