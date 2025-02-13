import { useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.css"; // Import Sidebar CSS

const Sidebar = () => {
  const sessionContext = useContext(SessionContext);
  const navigate = useNavigate();

  if (!sessionContext) {
    throw new Error("Sidebar must be used within a SessionContextProvider");
  }

  const { isAuthenticated, user, logout, isLoading } = sessionContext;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <p>Loading user...</p>;
  }

  return isAuthenticated && user ? (
    <div className={classes.sidebar}>
      <div className={classes.profile}>
        <img src={user.profilePicture} alt="Profile" className={classes.profileImg} />
        <h3>{user.username}</h3>
        <p>
          {user.firstName} {user.surname}
        </p>
      </div>

      <nav className={classes.navLinks}>
        <ul>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>
            <Link to="/mycomments">My Comments</Link>
          </li>
        </ul>
      </nav>

      <button className={classes.logoutBtn} onClick={logout}>
        Log out
      </button>
    </div>
  ) : null;
};

export default Sidebar;
