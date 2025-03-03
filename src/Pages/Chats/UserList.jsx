import React from 'react';

function UserList() {
  const users = [
    {
      id: 1,
      name: 'Support ADMIN',
      avatar: 'url_to_avatar1'
    },
    {
      id: 2,
      name: 'Docteur Ya Fatou Kane',
      avatar: 'url_to_avatar2'
    },
    // Ajoutez d'autres utilisateurs ici
  ];

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-item">
          <img
            src={user.avatar}
            alt={user.name}
            className="user-avatar"
          />
          <span className="user-name">{user.name}</span>
        </div>
      ))}
    </div>
  );
}

export default UserList;
