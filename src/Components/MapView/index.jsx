import React, { useEffect, useRef, useState } from 'react';
import './leaflet.1.9.4.css';
import './leaflet.1.9.4';
import './TileLayer.Grayscale';
import iconRef from './images/mappin-red.png'

const MapView = () => {
  const mapContainerRef = useRef(null);
  const [address, setAddress] = useState('');
  const [geoPosition, setGeoPosition] = useState([-38.9272482, -68.0024678]);

  useEffect(() => {
    // Asegúrate de que Leaflet esté cargado desde el CDN antes de usarlo

    if (mapContainerRef.current && !mapContainerRef.current._leaflet_id) {
      const map = L.map('map', { fadeAnimation: false }).setView(geoPosition, 18);
      L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      let iconMarker = L.icon({
        iconUrl: iconRef,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -24]
      });

      let marker = L.marker(map.getCenter(), {
        icon: iconMarker,
        title: 'Usuario',
        alt: 'tmn-ico',
        draggable: false,
        interactive: false // Hacer que el marcador no sea interactivo
      }).addTo(map);

      function reverseGeocode(lat, lon) {
        let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data && data.address) {
              var address = data.address;
              var street = address.road || 'N/A';
              var houseNumber = address.house_number || 'N/A';
              var formattedAddress = `${street} ${houseNumber}`;
              setAddress(formattedAddress);
              // marker.bindPopup(formattedAddress).openPopup();
            } else {
              var noAddress = 'No se encontró una dirección para estas coordenadas.';
              setAddress(noAddress);
              // marker.bindPopup(noAddress).openPopup();
            }
          })
          .catch(error => console.error('Error:', error));
      }

      reverseGeocode(geoPosition[0], geoPosition[1]);

      map.on('moveend', function () {
        let center = map.getCenter();
        marker.setLatLng(center);
        reverseGeocode(center.lat, center.lng);
      });
    }
  }, []);

  return (
    <>
    <div id="map" ref={mapContainerRef} className='w-full h-screen z-10 relative'></div>
    <div></div>
    </>
  );
};

export { MapView };

