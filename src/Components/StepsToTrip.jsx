import { Input } from "./Input"
import { Button } from "./Button"

export function StepsToTrip(){
  return(
    <section className="rounded-t-2xl bg-zinc-900 fixed left-0 bottom-0 w-full min-h-40 z-10 sm:hidden">
      <div className="text-center flex flex-col justify-center items-center p-3 gap-1 border-b border-neutral-800">
        <div className="h-1 w-12 rounded-full border border-zinc-700 bg-zinc-700 mb-3"></div>
        <h3 className="text-md font-semibold">Fija el punto de encuentro</h3>
        <p className="text-xs text-zinc-300">Arrastra el mapa para mover el marcador</p>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Input size="sm" radius="rounded-lg" defaultValue="Castelli 171" labelPlacement="outside" />
        <Button size="lg" radius="rounded-lg" color="white"><span className="font-medium">Confirmar punto</span></Button>
      </div>
    </section>
  )
}