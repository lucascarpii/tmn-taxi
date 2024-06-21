import { Input } from "./Input";
import { Button } from "./Button";
import { useContext, useEffect, useRef, useState } from "react";
import { GeoContext } from "../Context";
import { TiDeleteOutline } from "react-icons/ti";
import { BiCurrentLocation, BiLoaderAlt } from "react-icons/bi";
import { HiChevronLeft } from "react-icons/hi2";

export function StepsToTrip() {
  const { address, loadingAddress, city } = useContext(GeoContext);

  const [showField, setShowField] = useState(false);
  const [pasoActual, setPasoActual] = useState('');
  const [observacion, setObservacion] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState({});
  const inputRef = useRef(null);

  const empresas = [
    { id: 1, nombre: "Radio Taxi Cipolletti", disponibilidad: "Disponibilidad limitada", tiempo: "2'" },
    // { id: 2, nombre: "Taxi Express", disponibilidad: "Alta disponibilidad", tiempo: "5'" },
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = address;
    }
  }, [address]);

  useEffect(() => {
    setSelectedEmpresa(empresas[0]);
  }, []);

  const volverAtras = () => {
    if (pasoActual === 'elegir-empresa') {
      setPasoActual('confirmar-punto');
    } else if (pasoActual === 'confirmar-punto') {
      setPasoActual('');
    }
  };
  const pedirViaje = () => {
    const cities = ['Cipolletti', 'Municipio de Cipolletti'] 
    console.log(city)
    if (cities.includes(city)) {
      setPasoActual('confirmar-punto')
    } else {
      console.log('Por el momento la aplicación no funciona en tu ciudad.')
    }
  }
  const confirmarPunto = () => {
    setPasoActual('elegir-empresa');
  };

  const elegirEmpresa = () => {
    const puntoEncuentro = {
      direccion: address,
      observacion
    };
    console.log(selectedEmpresa.nombre, puntoEncuentro)
  };

  const renderSteps = () => {
    if (pasoActual === 'confirmar-punto') {
      return (
        <div className="flex flex-col gap-2 p-3">
          {loadingAddress ? (
            <div className="h-10 bg-zinc-800 rounded-lg flex items-center justify-center opacity-80 gap-2 text-xl">
              <BiLoaderAlt className="animate-spin" />
            </div>
          ) : (
            <Input
              baseRef={inputRef}
              size="sm"
              value={address}
              isReadOnly={true}
              radius="rounded-lg"
              labelPlacement="outside"
            />
          )}
          {showField && (
            <Input
              size="sm"
              radius="rounded-lg"
              labelPlacement="outside"
              defaultValue={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Por ej: Porton verde, esquina Roca"
            />
          )}
          {showField ? (
            <button
              onClick={() => setShowField(false)}
              className="text-xs self-end text-red-500 flex items-center gap-1"
            >
              <TiDeleteOutline /> Cancelar observación
            </button>
          ) : (
            <button onClick={() => setShowField(true)} className="text-xs self-end">
              + Añadir observación
            </button>
          )}

          <Button onClick={confirmarPunto} isDisabled={loadingAddress} size="lg" radius="rounded-lg" color="white">
            <span className="font-medium">Confirmar punto</span>
          </Button>
        </div>
      );
    }

    if (pasoActual === 'elegir-empresa') {
      return (
        <div className="flex flex-col">
          <ul className="p-2">
            {empresas.map((empresa, index) => (
              <li
                key={empresa.id}
                className={`flex justify-between p-2 rounded-lg cursor-pointer ${selectedEmpresa.id === empresa.id ? 'outline outline-2 outline-white/80' : ''}`}
                onClick={() => setSelectedEmpresa(empresa)}
              >
                <div className="flex flex-col">
                  <h2 className="text-md">{empresa.nombre}</h2>
                  <span className="text-xs text-zinc-400">{empresa.disponibilidad}</span>
                </div>
                <p>{empresa.tiempo}</p>
              </li>
            ))}
            {empresas.length === 1 &&
              <li className="flex justify-center mt-2 p-2 rounded-lg bg-zinc-800/60 text-center">
                <p className="text-xs text-zinc-400">De momento no hay más empresas asociadas.</p>
              </li>
            }
          </ul>
          <div className="border-t p-3 border-neutral-800 flex flex-col">
            <Button onClick={elegirEmpresa} size="lg" radius="rounded-lg" color="white">
              <span className="font-medium">
                Elegir {selectedEmpresa.nombre}
              </span>
            </Button>
          </div>
        </div>
      );
    }
  };

  if (pasoActual === '') {
    return (
      <div className="fixed left-0 bottom-12 w-full z-20 flex flex-col p-3">
        <Button onClick={pedirViaje} size="lg" variant="shadow" radius="rounded-lg" color="black">
          <span className="font-medium">
            Pedir viaje
          </span>
        </Button>
      </div>
    )
  }
  return (
    <>
      <button onClick={volverAtras} className="fixed top-3 right-3 bg-zinc-900 rounded-full h-10 w-10 flex items-center justify-center z-20">
        <HiChevronLeft className="mr-1 text-xl" />
      </button>
      <section className="rounded-t-2xl bg-zinc-900 fixed left-0 bottom-0 w-full min-h-40 z-50 sm:hidden tmnFade">
        <button className="absolute -top-10 right-2 bg-zinc-800 p-2 rounded-full">
          <BiCurrentLocation />
        </button>
        <div className="text-center flex flex-col justify-center items-center p-3 gap-1 border-b border-neutral-800">
          {pasoActual === 'confirmar-punto' ? (
            <>
              <h3 className="text-md font-semibold">Fija el punto de encuentro</h3>
              <p className="text-xs text-zinc-300">Arrastra el mapa para mover el marcador</p>
            </>
          ) : (
            <>
              <h3 className="text-md font-semibold">Elige una empresa</h3>
            </>
          )}
        </div>
        {renderSteps()}
      </section>
    </>
  );
}
