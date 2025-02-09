import React, { useState, useEffect } from 'react';
// import { PhoneCall } from '';
// import { Button } from 'bootstrap';

const ConnectDialer = ({ 
  instanceUrl = 'YOUR_CONNECT_INSTANCE_URL'
}) => {
  const [popupWindow, setPopupWindow] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    // Load the Amazon Connect Streams API
    const script = document.createElement('script');
    script.src = `${instanceUrl}/connect/connect-streams-min.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [instanceUrl]);

  const openConnectPopup = () => {
    // Configure popup window dimensions and features
    const width = 400;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popupFeatures = `
      width=${width},
      height=${height},
      left=${left},
      top=${top},
      resizable=yes,
      scrollbars=yes,
      status=no,
      location=no,
      toolbar=no,
      menubar=no
    `;

    // Create the popup window with the Connect CCP URL
    const popup = window.open(
      `${instanceUrl}/connect/ccp-v2/softphone`,
      'Amazon Connect',
      popupFeatures
    );

    setPopupWindow(popup);

    // Setup event listener for window close
    const checkWindow = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkWindow);
        setPopupWindow(null);
        // Handle any cleanup or state updates after call ends
      }
    }, 1000);

    // Initialize Connect once the popup loads
    popup.addEventListener('load', () => {
      const connectUrl = new URL(instanceUrl);
      
      // Initialize the Connect CCP
      // @ts-ignore (connect will be available from the loaded script)
      window.connect.core.initCCP(popup.document.getElementById('root'), {
        ccpUrl: instanceUrl,
        loginPopup: false,
        softphone: {
          allowFramedSoftphone: true,
        },
        pageOptions: {
          enableAudioDeviceSettings: true,
          enablePhoneTypeSettings: true
        }
      });

      // Setup event handlers for call states
      // @ts-ignore
      window.connect.contact((contact) => {
          contact.onConnecting(() => {
            setStatus("connecting");
              console.log('Call connecting....');
          })
          contact.onError(() => {
            setStatus("errored call");
              console.log("Errored call");
          })
        contact.onConnected(() => {
            setStatus("connected");
          console.log('Call connected');
        });

        contact.onEnded(() => {
          console.log('Call ended');
          setStatus("ended");
          setTimeout(() => {
            popup.close();
          }, 1000);
        });
      });
    });
  };

  return (
      <>
    <button
      onClick={openConnectPopup}
      disabled={!!popupWindow}
      className="flex items-center gap-2"
    >
      {/* <PhoneCall className="w-4 h-4" /> */}
      {popupWindow ? 'Call in Progress' : 'Connect Call'}
    </button>
    <br/>
    {status}
    </>
  );
};

export default ConnectDialer;