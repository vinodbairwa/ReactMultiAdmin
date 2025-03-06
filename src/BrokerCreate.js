import { useState } from "react";

const BrokerForm = ({ fetchBrokers, setStep }) => {
    const [formData, setFormData] = useState({
        broker_userid: "",
        broker_password: "",
        broker_pin: "",
        broker_qr_key: "",
        broker_api: "",
        broker_api_secret: "",
        broker_name: "",
        token_status: "",
        broker_token: "",
        broker_token_date: "",
        is_active: false,
        is_autologin: false,
        is_disabled: false,
        is_editable: false,
        broker_image_url: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : (name === "broker_token_date" ? new Date(value).toISOString() : value),
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a copy of formData and remove empty fields
        const requestData = { ...formData };
    
        if (!requestData.broker_token_date) {
            delete requestData.broker_token_date;  // Remove if empty
        } else {
            requestData.broker_token_date = new Date(requestData.broker_token_date).toISOString();  // Format correctly
        }
    
        try {
            const response = await fetch("http://localhost:8000/Admin/Broker/Create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
                body: JSON.stringify(requestData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Broker created successfully!");
                console.log(data);
                if (fetchBrokers) {
                    fetchBrokers();
                }
                if (setStep) {
                    setStep(1);
                }
            } else {
                throw new Error(data.detail || "Failed to create broker");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="broker-form">
             <input type="number" name="user_id" placeholder="User ID" value={formData.user_id} onChange={handleChange} required />
            <input type="text" name="broker_userid" placeholder="Broker User ID" value={formData.broker_userid} onChange={handleChange} required />
            <input type="password" name="broker_password" placeholder="Broker Password" value={formData.broker_password} onChange={handleChange} required />
            <input type="text" name="broker_pin" placeholder="Broker Pin" value={formData.broker_pin} onChange={handleChange} />
            <input type="text" name="broker_qr_key" placeholder="Broker QR Key" value={formData.broker_qr_key} onChange={handleChange} />
            <input type="text" name="broker_api" placeholder="Broker API URL" value={formData.broker_api} onChange={handleChange} required />
            <input type="text" name="broker_api_secret" placeholder="Broker API Secret" value={formData.broker_api_secret} onChange={handleChange} required />
            <input type="text" name="broker_name" placeholder="Broker Name" value={formData.broker_name} onChange={handleChange} required />
            <input type="text" name="token_status" placeholder="Token Status" value={formData.token_status} onChange={handleChange} />
            <input type="text" name="broker_token" placeholder="Broker Token" value={formData.broker_token} onChange={handleChange} />
            <input
    type="datetime-local"
    name="broker_token_date"
    value={formData.broker_token_date ? formData.broker_token_date.substring(0, 16) : ""}
    onChange={handleChange}
/>

            <input type="text" name="broker_image_url" placeholder="Broker Image URL" value={formData.broker_image_url} onChange={handleChange} />
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} />

            <label>
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                Active
            </label>
            <label>
                <input type="checkbox" name="is_autologin" checked={formData.is_autologin} onChange={handleChange} />
                Auto Login
            </label>
            <label>
                <input type="checkbox" name="is_disabled" checked={formData.is_disabled} onChange={handleChange} />
                Disabled
            </label>
            <label>
                <input type="checkbox" name="is_editable" checked={formData.is_editable} onChange={handleChange} />
                Editable
            </label>

            <button type="button" onClick={() => setStep(1)}>Back To Broker</button>

            <button type="submit">Create Broker</button>
        </form>
    );
};

export default BrokerForm;


// const BrokerForm = ({ fetchBrokers }) => {
//     const [formData, setFormData] = useState({
//         broker_userid: "",
//         broker_password: "",
//         broker_pin: "",
//         broker_qr_key: "",
//         broker_api: "",
//         broker_api_secret: "",
//         broker_name: "",
//         token_status: "",
//         broker_token: "",
//         broker_token_date: "",
//         is_active: false,
//         is_autologin: false,
//         is_disabled: false,
//         is_editable: false,
//         broker_image_url: "",
//         message: "",
//     });

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const requestData = { ...formData };

//         if (!requestData.broker_token_date) {
//             delete requestData.broker_token_date;
//         } else {
//             requestData.broker_token_date = new Date(requestData.broker_token_date).toISOString();
//         }

//         try {
//             const response = await fetch("http://localhost:8000/Admin/Broker/Create/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//                 credentials: "include",
//                 body: JSON.stringify(requestData),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert("Broker created successfully!");
//                 console.log(data);

//                 // ✅ Call fetchBrokers after successful creation
//                 if (fetchBrokers) {
//                     fetchBrokers();
//                 }

//             } else {
//                 throw new Error(data.detail || "Failed to create broker");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert(error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="broker-form">
//             <input type="text" name="broker_userid" placeholder="Broker User ID" value={formData.broker_userid} onChange={handleChange} required />
//             <input type="password" name="broker_password" placeholder="Broker Password" value={formData.broker_password} onChange={handleChange} required />
//             <input type="text" name="broker_pin" placeholder="Broker Pin" value={formData.broker_pin} onChange={handleChange} />
//             <input type="text" name="broker_qr_key" placeholder="Broker QR Key" value={formData.broker_qr_key} onChange={handleChange} />
//             <input type="text" name="broker_api" placeholder="Broker API URL" value={formData.broker_api} onChange={handleChange} required />
//             <input type="text" name="broker_api_secret" placeholder="Broker API Secret" value={formData.broker_api_secret} onChange={handleChange} required />
//             <input type="text" name="broker_name" placeholder="Broker Name" value={formData.broker_name} onChange={handleChange} required />
//             <input type="text" name="token_status" placeholder="Token Status" value={formData.token_status} onChange={handleChange} />
//             <input type="text" name="broker_token" placeholder="Broker Token" value={formData.broker_token} onChange={handleChange} />
//             <input type="datetime-local" name="broker_token_date" value={formData.broker_token_date ? formData.broker_token_date.substring(0, 16) : ""} onChange={handleChange} />
//             <input type="text" name="broker_image_url" placeholder="Broker Image URL" value={formData.broker_image_url} onChange={handleChange} />
//             <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} />

//             <label>
//                 <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
//                 Active
//             </label>
//             <label>
//                 <input type="checkbox" name="is_autologin" checked={formData.is_autologin} onChange={handleChange} />
//                 Auto Login
//             </label>
//             <label>
//                 <input type="checkbox" name="is_disabled" checked={formData.is_disabled} onChange={handleChange} />
//                 Disabled
//             </label>
//             <label>
//                 <input type="checkbox" name="is_editable" checked={formData.is_editable} onChange={handleChange} />
//                 Editable
//             </label>

//             <button type="submit">Create Broker</button>
//         </form>
//     );
// };

// export default BrokerForm;

