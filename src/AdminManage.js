


import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash, Plus } from "lucide-react";

export default function AdminManagement() {
    const [admins, setAdmins] = useState([]);
    const [step, setStep] = useState(1);
    const [editId , setEditID] = useState();
    const [formData, setFormData] = useState({});
    

    const fetchAdmins = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/Admin/Get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data = await response.json();
            setAdmins(data.Admin_Data || []);
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    }, []);

    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);

    const deleteAdmin = async (adminId) => {
        console.log("delete ",adminId)
        try {
            const response = await fetch(`http://localhost:8000/Admin/Delete/${adminId}`, {
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
    
            setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
        } catch (error) {
            console.error("Error deleting admin:", error);
            alert(`Failed to delete admin: ${error.message}`);
        }
    };
    
    const editAdmin = async () => {
        try {
            console.log("edit",editId)
            const response = await fetch(`http://localhost:8000/Admin/UpdateData/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.detail || "An error occurred while delete the user.");
            }

            setAdmins((prevAdmins) =>
                prevAdmins.map((admin) =>
                    admin.id === editId ? { ...admin, ...formData } : admin
                )
            );
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
                alert("Please enter a valid email address.");
                return;
            }
            
            alert("Admin updated successfully!");
            setStep(1);
        } catch (error) {
            console.error("Error updating admin:", error);
            alert(`Failed to update admin: ${error.message}`);
        }
    };

    const handleClick = async (admin) => {
        setFormData(admin); 
        setEditID(admin.id); 
        setStep(2)
  
       
        setFormData({
            name: admin.name || "",        // Ensures input shows current name
            email: admin.email || "",      // Ensures input shows current email
            mobile: admin.mobile || "",    // Ensures input shows current mobile
            gender: admin.gender || "male", // Ensures gender is preselected
            domain_owner: admin.domain_owner || false,
            is_disabled :admin.is_disabled || false,
            is_user_exist  :admin.is_user_exist || false,
            role_id :admin.role_id ||"",
            profile_picture_url :admin.profile_picture_url ||"",
        });
       
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };
    
    const toggleAdminStatus = async (id) => {
        const adminToToggle = admins.find((admin) => admin.id === id);
        if (!adminToToggle) return;
    
        // Prevent domain owners from disabling themselves or other domain owners
        if (adminToToggle.domain_owner) {
            alert("Domain owners cannot disable themselves or other domain owners.");
            return;
        }
    
        const updatedStatus = !adminToToggle.is_disabled; // Toggle value
    
        // Optimistically update UI
        setAdmins((prevAdmins) =>
            prevAdmins.map((admin) =>
                admin.id === id ? { ...admin, is_disabled: updatedStatus } : admin
            )
        );
    
        // Send API request with only is_disabled
        await SwitchAdmin(id, { is_disabled: updatedStatus });
    };
    const SwitchAdmin = async (id, updatedFields = formData) => {
        try {
            const adminToUpdate = admins.find((admin) => admin.id === id);
            if (!adminToUpdate) return;
    
            // Prevent domain owners from updating other domain owners
            if (formData.domain_owner && adminToUpdate.domain_owner) {
                alert("You cannot update another domain owner's status.");
                return;
            }
            
            const currentUserRole = parseInt(localStorage.getItem("role_id"), 10);
            console.log("currentUserRole",currentUserRole)
    
            console.log("Editing admin:", id, updatedFields);
    
            const response = await fetch(`http://localhost:8000/Admin/UpdateData/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
                body: JSON.stringify(updatedFields),
            });
    
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.detail || "An error occurred while updating the user.");
            }
    
            setAdmins((prevAdmins) =>
                prevAdmins.map((admin) =>
                    admin.id === id ? { ...admin, ...updatedFields } : admin
                )
            );
    
            if (updatedFields === formData) {
                alert("Admin updated successfully!");
                setStep(1);
            }
        } catch (error) {
            console.error("Error updating admin:", error);
            alert(`Failed to update admin: ${error.message}`);
        }
    };
    
    
    
    return (
        <div className="mainAdmin">
            <h2>Admin Management</h2>
            
            {step === 1 && (admins.length > 0 ? (
                <div className="adminsTable">
                    <p id="total_Admins" className="mb-2">Total Admins: {admins.length}</p>
                    <table>
                        <thead>
                            <tr>
                                {[
                                    "ID", "Name", "Email", "Gender", "Mobile", "Domain ID", "Domain Owner", "Disabled", "User Exist", "Role ID", "Profile URL", "Edit", "Delete"
                                ].map((header) => <th key={header}>{header}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td>{admin.id}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.gender}</td>
                                    <td>{admin.mobile}</td>
                                    <td>{admin.domain_id}</td>
                                    <td>
                                    <label className="switch">
                                            <input
                                            type="checkbox"
                                            checked={!admin.domain_owner}
                                            onChange={() => toggleAdminStatus(admin.id)}
                                        />
                                        <span className="slider round"></span>
                                        </label>
                                    </td>

                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={!admin.is_disabled}
                                                onChange={() => toggleAdminStatus(admin.id)}
                                                disabled={admin.domain_owner} // Prevent toggling if admin is a domain owner
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>



                                   <td>
                                    <label className="switch">
                                            <input
                                            type="checkbox"
                                            checked={!admin.is_user_exist}
                                            // onChange={() => toggleAdminStatus(admin.id)}
                                        />
                                        <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td>{admin.role_id}</td>
                                    <td>{admin.profile_picture_url}</td>
                                    <td>
                                        <Pencil size={20} color="#007bff" cursor="pointer" onClick={() => handleClick(admin)} />
                                    </td>
                                    <td>
                                        <Trash size={20} color="red" cursor="pointer" style={{ marginLeft: "10px", transition: "0.3s" }}
                                            onMouseOver={(e) => (e.target.style.color = "darkred")}
                                            onMouseOut={(e) => (e.target.style.color = "red")}
                                            onClick={() => deleteAdmin(admin.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                        <Plus size={24} color="green" /> Add User
                    </button>
                </div>
            ) : (
                <p>No admins found.</p>
            ))}

                {step === 2 && (
                <div className="EditDiv">
                    <h2 className="text-lg font-bold mb-4">Edit Admin</h2>
                    
                    {Object.entries(formData).map(([field, value]) => (
                        !["id", "expire_at", "created_at", "updated_at",'domain_id','password'].includes(field) && (
                           
                            <label key={field} className="block mb-2">
                                {field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:
                                {typeof value === "boolean" ? (
                                    
                                    <input type="checkbox" name={field} checked={value} onChange={handleInputChange} />
                                ) : (
                                    <input type={field === "email" ? "email" : "text"} name={field} value={value} onChange={handleInputChange} className="border p-2 w-full rounded" />
                                )}
                                 
                            </label>
                        )
                    ))}
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setStep(1)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                        <button onClick={() => editAdmin()} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}
