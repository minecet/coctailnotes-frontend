import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css"; // Import styles

interface SignupCredentials {
  username: string;
  password: string;
  firstName?: string;
  surname?: string;
  email: string;
}

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (credentials: SignupCredentials) => {
    console.log("import.meta.env:", import.meta.env);

    console.log("API URL:", import.meta.env.VITE_API_URL);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );
      if (response.ok) {
        alert("User created successfully!");
        navigate("/login");
      } else {
        alert("Failed to sign up.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className={classes.wrapper}>

      <div className={classes.form}>
        <h1 className={classes.title}>Sign Up</h1>
      <AuthForm
        isSignup={true}
        submitCallback={(formData) => handleSignup(formData as SignupCredentials)}
        fields={[
          { name: "username", label: "Username", required: true },
          { name: "password", label: "Password", type: "password", required: true },
          { name: "firstName", label: "First Name", required: true },
          { name: "surname", label: "Last Name", required: true },
          { name: "email", label: "Email", type: "email", required: true },
        ]}
        buttonLabel="Sign Up"
      />
      </div>

    </div>
  );
};

export default SignupPage;
