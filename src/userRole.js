import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
// import { Plus } from "lucide-react";

export default function UserRole() {
    const [UserRoleData, setUserRoleData] = useState([]); // Fixed useState
    
      const UserRole = async () => {
        try {
          const response = await fetch("http://localhost:8000/User/UserRole/Get", {
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
            setUserRoleData(data.data); // Correctly updating state
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      useEffect(() => {
        UserRole();
      }, []);

      return (
        <div className="UserSub">
         <h3 style={{ color: "black" }}>User Role</h3>
          <table>
            <thead>
                  <tr>
                      <th>ID</th>
                      <th>domain_id</th>
                      <th>user_id</th>
                      <th>role_id</th>
                      <th>created_at</th>
                      <th>updated_at</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
            {UserRoleData.map((Add, index) => (
              <tr key={index}>
              <td>{Add.id}</td> 
              <td>{Add.domain_id}</td> 
              <td>{Add.user_id}</td>
              <td>{Add.role_id}</td> 
              <td>{Add.created_at}</td> 
              <td>{Add.updated_at}</td> 
              <td>
                  <Pencil size={20} color="#007bff" cursor="pointer" 
                  // onClick={() => handleClick(user)} 
                  />
              </td>
              
              <td>
                  <Trash 
                      size={20} 
                      color="red" 
                      cursor="pointer" 
                      style={{ marginLeft: "10px", transition: "0.3s" }} 
                      onMouseOver={(e) => (e.target.style.color = "darkred")}
                      onMouseOut={(e) => (e.target.style.color = "red")}
                      // onClick={() => handleDeleteUser(user)} 
                  />
              </td>
              </tr>
            ))}
    
            </tbody>
    
          </table>    
        </div>
      );
    }
    

