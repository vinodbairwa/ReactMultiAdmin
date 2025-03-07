

import { useState, useEffect ,useContext} from "react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { UserContext } from "./currentUser"; 
import AddUser from "./addusers";

import UsersAddress from "./UserAddress";
import UserPlan from "./userPlan"
import UserRole from './userRole'

export default function  UserManagement() {

    const [activeButton, setActiveButton] = useState("UsersGet");
    const [users, setUsers] = useState([]);
    const [usersAddress, setUsersAddress] = useState([]);
    const [step ,setStep] = useState(1);
    const [userId, setUserId] = useState();
    

    const { CurrentUser} = useContext(UserContext);
 
    const [formData, setFormData] = useState({ name: "", email: "", mobile: "", gender: "" });


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
    
                    setUsers(data.User_Data);
              
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
    
        // --------------------
        const handleInputChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        // ---------------

        const handleEditUser = async () => {
            try {
                const response = await fetch(`http://localhost:8000/Admin/User/Update/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    credentials: "include",
                    body: JSON.stringify(formData),
                });
        
                const responseData = await response.json(); // Always parse JSON
        
                if (!response.ok) {
                    throw new Error(responseData.detail || "An error occurred while updating the user.");
                }
        
                // Update UI after edit
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user.id === userId ? { ...user, ...formData } : user))
                );
        
                console.log("User edited successfully:", responseData);
                alert("User updated successfully!");
            } catch (error) {
                console.error("Error editing user:", error.message);
                alert(`Failed to edit user: ${error.message}`);
            }
        };
        
    

         // --------------Delete Users-----------
        const handleDeleteUser = async (user) => {
            try {
                const response = await fetch(`http://localhost:8000/Admin/User/Delete/${user.id}`, {
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
        
        
                // Remove deleted user from state
                setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        
                console.log("User deleted successfully:", user);
            } catch (error) {
                console.error("Error deleting user:", error);
                alert(`Failed to edit user: ${error.message}`);
            }
        };
// -----User Address---------------
        const UserAddress = async () => {
   
            try {
                const response = await fetch("http://localhost:8000/User/UserAddress/Get", {
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
                if (data.data) {

                    setUsersAddress(data.data)
                    
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
       

// ----------------click button --------------------
        const handleClick = async (user) => {
           
            setStep(2)
            setUserId(user.id)
            setFormData({
                name: user.name || "",        // Ensures input shows current name
                email: user.email || "",      // Ensures input shows current email
                mobile: user.mobile || "",    // Ensures input shows current mobile
                gender: user.gender || "male" // Ensures gender is preselected
            });
            // handleEditUser()
        }
    
const SwitchAdmin = async (user, field) => {
    
    try {
        if (!CurrentUser) {
            alert("User data is not loaded. Please try again.");
            return;
        }
        console.log(CurrentUser.role_id)
        if (field === "is_disabled") {
            if (CurrentUser.domain_owner && CurrentUser.role_id !== 1) {
                alert("You cannot update another domain owner's status.");
                return;
            }
        }

        if (field === "domain_owner" && CurrentUser.role_id !== 1) {
            alert("Only super admin (role_id 1) can change domain owner status.");
            return;
        }

// Toggle field value
        const updatedFields = { [field]: !user[field] };

        console.log(`Editing admin ${user.id}:`, updatedFields);

        const response = await fetch(`http://localhost:8000/Admin/User/Update/${user.id}`, {
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
        setUsers((prevAdmins) =>
            prevAdmins.map((a) =>
                a.id === user.id ? { ...a, [field]: !a[field] } : a
            )
        );
        fetchUsers();

        console.log("Admin updated successfully!");
    } catch (error) {
        console.error("Error updating admin:", error);
        alert(error.message);
    }
};

    
    useEffect(() => {
     
            fetchUsers();
            UserAddress();
        }, []);

  

    return (
        <div id="navbarUsers">
            
             {/* <h1 id="mainheading">Hello Admin Dashboard !</h1> */}
            <div id="navbar">
                <button onClick={() => {setActiveButton("UsersGet"); setStep(1);}}
                    className={activeButton === "UsersGet" ? "active-button" : "inactive-button"}>
                    UsersGet
                </button>
                <button onClick={() => {setActiveButton("userAddress"); setStep(4);}}
                     className={activeButton === "userAddress" ? "active-button" : "inactive-button"}>
                  UserAddress
                </button>
                <button onClick={() => {setActiveButton("UserPlans"); setStep(5);}}
                    className={activeButton === "UserPlans" ? "active-button" : "inactive-button"}>
                    UserPlan
                </button>
                <button onClick={() => {setActiveButton("UserRole"); setStep(6);}}
                    className={activeButton === "UserRole" ? "active-button" : "inactive-button"}>
                    UserRole
                </button>
     
            </div>
            
            {step === 1 && (users.length > 0 ? ( 
                <div className="users">
               <p id="total_user" className="mb-2">Total Users: {users.length}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Mobile</th>
                                <th>Address1</th>
                                <th>Is_disabled</th>
                                <th>Plans</th>
                                <th>Trading</th>
                                <th>SalesById</th>

                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => {
                            const userAddress = usersAddress.find(addr => addr.user_id === user.id);
                            return (  // ✅ Explicitly returning JSX inside `.map()`
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.mobile}</td>
                                    <td>{userAddress ? userAddress.address_1 : "No Address"}</td>

                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={!user.is_disabled}
                                                onChange={() => SwitchAdmin(user,"is_disabled")}
                                                // disabled={admin.domain_owner &&CurrentUser?.role_id !== 1 } // Prevent domain owner from disabling another domain owner
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    {/* <td>{user.is_disabled ? "Yes" : "No"}</td> */}
                                    <td>{user.plan_id}</td>
                                    <td>{user.trading ? "Yes" : "No"}</td>
                                    <td>{user.sales_by}</td>
                                    <td>
                                        <Pencil size={20} color="#007bff" cursor="pointer" onClick={() => handleClick(user)} />
                                    </td>
                                    
                                    <td>
                                        <Trash 
                                            size={20} 
                                            color="red" 
                                            cursor="pointer" 
                                            style={{ marginLeft: "10px", transition: "0.3s" }} 
                                            onMouseOver={(e) => (e.target.style.color = "darkred")}
                                            onMouseOut={(e) => (e.target.style.color = "red")}
                                            onClick={() => handleDeleteUser(user)} 
                                        />
                                    </td>
                                </tr>
                            );
                        })}


                        </tbody>
                        
                    </table> 
                    <button  onClick={() => setStep(3)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                <Plus size={24} color="green" /> Adduser
                            </button>
                    </div> 
                ):
                ( <p>No disabled users found.</p>)
                
             )}

            {step === 2 && (
                <div className="EditDiv"> 
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Edit User</h2>
                        <label className="block mb-2">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="border p-2 w-full rounded"
                            />
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border p-2 w-full rounded"
                            />
                        </label>
                        <label className="block mb-2">
                            Mobile:
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="border p-2 w-full rounded"
                            />
                        </label>
                        <label className="block mb-4">
                            Gender:
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="border p-2 w-full rounded"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setUserId(null) || setStep(1)} className="bg-gray-400 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button onClick={() => { handleEditUser(); setStep(1); }}   className="bg-blue-500 text-white px-4 py-2 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}

        {step === 3 && (
            <div className="UsersAdd">
                <AddUser />
          {/* Optionally, add a button to return to step 1 */}
            <button id="BackUser" onClick={() => setUserId(null)||setStep(1)}>Back to Users</button>
            </div>
      )}


        {step === 4 && (
                    <div className="UsersMenu">
                        <UsersAddress />
                {/* Optionally, add a button to return to step 1 */}
                   
                    </div>
            )}
        
        {step === 5 && (
                    <div className="UsersMenu">
                        <UserPlan />
                {/* Optionally, add a button to return to step 1 */}
                    
                    </div>
            )}
        
        {step === 6 && (
                    <div className="UsersMenu">
                        <UserRole />
                {/* Optionally, add a button to return to step 1 */}
                    
                    </div>
            )}

    </div>
    );
}

