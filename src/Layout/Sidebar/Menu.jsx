import React from 'react';

export const MENUITEMS = [
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboard Admin",
        icon: "home",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/admin/dashboard`,
        protected: true,
        roles: ['SuperAdmin'] // Indique que cet élément de menu est pour les SuperAdmin
      },
      {
        title: "Dashboard Medcin",
        icon: "home",
        type: "link",
        path: `${process.env.PUBLIC_URL}/dashboard/default`,
        protected: true,
        roles: ['Medecin'] // Indique que cet élément de menu est pour les Medecin
      },
      {
        title: "Dashboard Patient",
        icon: "home",
        type: "link",
        path: `${process.env.PUBLIC_URL}/dashboard/patient`,
        protected: true,
        roles: ['Patient'] // Indique que cet élément de menu est pour les Patients
      },
    ],
  },
  {
    menutitle: "Gestion Utilisateurs",
    menucontent: "Utilisateurs",
    Items: [
      {
        title: "Utilisateurs",
        icon: "user",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/admin/utilisateurs/datausers`,
        protected: true,
        roles: ['SuperAdmin'] // Indique que cet élément de menu est pour les SuperAdmin
      },
      {
        title: "Patients",
        icon: "user",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/medcin/listepatient`,
        protected: true,
        roles: ['Medecin'] // Indique que cet élément de menu est pour les Medecin
      },
      {
        title: "Dossier Médicale",
        icon: "user",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/dossiermedical`,
        protected: true,
        roles: ['Patient'] // Indique que cet élément de menu est pour les Patients
      },
    ],
  },
  {
    menutitle: "Gestion Rendez-vous",
    menucontent: "Rendez-vous",
    Items: [
      {
        title: "Rendez-vous",
        icon: "calendar",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/medcin/rendezvous`,
        protected: true,
        roles: ['Medecin'] // Indique que cet élément de menu est pour les Medecin
      },
      {
        title: "Mes Rendez-Vous",
        icon: "calendar",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/rendezvous`,
        protected: true,
        roles: ['Patient'] // Indique que cet élément de menu est pour les Patients
      },
    ],
  },
  {
    menutitle: "Message",
    menucontent: "Message",
    Items: [
      {
        title: "Messages",
        icon: "chat",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/app/chat-app/chats`,
        protected: true,
        roles: ['Medecin', 'Patient'] // Indique que cet élément de menu est pour les Medecin et Patients
      },
    ],
  },
  {
    menutitle: "Inscription Utilisateurs",
    menucontent: "Inscription",
    Items: [
      {
        title: "Inscription",
        icon: "editors",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/inscription`,
        protected: true,
        roles: ['SuperAdmin', 'Medecin'] // Indique que cet élément de menu est pour les SuperAdmin et Medecin
      },
    ],
  },
  {
    menutitle: "Gestion Histotiques",
    menucontent: "Historiques",
    Items: [
      {
        title: "Historiques",
        icon: "task",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/historique`,
        protected: true,
        roles: ['SuperAdmin'] // Indique que cet élément de menu est pour les SuperAdmin
      },
    ],
  },
];

const Menu = () => {
  return (
    <div>
      {MENUITEMS.map((menu, i) => (
        <div key={i}>
          <h4>{menu.menutitle}</h4>
          <p>{menu.menucontent}</p>
          <ul>
            {menu.Items.map((item, index) => (
              <li key={index}>
                <a href={item.path}>
                  <i className={`icon-${item.icon}`}></i>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Menu;