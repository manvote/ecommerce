import React, { useState, useEffect } from "react";

const Signup = ({ goToLogin, onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (!otpSent) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSent]);

  const sendOtp = () => {
    if (!email.trim()) return alert("Please enter your email first");
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    setOtpTimer(60);
    alert(`OTP sent: ${generatedOtp}`);
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify your OTP first");
    if (password !== confirmPassword) return alert("Passwords do not match");
    alert(`Signup successful! Welcome, ${username}`);
    onSignup && onSignup({ username, email, password });
  };

  return (
    <div style={styles.page}>
      {/* 🌈 Gradient Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>MyStore</h1>
      </div>

      <div style={styles.container}>
        <form onSubmit={handleSignup} style={styles.form}>
          <h2 style={styles.heading}>Create an Account ✨</h2>
          <p style={styles.subHeading}>Join us and start shopping</p>

          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          {!otpSent && (
            <button type="button" onClick={sendOtp} style={styles.button}>
              Send OTP
            </button>
          )}

          {otpSent && !otpVerified && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                style={styles.input}
              />
              <button type="button" onClick={verifyOtp} style={styles.button}>
                Verify OTP
              </button>
              {otpTimer > 0 && (
                <p style={styles.otpTimer}>OTP expires in {otpTimer}s</p>
              )}
            </>
          )}

          {otpVerified && (
            <>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Sign Up
              </button>
            </>
          )}

          <p style={styles.bottomText}>
            Already have an account?{" "}
            <button onClick={goToLogin} style={styles.linkButton}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  // 🎨 Theme
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

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  form: {
    backgroundColor: "var(--card-bg)",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
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
    transition: "0.3s",
  },

  otpTimer: {
    color: "#777",
    fontSize: "13px",
    marginTop: "-5px",
  },

  bottomText: {
    fontSize: "15px",
    marginTop: "10px",
    color: "#000",
  },

  linkButton: {
    background: "none",
    border: "none",
    color: "var(--accent-1)",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
    padding:0,
    fontSize: "13px",
  },
};

export default Signup;
