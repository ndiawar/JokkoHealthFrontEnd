import React, { useState, useEffect } from "react";
import Signin from "../../Auth/Signin";
import ChatWindow from "./ChatWindow";
import "./Chats.css"; // Assurez-vous d'avoir un fichier CSS pour le style


function Chats() {


  return (
    <div >
    <ChatWindow />
    </div>
  );
}

export default Chats;
