import React, { useState, useEffect } from 'react';
// import { PhoneCall } from 'lucide-react';
// import { Button } from '@/components/ui/button';

const ConnectDialer = ({ 
  instanceUrl = 'YOUR_CONNECT_INSTANCE_URL',
  contactFlowId = 'YOUR_CONTACT_FLOW_ID',
  apiUrl = 'YOUR_API_GATEWAY_URL'
}) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleMessage = (event) => {
        console.log("Event logged:", event);
      if (event.data === "CLOSE_WINDOW") {
        // Decrement the count when a window sends a "close" message
        setIsCallActive(false);
      }
    };

    // Listen for messages from child windows
    window.addEventListener("message", handleMessage);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const openWindow = () => {
    const newWindow = window.open("", "_blank", "width=400,height=400");
    if (newWindow) {
      // Increment the count when a new window is opened
      setCount((prevCount) => prevCount + 1);

      // Add content to the new window and set up communication
      newWindow.document.write("<h1>This is the new window</h1>");
      newWindow.document.write(`
        <script>
          window.addEventListener('unload', () => {
            window.opener.postMessage('CLOSE_WINDOW', '*');
          });
        </script>
      `);

      // Optional: Focus on the new window
      newWindow.focus();
    } else {
      alert("Popup blocked. Please allow popups for this site.");
    }
  };

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

    if(popup) {

        setIsCallActive(true);

        // Initialize Connect once the popup loads
        popup.addEventListener('load', () => {
        // Initialize the Connect CCP
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
        window.connect.contact((contact) => {
            contact.onConnected(() => {
            console.log('Call connected');
            });

            contact.onEnded(() => {
            console.log('Call ended');
            setTimeout(() => {
                popup.close();
                setIsCallActive(false);
            }, 1000);
            });
        });

        //   // Add event listeners to detect window closure
        //   popup.addEventListener('unload', () => {
        //     setIsCallActive(false);
        //   });
        //   popup.onbeforeunload = () => {
        //       setIsCallActive(false);
        //   }

        // Backup check using window focus
        //   const checkWindowInterval = setInterval(() => {
        //     if (popup.closed) {
        //       clearInterval(checkWindowInterval);
        //       setIsCallActive(false);
        //     }
        //   }, 1000);

        //   // Clean up interval when the popup is closed
        //   popup.addEventListener('unload', () => {
        //     clearInterval(checkWindowInterval);
        //   });
        });
    }
  };

  return (
    <button
      onClick={openConnectPopup}
      disabled={isCallActive}
      className="flex items-center gap-2"
    >
      {/* <PhoneCall className="w-4 h-4" /> */}
      {isCallActive ? 'Call in Progress' : 'Connect Call'}
      {count}
    </button>
  );
};

export default ConnectDialer;