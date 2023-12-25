import React, { useState } from 'react';

const EmployeeList = ({ employeesList }) => {
    return (
        <div>
            <div style={{ fontSize: "larger", paddingLeft: "10px", marginBottom: "20px", textAlign: "center" }}>Employee List</div>
            {employeesList.map(eachEmp => (
                <div key={eachEmp.id} style={{ display: "flex", paddingLeft: "10px", paddingRight: "10px", marginBottom: "5px", height: "40px", alignItems: "center", justifyContent: "space-between", borderRadius: "20px", background: "yellow" }}>
                    <span>{`${eachEmp.firstName} ${eachEmp.lastName}`}</span>
                    <span><button style={{ borderRadius: "10px", background: "lightgrey" }}>Delete</button></span>
                </div>
            ))}
        </div>
    );
}

export default EmployeeList;
