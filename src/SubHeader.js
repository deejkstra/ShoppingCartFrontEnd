import React, { useEffect, useContext } from 'react'
import { Context } from './Store'

const SubHeader = () => {

	const [state, dispatch] = useContext(Context)

	return (<div class="subheader">
		<div class="selectedCartId"><h3>Selected Cart ID:</h3>
		{state.selectedCartId}
		</div>
		<div class="totalPrice">
		<h3>Total Price</h3>
		{state.totalPrice}
		</div>
		<hr/>
	</div>)
}

export default SubHeader;
