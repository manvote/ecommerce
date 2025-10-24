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

  const sendOtp = () => {
    if (!email.trim()) return alert("Please enter your email.");
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    setTimer(60);
    alert(`OTP sent to ${email}: ${generatedOtp}`);
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      alert("OTP verified! You can now reset your password.");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  useEffect(() => {
    if (!otpSent) return;
    const interval = setInterval(() => {
      if (timer > 0) setTimer((prev) => prev - 1);
      else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) return alert("Enter all fields");
    if (newPassword !== confirmPassword) return alert("Passwords do not match");
    setPasswordChanged(true);
    alert(`Password reset successful for ${email}`);
  };

  return (
    <div style={styles.page}>
      {/* Gradient Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>MyStore</h1>
      </div>

      {/* Centered Card */}
      <div style={styles.centerContainer}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Forgot Password</h2>
          <p style={styles.subHeading}>Reset your account password</p>

          {!otpSent && !passwordChanged && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
              <button onClick={sendOtp} style={styles.button}>
                Send OTP
              </button>
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
              <button onClick={verifyOtp} style={styles.button}>
                Verify OTP
              </button>
              {timer > 0 && <p style={styles.timerText}>OTP expires in: {timer}s</p>}
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
                disabled={passwordChanged}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                disabled={passwordChanged}
              />
              {!passwordChanged ? (
                <button onClick={handleResetPassword} style={styles.button}>
                  Reset Password
                </button>
              ) : (
                <p style={styles.successText}>
                  Password changed successfully! You can go back to login.
                </p>
              )}
            </>
          )}

          <p style={styles.bottomText}>
            Back to{" "}
            <button onClick={goToLogin} style={styles.linkButton}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    "--accent-1": "#1976d2",
    "--accent-2": "#42a5f5",
    "--brand-1": "#ff6a00",
    "--brand-2": "#ee0979",
    "--bg": "#f0f4f8",
    "--card-bg": "#ffffff",

    backgroundColor: "var(--bg)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    background:
      "linear-gradient(90deg, var(--brand-1), var(--brand-2), var(--accent-1))",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px 40px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },

  centerContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: "var(--card-bg)",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "center",
  },

  heading: {
    color: "var(--accent-1)",
    marginBottom: "0",
  },

  subHeading: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%",
    outline: "none",
  },

  button: {
    background: "linear-gradient(90deg, var(--brand-1), var(--brand-2))",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    width: "100%",
    transition: "0.3s",
  },

  timerText: {
    color: "#777",
    fontSize: "13px",
  },

  successText: {
    color: "green",
    fontSize: "14px",
    textAlign: "center",
  },

  bottomText: {
    fontSize: "13px",
    marginTop: "10px",
  },

  linkButton: {
    background: "none",
    border: "none",
    color: "var(--accent-1)", // Accent color
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
    padding: 0,
    fontSize: "14px",
  },
};

export default ForgetPassword;
