import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

const StateContext = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cartItems');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const baseImageUrl = 'https://image.tmdb.org/t/p/original';
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  return (
    <Context.Provider
      value={{
        baseImageUrl,
        apiUrl,
        apiKey,
        cart,
        setCart,
        cartItemCount
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

export default StateContext;


