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

	function getCartRow(itemId, count) {
        	return(<tr>
			<td>{itemId}</td>
			<td>{count}</td>
		</tr>)
	}

	function getCartTable() {
		return (<table>
    			<thead>
        		<tr>
            			<th>Item ID</th>
            			<th>Amount in Cart</th>
        		</tr>
    			</thead>
    			<tbody>
			{Object.keys(state.items).map(key => getCartRow(key, state.items[key]))}
    			</tbody>
			</table>) 
	}

	function getTotalPrice(){
		axios.get('http://localhost:8080/getTotalPrice?cartId='+state.selectedCartId,axiosConfig)
			.then(response=>dispatch({type:'SET_TOTAL_PRICE',payload:response.data}))
			.catch(error=>dispatch({type:'SET_ERROR',payload:error}))
	}

	function clearCart() {
		axios.get('http://localhost:8080/clearCart?cartId=' + state.selectedCartId)
			.then(response => {
				loadCartItems()
				getTotalPrice()
			})
	}

	useEffect(() => {
		loadCartItems()
	}, [])

	return (<React.Fragment>
		<SubHeader/>
		<div className='content cart'>
		<button onClick={clearCart}>Clear Cart</button>
		<h3>Items in Cart</h3>
		{getCartTable()}
		</div>
	</React.Fragment>)
}

export default Cart;
