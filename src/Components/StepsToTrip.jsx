import { Input } from "./Input";
import { Button } from "./Button";
import { useContext, useEffect, useRef, useState } from "react";
import { GeoContext } from "../Context";
import { TiDeleteOutline } from "react-icons/ti";
import { BiLoaderAlt } from "react-icons/bi";

export function StepsToTrip() {
  const { address, loadingAddress } = useContext(GeoContext);
  const [showField, setShowField] = useState(false)
  const [observacion, setObservacion] = useState('')
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = address;
    }
  }, [address]);

  const confirmarPunto = () => {
    const puntoEncuentro = {
      direccion: address,
      observacion
    }
    console.log(puntoEncuentro)
  }

  return (
    <section className="rounded-t-2xl bg-zinc-900 fixed left-0 bottom-0 w-full min-h-40 z-10 sm:hidden">
      <div className="text-center flex flex-col justify-center items-center p-3 gap-1 border-b border-neutral-800">
        <div className="h-1 w-12 rounded-full border border-zinc-700 bg-zinc-700 mb-3"></div>
        <h3 className="text-md font-semibold">Fija el punto de encuentro</h3>
        <p className="text-xs text-zinc-300">Arrastra el mapa para mover el marcador</p>
      </div>
      <div className="flex flex-col gap-2 p-3">
        {
          loadingAddress ?
            <div className="h-10 bg-zinc-800 rounded-lg flex items-center justify-center opacity-80 gap-2 text-xl">
              <BiLoaderAlt className="animate-spin" />
            </div>
            :
            <Input
              baseRef={inputRef}
              size="sm"
              value={address}
              isReadOnly={true}
              radius="rounded-lg"
              labelPlacement="outside"
            />
        }
        {showField &&
          <Input
            size="sm"
            radius="rounded-lg"
            labelPlacement="outside"
            defaultValue={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Por ej: Porton verde, esquina alem"
          />
        }
        {
          showField ?
            <button onClick={() => setShowField(false)} className="text-xs self-end text-red-500 flex items-center gap-1">
              <TiDeleteOutline /> Cancelar observación
            </button>
            :
            <button onClick={() => setShowField(true)} className="text-xs self-end">
              + Añadir observación
            </button>
        }

        <Button onClick={confirmarPunto} isDisabled={loadingAddress} size="lg" radius="rounded-lg" color="white">
          <span className="font-medium">Confirmar punto</span>
        </Button>
      </div>
    </section>
  );
}
