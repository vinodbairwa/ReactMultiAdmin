

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import BrokerGet from "./brokerGet"; // Import BrokerGet component
import websocketService from "./websocket"; // Import WebSocket module

// ✅ WebSocketComponent with Dynamic Input
const WebSocketComponent = ({ instrument }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!instrument) return; // Don't connect if instrument is empty

        websocketService.connect(
            instrument,
            (receivedData) => setData(receivedData),
            (error) => console.error("WebSocket Error:", error),
            () => console.log("WebSocket Disconnected")
        );

        return () => {
            websocketService.disconnect(); // Cleanup on unmount
        };
    }, [instrument]);

    return (
        <div className="websocketSub">
            <h2>📌Live Data for {instrument}</h2>
            {data ? (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                        <strong>🚀Open:</strong> {data.open}
                    </li>
                    <li>
                        <strong>📈High:</strong> {data.high}
                    </li>
                    <li>
                        <strong>📉Low:</strong> {data.low}
                    </li>
                    <li>
                        <strong>🔻Close:</strong> {data.close}
                    </li>
                    <li>
                        <strong>💰LTP:</strong> {data.ltp}
                    </li>
                </ul>
            ) : (
                <p>Waiting for data...</p>
            )}
        </div>
    );
};

export default function BrokersWebSockets() {
    const [step, setStep] = useState(1);
    const [instrument, setInstrument] = useState("1001"); // Default instrument value

    function stateManage1() {
        setStep(1);
    }

    function stateManage2() {
        setStep(2);
    }

    return (
        <div className="BrokerData">
            {/* Header Section */}
            <div className="Brokerheader">
                {/* Navbar Section */}
                <div className="Brokernavbar">
                    <button onClick={stateManage1}>Broker</button>
                    <button onClick={stateManage2}>WebSockets</button>
                </div>
            </div>

            {/* Dynamic Content */}
            {step === 1 && (
                <div className="content">
                    <BrokerGet />
                    <Outlet />
                </div>
            )}

            {step === 2 && (
                <div className="websocketMain" style={{ textAlign: "center" }}>
                    {/* ✅ Input Box to Set Instrument Token */}
                    <input
                        type="text"
                        value={instrument}
                        onChange={(e) => setInstrument(e.target.value)}
                        placeholder="Enter Instrument Token"
                        style={{
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <WebSocketComponent instrument={instrument} />
                </div>
            )}

            {/* Footer Section */}
            {/* <footer className="footer">
                <p>&copy; 2025 Trading System</p>
            </footer> */}
        </div>
    );
}
