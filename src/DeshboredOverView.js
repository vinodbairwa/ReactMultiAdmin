
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import './dashboardOverView.css'; 

export default function DashboardOverView() {
    const [disabledUsers, setDisabledUsers] = useState([]);
    const [activeStrategy, setActiveStrategy] = useState([]);

    const [masterOderStatus, setMasterOder] = useState({});
    const [manualOrderStatus, setManualOrder] = useState([]);
    const [brokerOderStatus, setBrokerOder] = useState([]);
    const [domainOrderStatus, setDomainOrder] = useState([]);
    const [domainPaperOrderStatus, setDomainPaperOrder] = useState([]);

    useEffect(() => {
        // ---------------- fetchUsers ----------
        const fetchUsers = async () => {
           
            try {
                const response = await fetch("http://localhost:8000/User/User/Get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming JWT auth
                    },
                    credentials: "include",
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                if (data.User_Data) {

                    const disabled = data.User_Data.filter(user => user.is_disabled === false);
                    setDisabledUsers(disabled);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        // ----------------- fetchStrategies----------
        const fetchStrategies = async () => {
           
            try {
                const response = await fetch("http://localhost:8000/User/DomainStrategy/Get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming JWT auth
                    },
                    credentials: "include",
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
            
    
                if (data.Domain_Strategy_Data) {
                    const active = data.Domain_Strategy_Data.filter(strategy => strategy.is_active=== true);
                    setActiveStrategy(active);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        // --------master oders fetch---------------
        const MasterOrdersFun = async () => {
           
            try {
                const response = await fetch("http://localhost:8000/User/MasterOrder/Get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming JWT auth
                    },
                    credentials: "include",
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
            
                const orders = ["rejected", "pending", "expired", "active", "cancelled", "failed", "closed", "in progress", "completed"];

                if (data.Master_Order_Data) {
                    
                    
                    // ✅ Filter orders that match allowed statuses
                    const active = data.Master_Order_Data.filter(order => orders.includes(order.status));
                    
                    // ✅ Count occurrences of each status
                    const orderCounts = active.reduce((acc, order) => {
                        acc[order.status] = (acc[order.status] || 0) + 1;
                        return acc;
                    }, {});
                
                    setMasterOder(orderCounts)
                }

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        // ---------manual orders-------------
        const ManualOrdersFun = async () => {
           
            try {
                const response = await fetch("http://localhost:8000/User/ManualOrder/Get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming JWT auth
                    },
                    credentials: "include",
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                
                
                const orders = ["rejected", "pending", "expired", "active", "cancelled", "failed", "closed", "in progress", "completed"];

                if (data.Manual_Order_Data) {
                    
                    
                    // ✅ Filter orders that match allowed statuses
                    const active = data.Manual_Order_Data.filter(order => orders.includes(order.status));
                    
                    // ✅ Count occurrences of each status
                    const orderCounts = active.reduce((acc, order) => {
                        acc[order.status] = (acc[order.status] || 0) + 1;
                        return acc;
                    }, {});
                
                    setManualOrder(orderCounts)
                }
                
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };



         // ---------Broker orders-------------
         const BrokerOrdersFun = async () => {
           
            try {
                const response = await fetch("http://localhost:8000/User/BrokerOrder/Get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming JWT auth
                    },
                    credentials: "include",
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                
               
                const orders = ["rejected", "pending", "expired", "active", "cancelled", "failed", "closed", "in progress", "completed"];

                if (data.Broker_Orders_Data) {
                    
                    
                    // ✅ Filter orders that match allowed statuses
                    const active = data.Broker_Orders_Data.filter(order => orders.includes(order.status));
            
                    
                    // ✅ Count occurrences of each status
                    const orderCounts = active.reduce((acc, order) => {
                        acc[order.status] = (acc[order.status] || 0) + 1;
                        return acc;
                    }, {});
                
                    setBrokerOder(orderCounts)
                }
                
                
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
    
        // ---------domain orders-------------
        const DomainOrdersFun = async () => {
           
            try {
                const response = await fetch("http://localhost:8000/User/DomainOrder/Get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming JWT auth
                    },
                    credentials: "include",
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                
                console.log("Domain",data)
                const orders = ["rejected", "pending", "expired", "active", "cancelled", "failed", "closed", "in progress", "completed"];

                if (data.Domain_Orders_Data) {
                    
                    
                    // ✅ Filter orders that match allowed statuses
                    const active = data.Domain_Orders_Data.filter(order => orders.includes(order.status));
                    console.log("Orders Domain_Orders_Data active:", active); // 🔍 Debugging
                    
                    // ✅ Count occurrences of each status
                    const orderCounts = active.reduce((acc, order) => {
                        acc[order.status] = (acc[order.status] || 0) + 1;
                        return acc;
                    }, {});
                
                    setDomainOrder(orderCounts)
                }
            
                
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };


         // ---------domain Paper orders-------------
         const DomainPaperOrdersFun = async () => {
           
            try {
                const response = await fetch("http://localhost:8000/User/DomainPaperOrder/Get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming JWT auth
                    },
                    credentials: "include",
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                
                console.log("Domain",data)
                const orders = ["rejected", "pending", "expired", "active", "cancelled", "failed", "closed", "in progress", "completed"];

                if (data.Domain_Paper_Data) {
                    
                    
                    // ✅ Filter orders that match allowed statuses
                    const active = data.Domain_Paper_Data.filter(order => orders.includes(order.status));
                    console.log("Orders Domain_Paper_Data active:", active); // 🔍 Debugging
                    
                    // ✅ Count occurrences of each status
                    const orderCounts = active.reduce((acc, order) => {
                        acc[order.status] = (acc[order.status] || 0) + 1;
                        return acc;
                    }, {});
                
                    setDomainPaperOrder(orderCounts)
                }
               
                
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };


        fetchUsers();
        fetchStrategies();
        MasterOrdersFun();
        ManualOrdersFun();
        BrokerOrdersFun();
        DomainOrdersFun();
        DomainPaperOrdersFun();
    }, []);

    

    return (
        <div className="dashboard">
           

            <div className="usersCont">
            <br/>
                <h2 id="data">Disabled Users</h2><br/>
                <h3>Total Disabled Users: {disabledUsers.length}</h3><br/> <br/> <br/>
                <h2 id="data">Activate Strategy</h2><br/>
                <h3>Total activate strategy: {activeStrategy.length}</h3>

            </div>


            <div className="master-orders">
                <h2>Status Master Orders</h2>

                {/* ✅ Show total count of all orders */}
                <h3>Total Master Orders: {Object.values(masterOderStatus).reduce((sum, count) => sum + count, 0)}</h3>

                {/* ✅ Display statuses in a simple list format */}
                {Object.keys(masterOderStatus).length > 0 ? (
                <div className="order-status-list">
                    {Object.entries(masterOderStatus).map(([status, count]) => (
                    <div key={status} className="order-status-item">
                        <strong>{status}</strong>: {count}
                    </div>
                    ))}
                </div>
                ) : (
                <p>No order data available.</p>
                )}
            </div>

            {/* ----------manual orders */}
            <div className="manual-orders">
                <h2>Status Manual Orders</h2>
              
                {/* ✅ Show total count of all orders */}
                <h3>Total Manual Orders: {Object.values(manualOrderStatus).reduce((sum, count) => sum + count, 0)}</h3>

                {/* ✅ Display statuses in a simple list format */}
                {Object.keys(  manualOrderStatus).length > 0 ? (
                <div className="order-status-list">
                    {Object.entries(manualOrderStatus).map(([status, count]) => (
                    <div key={status} className="order-status-item">
                        <strong>{status}</strong>: {count}
                    </div>
                    ))}
                </div>
                ) : (
                <p>No order data available.</p>
                )}
            </div>


             {/* ----------Broker orders */}   
             <div className="broker-orders">
                <h2>Status Broker Orders</h2>
              
                {/* ✅ Show total count of all orders */}
                <h3>Total Broker  Orders: {Object.values(brokerOderStatus).reduce((sum, count) => sum + count, 0)}</h3>

                {/* ✅ Display statuses in a simple list format */}
                {Object.keys(brokerOderStatus).length > 0 ? (
                <div className="order-status-list">
                    {Object.entries(brokerOderStatus).map(([status, count]) => (
                    <div key={status} className="order-status-item">
                        <strong>{status}</strong>: {count}
                    </div>
                    ))}
                </div>
                ) : (
                <p>No order data available.</p>
                )}
            </div>
            
            {/* ----------Domain orders */}     
            <div className="Domain-orders">
                <h2>Status Domain Orders</h2>
              
                {/* ✅ Show total count of all orders */}
                <h3>Total Domain Orders: {Object.values(   domainOrderStatus).reduce((sum, count) => sum + count, 0)}</h3>

                {/* ✅ Display statuses in a simple list format */}
                {Object.keys(domainOrderStatus).length > 0 ? (
                <div className="order-status-list">
                    {Object.entries(domainOrderStatus).map(([status, count]) => (
                    <div key={status} className="order-status-item">
                        <strong>{status}</strong>: {count}
                    </div>
                    ))}
                </div>
                ) : (
                <p>No order data available.</p>
                )}
            </div>

              {/* ----------Domain paper orders */}     
              <div className="Domain-Paper-orders">
                <h2>Status Domain Paper Orders</h2>
              
                {/* ✅ Show total count of all orders */}
                <h3>Total Domain Paper Orders: {Object.values(domainPaperOrderStatus).reduce((sum, count) => sum + count, 0)}</h3>

                {/* ✅ Display statuses in a simple list format */}
                {Object.keys(domainPaperOrderStatus).length > 0 ? (
                <div className="order-status-list">
                    {Object.entries(domainPaperOrderStatus).map(([status, count]) => (
                    <div key={status} className="order-status-item">
                        <strong>{status}</strong>: {count}
                    </div>
                    ))}
                </div>
                ) : (
                <p>No order data available.</p>
                )}
            </div> 
        </div>
    );
}






