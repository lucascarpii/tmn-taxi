import { createContext, useState, useEffect } from 'react';

export const GeoContext = createContext();

export const GeoProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [geoPosition, setGeoPosition] = useState([-38.9272482, -68.0024678]);
  
  return (
    <GeoContext.Provider value={{
      address,
      setAddress,
      geoPosition,
      setGeoPosition,
      loadingAddress,
      setLoadingAddress
    }}>
      {children}
    </GeoContext.Provider>
  );
};