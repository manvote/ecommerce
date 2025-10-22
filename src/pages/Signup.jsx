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
      if (otpTimer > 0) setOtpTimer((prev) => prev - 1);
      else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  // Send random OTP
  const sendOtp = () => {
    if (!email) return alert("Enter email");
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString(); // Random 4-digit OTP
    setOtp(generatedOtp);
    setOtpSent(true);
    setOtpTimer(60); // 60 seconds timer
    alert(`OTP sent: ${generatedOtp}`);
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      alert("OTP verified!");
    } else alert("Invalid OTP");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!otpVerified) return alert("Verify OTP first");
    if (password !== confirmPassword) return alert("Passwords do not match");
    alert(`Signed up: ${username}`);
    onSignup && onSignup({ username, email, password });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
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
            {otpTimer > 0 && <p>OTP expires in: {otpTimer}s</p>}
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
        <p style={styles.text}>
          Already have an account?{" "}
          <button onClick={goToLogin} style={styles.link}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: 300,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
  text: { textAlign: "center", marginTop: 10 },
  link: {
    background: "none",
    border: "none",
    color: "#4caf50",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
  },
};

export default Signup;
