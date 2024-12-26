import React from 'react';

const Sidebar = ({ open, isCollapsed }) => {
    return (
        <div style={{ overflow: "hidden", width: open ? (isCollapsed ? "50px" : "300px") : "0px", transition: "width 400ms", background: "blue", height: "100vh", display: "flex", flexDirection: "column", color: "red", justifyContent: "space-between" }}>
            <div>
                <div>
                    <img alt="sir" width="100" src="https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg" />
                    Header
                </div>
                <div>
                    Body
                </div>
            </div>
            <div>
                Footer
            </div>
        </div>
    );
}

export default Sidebar;
