import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error("Sidebar must be used within a SessionContextProvider");
  }

  const { isAuthenticated, user, logout, isLoading } = sessionContext;

  if (isLoading) {
    return <p>Loading user...</p>;
  }

  return isAuthenticated && user ? (
    <div className="user-info sidebar">
      <img
        src={user.profilePicture}
        alt="Profile"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          alignItems: "center",
          textAlign: "center",
          marginLeft: 40,
        }}
      />
      <h3>{user.username}</h3>
      <p>
        {user.firstName} {user.surname}
      </p>
      <nav>
        <ul className="ul-Profile">
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>
            <Link to="/myblogs">My Posts</Link>
          </li>
          <li>
            <Link to="/mycomments">My Comments</Link>
          </li>
        </ul>
      </nav>
      <button className="log-btn" onClick={logout}>
        Log out
      </button>
    </div>
  ) : (
    <div className="sidebar">
      <p>Welcome User!</p>
      <p>It seems you are not logged in</p>
      <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Sidebar;
