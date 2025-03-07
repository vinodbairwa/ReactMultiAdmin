import React, { createContext, useState, useEffect } from "react";

// Create UserContext with a default value
export const UserContext = createContext({
    user: null
});

export const UserProvider = ({ children }) => {
    const [CurrentUser, setUser] = useState(null);
   

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/Current/User/Admin/Get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || "Failed to fetch user");

            setUser(data.data);
        } catch (error) {
            // setError(error.message);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ CurrentUser}}>
            {children}
        </UserContext.Provider>
    );
};
