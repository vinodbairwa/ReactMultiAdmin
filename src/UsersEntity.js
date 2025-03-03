import { useState, useEffect } from "react";
import { Pencil, Trash, Plus } from "lucide-react";

export function UsersApi() {
    const [users, setUsers] = useState([]); // ✅ Default state is an empty array

    // Function to fetch user addresses
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
             console.log("UsersAddress is cal;ll")
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.User_Address_Data) {
                console.log("User_Address_Data", data.User_Address_Data);
                setUsers(data.User_Address_Data); // ✅ Correctly setting state
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // ✅ Use useEffect to fetch data only on mount
    useEffect(() => {
        UserAddress();
    }, []);

    return (
        <>
            <h1>Hello Users</h1>

            {/* ✅ Check if users exist before rendering the table */}
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DomainId</th>
                            <th>UserID</th>
                            <th>Address1</th>
                            <th>Address2</th>
                            <th>District</th>
                            <th>State</th>
                            <th>Pincode</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.domain_id}</td>
                                <td>{user.user_id}</td>
                                <td>{user.address_1}</td>
                                <td>{user.address_2}</td>
                                <td>{user.district}</td>
                                <td>{user.state}</td>
                                <td>{user.pincode}</td>
                                <td>
                                    <Pencil size={20} color="#007bff" cursor="pointer" />
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
            ) : (
                <p>Loading users...</p> // ✅ Prevents map() error while data is loading
            )}

            <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Plus size={24} color="green" />
            </button>
        </>
    );
}
