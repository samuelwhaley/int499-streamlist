import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

const LIST_KEY = 'MoviesInList';
const CART_KEY = 'cartItems';

const readStoredList = (key) => {
	try {
		const stored = localStorage.getItem(key);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

const StateContext = ({ children }) => {
	const [items, setItems] = useState(() => readStoredList(LIST_KEY));

	useEffect(() => {
		localStorage.setItem(LIST_KEY, JSON.stringify(items));
	}, [items]);

	const [cart, setCart] = useState(() => readStoredList(CART_KEY));

	useEffect(() => {
		localStorage.setItem(CART_KEY, JSON.stringify(cart));
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
        items,
        setItems,
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


