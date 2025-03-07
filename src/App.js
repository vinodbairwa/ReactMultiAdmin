

// // import { BrowserRouter as Router, Routes, Route, useNavigate, createBrowserRouter, RouterProvider } from "react-router-dom";
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./deshbord";
// import Login from "./AdminLogin";
// import AdminSignup from './AdminSignup';
// import DashboardOverView from "./DeshboredOverView";
// import UserManagement from "./UserManage";
// import OrdersTransactions from "./OrdersTransactions";
// import TradingStrategies from "./TradingStrategies";
// import BrokersWebSockets from "./BrokersWebSockets";
// import ReportsLogs from "./ReportsLogs";
// import OffersSubscriptions from "./OffersSubscriptions";
// import MediaContent from "./MediaContent";
// import ContactSupport from "./ContactSupport";
// import ForgetPassword from "./forgetPassword";
// import AdminManagement from "./AdminManage"
// import  Logout from "./Logout";


// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/adminsignup" element={<AdminSignup />} />
//                 <Route path="/forgetpassword" element={<ForgetPassword />} />
//                 <Route path="dashboard/*" element={<Dashboard />}>
            
//                     {/* ✅ Define nested routes inside Dashboard */}
//                     <Route index element={<DashboardOverView />} />
//                     <Route path="userManagement" element={<UserManagement />} />
//                     <Route path="AdminManagement" element={<AdminManagement />} />
//                     <Route path="ordersTransactions" element={<OrdersTransactions />} />
//                     <Route path="tradingStrategies" element={<TradingStrategies />} />
//                     <Route path="brokersWebSockets" element={<BrokersWebSockets />} />
//                     <Route path="reportsLogs" element={<ReportsLogs />} />
//                     <Route path="offersSubscriptions" element={<OffersSubscriptions />} />
//                     <Route path="mediaContent" element={<MediaContent />} />
//                     <Route path="contactSupport" element={<ContactSupport />} />
//                     <Route path="logout" element={<Logout/>} />
                
                    

//                 </Route>
//             </Routes>
//         </Router>
//     );
// }

// export default App;



import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./deshbord";
import Login from "./AdminLogin";
import AdminSignup from './AdminSignup';
import DashboardOverView from "./DeshboredOverView";
import UserManagement from "./UserManage";
import OrdersTransactions from "./OrdersTransactions";
import TradingStrategies from "./TradingStrategies";
import BrokersWebSockets from "./BrokersWebSockets";
import ReportsLogs from "./ReportsLogs";
import OffersSubscriptions from "./OffersSubscriptions";
import MediaContent from "./MediaContent";
import ContactSupport from "./ContactSupport";
import ForgetPassword from "./forgetPassword";
import AdminManagement from "./AdminManage";
import Logout from "./Logout";
import  RolePermission from './rolePermission'

// ✅ Import UserProvider
import { UserProvider } from "./currentUser"; 

function App() {
    return (
        <UserProvider>  {/* ✅ Wrap everything inside UserProvider */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/adminsignup" element={<AdminSignup />} />
                    <Route path="/forgetpassword" element={<ForgetPassword />} />
                    <Route path="dashboard/*" element={<Dashboard />}>
                
                        {/* ✅ Define nested routes inside Dashboard */}
                        <Route index element={<DashboardOverView />} />
                        <Route path="userManagement" element={<UserManagement />} />
                        <Route path="AdminManagement" element={<AdminManagement />} />
                        <Route path="ordersTransactions" element={<OrdersTransactions />} />
                        <Route path="tradingStrategies" element={<TradingStrategies />} />
                        <Route path="brokersWebSockets" element={<BrokersWebSockets />} />
                        

                        <Route path="RolePermissionManage" element={< RolePermission />} />
        
                        <Route path="reportsLogs" element={<ReportsLogs />} />
                        <Route path="offersSubscriptions" element={<OffersSubscriptions />} />
                        <Route path="mediaContent" element={<MediaContent />} />
                        <Route path="contactSupport" element={<ContactSupport />} />
                        <Route path="logout" element={<Logout/>} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider> 
    );
}

export default App;
