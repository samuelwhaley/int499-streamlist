import React from 'react';
import list from './data.js';
import { useStateContext } from './stateContext';

const Cart = () => {
	const { cart, setCart } = useStateContext();

	const dataItems = list.filter(
		(item) => !cart.some((cartItem) => cartItem.id === item.id)
	);

	const isSubscription = (item) =>
		item.service.toLowerCase().includes('subscription');

	const remainingStock = (item) => {
		const original = list.find((listItem) => listItem.id === item.id);
		return original ? original.amount : 0;
	};

	const addToCart = (item) => {
		if (isSubscription(item) && cart.some((cartItem) => isSubscription(cartItem))) {
			return;
		}
		setCart((currentCart) => [...currentCart, { ...item, quantity: 1 }]);
	};

	const removeItem = (id) => {
		setCart((currentCart) => currentCart.filter((item) => item.id !== id));
	};

	const quantSet = (id, amount) => {
		setCart((currentCart) =>
			currentCart.map((item) => {
				if (item.id !== id) return item;
				if (isSubscription(item)) return { ...item, quantity: 1 };
				const nextQuantity = item.quantity + amount;
				if (nextQuantity < 1) return item;
				if (nextQuantity > remainingStock(item)) return item;
				return { ...item, quantity: nextQuantity };
			})
		);
	};

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity, 0);

	const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<div>
			<h2>Items</h2>
			<ul className="ShopItems">
				{dataItems.map((item) => (
					<li key={item.id} className="ShopItem">
						<button
							className="AddToCartButton"
							onClick={() => addToCart(item)}
							disabled={isSubscription(item) && cart.some((cartItem) => isSubscription(cartItem))}
						>
							<img src={item.img} alt={item.service} style={{ width: 60, height: 60 }} />
							{item.service} ({item.serviceInfo}) - ${item.price}
						</button>
					</li>
				))}
			</ul>

			<h2>Cart</h2>
			<ul className="CartItems">
				{cart.map((item) => (
					<li key={item.id}>
						{item.service} - ${item.price} x {item.quantity} = $
						{(item.price * item.quantity).toFixed(2)}
						<button onClick={() => quantSet(item.id, -1)} disabled={isSubscription(item)}>-</button>
						<button onClick={() => quantSet(item.id, 1)} disabled={item.quantity >= remainingStock(item)}>+</button>
						<button onClick={() => removeItem(item.id)}>Remove</button>
					</li>
				))}
			</ul>
			<h3>
				Items in cart: {cartItemCount} | Total: ${totalPrice.toFixed(2)}
			</h3>
			<button disabled={cart.length === 0}>Checkout</button>
		</div>
	);
};

export default Cart;
