


import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

export default function UserPlan() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({});
    const [editId, setEditId] = useState(null);
    const [step, setStep] = useState(1);

    // Fetch User Plans
    useEffect(() => {
        const fetchUserPlans = async () => {
            try {
                const response = await fetch("http://localhost:8000/User/DomainPlan/GetPlans", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    credentials: "include",
                });

                if (!response.ok) throw new Error(`Error: ${response.statusText}`);

                const result = await response.json();
                if (result.data) setData(result.data);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };

        fetchUserPlans();
    }, []);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Edit Click
    const handleClick = (plan) => {
        setEditId(plan.id);
        setStep(2);
        setFormData({
            name: plan.name || "",
            max_qty: plan.max_qty || 0,
            max_sl_tgt: plan.max_sl_tgt || 0,
            max_deployment: plan.max_deployment || 0,
            max_indicator_access: plan.max_indicator_access || 0,
            max_brokers: plan.max_brokers || 0,
            icon: plan.icon || "",
            type: plan.type || "",
        });
    };

    // Handle Save
    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/Admin/DomainPlan/Update/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            if (!response.ok) throw new Error(responseData.detail || "Failed to update user.");

            // Update UI
            setData((prevData) =>
                prevData.map((item) => (item.id === editId ? { ...item, ...formData } : item))
            );

            alert("User updated successfully!");
            setStep(1);
        } catch (error) {
            console.error("Error editing user:", error.message);
            alert(`Failed to edit user: ${error.message}`);
        }
    };
  
    const deleteDomainPlan = async (planId) => {
      try {
          const response = await fetch(`http://localhost:8000/Admin/DomainPlan/Delete/${planId}`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
              },
              credentials: "include",
          });
          const responseData = await response.json()
          if (!response.ok) {
              throw new Error(responseData.detail || "An error occurred while delete the user.");
          }
  
          setData((prevAdmins) => prevAdmins.filter((item) => item.id !== planId));
          // fetchUserPlans()
      } catch (error) {
          console.error("Error deleting admin:", error);
          alert(`Failed to delete admin: ${error.message}`);
      }
  };
    return (
        <div className="UserSub">
            {step === 1 && (
                <div className="DomainPlan">
                    <h3>User Domain Plan</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Domain ID</th>
                                <th>Name</th>
                                <th>Max Qty</th>
                                <th>Max SL Target</th>
                                <th>Max Deployment</th>
                                <th>Max Indicator Access</th>
                                <th>Max Brokers</th>
                                <th>Icon</th>
                                <th>Type</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((plan) => (
                                <tr key={plan.id}>
                                    <td>{plan.id}</td>
                                    <td>{plan.domain_id}</td>
                                    <td>{plan.name}</td>
                                    <td>{plan.max_qty}</td>
                                    <td>{plan.max_sl_tgt}</td>
                                    <td>{plan.max_deployment}</td>
                                    <td>{plan.max_indicator_access}</td>
                                    <td>{plan.max_brokers}</td>
                                    <td>{plan.icon}</td>
                                    <td>{plan.type}</td>
                                    <td>
                                        <Pencil size={20} color="#007bff" cursor="pointer" onClick={() => handleClick(plan)} />
                                    </td>
                                    <td>
                                        <Trash 
                                          size={20} 
                                          color="red" 
                                          cursor="pointer" 
                                          style={{ marginLeft: "10px", transition: "0.3s" }} 
                                          onMouseOver={(e) => (e.target.style.color = "darkred")}
                                          onMouseOut={(e) => (e.target.style.color = "red")}
                                          onClick={() => deleteDomainPlan(plan.id)} 
                                          />
                                      </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {step === 2 && (
                <div className="DomainPlanEdit">
                    <h3>Domain Plan Update</h3>
                    <form onSubmit={handleEditUser}>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                        <label>Max Quantity:</label>
                        <input type="number" name="max_qty" value={formData.max_qty} onChange={handleChange} required />

                        <label>Max SL Target:</label>
                        <input type="number" name="max_sl_tgt" value={formData.max_sl_tgt} onChange={handleChange} required />

                        <label>Max Deployment:</label>
                        <input type="number" name="max_deployment" value={formData.max_deployment} onChange={handleChange} required />

                        <label>Max Indicator Access:</label>
                        <input type="number" name="max_indicator_access" value={formData.max_indicator_access} onChange={handleChange} required />

                        <label>Max Brokers:</label>
                        <input type="number" name="max_brokers" value={formData.max_brokers} onChange={handleChange} required />

                        <label>Icon:</label>
                        <input type="text" name="icon" value={formData.icon} onChange={handleChange} />

                        <label>Type:</label>
                        <input type="text" name="type" value={formData.type} onChange={handleChange} required />

                        <div>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setStep(1)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
