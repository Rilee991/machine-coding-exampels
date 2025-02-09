import React from 'react';
import AmazonConnect from './AmazonConnect';
// import AmazonConnect from './AmazonConnectAudioRefresh';
// import ConnectDialer from './Dialer';
import ConnectDialer from './Dialer2';

const Main = () => {
    return (
        <div>
            <h1>Customer Support Dashboard</h1>
            <AmazonConnect />
            {/* <ConnectDialer instanceUrl="https://scioconnect.awsapps.com/connect/ccp-v2" /> */}
        </div>
    );
}

export default Main;
