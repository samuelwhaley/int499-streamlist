import React from 'react'
import list from './data.js'
import { useStateContext } from '../context/stateContext'

const Cart = () => {
	const fromData = list
	const { cart, setCart } = useStateContext()

	const dataItems = fromData.filter(
		(item) => !cart.some((cartItem) => cartItem.id === item.id)
	)

	const subOrNot = (item) =>
		item.service.toLowerCase().includes('subscription')

	const addToCart = (item) => {
		if (subOrNot(item) && cart.some((cartItem) => subOrNot(cartItem))) {
			return
		}
		setCart([...cart, { ...item, quantity: 1 }])
	}

	const removeItem = (id) => {
		setCart(cart.filter((item) => item.id !== id))
	}

	const quantSet = (id, amount) => {
		setCart(
			cart.map((item) => {
				if (item.id !== id) return item
				if (subOrNot(item)) return { ...item, quantity: 1 }
				return { ...item, quantity: Math.max(1, item.quantity + amount) }
			})
		)
	}

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity, 0)

	const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

	return (
		<div>
			<h2>Items</h2>
				<ul className='ShopItems'>
					{dataItems.map((item) => (
						<li key={item.id} onClick={() => addToCart(item)}>
							<img
								src={item.img}
								style={{ width: 60, height: 60 }}
							/>
							{item.service} ({item.serviceInfo}) - ${item.price}
						</li>
					))}
				</ul>
			

			<h2>Cart</h2>
				<ul className='CartItems'>
					{cart.map((item) => (
						<li key={item.id}>
							{item.service} - ${item.price} x {item.quantity} = $
							{(item.price * item.quantity)}
							<button onClick={() => quantSet(item.id, -1)}>-</button>
							<button onClick={() => quantSet(item.id, 1)}>+</button>
							<button onClick={() => removeItem(item.id)}>Remove</button>
						</li>
					))}
				</ul>
			<h3>
				Items in cart: {cartItemCount} | Total: ${totalPrice.toFixed(2)}
			</h3>
			<button>Checkout</button>
		</div>
	)
}

export default Cart
