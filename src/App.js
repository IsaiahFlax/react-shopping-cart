import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

function App() {
	const localState = JSON.parse(localStorage.getItem("info"));
	const [products] = useState(data);
	const [cart, setCart] = useState(localState || []);

	useEffect(() => {
		localStorage.setItem("info", JSON.stringify(cart));
	}, [cart]);

	const addItem = item => {
		setCart([...cart, item])
	};

	const removeItem = itemId => {
		setCart(cart.filter(item => item.id !== itemId));
		
	
  	};

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{ cart, removeItem }}>
					<Navigation />

					{/* Routes */}
						<Route exact path="/">
							<Products />
						</Route>

						<Route path="/cart">
							<ShoppingCart />
						</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
