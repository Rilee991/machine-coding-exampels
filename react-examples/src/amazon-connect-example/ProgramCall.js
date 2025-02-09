import React, { useState, useEffect } from 'react';
import 'amazon-connect-streams';

const AmazonConnectDialer = () => {
  const [connectInstance, setConnectInstance] = useState(null);
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize Amazon Connect
    const initConnect = async () => {
      try {
        // Make sure the connect API is loaded
        console.log(window.connect);
        if (!window.connect) {
          throw new Error('Amazon Connect API not loaded');
        }

        // Create container if it doesn't exist
        const containerDiv = document.getElementById('amazon-connect-container');
        if (!containerDiv) {
          const div = document.createElement('div');
          div.id = 'amazon-connect-container';
          document.body.appendChild(div);
        }

        // Initialize CCP
        window.connect.core.initCCP({
          containerDiv: 'amazon-connect-container',
          ccpUrl: 'https://scioconnect.awsapps.com/connect/ccp-v2', // Replace with your Connect instance URL
          loginPopup: false, // Set to true if you want login popup
          softphone: {
            allowFramedSoftphone: true
          }
        });
        console.log("111");

        // Store the connect instance
        setConnectInstance(window.connect);
        
        // Set up global error handler
        window.connect.core.onError((error) => {
          setError(`Connect Error: ${error.message}`);
        });

      } catch (err) {
        setError(`Failed to initialize Amazon Connect: ${err.message}`);
      }
    };

    initConnect();

    // Cleanup
    return () => {
      if (contact) {
        contact.clear();
      }
    };
  }, []);

  const makeCall = async (phoneNumber) => {
    try {
      if (!connectInstance) {
        throw new Error('Amazon Connect not initialized');
      }

      // Validate phone number format
      const formattedNumber = phoneNumber.replace(/\D/g, '');
      if (formattedNumber.length < 10) {
        throw new Error('Invalid phone number');
      }

      // Get agent's connection
      const agent = new connectInstance.Agent();

      // Create the endpoint
      const endpoint = new connectInstance.Endpoint(phoneNumber, 'number');

      // Make the call
      agent.connect(endpoint, {
        success: (call) => {
          setContact(call);
          console.log('Call initiated successfully');
        },
        failure: (err) => {
          setError(`Failed to connect call: ${err.message}`);
        }
      });

    } catch (err) {
      setError(`Failed to make call: ${err.message}`);
    }
  };

  const endCall = () => {
    if (contact) {
      contact.clear();
      setContact(null);
    }
  };

  return (
    <div className="p-4">
      <div 
        id="amazon-connect-container" 
        style={{ width: '400px', height: '600px' }}
      />
      
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={() => makeCall('+1234567890')}
          disabled={!!contact}
          // className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Make Call
        </button>

        <button
          onClick={endCall}
          disabled={!contact}
          // className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default AmazonConnectDialer;