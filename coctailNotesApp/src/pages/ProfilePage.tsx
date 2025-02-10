import { useState, useEffect, useContext, ChangeEvent } from "react";
import { SessionContext } from "../contexts/SessionContext";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = () => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error("ProfilePage must be used within a SessionContextProvider");
  }

  const { user, token, fetchUserProfile, uploadProfilePicture } = sessionContext;

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile, token]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    await uploadProfilePicture(file);
    setUploading(false);
  };

  const handleSave = async (updatedData: Record<string, any>) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...updatedData,
            profilePicture: user.profilePicture,
          }),
        }
      );
      if (response.ok) {
        await fetchUserProfile();
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <h1 className="profileText">
            {user.firstName} {user.surname}
          </h1>
          <label
            style={{ position: "relative", cursor: "pointer", display: "inline-block" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src={user.profilePicture}
              alt="Profile"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                transition: "opacity 0.3s",
                opacity: uploading ? 0.5 : 1,
              }}
            />
            {hover && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 100,
                  height: 100,
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Change Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, opacity: 0, cursor: "pointer" }}
            />
          </label>
          {uploading && <p>Uploading...</p>}
          <div className="profileText">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bioDescription || "No bio provided."}</p>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <ProfileForm data={user} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
