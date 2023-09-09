import React from "react";


function UserList({ users, clickHandler }) {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <button type="button" id={user.id} onClick={() => clickHandler(user.id)}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
