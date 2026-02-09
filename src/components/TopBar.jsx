import React from "react";
import { useNavigate } from "react-router-dom";

const TopBar = ({ onSave, canSave }) => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("email");

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    return (
        <div style={styles.bar}>
            <span
                style={{
                    fontSize: "18px",
                    cursor: canSave ? "pointer" : "not-allowed",
                    opacity: canSave ? 1 : 0.4
                }}
                onClick={() => canSave && onSave()}
                title={canSave ? "Save Timer" : "Generate timer first"}
            >
                ❤️
            </span>

            {userEmail && (
                <span style={styles.email}>{userEmail}</span>
            )}

            <button style={styles.logout} onClick={handleLogout}>
                Sign Out
            </button>
        </div>
    );
};

const styles = {
    bar: {
        position: "fixed",
        top: "16px",
        right: "16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 1000,
    },
    heart: {
        fontSize: "18px",
        cursor: "pointer",
    },
    email: {
        color: "#ccc",
        fontSize: "13px",
        maxWidth: "180px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    logout: {
        background: "#ff2d2d",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
    },
};

export default TopBar;
