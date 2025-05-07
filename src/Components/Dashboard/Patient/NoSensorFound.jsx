import React from "react";
import { FaRegSmile } from "react-icons/fa";

export default function NoSensorFound({ message }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem", background: "#f8f9fa",
      borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <FaRegSmile size={60} color="#20c997" />
      <h5 style={{ marginTop: "1rem", color: "#20c997" }}>
        Aucun capteur détecté
      </h5>
      <p style={{ color: "#6c757d" }}>
        {message || "Connectez un appareil pour commencer à suivre vos données de santé."}
      </p>
      <a href="/help" style={{ color: "#20c997", textDecoration: "underline" }}>
        Besoin d’aide ?
      </a>
    </div>
  );
} 