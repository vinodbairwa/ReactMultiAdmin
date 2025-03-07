// import { use, useEffect, useState } from "react";
// import { Pencil } from "lucide-react";
// import { Trash } from "lucide-react";
// // import { Plus } from "lucide-react";


// export default function UsersAddress() {
//   const [addressData, setAddressData] = useState([]); // Fixed useState
//   const [editId, setId] = useState()
//   const [formData, setFormData] = useState({});
//   const [step ,setStep] = useState(1)


//   const UserAddress = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/User/UserAddress/Get", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming JWT auth
//         },
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       if (data.data) {
//         setAddressData(data.data); // Correctly updating state
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // ------------------------------------
//   const handleUpdateAddress = async () => {
//     try {
//       if (!editId) {
//         console.error("Error: editId is missing");
//         return;
//       }
  
  
//       const response = await fetch(`http://localhost:8000/Admin/UserAddress/Update/${editId}`, {
//         method: "PUT",
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         credentials: "include",
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       if (data.success) {
//         alert("Address updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating address:", error);
//     }
//   };
  
//   const handleClick = async (address) => {
//     setFormData(address); 
//     setId(Add.id)
//     setStep(2)
//     handleUpdateAddress()

   
//     setFormData({
//       user_id: address.user_id ,        // Ensures input shows current name
//       address_1: address.address_1 || "",      // Ensures input shows current email
//       address_2: admin.address_2 || "",    // Ensures input shows current mobile
//       district: address.district || "", // Ensures gender is preselected
//       state: address.state || "",
//       pincode :address.pincode || "",
//     });
   
// }

//   useEffect(() => {
//     UserAddress();
//   }, []);

//   return (
//     <div className="UserSub">
//       {step === 1 && (addressData.length > 0 ? (
//         <div>
//       <h3>User Addresses</h3>
//       <table>
//         <thead>
//               <tr>
//                   <th>ID</th>
//                   <th>domain_id</th>
//                   <th>user_id</th>
//                   <th>address_1</th>
//                   <th>address_2</th>
//                   <th>district</th>
//                   <th>state</th>
//                   <th>pincode</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//               </tr>
//           </thead>
//           <tbody>
//         {addressData.map((Add, index) => (
//           <tr key={index}>
//           <td>{Add.id}</td> 
//           <td>{Add.domain_id}</td> 
//           <td>{Add.user_id}</td>
//           <td>{Add.address_1}</td> 
//           <td>{Add.address_2}</td> 
//           <td>{Add.district}</td> 
//           <td>{Add.state}</td> 
//           <td>{Add.pincode}</td> 
//           <td>
//               <Pencil size={20} color="#007bff" cursor="pointer" 
//               onClick={() => handleClick(Add)} 
//               />
//           </td>
          
//           <td>
//               <Trash 
//                   size={20} 
//                   color="red" 
//                   cursor="pointer" 
//                   style={{ marginLeft: "10px", transition: "0.3s" }} 
//                   onMouseOver={(e) => (e.target.style.color = "darkred")}
//                   onMouseOut={(e) => (e.target.style.color = "red")}
//                   // onClick={() => handleDeleteUser(user)} 
//               />
//           </td>
//           </tr>
//         ))}

//         </tbody>

//       </table>  
     
//       </div>  
//      ):)}

//       {step === 2 && <div>
//         <h1>Hello Edit Form</h1>
//       </div>
//       }
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

export default function UsersAddress() {
  const [addressData, setAddressData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    address_1: "",
    address_2: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [step, setStep] = useState(1);

  const UserAddress = async () => {
    try {
      const response = await fetch("http://localhost:8000/User/UserAddress/Get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.data) {
        setAddressData(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdateAddress = async () => {
    try {
      if (!editId) {
        console.error("Error: editId is missing");
        return;
      }
      
      const response = await fetch(`http://localhost:8000/Admin/User/Address/Update/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        credentials: "include",
        body: JSON.stringify(formData), // Convert formData to JSON
      });
    

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "An error occurred while updating the user.");
    }
      if (data.message) {
        alert("Address updated successfully!");
        setStep(1);
        UserAddress(); // Refresh data after update
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert(`Failed to update admin: ${error.message}`);
    }
  };

  const handleClickEdit = (address) => {
    setEditId(address.user_id);
    setStep(2);
    setFormData({
      user_id: address.user_id || "",
      address_1: address.address_1 || "",
      address_2: address.address_2 || "",
      district: address.district || "",
      state: address.state || "",
      pincode: address.pincode || "",
    });
  };

  useEffect(() => {
    UserAddress();
  }, []);

  return (
    <div className="UserSub">
      {step === 1 && (
        <div>
          <h3>User Addresses</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>domain_id</th>
                <th>user_id</th>
                <th>address_1</th>
                <th>address_2</th>
                <th>district</th>
                <th>state</th>
                <th>pincode</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {addressData.map((Add, index) => (
                <tr key={index}>
                  <td>{Add.id}</td>
                  <td>{Add.domain_id}</td>
                  <td>{Add.user_id}</td>
                  <td>{Add.address_1}</td>
                  <td>{Add.address_2}</td>
                  <td>{Add.district}</td>
                  <td>{Add.state}</td>
                  <td>{Add.pincode}</td>
                  <td>
                    <Pencil size={20} color="#007bff" cursor="pointer" onClick={() => handleClickEdit(Add)} />
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
        </div>
      )}

      {step === 2 && (
        <div className="EditAddress">
          <h1>Edit Address</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateAddress();
            }}
          >
            <label>User ID:</label>
            <input type="text" value={formData.user_id} readOnly />

            <label>Address 1:</label>
            <input
              type="text"
              value={formData.address_1}
              onChange={(e) => setFormData({ ...formData, address_1: e.target.value })}
            />

            <label>Address 2:</label>
            <input
              type="text"
              value={formData.address_2}
              onChange={(e) => setFormData({ ...formData, address_2: e.target.value })}
            />

            <label>District:</label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            />

            <label>State:</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />

            <label>Pincode:</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            />

            <button type="submit">Update Address</button>
            <button type="button" onClick={() => setStep(1)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
