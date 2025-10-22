import React, { useState, useEffect } from "react";

const ForgetPassword = ({ goToLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  // Send OTP
  const sendOtp = () => {
    if (!email) return alert("Please enter your email.");
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    setTimer(60);
    alert(`OTP sent to ${email}: ${generatedOtp}`);
  };

  // Verify OTP
  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      alert("OTP verified! You can now reset your password.");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Reset Password
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) return alert("Enter all fields");
    if (newPassword !== confirmPassword) return alert("Passwords do not match");
    setPasswordChanged(true);
    alert(`Password reset successful for ${email}`);
    // Keep newPassword / confirmPassword fields visible until user goes back to login
  };

  return (
    <div style={styles.container}>
      <h2>Forget Password</h2>

      {!otpSent && !passwordChanged && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button onClick={sendOtp} style={styles.button}>Send OTP</button>
        </>
      )}

      {otpSent && !otpVerified && !passwordChanged && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={verifyOtp} style={styles.button}>Verify OTP</button>
          {timer > 0 && <p>OTP expires in: {timer}s</p>}
        </>
      )}

      {(otpVerified || passwordChanged) && (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            disabled={passwordChanged} // disable after reset
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            disabled={passwordChanged} // disable after reset
          />
          {!passwordChanged ? (
            <button onClick={handleResetPassword} style={styles.button}>Reset Password</button>
          ) : (
            <p style={{ color: "green" }}>Password changed successfully! You can go back to login.</p>
          )}
        </>
      )}

      <button onClick={goToLogin} style={{ ...styles.button, marginTop: 10 }}>
        Back to Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: 300,
  },
  input: { margin: "10px 0", padding: 10, width: "100%", borderRadius: 5, border: "1px solid #ccc" },
  button: { padding: 10, width: "100%", borderRadius: 5, border: "none", backgroundColor: "#4CAF50", color: "#fff", cursor: "pointer" },
};

export default ForgetPassword;
