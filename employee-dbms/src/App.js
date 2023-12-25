import { useState } from 'react';
import './App.css';
import Employee from './components/Employee/Employee';
import Header from './components/Header/Header';

import { employees } from './data';

function App() {
	const [employeesList, setEmployeesList] = useState(employees);

	return (
		<div className="appContainer">
			<Header />
            <hr style={{width: "100%", color: "black"}} />
			<Employee employeesList={employeesList} />
			<hr style={{width: "100%", color: "black"}} />
		</div>
	);
}

export default App;
