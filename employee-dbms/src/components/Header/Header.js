import React, { useState } from 'react';
import AddEmployee from './AddEmployee';

import './Header.css';

const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="headerContainer">
            <div style={{ fontSize: "x-large", fontWeight: 500 }}>
                Employee Management System
            </div>
            <div>
                <button onClick={() => setOpenModal(true)} style={{ fontSize: "large", borderRadius: "10px", background: "lightgrey" }}>Add Employee</button>
            </div>
            <AddEmployee openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}

export default Header;
