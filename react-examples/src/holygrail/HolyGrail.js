import React from 'react';

import './styles.css';

const HolyGrail = () => {
    return (
        <div className="container">
            <header className="header common">Header</header>
            <div className="sidebar leftnav common">Left Sidebar is taking too much space and its overshadowing the main content</div>
            <main className="content common">Main content</main>
            <div className="siderbar rightnav common">Right Sidebar is taking too much space and its overshadowing the main content</div>
            <footer className="footer common">Footer</footer>
        </div>
    );
}

export default HolyGrail;
