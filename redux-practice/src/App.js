import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decNumber, incNumber } from './actions';

const App = () => {
	const myState = useSelector(state => state.changeTheNumber);
	const dispatch = useDispatch();

	return (
		<div className="container">
			<h1>Increment/Decrement counter</h1>
			<h4>Using React and Redux</h4>

			<div className="quantity">
				<a onClick={() => dispatch(decNumber())} className="quantity__minus" title="Decrement"><span>-</span></a>
				<input name="quantity" type="text" className="quantity__input" value={myState} />
				<a onClick={() => dispatch(incNumber())} className="quantity__plus" title="Increment"><span>+</span></a>
			</div>
		</div>
    );
}

export default App;
