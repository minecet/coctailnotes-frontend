import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { SessionContext } from "../contexts/SessionContext";

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginPage = () => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error("LoginPage must be used within a SessionContextProvider");
  }

  const {setToken, setUser } = sessionContext;

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
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
      <h1 className="h1">Login</h1>
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
        buttonLabel="Log In"
      />
    </>
  );
};

export default LoginPage;
