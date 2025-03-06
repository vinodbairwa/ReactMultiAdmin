import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/admin/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                credentials: "include", // ✅ Important to include cookies
            });

            if (response.ok) {
                console.log("Logout successful");

                // ✅ Remove JWT token from localStorage
                localStorage.removeItem("access_token");

                // ✅ Try to delete "admin_session_id" (Only works if not HttpOnly)
                // document.cookie = "admin_session_id=; Path=/; Max-Age=0;";
                // document.cookie = "admin_session_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                // document.cookie = "admin_session_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                navigate("/"); // Redirect to login page
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <button id="logout" onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default Logout;
