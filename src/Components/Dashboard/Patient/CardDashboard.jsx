import React from "react";
import { FaHeartbeat } from "react-icons/fa";  // Pour la fréquence cardiaque
import { FaWind } from "react-icons/fa";       // Pour le flux d'air
import { FaThermometerHalf } from "react-icons/fa"; // Pour la température

function Card({ icon, title, value, unit, status, color }) {
  const darkerColor = shadeColor(color, -20); // Function to darken the color

  return (
    <div
      className="card shadow-sm bg-white rounded"
      style={{
        width: "12rem", // Largeur augmentée
        height: "12rem", // Hauteur égale à la largeur pour un carré
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align icons and text to the left
        justifyContent: "center",
        padding: "1rem",
        borderLeft: `5px solid ${color}`,
        textAlign: "left", // Align text to the left
        backgroundColor: darkerColor // Use darker background color
      }}
    >
      <div style={{ fontSize: "2rem", color: color }}>{icon}</div>
      <h6 className="card-title text-muted" style={{ margin: "0.5rem 0", fontSize: "0.9rem", textAlign: "left" }}>
        {title}
      </h6>
      <h4 className="card-text" style={{ margin: "0", fontSize: "1.2rem", textAlign: "left" }}>
        {value} <span style={{ fontSize: "0.8rem" }}>{unit}</span>
      </h4>
      <span
        className="badge"
        style={{
          backgroundColor: color,
          marginTop: "0.5rem",
          fontSize: "0.8rem",
          padding: "0.25rem 0.5rem",
        }}
      >
        {status}
      </span>
    </div>
  );
}

// Function to darken a color
function shadeColor(color, percent) {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.floor(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
}

function CardDashboard() {
  return (
    <div className="d-flex justify-content-center gap-3" style={{ gap: "1.5rem" }}>
      <Card 
        icon={<FaWind size={50} color="#EAB308" />} 
        title="Oxygène" 
        value="80" 
        unit="%" 
        status="Normal" 
        color="#EAB308" 
      />
      <Card 
        icon={<FaHeartbeat size={50} color="#DC3545" />} 
        title="Pression artérielle" 
        value="98 / 72" 
        unit="mmHg" 
        status="Normal" 
        color="#DC3545" 
      />
      <Card 
        icon={<FaThermometerHalf size={50} color="#0DCAF0" />} 
        title="Température" 
        value="102" 
        unit="°C" 
        status="Normal" 
        color="#0DCAF0" 
      />
    </div>
  );
}

export default CardDashboard;