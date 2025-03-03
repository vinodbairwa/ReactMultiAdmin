
// import { useState } from "react";
// import OrdersTransactions from "./OrdersTransactions";
// import TradingStrategies from "./TradingStrategies";
// import BrokersWebSockets from "./BrokersWebSockets";
// import ReportsLogs from "./ReportsLogs";
// import OffersSubscriptions from "./OffersSubscriptions";
// import MediaContent from "./MediaContent";
// import ContactSupport from "./ContactSupport";
// import UserManagement from "./UserManage";
// import DashboardOverView from "./DeshboredOverView"


// export default function Dashboard() {
//     const [activeModule, setActiveModule] = useState("dashboard"); // Default view is "dashboard"

//     return (
//         <div className="dashboard">
//             <nav>
//                 <button onClick={() => setActiveModule("dashboard")}
//                     className={activeModule === "dashboard" ? "active-button" : "inactive-button"}>
//                     Dashboard Overview
//                 </button>
//                 <button onClick={() => setActiveModule("userManagement")}
//                      className={activeModule === "userManagement" ? "active-button" : "inactive-button"}>
//                     User Management
//                 </button>
//                 <button onClick={() => setActiveModule("ordersTransactions")}
//                     className={activeModule === "ordersTransactions" ? "active-button" : "inactive-button"}>
//                     Orders & Transactions
//                 </button>
//                 <button onClick={() => setActiveModule("tradingStrategies")}
//                     className={activeModule === "tradingStrategies" ? "active-button" : "inactive-button"}>
//                     Trading & Strategies
//                 </button>
//                 <button onClick={() => setActiveModule("brokersWebSockets")}
//                     className={activeModule === "brokersWebSockets" ? "active-button" : "inactive-button"}>
//                     Brokers & WebSockets
//                 </button>
//                 <button onClick={() => setActiveModule("reportsLogs")}
//                     className={activeModule === "reportsLogs" ? "active-button" : "inactive-button"}>
//                     Reports & Logs
//                 </button>
//                 <button onClick={() => setActiveModule("offersSubscriptions")}
//                     className={activeModule === "offersSubscriptions" ? "active-button" : "inactive-button"}>
//                     Offers & Subscriptions
//                 </button>
//                 <button onClick={() => setActiveModule("mediaContent")}
//                     className={activeModule === "mediaContent" ? "active-button" : "inactive-button"}>
//                     Media & Content
//                 </button>
//                 <button onClick={() => setActiveModule("contactSupport")}
//                     className={activeModule === "contactSupport" ? "active-button" : "inactive-button"}>
//                     Contact & Support
//                 </button>
//                 <button>Logout</button>
//             </nav>

//             {/* ✅ Conditionally Render Components Based on Active Module */}
//             {activeModule === "dashboard" && <DashboardOverView />}
//             {activeModule === "userManagement" && <UserManagement />}
//             {activeModule === "ordersTransactions" && <OrdersTransactions />}
//             {activeModule === "tradingStrategies" && <TradingStrategies />}
//             {activeModule === "brokersWebSockets" && <BrokersWebSockets />}
//             {activeModule === "reportsLogs" && <ReportsLogs />}
//             {activeModule === "offersSubscriptions" && <OffersSubscriptions />}
//             {activeModule === "mediaContent" && <MediaContent />}
//             {activeModule === "contactSupport" && <ContactSupport />}

//         </div>
//     );
// }





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
