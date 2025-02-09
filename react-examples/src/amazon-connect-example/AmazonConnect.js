import React, { useEffect, useState } from 'react';
import 'amazon-connect-streams';

const AmazonConnect = () => {
  const [agentStatus, setAgentStatus] = useState("loading...");
  const [callStatus, setCallStatus] = useState("idle");
  const [activeConn, setActiveConn] = useState(null);
  const [agent, setAgent] = useState(null);
  const [isCCPInit, setIsCCPInit] = useState(false);
    useEffect(() => {
        const containerDiv = document.getElementById("container-div");
        const instanceURL = "https://scioconnect.awsapps.com/connect/ccp-v2";

        console.log(`Before Init`);

        function init() {
            console.log(`Inside Init`);
            if (window.connect && window.connect.core) {
                console.log(`Got window.connect: ${window.connect}`);
                window.connect.core.initCCP(containerDiv, {
                    ccpUrl: instanceURL,
                    loginPopup: true,
                    loginPopupAutoClose: true,
                    loginOptions: {
                        autoClose: true,
                        height: 600,
                        width: 400,
                        top: 0,
                        left: 0
                    },
                    region: "eu-central-1",
                    softphone: {
                        allowFramedSoftphone: true,
                        disableRingtone: false,
                        ringtoneUrl: "[your-ringtone-filepath].mp3",
                        allowFramedVideoCall: true,
                        allowEarlyGum: true
                    },
                    task: {
                        disableRingtone: false,
                        ringtoneUrl: "[your-ringtone-filepath].mp3"
                    },
                    pageOptions: {
                        enableAudioDeviceSettings: false,
                        enableVideoDeviceSettings: false,
                        enablePhoneTypeSettings: true
                    },
                    shouldAddNamespaceToLogs: false,
                    ccpAckTimeout: 5000,
                    ccpSynTimeout: 3000,
                    ccpLoadTimeout: 10000
                });

                window.connect.core.onInitialized(() => {
                  console.log("CCP Initialised");
                });

                window.connect.agent((agent) => {
                  console.log("Agent initialised: status:", agent.getStatus().name);
                  setAgentStatus(agent.getStatus().name);
                  setAgent(agent);
                  setIsCCPInit(true);

                  agent.onStateChange((stateObj) => {
                    console.log("initialised, obj:", stateObj);
                    setAgentStatus(stateObj.newState);
                    setAgent(agent);
                  });

                  window.connect.contact((contact) => {
                    console.log("initialised_contact: New contact available:", contact.getContactId(), contact.getStatus().type, contact.getConnections(), contact.getInitialConnection(), contact.getActiveConnections(), contact.getActiveInitialConnection());

                    // Listen for contact state changes
                    contact.onRefresh(() => {
                      console.log("initialised_contact refresh Contact status:", contact.getStatus().type, contact.getConnections(), contact.getInitialConnection(), contact.getActiveConnections(), contact.getActiveInitialConnection());
                      setCallStatus(contact.getStatus().type);
                      setActiveConn(contact.getActiveConnections());
                    });
                    

                    contact.onAccepted(() => {
                      console.log("initialised_contact accepted Contact status:", contact.getStatus().type, contact.getConnections(), contact.getInitialConnection(), contact.getActiveConnections(), contact.getActiveInitialConnection());
                      setCallStatus(contact.getStatus().type);
                    });

                    contact.onConnecting(() => {
                      console.log("initialised_contact connecting Contact status:", contact.getStatus().type, contact.getConnections(), contact.getInitialConnection(), contact.getActiveConnections(), contact.getActiveInitialConnection());
                      setCallStatus(contact.getStatus().type);
                    });

                    contact.onEnded(() => {
                      console.log("initialised_contact ended Contact status:", contact.getStatus().type, contact.getConnections(), contact.getInitialConnection(), contact.getActiveConnections(), contact.getActiveInitialConnection());
                      setCallStatus(contact.getStatus().type);
                      contact.clear();
                    });

                    contact.onError(() => {
                      console.log("initialised_contact errored Contact status:", contact.getStatus().type, contact.getConnections(), contact.getInitialConnection(), contact.getActiveConnections(), contact.getActiveInitialConnection());
                      setCallStatus(contact.getStatus().type);
                    });

                    contact.onMissed(() => {
                      console.log("initialised_contact missed Contact status:", contact.getStatus().type, contact.getConnections(), contact.getInitialConnection(), contact.getActiveConnections(), contact.getActiveInitialConnection());
                      setCallStatus(contact.getStatus().type);
                    });

                    // End the call programmatically
                    contact.onConnected(() => {
                      console.log("initialised_contact connected Call connected!", contact.getConnections(), contact.getInitialConnection(), contact.getActiveConnections(), contact.getActiveInitialConnection());
                      // To end the call
                      // contact.destroy();
                    });
                  })
                });
            } else {
                console.log(`Error Init`);
                console.error("Amazon Connect Streams API is not loaded.");
            }
        }

        init();

        return () => {
            // Cleanup code if needed
        };
    }, []);

    const handleClick = (e) => {
      e.preventDefault();
      console.log("AGENT Initialised: ", agent.getStatus().name);
      const endpoint = window.connect.Endpoint.byPhoneNumber("+13132215552");
      // +1 313-221-5552

      agent.connect(endpoint, {
        // queueARN: queueArn,
        success: function() { console.log("initialised2 outbound call connected"); },
        failure: function(err) {
          console.log("initialised3 outbound call connection failed");
          console.log("initialised4", err);
        }
      });
    }

    const handleEndCall = (e) => {
      e.preventDefault();
      console.log("AGENT Initialised: ", agent.getStatus().name);
      activeConn?.map(conn => conn.destroy());
    }

    return (
        <div>
            Agent Status:{agentStatus}
            <br/>
            <a href="/">Back</a>
            <br/>
            Call Status: {callStatus}
            <br/>
            <button disabled={!(["idle", "ended"].includes(callStatus) && isCCPInit)} onClick={handleClick}>Call</button>
            <button disabled={![window.connect.ConnectionStateType.CONNECTING, window.connect.ConnectionStateType.CONNECTED].includes(callStatus)} onClick={handleEndCall}>End</button>
            <div id="container-div" style={{  width: '500', height: '500', margin: '20px auto', border: '1px solid #ddd' }}></div>
        </div>
    );
};

export default AmazonConnect;
