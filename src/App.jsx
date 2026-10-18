import React from 'react';
import { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import About from './About';
import Movies from './Movies';
import Cart from './Cart';

/* home page functions */

const ListForm = () => {
	const [value, setValue] = useState("");
	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(value);
	}
	
	return (
		<form className='ListForm' onSubmit={handleSubmit}>
			<input 
				type='text' 
				className='ListInput' 
				value={value} 
				placeholder='Enter movie name....' 
				onChange={(e) => setValue(e.target.value)}
				/>
			<button type='submit' className='ListButton'>Add Movie</button>
		</form>
	)
}

const ListContainer = () => {
	return (
		<div className='ListContainer'>
			<br></br>
			<img src="https://i.imgur.com/1ht5GIs.png"></img>
			<h1>StreamList</h1>
			<h2>Your personalized streaming list. Start here:</h2>
			<ListForm />
		</div>
	)
}


/* home page main app */

function App() {
	return (
		<div className='App'>
		
		<Router>
			<div>
				<nav className='Router'>
					<Link to="/">Home</Link>|  
					<Link to="/movies">Movies</Link>|  
					<Link to="/cart">Cart</Link>|  
					<Link to="/about">About </Link>
				</nav>
				
				<Routes>
					<Route path="/" element={<ListContainer />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</Router>
		
		</div>
  );
}

export default App