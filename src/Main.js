import React, { useEffect, useContext } from 'react'
import { Context } from './Store'
import SubHeader from './SubHeader'

import axios from 'axios'

import List from 'react-list-select'

let axiosConfig = {headers: {'Access-Control-Allow-Origin': '*'}};

const Main = () => {

	const [state, dispatch] = useContext(Context)

	function loadShoppingCarts() {
		axios.get('http://localhost:8080/getShoppingCarts', axiosConfig)
			.then(response => dispatch({type: 'SET_CARTS', payload: response.data}))
			.catch(error => dispatch({type:'SET_ERROR', payload: error}))
	}

	function createShoppingCart() {
		axios.get('http://localhost:8080/createShoppingCart', axiosConfig)
			.then(response => {
				dispatch({type: 'SET_SELECTED_CART_ID', payload: response.data})
				loadShoppingCarts()
			})
			.catch(error => dispatch({type:'SET_ERROR', payload: error}))
	}

	function setSelectedCartId(selectedId) {
		dispatch({type: 'SET_SELECTED_CART_ID', payload: state.carts[selectedId]})
	}

	useEffect(() => {
		loadShoppingCarts()
	}, [])

	return (<React.Fragment>
		<SubHeader/>
		<div class='content main'>
			<button onClick={createShoppingCart}>Create Shopping Cart</button>
			<h3>List of Shopping Carts</h3>
			<List 
			items={state.carts} 
			multiple={false} 
			onChange={setSelectedCartId} />
		</div>
	</React.Fragment>)
}

export default Main;
