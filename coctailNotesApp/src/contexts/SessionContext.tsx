import { createContext, useEffect, useState, useCallback, ReactNode} from "react";
import { User } from "../types/user";


interface SessionContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

interface SessionContextProviderProps {
  children: ReactNode;
}

const SessionContextProvider = ({ children }: SessionContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: { Authorization: `Bearer ${tokenToVerify}` },
        }
      );

      if (response.ok) {
        const userData: User = await response.json();
        setToken(tokenToVerify);
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        console.error("Verification error:", response.status);
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Error:", error);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const profileData: User = await response.json();
        setUser(profileData);
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [token]);

  const uploadProfilePicture = async (file: File) => {
    if (!token) return;
    try {
      const uploadData = new FormData();
      uploadData.append("imageUrl", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profilePicture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: uploadData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      await fetchUserProfile();
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      localStorage.setItem("authToken", token);
    } else {
      setToken(null);
      setIsAuthenticated(false);
    }
  }, [token]);

  useEffect(() => {
    const storageToken = localStorage.getItem("authToken");
    if (storageToken) {
      verifyToken(storageToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        isLoading,
        user,
        setUser,
        logout,
        fetchUserProfile,
        uploadProfilePicture,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
