
// // addusers.js
// export default function AddUser() {
//     return (
//       <div className="users">
//         <h1 style={{ color: "black" }}>Call this function</h1>
      
//       </div>
//     );
//   }
  


import { useState } from "react";
import axios from "axios";

export default function  AddUser() {


   
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");

    // Signup Fields
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [mobilePrefix, setMobilePrefix] = useState("+91"); 
    const [gender, setGender] = useState(""); 
    const [profilePictureUrl, setProfilePictureUrl] = useState(""); 

    const countryCodes = [
        { code: "+1", country: "USA" },
        { code: "+44", country: "UK" },
        { code: "+91", country: "India" },
        { code: "+61", country: "Australia" },
        { code: "+81", country: "Japan" },
        { code: "+49", country: "Germany" },
        { code: "+33", country: "France" }
    ];
  
    // Step 1: Request OTP
    const requestOtp = async () => {
        if (!email) {
            setMessage("⚠️ Please enter an email.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/email/verification/", { email });
            setMessage("✅ OTP sent to your email.");
            setStep(2);
        } catch (error) {
            setMessage(`❌ ${error.response?.data?.detail || "Failed to send OTP."}`);
        }
    };

    // Step 2: Verify OTP
    const verifyOtp = async () => {
        if (!otp) {
            setMessage("⚠️ Please enter OTP.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/otp/verification/", { otp });
            setMessage("✅ Email verified. Proceed to signup.");
            setStep(3);
        } catch (error) {
            setMessage(`❌ ${error.response?.data?.detail || "Invalid OTP."}`);
        }
    };

    // Step 3: Complete Signup
    const handleSignup = async () => {
        if (!name || !mobile || !password || !gender) {
            setMessage("⚠️ All fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/Admin/User/Signup/", {
                name,
                email,  // Email from step 1
                mobile_prefix: mobilePrefix, // Ensure consistent key name
                mobile,
                gender,
                password,
                profile_picture_url: profilePictureUrl,
            }, { withCredentials: true });

            setMessage(`✅ ${response.data.message}`);
            setStep(4);
        } catch (error) {
            setMessage(`❌ ${error.response?.data?.detail || "Signup failed."}`);
        }
    };

    return (
        <div class="signup">

    
            {/* Step 1: Email Input */}
            {step === 1 && (
                <div class="EmailVerification">
                    <h2>User Signup</h2>
                    {message && <p>{message}</p>}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={requestOtp}>Send OTP</button>
                </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
                <div class="OtpVerification">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </div>
            )}

            {/* Step 3: Signup Form */}
            {step === 3 && (
                <div class="SignupData">
                    <input
                        type="text"
                        placeholder="enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Mobile Prefix Dropdown */}
                    <select 
                    value={mobilePrefix} 
                    onChange={(e) => setMobilePrefix(e.target.value)}>
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.code} ({country.country})
                            </option>
                        ))}
                    </select>

                    <input
                        type="Mobile"
                        placeholder="enter your mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                    
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Gender Selection */}
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                  
                    <input 
                        type="text" 
                        placeholder="Profile Picture URL" 
                        value={profilePictureUrl} 
                        onChange={(e) => setProfilePictureUrl(e.target.value)} 
                    />

                    <button onClick={handleSignup}>Sign Up</button>
                </div>
            )}

            {/* Step 4: Success Message */}
            {step === 4 && <p>🎉 Signup complete! </p>}
         
        
        </div>
    );
}
