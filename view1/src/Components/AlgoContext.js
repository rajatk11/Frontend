import React, { createContext, useState, useContext } from 'react';

const AlgoContext = createContext()




export function AlgoProvider({ children }) {
  const [selectedVariable, setSelectedVariable] = useState('OX1');

  return (
    <AlgoContext.Provider value={{ selectedVariable, setSelectedVariable }}>
      {children}
    </AlgoContext.Provider>
  );
}

export function useAlgoContext() {
  const context = useContext(AlgoContext);

  if (context === undefined) {
    throw new Error('useAlgoContext must be used within an AlgoProvider');
  }
  return context;
}