import React, { useEffect, useRef } from 'react';

const MapView = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Asegúrate de que Leaflet esté cargado desde el CDN antes de usarlo
    const L = window.L;

    if (mapContainerRef.current && !mapContainerRef.current._leaflet_id) {
      const map = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

      // L.marker([51.505, -0.09]).addTo(map)
      //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      //   .openPopup();
    }
  }, []);

  return <div id="map" ref={mapContainerRef} className='w-full h-screen z-10'></div>;
};

export { MapView };
