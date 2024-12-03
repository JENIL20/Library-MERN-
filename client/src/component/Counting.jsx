import React, { useState, useEffect } from "react";

const EmployeeDetails = ({ companyName, employeeCount }) => {
  const [visible, setVisible] = useState(false);

  // Add animation effect on mount
  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <div style={{ ...styles.container, opacity: visible ? 1 : 0 }}>
      <h2 style={styles.title}>{companyName} - Employee Details</h2>
      <p style={styles.count}>
        Total Number of Employees: <strong>{employeeCount}</strong>
      </p>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "400px",
    margin: "20px auto",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#f9f9f9",
    transform: "scale(0.95)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
    opacity: 0, // Initial opacity for fade-in effect
  },
  title: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#333",
    fontWeight: "600",
  },
  count: {
    fontSize: "18px",
    color: "#555",
    fontWeight: "400",
  },
};

export default EmployeeDetails;
