import React, { useEffect, useContext } from 'react';
import { Context } from './Store'
import SubHeader from './SubHeader'

import axios from 'axios'

let axiosConfig = {headers: {'Access-Control-Allow-Origin': '*'}};

const Cart = () => {

	const [state, dispatch] = useContext(Context);

	function loadCartItems() {
		let cartId = state.selectedCartId
		axios.get('http://localhost:8080/getCartItems?cartId=' + cartId, axiosConfig)
			.then(response => dispatch({type: 'SET_CART_ITEMS', payload: response.data}))
			.catch(error => dispatch({type: 'SET_ERROR', payload: error.data}))
	}

	function cartItemList(id, value) {
		return (<li>{id}/{value}</li>)
	}

	useEffect(() => {
		loadCartItems()
	}, [])

	return (<React.Fragment>
		<SubHeader/>
		<div><ul>
		{Object.keys(state.items).map(key => cartItemList(key, state.items[key]))}
		</ul></div>
	</React.Fragment>)
}

export default Cart;
