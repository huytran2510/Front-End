import React, { createContext, useState, useContext } from 'react';

// Tạo context cho selectedAddress
const AddressContext = createContext();

export const useAddress = () => {
  return useContext(AddressContext);
};

export const AddressProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState('');

  return (
    <AddressContext.Provider value={{ selectedAddress, setSelectedAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
