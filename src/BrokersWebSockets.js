import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BrokerGet from "./brokerGet"; // Import BrokerGet component

export default function BrokersWebSockets() {
    const navigate = useNavigate();

    return (
        <div className="BrokerData">
            {/* Header Section */}
            <div className="Brokerheader">

            {/* Navbar Section */}
            <div className="Brokernavbar">
                <button onClick={() => navigate("/dashboard/brokersWebSockets/add")}>Add Broker</button>
                <button onClick={() => navigate("/dashboard/brokersWebSockets/edit")}>Edit Broker</button>
                <button onClick={() => navigate("/dashboard/brokersWebSockets/delete")}>Delete Broker</button>
            </div>
            </div>
            {/* Display Broker Data */}
            <BrokerGet />

            {/* Dynamic Content */}
            <div className="content">
                <Outlet />
            </div>

            {/* Footer Section */}
            <footer className="footer">
                <p>&copy; 2025 Trading System</p>
            </footer>
        </div>
    );
}
