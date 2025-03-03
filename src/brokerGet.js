

// import React, { useEffect, useState } from "react";
// import { Pencil, Trash } from "lucide-react";

// export default function BrokerGet() {
//     const [brokers, setBrokers] = useState([]);
//     const [error, setError] = useState(null);
//     const [step ,setStep] = useState(1);
//     const [formData, setFormData] = useState({ BrokerName: "", User_ID: "", Status: "", Route: "",Image: "",AutoLogin:"",Disable:"" });

//     useEffect(() => {
//         fetchBrokers();
//     }, []);
    
//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const fetchBrokers = async () => {
//         try {
//             const response = await fetch("http://localhost:8000/User/Broker/Get", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//                 credentials: "include",
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setBrokers(data.broker_data);
//             } else {
//                 throw new Error(data.detail || "Failed to fetch brokers");
//             }
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     // ✅ Handle Edit Broker
//     const handleEditBroker = async (broker) => {
//         const newName = prompt("Enter new Broker Name:", broker.broker_name);
//         if (!newName) return;
        
//         console.log("broker edit is call")
//         try {
//             const response = await fetch(`http://localhost:8000/Admin/Broker/Update/${broker.id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//                 credentials: "include",
//                 body: JSON.stringify(formData),
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 alert("Broker updated successfully!");
//                 fetchBrokers(); // Refresh the table
//             } else {
//                 throw new Error(result.detail || "Failed to update broker");
//             }
//         } catch (error) {
//             console.error("Error updating broker:", error);
//             alert(error.message);
//         }
//     };

//     // ✅ Handle Delete Broker
//     const handleDeleteBroker = async (brokerId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this broker?");
//         if (!confirmDelete) return;

//         try {
//             const response = await fetch(`http://localhost:8000/Admin/Broker/Delete/${brokerId}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//                 credentials: "include",
//             });

//             if (response.ok) {
//                 alert("Broker deleted successfully!");
//                 setBrokers(brokers.filter((broker) => broker.id !== brokerId)); // Remove from UI
//             } else {
//                 const result = await response.json();
//                 throw new Error(result.detail || "Failed to delete broker");
//             }
//         } catch (error) {
//             console.error("Error deleting broker:", error);
//             alert(error.message);
//         }
//     };

//     return (
//         <div className="Broker">

//         {step === 1 && (brokers.length > 0 ? ( 
//             <div className="BrokerGet">
//                 <h3>Broker List</h3>
//                 {error && <p className="error-message">{error}</p>}

//                 <table className="broker-table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>User ID</th>
//                             <th>Broker Name</th>
//                             <th>Status</th>
//                             <th>Route</th>
//                             <th>Image</th>
//                             <th>AutoLogin</th>
//                             <th>Disable</th>
//                             <th>Edit</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {brokers.length > 0 ? (
//                             brokers.map((broker) => (
//                                 <tr key={broker.id}>
//                                     <td>{broker.id}</td>
//                                     <td>{broker.user_id}</td>
//                                     <td>{broker.broker_name}</td>
//                                     <td>{broker.is_active ? "Yes" : "No"}</td>
//                                     <td>{broker.broker_api}</td>
//                                     <td>
//                                         <img src={broker.broker_image_url} alt="Broker" width="50" />
//                                     </td>
//                                     <td>{broker.is_autologin ? "Yes" : "No"}</td>
//                                     <td>{broker.is_disable ? "Yes" : "No"}</td>
//                                     <td>
//                                         <Pencil
//                                             size={20}
//                                             color="#007bff"
//                                             cursor="pointer"
//                                             onClick={() => handleEditBroker(broker)}
//                                         />
//                                     </td>
//                                     <td>
//                                         <Trash
//                                             size={20}
//                                             color="red"
//                                             cursor="pointer"
//                                             onClick={() => handleDeleteBroker(broker.id)}
//                                             style={{ marginLeft: "10px", transition: "0.3s" }}
//                                             onMouseOver={(e) => (e.target.style.color = "darkred")}
//                                             onMouseOut={(e) => (e.target.style.color = "red")}
//                                         />
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="10">No Brokers Found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         ):
//         <p></p>
//         )}

//         {step === 2 && <div className="BrokerEdit">
//             <label className="block mb-2">
//                             Name:
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 className="border p-2 w-full rounded"
//                             />
//                         </label>
//                         <label className="block mb-2">
//                             Email:
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 className="border p-2 w-full rounded"
//                             />
//                         </label>
//                         <label className="block mb-2">
//                             Mobile:
//                             <input
//                                 type="text"
//                                 name="mobile"
//                                 value={formData.mobile}
//                                 onChange={handleInputChange}
//                                 className="border p-2 w-full rounded"
//                             />
//                         </label>
//                         <label className="block mb-4">
//                             Gender:
//                             <select
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleInputChange}
//                                 className="border p-2 w-full rounded"
//                             >
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </label>
//                         <div className="flex justify-end gap-2">
//                             <button onClick={() => setUserId(null) || setStep(1)} className="bg-gray-400 text-white px-4 py-2 rounded">
//                                 Cancel
//                             </button>
//                             <button onClick={() => { handleEditUser(); setStep(1); }}   className="bg-blue-500 text-white px-4 py-2 rounded">
//                                 Save
//                             </button>
//         </div>
                   
//             }

//     </div>
//     );
// }




import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

export default function BrokerGet() {
    const [brokers, setBrokers] = useState([]);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1);
    const [editingBroker, setEditingBroker] = useState(null);
    const [formData, setFormData] = useState({
        broker_name: "",
        user_id: "",
        is_active: false,
        broker_api: "",
        broker_image_url: "",
        is_autologin: false,
        is_disable: false
    });
    

    useEffect(() => {
        fetchBrokers();
    }, []);

    const fetchBrokers = async () => {
        try {
            const response = await fetch("http://localhost:8000/User/Broker/Get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
            });

            const data = await response.json();
            if (response.ok) {
                setBrokers(data.broker_data);
            } else {
                throw new Error(data.detail || "Failed to fetch brokers");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // ✅ Open Edit Form
    const handleOpenEdit = (broker) => {
        setEditingBroker(broker.id);
        setStep(2)
        setFormData({
            broker_name: broker.broker_name,
            user_id: broker.user_id,
            is_active: broker.is_active,
            broker_api: broker.broker_api,
            broker_image_url: broker.broker_image_url,
            is_autologin: broker.is_autologin,
            is_disable: broker.is_disable,
        });
        setStep(2);
    };

    // ✅ Handle Form Input Change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    // ✅ Save Edited Broker
    const handleSaveEdit = async () => {
        const cleanedData = {
            ...formData,
            user_id: Number(formData.user_id), // Convert to integer
            is_active: Boolean(formData.is_active), // Ensure boolean
            is_autologin: Boolean(formData.is_autologin),
            is_disable: Boolean(formData.is_disable),
        };
    
        console.log("Sending data:", JSON.stringify(cleanedData, null, 2));
    
        try {
            const response = await fetch(`http://localhost:8000/Admin/Broker/Update/${editingBroker}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
                body: JSON.stringify(cleanedData),
            });
    
            if (response.ok) {
                alert("Broker updated successfully!");
                fetchBrokers();
                setStep(1);
            } else {
                const errorData = await response.json();
                console.error("Server Response:", errorData);
                throw new Error(errorData.detail || "Failed to update broker");
            }
        } catch (error) {
            console.error("Error updating broker:", error);
            alert(error.message);
        }
    };
    

    // ✅ Delete Broker
    const handleDeleteBroker = async (brokerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this broker?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8000/Admin/Broker/Delete/${brokerId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
            });

            if (response.ok) {
                alert("Broker deleted successfully!");
                setBrokers(brokers.filter((broker) => broker.id !== brokerId));
            } else {
                throw new Error("Failed to delete broker");
            }
        } catch (error) {
            console.error("Error deleting broker:", error);
            alert(error.message);
        }
    };

    return (
        <div className="Broker">
            {/* ✅ Broker List */}
            {step === 1 && (
                <div className="BrokerGet">
                    {/* <h3>Broker List</h3> */}
                    {error && <p className="error-message">{error}</p>}

                    <table className="broker-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Broker Name</th>
                                <th>Status</th>
                                <th>Route</th>
                                <th>Image</th>
                                <th>AutoLogin</th>
                                <th>Disable</th>
                                <th>DomainId</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brokers.length > 0 ? (
                                brokers.map((broker) => (
                                    <tr key={broker.id}>
                                        <td>{broker.id}</td>
                                        <td>{broker.user_id}</td>
                                        <td>{broker.broker_name}</td>
                                        <td>{broker.is_active ? "Yes" : "No"}</td>
                                        <td>{broker.broker_api}</td>
                                        <td>
                                            <img src={broker.broker_image_url} alt="Broker" width="50" />
                                        </td>
                                        <td>{broker.is_autologin ? "Yes" : "No"}</td>
                                        <td>{broker.is_disable ? "Yes" : "No"}</td>
                                        <td>{broker.domain_id}</td>
                                        <td>
                                            <Pencil size={20} color="#007bff" cursor="pointer" onClick={() => handleOpenEdit(broker)} />
                                        </td>
                                        <td>
                                            <Trash size={20} color="red" cursor="pointer" onClick={() => handleDeleteBroker(broker.id)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No Brokers Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ✅ Edit Broker Form */}
            {step === 2 && (
                <div className="BrokerEdit">
                    <h3>Edit Broker</h3>
                    <label>
                        Broker Name:
                        <input type="text" name="broker_name" value={formData.broker_name} onChange={handleInputChange} />
                    </label>
                    <label>
                        User ID:
                        <input type="number" name="user_id" value={formData.user_id} onChange={handleInputChange} />
                    </label>
                    <label>
                        Route:
                        <input type="text" name="broker_api" value={formData.broker_api} onChange={handleInputChange} />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="broker_image_url" value={formData.broker_image_url} onChange={handleInputChange} />
                    </label>
                    
                    <div className="checkbox">
                    <label>
                        Auto Login:
                        <input type="checkbox" name="is_autologin" checked={formData.is_autologin} onChange={handleInputChange} />
                    </label>
            
                    <label>
                        Disable:
                        <input type="checkbox" name="is_disable" checked={formData.is_disable} onChange={handleInputChange} />
                    </label>
                    </div>

                    <div className="buttons">
                        <button onClick={() => setStep(1)}>Cancel</button>
                        <button onClick={handleSaveEdit}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}
