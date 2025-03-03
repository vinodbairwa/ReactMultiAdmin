


import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

export default function Login({ onSignupClick }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // ✅ React Router navigation

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setMessage("⚠️ Email and password are required!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/Admin/Login/", {
                email: email,
                password: password,
            }, { withCredentials: true }); // ✅ Ensures cookies are sent/received

            console.log("response", response);
            setMessage(response.data.Message);

            // Store access token in localStorage
            localStorage.setItem("access_token", response.data.access_token);

            // ✅ Redirect without full reload
            navigate("/dashboard"); 
        
        } catch (error) {
            console.error("Login failed:", error.response?.data?.detail || error.message);
            setMessage("❌ Invalid email or password.");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                />
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                />
                <br />
                {message && <p className={message.includes("✅") ? "success" : "error"}>{message}</p>}
                <button type="submit">Login</button>
            </form>
            {/* <p>Don't have an account? <button onClick={onSignupClick}>Signup</button></p> */}
            <p>Don't have an account? <button onClick={() => navigate("/adminsignup")}>Signup</button></p>
            <p><button  id="frtBtn" onClick={() => navigate("/forgetpassword")}>forget password</button></p>
        </div>
    );
}
