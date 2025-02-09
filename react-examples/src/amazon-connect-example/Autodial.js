import React, { useEffect, useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Phone } from 'lucide-react';

const ConnectDialer = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [agentState, setAgentState] = useState(null);

  // Sample data - replace with your actual data source
  const contacts = [
    { name: "John Doe", phone: "+1234567890" },
    { name: "Jane Smith", phone: "+1987654321" },
    { name: "Bob Johnson", phone: "+1122334455" }
  ];

  useEffect(() => {
    const initializeConnect = () => {
      try {
        // Make sure to replace with your actual Connect instance URL
        const connectUrl = "https://scioconnect.awsapps.com/connect/ccp-v2";
        const containerDiv = "connect-container";

        window.connect.core.initCCP(document.getElementById(containerDiv), {
          ccpUrl: connectUrl,
          loginPopup: true,
          loginPopupAutoClose: true,
          region: "YOUR_REGION",
          softphone: {
            allowFramedSoftphone: true
          }
        });

        // Subscribe to agent state changes
        window.connect.agent((agent) => {
          console.log('Agent initialized');
          setIsInitialized(true);
          setError(null);

          // Monitor agent state
          agent.onStateChange((state) => {
            console.log('Agent state changed:', state.name);
            setAgentState(state.name);
          });

          // Get initial state
          const initialState = agent.getState();
          if (initialState) {
            setAgentState(initialState.name);
          }
        });

        // Subscribe to contact events
        window.connect.contact((contact) => {
          contact.onConnecting(() => console.log('Contact connecting'));
          contact.onConnected(() => console.log('Contact connected'));
          contact.onError((error) => {
            console.error('Contact error:', error);
            setError(`Call error: ${error.message || 'Failed to establish contact'}`);
          });
        });

      } catch (error) {
        console.error("Failed to initialize Amazon Connect:", error);
        setError("Failed to initialize Amazon Connect");
      }
    };

    const loadConnect = () => {
      if (window.connect) {
        initializeConnect();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://amazon-connect-cdn.s3.amazonaws.com/connect-streams-min.js";
      script.async = true;
      script.onload = initializeConnect;
      script.onerror = () => {
        setError("Failed to load Amazon Connect Streams library");
      };
      document.body.appendChild(script);
    };

    loadConnect();

    return () => {
      const script = document.querySelector('script[src="https://amazon-connect-cdn.s3.amazonaws.com/connect-streams-min.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleDial = (phoneNumber) => {
    if (!isInitialized) {
      setError("Amazon Connect not initialized");
      return;
    }

    if (!agentState) {
      setError("Agent state unknown");
      return;
    }

    if (agentState !== "Available") {
      setError("Agent must be in 'Available' state to make calls");
      return;
    }

    try {
      window.connect.agent((agent) => {
        // Format the phone number to E.164 format if it's not already
        const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
        
        const endpoint = window.connect.Endpoint.byPhoneNumber(formattedNumber);
        agent.connect(endpoint, {
          success: () => {
            console.log('Successfully initiated call');
            setError(null);
          },
          failure: (err) => {
            console.error('Failed to initiate call:', err);
            setError(`Failed to initiate call: ${err.message || 'Unknown error'}`);
          }
        });
      });
    } catch (error) {
      console.error("Failed to initiate call:", error);
      setError("Failed to initiate call");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Container for Amazon Connect CCP */}
      <div 
        id="connect-container" 
        className="fixed bottom-0 right-0 w-96 h-96"
      />

      {/* Agent State */}
      <div className="mb-4 p-4 bg-gray-100 rounded-md">
        Agent State: {agentState || 'Unknown'}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Contact list */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.phone} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <button
                onClick={() => handleDial(contact.phone)}
                disabled={!isInitialized || agentState !== "Available"}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {/* <Phone size={16} /> */}
                <span>Call</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectDialer;