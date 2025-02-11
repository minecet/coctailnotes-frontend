
//import "../assets/Forms.css";
import { Link } from "react-router-dom";
import AuthenticationImage  from "./AuthenticationImage";

const HomePage = () => {
  return (
    <div className="main-content">
      <div className="homePageCards">
       <AuthenticationImage/>

        <Link to="/blogs">
          <div className="toBlogsCard card">

            <h2>Check out the blog posts</h2>
          </div>
        </Link>

        <Link to="/blogs/new">
          <div className="toNewBlogCard card">
            <h2>Create a new blog post</h2>
          </div>
        </Link>

        <Link to="/discover">
          <div className="toDiscover card">
            <h2>Discover something new in the world of plants</h2>
          </div>
        </Link>

        <Link to="/siterules">
          <div className="toRulesCard card">
            <h2>Read the rules</h2>
          </div>
        </Link>

        <Link to="/AboutUs">
          <div className="toAboutUsCard card">
            <div className="toAboutUsImg">

            </div>
            <h2>Learn about the web developers</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
