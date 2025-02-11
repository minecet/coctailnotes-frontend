import { useState, ChangeEvent, FormEvent } from "react";
//import "../assets/Forms.css";

interface AuthFormProps {
  submitCallback: (formData: FormData) => void;
  isSignup: boolean;
  fields: { name: string; label: string; type?: string; required: boolean }[];
  buttonLabel: string;
}

interface FormData {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  surname?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup, submitCallback}) => {
  const [formData, setFormData] = useState<FormData>(
    isSignup
      ? { username: "", password: "", email: "", firstName: "", surname: "" }
      : { username: "", password: "" }
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitCallback(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </label>
      {isSignup && (
        <div>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            First Name:
            <input
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              name="surname"
              value={formData.surname || ""}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
      )}
      <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
    </form>
  );
};

export default AuthForm;
