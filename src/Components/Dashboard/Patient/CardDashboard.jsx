import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeartbeat, FaWind, FaThermometerHalf } from "react-icons/fa";

function Card({ icon, title, value, unit, status, color }) {
  const darkerColor = shadeColor(color, -20);

  return (
    <div
      className="card shadow-sm bg-white rounded"
      style={{
        width: "12rem",
        height: "12rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "1rem",
        borderLeft: `5px solid ${color}`,
        textAlign: "left",
        backgroundColor: darkerColor
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

function shadeColor(color, percent) {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.floor(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
}

function CardDashboard() {
  const [sensorData, setSensorData] = useState([]);

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('/sensorPoul');
      console.log("Données récupérées :", response.data);

      // Assurez-vous que les données sont triées par ordre décroissant de timestamp
      const sortedData = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setSensorData(sortedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const intervalId = setInterval(fetchSensorData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const defaultValues = {
    oxygen: { value: "N/A", unit: "%", status: "Inconnu", color: "#EAB308" },
    bloodPressure: { value: "N/A", unit: "bpm", status: "Inconnu", color: "#DC3545" },
    temperature: { value: "N/A", unit: "°C", status: "Inconnu", color: "#0DCAF0" },
  };

  if (sensorData.length > 0) {
    const latestData = sensorData[0]; // Prendre le premier élément après le tri
    console.log("Dernières données :", latestData);
    defaultValues.oxygen.value = latestData.oxygenLevel !== undefined ? latestData.oxygenLevel : defaultValues.oxygen.value;
    defaultValues.bloodPressure.value = latestData.heartRate !== undefined ? latestData.heartRate : defaultValues.bloodPressure.value;
    // Ajoutez d'autres champs si nécessaire
  }

  return (
    <div className="d-flex justify-content-center gap-3" style={{ gap: "1.5rem" }}>
      <Card
        icon={<FaWind size={50} color={defaultValues.oxygen.color} />}
        title="Oxygène"
        value={defaultValues.oxygen.value}
        unit={defaultValues.oxygen.unit}
        status={defaultValues.oxygen.status}
        color={defaultValues.oxygen.color}
      />
      <Card
        icon={<FaHeartbeat size={50} color={defaultValues.bloodPressure.color} />}
        title="Fréquence cardiaque"
        value={defaultValues.bloodPressure.value}
        unit={defaultValues.bloodPressure.unit}
        status={defaultValues.bloodPressure.status}
        color={defaultValues.bloodPressure.color}
      />
      <Card
        icon={<FaThermometerHalf size={50} color={defaultValues.temperature.color} />}
        title="Température"
        value={defaultValues.temperature.value}
        unit={defaultValues.temperature.unit}
        status={defaultValues.temperature.status}
        color={defaultValues.temperature.color}
      />
    </div>
  );
}

export default CardDashboard;
