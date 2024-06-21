import { HiHome } from "react-icons/hi2"
import { RiBookmark2Fill, RiFileList2Fill, RiUser3Fill } from "react-icons/ri"
import { NavLink } from "react-router-dom"

const BottomNav = () => {
  return (
    <section className="fixed left-0 bottom-0 w-full z-20 flex">
      <nav className="bg-zinc-900 w-full border-t-2 border-zinc-700">
        <ul className="grid grid-cols-4 font-pop">
          <NavLink to="/home" className='flex flex-col items-center justify-center p-2'>
            <HiHome className="text-xl"/>
            <span className="text-xs scale-90">Inicio</span>
          </NavLink>
          <NavLink to="/reservas" className='flex flex-col items-center justify-center p-2'>
            <RiFileList2Fill className="text-xl"/>
            <span className="text-xs scale-90">Reservas</span>
          </NavLink>
          <NavLink to="/actividad" className='flex flex-col items-center justify-center p-2'>
            <RiBookmark2Fill className="text-xl"/>
            <span className="text-xs scale-90">Actividad</span>
          </NavLink>
          <NavLink to="/cuenta" className='flex flex-col items-center justify-center p-2'>
            <RiUser3Fill className="text-xl"/>
            <span className="text-xs scale-90">Cuenta</span>
          </NavLink>
        </ul>
      </nav>
    </section>
  )
}

export { BottomNav }