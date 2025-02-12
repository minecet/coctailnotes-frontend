import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { SessionContext } from "../contexts/SessionContext";
import classes from "./LoginPage.module.css"; // Import styles

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginPage = () => {
  const sessionContext = useContext(SessionContext);
  const location = useLocation(); // Get passed state
  const navigate = useNavigate();

    // Automatically login if credentials were passed
    useEffect(() => {
      if (location.state?.username && location.state?.password) {
        handleLogin(location.state as LoginCredentials);
      }
    }, [location.state]);


  if (!sessionContext) {
    throw new Error("LoginPage must be used within a SessionContextProvider");
  }

  const {setToken, setUser } = sessionContext;

  const handleLogin = async (credentials: LoginCredentials) => {
    console.log("Sending login request with:", credentials); // Log the payload

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();

        setToken(data.token);

        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            headers: { Authorization: `Bearer ${data.token}` },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>

        <div className={classes.form}>
        <h1 className={classes.title}>Login</h1>

        <AuthForm
          isSignup={false}
          submitCallback={(formData) => handleLogin(formData as LoginCredentials)}
          fields={[
            { name: "username", label: "Username", required: true },
            {
              name: "password",
              label: "Password",
              type: "password",
              required: true,
            },
          ]}
          initialValues={{
            username: location.state?.username || "",
            password: location.state?.password || "",
          }}
          buttonLabel="Log In"
        />
      </div>
    </div>
    </>
  );
};

export default LoginPage;
