import React, { useEffect, useContext } from 'react'
import { Context } from './Store'
import SubHeader from './SubHeader'

import axios from 'axios'

let axiosConfig = {headers: {'Access-Control-Allow-Origin': '*'}};

const Shop = () => {

	const [state, dispatch] = useContext(Context)

	function getTotalPrice() {
		axios.get('http://localhost:8080/getTotalPrice?cartId=' + state.selectedCartId, axiosConfig)
			.then(response => dispatch({type: 'SET_TOTAL_PRICE', payload: response.data}))
			.catch(error => dispatch({type:'SET_ERROR', payload: error}))
	}

	function addToCart(id) {
		var url = 'http://localhost:8080/addToCart?'
		url += 'cartId=' + state.selectedCartId
		url += '&itemId=' + id
		axios.get(url, axiosConfig)
			.then(response => getTotalPrice())
			.catch(error => dispatch({type:'SET_ERROR', payload: error}))
	}

	function priceDiscount(discountData) {
		if (discountData.length == 0) {
			return
		}

		return (<div className='discount'>
			{discountData[0].number} for ${discountData[0].price}
		</div>)
	}

	function priceItem(priceData) {
		return (
		<button key={priceData.id} className='addToCart'
		onClick={() => addToCart(priceData.id)}>
		{priceData.description} / ${priceData.unit_price}
		{priceDiscount(priceData.volume_discounts)}
		</button>)
	}

	function loadInventory() {
		axios.get('http://localhost:8080/getInventory', axiosConfig)
			.then(response => dispatch({type: 'SET_INVENTORY', payload: response.data}))
			.catch(error => dispatch({type:'SET_ERROR', payload: error}))
	}

	useEffect(() => {
		loadInventory()
	}, [])

	return (<React.Fragment>
		<SubHeader/>
		<div className='content shop'>
		<h3>Inventory</h3>
		{state.inventory.map(data => priceItem(data))}
		</div>
	</React.Fragment>)
}

export default Shop;
