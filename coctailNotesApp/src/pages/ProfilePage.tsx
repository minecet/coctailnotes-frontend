import { useState, useEffect, useContext, ChangeEvent } from "react";
import { SessionContext } from "../contexts/SessionContext";
import ProfileForm from "../components/ProfileForm";
import classes from "./ProfilePage.module.css"; // Import CSS

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
    <div className={classes.wrapper}>
      <div className={classes.form}>
        {!isEditing ? (
          <>
            <h1 className={classes.title}>
              {user.firstName} {user.surname}
            </h1>
            <label
              className={classes.profileImgContainer}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <img
                src={user.profilePicture}
                alt="Profile"
                className={classes.profileImg}
                style={{ opacity: uploading ? 0.5 : 1 }}
              />
              {hover && <div className={classes.profileImgHover}>Change Image</div>}
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </label>
            {uploading && <p>Uploading...</p>}
            <div className={classes.profileDetails}>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Bio:</strong> {user.bioDescription || "No bio provided."}</p>
            </div>
            <button className={classes.profileButton} onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <ProfileForm data={user} onSave={handleSave} onCancel={() => setIsEditing(false)} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
