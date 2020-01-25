import React, { useContext } from 'react'
import { Context } from './Store'

const SubHeader = () => {

	const [state,] = useContext(Context)

	function getSelectedCartId() {
		return state.selectedCartId ? state.selectedCartId : 'None'
	}

	function getTotalPrice() {
		return state.totalPrice ? state.totalPrice : 'None'
	}

	return (<React.Fragment>
<table className='subheader'>
    <thead>
        <tr>
            <th>Selected Cart ID</th>
            <th>Total Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{getSelectedCartId()}</td>
            <td>{getTotalPrice()}</td>
        </tr>
    </tbody>
</table>
		<hr/>
	</React.Fragment>)
}

export default SubHeader;
