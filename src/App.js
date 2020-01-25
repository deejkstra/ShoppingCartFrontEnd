import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Store from './Store'
import Main from './Main'
import Shop from './Shop'
import Cart from './Cart'
import './custom.css'
//import './App.css'

const App = () => {


	return (
		<Store>
		<Router>
<div className='header'>
<ul>
          <li>
            <Link to='/'>Main</Link>
          </li>
          <li>
            <Link to='/shop'>Shop</Link>
          </li>
          <li>
            <Link to='/cart'>Cart</Link>
          </li>
        </ul>
</div>
<hr />

			<Route exact path='/' component={Main} />
			<Route path='/shop' component={Shop} />
			<Route path='/cart' component={Cart} />
		</Router>
		</Store>
	);
}

export default App;
