import React, { useState } from "react";
import 'amazon-connect-streams';

const App = () => {
  const [count, setCount] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [status, setStatus] = useState("idle");

  const openConnectPopup = () => {
    const instanceUrl = "https://scioconnect.awsapps.com/connect/ccp-v2";
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

    const popup = window.open(
      `${instanceUrl}/connect/ccp-v2/softphone`,
      "Amazon Connect",
      popupFeatures
    );

    if (popup) {
      setCount((prev) => prev + 1);
      setIsCallActive(true);

      // Polling to check if the window is closed
      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval);
          setCount((prevCount) => Math.max(prevCount - 1, 0));
          setIsCallActive(false);
          setStatus("idle");
        }
      }, 500); // Check every 500ms

      popup.addEventListener("load", () => {
        console.log("Popup loaded");

        // Initialize CCP
        popup.window.connect.core.initCCP(
          popup.document.body, // Replace "root" with "body" for general use
          {
            ccpUrl: instanceUrl,
            loginPopup: false,
            softphone: {
              allowFramedSoftphone: true,
            },
            pageOptions: {
              enableAudioDeviceSettings: true,
              enablePhoneTypeSettings: true,
            },
          }
        );

        // Ensure contact events are set up
        popup.window.connect.contact((contact) => {
          console.log("New contact detected:", contact);

          contact.onConnecting(() => {
            console.log("Call is connecting...");
            setStatus("connecting...");
          });

          contact.onConnected(() => {
            console.log("Call is connected");
            setStatus("connected");
          });

          contact.onEnded(() => {
            console.log("Call ended");
            setStatus("ended");

            // Close popup and reset state after call ends
            setTimeout(() => {
              popup.close();
              setIsCallActive(false);
            }, 1000);
          });

          contact.onError((error) => {
            console.error("Contact error:", error);
            setStatus("error");
          });
        });

        // Verify agent is initialized
        popup.window.connect.agent((agent) => {
          console.log("Agent initialized:", agent);
        });
      });
    } else {
      alert("Popup blocked. Please allow popups for this site.");
    }
  };

  return (
    <div>
      <h5 style={{ display: "flex" }}>
        Clarence Callahan:{" "}
        <div
          style={{ cursor: "pointer", color: "skyblue" }}
          onClick={openConnectPopup}
        >
          +1 313-221-5552
        </div>
      </h5>
      <h5 style={{ display: "flex" }}>
        Joe Vega:{" "}
        <div
          style={{ cursor: "pointer", color: "skyblue" }}
          onClick={openConnectPopup}
        >
          +1 313-221-5552
        </div>
      </h5>
      <h5 style={{ display: "flex" }}>
        John Cena:{" "}
        <div
          style={{ cursor: "pointer", color: "skyblue" }}
          onClick={openConnectPopup}
        >
          +1 313-221-5552
        </div>
      </h5>
      <h5 style={{ display: "flex" }}>
        Daniel LaRusso:{" "}
        <div
          style={{ cursor: "pointer", color: "skyblue" }}
          onClick={openConnectPopup}
        >
          +1 313-221-5552
        </div>
      </h5>
      <h5 style={{ display: "flex" }}>
        Jonny Lawrence:{" "}
        <div
          style={{ cursor: "pointer", color: "skyblue" }}
          onClick={openConnectPopup}
        >
          +1 313-221-5552
        </div>
      </h5>

      <button
        onClick={openConnectPopup}
        disabled={isCallActive}
        className="flex items-center gap-2"
      >
        {isCallActive ? "Call in Progress" : "Connect Call"}
      </button>

      <p>Status: {status}</p>
    </div>
  );
};

export default App;
