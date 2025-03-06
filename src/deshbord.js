


import { Link, Outlet, useLocation } from "react-router-dom";
import  Logout from "./Logout";

export default function Dashboard() {
    const location = useLocation();


    const activeModule = location.pathname === "/dashboard" ? "dashboard" : location.pathname.replace("/dashboard/", "");

    return (
        <div className="dashboard">
            <h1 id="mainheading">Hello Admin Dashboard !</h1>
            <nav>
                <Link to="/dashboard" className={activeModule === "dashboard" ? "active-button" : "inactive-button"}>
                    Dashboard Overview
                </Link>
                <Link to="/dashboard/AdminManagement" className={activeModule === "AdminManagement" ? "active-button" : "inactive-button"}>
                    Admin Management
                </Link>

                <Link to="/dashboard/userManagement" className={activeModule === "userManagement" ? "active-button" : "inactive-button"}>
                    User Management
                </Link>

                <Link to="/dashboard/ordersTransactions" className={activeModule === "ordersTransactions" ? "active-button" : "inactive-button"}>
                    Orders & Transactions
                </Link>
                <Link to="/dashboard/tradingStrategies" className={activeModule === "tradingStrategies" ? "active-button" : "inactive-button"}>
                    Trading & Strategies
                </Link>
                <Link to="/dashboard/brokersWebSockets" className={activeModule === "brokersWebSockets" ? "active-button" : "inactive-button"}>
                    Brokers & WebSockets
                </Link>
                <Link to="/dashboard/reportsLogs" className={activeModule === "reportsLogs" ? "active-button" : "inactive-button"}>
                    Reports & Logs
                </Link>
                <Link to="/dashboard/offersSubscriptions" className={activeModule === "offersSubscriptions" ? "active-button" : "inactive-button"}>
                    Offers & Subscriptions
                </Link>
                <Link to="/dashboard/mediaContent" className={activeModule === "mediaContent" ? "active-button" : "inactive-button"}>
                    Media & Content
                </Link>
                <Link to="/dashboard/contactSupport" className={activeModule === "contactSupport" ? "active-button" : "inactive-button"}>
                    Contact & Support
                </Link>
                <Logout />
    
            </nav>

            {/* ✅ This will render the correct component based on the route */}
            <div className="dashboard-content">
                <Outlet />

           
            </div>
        </div>
    );
}
