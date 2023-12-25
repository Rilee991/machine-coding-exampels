import React from 'react';

const AddEmployee = ({ openModal, setOpenModal }) => {
    return (
        <div style={{ position: "absolute", left: 0, top: 0, display: openModal ? "block" : "none", width: "300px" }}>
            <div>
                <span>Add Employee</span>
                <span onClick={() => setOpenModal(false)}>Close</span>
            </div>
            <div>
                <form>
                    <input />
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
