// Sidebar showing online users
const UsersList = ({ users }) => {
  return (
    <div className="users-list">
      <h3 className="users-list__title">Online ({users.length})</h3>
      <ul className="users-list__items">
        {users.map((user, index) => (
          <li key={index} className="users-list__item">
            <span className="users-list__dot" />
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;