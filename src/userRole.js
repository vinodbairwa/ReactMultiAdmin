




// import { useEffect, useState } from "react";
// import { Pencil, Trash } from "lucide-react";

// export default function UserRole() {
//     const [UserRoleData, setUserRoleData] = useState([]);
//     const [editData, setEditData] = useState(null); // Store selected user data
//     const [roleId, setRoleId] = useState("");
//     const [userId, setUserId] = useState("");

//     // Fetch User Roles
//     const fetchUserRoles = async () => {
//         try {
//             const response = await fetch("http://localhost:8000/User/UserRole/Get", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//                 credentials: "include",
//             });

//             if (!response.ok) throw new Error(`Error: ${response.statusText}`);

//             const data = await response.json();
//             if (data.data) setUserRoleData(data.data);
//         } catch (error) {
//             console.error("Error fetching user roles:", error);
//         }
//     };

//     useEffect(() => {
//         fetchUserRoles();
//     }, []);

//     // Handle Edit Click
//     const handleEditClick = (user) => {
//         setEditData(user); // Store user data
//         setRoleId(user.role_id);
//         setUserId(user.user_id);
//     };

//     // Handle Update API Call
//     const handleUpdate = async () => {
//         if (!editData) return;

//         try {
//             const response = await fetch(`http://localhost:8000/Admin/UserRole/Update/${editData.user_id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//                 credentials: "include",
//                 body: JSON.stringify({
//                     role_id: roleId,
//                     user_id: userId
//                 }),
//             });

//             const data = await response.json()
//             if (!response.ok) {
//                 throw new Error(data.detail || "An error occurred while delete the user.");
//             };

//             // Update UI
//             fetchUserRoles();
//             setEditData(null); // Close modal or reset form
//         } catch (error) {
//             console.error("Error updating user role:", error);
//             alert(`Failed Error: ${error.message}`);
//         }
//     };

//     return (
//         <div className="UserSub">
//             <h3 style={{ color: "black" }}>User Role</h3>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Domain ID</th>
//                         <th>User ID</th>
//                         <th>Role ID</th>
//                         <th>Created At</th>
//                         <th>Updated At</th>
//                         <th>Edit</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {UserRoleData.map((user, index) => (
//                         <tr key={index}>
//                             <td>{user.id}</td>
//                             <td>{user.domain_id}</td>
//                             <td>{user.user_id}</td>
//                             <td>{user.role_id}</td>
//                             <td>{user.created_at}</td>
//                             <td>{user.updated_at}</td>
//                             <td>
//                                 <Pencil size={20} color="#007bff" cursor="pointer" onClick={() => handleEditClick(user)} />
//                             </td>
//                             <td>
//                                 <Trash 
//                                     size={20} 
//                                     color="red" 
//                                     cursor="pointer"
//                                     style={{ marginLeft: "10px", transition: "0.3s" }} 
//                                     onMouseOver={(e) => (e.target.style.color = "darkred")}
//                                     onMouseOut={(e) => (e.target.style.color = "red")}
//                                 />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Edit Form (Shown when a user is selected) */}
//             {editData && (
//                 <div className="edit-modal">
//                     <h4>Edit User Role</h4>
//                     <label>Role ID:</label>
//                     <input type="number" value={roleId} onChange={(e) => setRoleId(e.target.value)} />
                    
//                     <label>User ID:</label>
//                     <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
                    
//                     <button onClick={handleUpdate}>Update</button>
//                     <button onClick={() => setEditData(null)}>Cancel</button>
//                 </div>
//             )}
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Modal, Input } from "antd";

export default function UserRole() {
    const [UserRoleData, setUserRoleData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [roleId, setRoleId] = useState("");
    // const [userId, setUserId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch User Roles
    const fetchUserRoles = async () => {
        try {
            const response = await fetch("http://localhost:8000/User/UserRole/Get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data = await response.json();
            if (data.data) setUserRoleData(data.data);
        } catch (error) {
            console.error("Error fetching user roles:", error);
        }
    };

    useEffect(() => {
        fetchUserRoles();
    }, []);

    // Handle Edit Click
    const handleEditClick = (user) => {
        setEditData(user);
        setRoleId(user.role_id);
        // setUserId(user.user_id);
        setIsModalOpen(true);
    };

    // Handle Update API Call
    const handleUpdate = async () => {
        if (!editData) return;

        try {
            const response = await fetch(`http://localhost:8000/Admin/UserRole/Update/${editData.user_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    role_id: roleId,
                    // user_id: userId
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || "An error occurred while updating the user.");
            }

            // Refresh user role list
            fetchUserRoles();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating user role:", error);
            alert(`Failed Error: ${error.message}`);
        }
    };

    return (
        <div className="UserSub">
            <h3 style={{ color: "black" }}>User Role</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Domain ID</th>
                        <th>User ID</th>
                        <th>Role ID</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {UserRoleData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.domain_id}</td>
                            <td>{user.user_id}</td>
                            <td>{user.role_id}</td>
                            <td>{user.created_at}</td>
                            <td>{user.updated_at}</td>
                            <td>
                                <Pencil size={20} color="#007bff" cursor="pointer" onClick={() => handleEditClick(user)} />
                            </td>
                            <td>
                                <Trash 
                                    size={20} 
                                    color="red" 
                                    cursor="pointer"
                                    style={{ marginLeft: "10px", transition: "0.3s" }} 
                                    onMouseOver={(e) => (e.target.style.color = "darkred")}
                                    onMouseOut={(e) => (e.target.style.color = "red")}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
          
            </table>

            {/* Ant Design Modal */}
            <Modal
                title="Edit User Role"
                open={isModalOpen}
                onOk={handleUpdate}
                onCancel={() => setIsModalOpen(false)}
                okText="Update"
                cancelText="Cancel"
            >
                <label>Role ID:</label>
                <Input type="number" value={roleId} onChange={(e) => setRoleId(e.target.value)} />

                {/* <label>User ID:</label>
                <Input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} /> */}
            </Modal>
        </div>
    );
}
