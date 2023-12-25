import React from 'react'

const EmployeeInfo = () => {
  return (
    <div>
      <div style={{ fontSize: "larger", paddingLeft: "10px", marginBottom: "20px", textAlign: "center" }}>Employee Information</div>
      <hr style={{width: "100%", color: "black"}} />
      <div style={{textAlign: "center"}}>
        <img src="https://cdn-icons-png.flaticon.com/512/554/554857.png" style={{ width: "300px", height: "300px", borderRadius: "50%" }} />
        <div>Name: Rohit Kumar(Emp Id - 5555)</div>
        <div>Age: 30</div>
        <div>Salary: 30</div>
        <div>Position: Software Engineer</div>
        <div>Email: rohit@app.com</div>
      </div>
    </div>
  )
}

export default EmployeeInfo;
