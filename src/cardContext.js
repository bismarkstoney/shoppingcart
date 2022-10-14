import React, { useEffect, useReducer } from 'react';
import cartReducer from './cartReducer';
export const CartContext = React.createContext();

let initialCart;
try {
	initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch (error) {
	console.error('The cart could not be parsed into JSON.');
	initialCart = [];
}
export function CartProvider(props) {
	const [cart, dispatch] = useReducer(cartReducer, initialCart);
	useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
	const contexValue = {
		cart,
		dispatch,
	};

	return (
		<CartContext.Provider value={contexValue}>
			{props.children}
		</CartContext.Provider>
	);
}
