
import React, { useContext } from "react";

import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash, Plus } from "lucide-react";

import { UserContext } from "./currentUser"; 


export default function AdminManagement() {
    const [admins, setAdmins] = useState([]);
    const [step, setStep] = useState(1);
    const [editId , setEditID] = useState();
    const [formData, setFormData] = useState({});

    const { CurrentUser} = useContext(UserContext);
    
    // console.log(CurrentUser)

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
    
//  ----------------------

const SwitchAdmin = async (admin, field) => {
    
    try {
        if (!CurrentUser) {
            alert("User data is not loaded. Please try again.");
            return;
        }
        console.log(CurrentUser.role_id)
        if (field === "is_disabled") {
            if (admin.domain_owner && CurrentUser.role_id !== 1) {
                alert("You cannot update another domain owner's status.");
                return;
            }
        }

        if (field === "is_user_exist") {
            if (admin.domain_owner && CurrentUser.role_id !== 1) {
                alert("You cannot update another domain owner's is_user_exist.");
                return;
            }
        }

        if (field === "domain_owner" && CurrentUser.role_id !== 1) {
            alert("Only super admin (role_id 1) can change domain owner status.");
            return;
        }

// Toggle field value
        const updatedFields = { [field]: !admin[field] };

        console.log(`Editing admin ${admin.id}:`, updatedFields);

        const response = await fetch(`http://localhost:8000/Admin/UpdateData/${admin.id}`, {
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

        // ✅ Update local state
        setAdmins((prevAdmins) =>
            prevAdmins.map((a) =>
                a.id === admin.id ? { ...a, [field]: !a[field] } : a
            )
        );
        // fetchAdmins();/

        console.log("Admin updated successfully!");
    } catch (error) {
        console.error("Error updating admin:", error);
        alert(error.message);
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
                                            onChange={() => SwitchAdmin(admin,"domain_owner")}
                                            disabled={CurrentUser?.role_id !== 1 }
                                        />
                                        <span className="slider round"></span>
                                        </label>
                                    </td>

                                <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={!admin.is_disabled}
                                                onChange={() => SwitchAdmin(admin,"is_disabled")}
                                                disabled={admin.domain_owner &&CurrentUser?.role_id !== 1 } // Prevent domain owner from disabling another domain owner
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>

                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={!admin.is_user_exist}
                                                onChange={() => SwitchAdmin(admin,"is_user_exist")}
                                                disabled={admin.domain_owner &&CurrentUser?.role_id !== 1} // Prevent toggling if admin is a domain owner
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>

                                  
                                    <td>{admin.role_id}</td>
                               
                                    <td>
                                        {admin.profile_picture_url ? (
                                            <img 
                                                src={admin.profile_picture_url} 
                                                alt="Profile" 
                                                width="50" 
                                                height="50" 
                                                style={{ borderRadius: "50%", objectFit: "cover" }} 
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>

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
                    <button className="addAdmin" style={{ border: "none", cursor: "pointer" }}>
                        <Plus  size={24} color="green" /> Add User
                    </button>
                </div>
            ) : (
                <p>No admins found.</p>
            ))}

                {step === 2 && (
                <div className="EditDiv">
                    <h2 className="text-lg font-bold mb-4">Edit Admin</h2>
                    <form>
                    {Object.entries(formData).map(([field, value]) => (
                        !["id", "expire_at", "created_at", "updated_at",'domain_id','password','is_user_exist','is_disabled','domain_owner'].includes(field) && (
                           
                            <label key={field} className="block mb-2">
                                {field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:
                                {typeof value === "boolean" ? (
                                    
                                    <input type="checkbox" name={field} 
                                    checked={value}
                                    onChange={handleInputChange} />
                                ) :
                                 (
                                    <input type={field === "email" ? "email" : "text"}
                                     name={field} 
                                     value={value} 
                                     onChange={handleInputChange} 
                                     className="border p-2 w-full rounded"
                                     disabled={field === "role_id" && CurrentUser.role_id !== 1} // Disable Role ID if not Super Admin
                                     />
                                     
                                )}
                                 
                            </label>
                            
                        )
                    ))}
                    </form>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setStep(1)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                        <button onClick={() => editAdmin()} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}
