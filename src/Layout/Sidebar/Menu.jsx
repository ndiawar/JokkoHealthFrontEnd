export const MENUITEMS = [
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboard",
        icon: "home",
        type: "link",
        badge: "badge badge-light-primary",
        // badgetxt: "5",
        active: false,
      },
      {
        title: "Dashboard Medcin",
        icon: "home",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/dashboard/default`
        // badgetxt: "5",
      },
      {
        title: "Dashboard Patient",
        icon: "home",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/dashboard/patient`
        // badgetxt: "5",
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
        path: `${process.env.PUBLIC_URL}/users/user-list`
      },
      {
        title: "Patients",
        icon: "user",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/medcin/listepatient`
      },
      {
        title: "Dossier Médicale",
        icon: "user",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/dossiermedical`
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
      },
      {
        title: "Mes Rendez-Vous",
        icon: "calendar",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/rendezvous`,
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
        path: `${process.env.PUBLIC_URL}/app/consultation/consultation-list`,
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
        path: `${process.env.PUBLIC_URL}/app/history/history-list`,
      },
      ],
  },

];
