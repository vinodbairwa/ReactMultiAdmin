

// import { BrowserRouter as Router, Routes, Route, useNavigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
// import Login from './AdminLogin';
// import AdminSignUp from './AdminSignup';
// import Dashbord from "./deshbord";
// import Dashboard from "./deshbord";

// function App() {
//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element:<><Dashboard/><dashboard/></>
//         }
//     ])
//     return (
//         <Router>
            
//             <div className="App">
//                 <Routes>
//                     <Route path="/" element={<LoginPage />} />
//                     <Route path="/AdminSignup" element={<AdminSignupPage />} />

//                     <Route path="/Dashbord/*" element={<AdminDashboard/>} />
//                  <RouterProvider router={router}/>
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// // ✅ Login Page Component with Navigation
// function LoginPage() {
//     const navigate = useNavigate();
    
//     return <Login onSignupClick={() => navigate("/AdminSignup")} />;
// }

// //  ✅ Signup Page Component with Navigation
// function AdminSignupPage() {
//     const navigate = useNavigate();
    
//     return <AdminSignUp onBackToLogin={() => navigate("/")} />;
// }

// function AdminDashboard() {
//     const navigate = useNavigate();
//     return <Dashbord onLogout={() => navigate("/")} />; // 🔄 Fixed navigation
// }

// export default App;







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
import AdminManagement from "./AdminManage"
import  Logout from "./Logout";

function App() {
    return (
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
                    <Route path="reportsLogs" element={<ReportsLogs />} />
                    <Route path="offersSubscriptions" element={<OffersSubscriptions />} />
                    <Route path="mediaContent" element={<MediaContent />} />
                    <Route path="contactSupport" element={<ContactSupport />} />
                    <Route path="logout" element={<Logout/>} />
                
                    

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
