import React from 'react';
import EmployeeInfo from './EmployeeInfo';
import EmployeeList from './EmployeeList';

const Employee = ({ employeesList }) => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "40%", marginRight: "20px", borderRight: "1px solid black" }}>
                <EmployeeList employeesList={employeesList} />
            </div>
            <div style={{ width: "60%" }}>
                <EmployeeInfo />
            </div>
        </div>
    );
}

export default Employee;