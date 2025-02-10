import { useState, ChangeEvent, FormEvent } from "react";
import "../assets/Forms.css";

interface ProfileData {
  username?: string;
  firstName?: string;
  surname?: string;
  email?: string;
  bioDescription?: string;
}

interface ProfileFormProps {
  data?: ProfileData;
  onSave: (data: ProfileData) => void;
  onCancel: () => void;
}

const ProfileForm = ({ data = {}, onSave, onCancel }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileData>({
    username: data.username || "",
    firstName: data.firstName || "",
    surname: data.surname || "",
    email: data.email || "",
    bioDescription: data.bioDescription || "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedData: ProfileData = {
      ...formData,
    };
    onSave(updatedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input name="username" value={formData.username} onChange={handleInputChange} required />
      </label>
      <label>
        First Name:
        <input name="firstName" value={formData.firstName} onChange={handleInputChange} required />
      </label>
      <label>
        Surname:
        <input name="surname" value={formData.surname} onChange={handleInputChange} required />
      </label>
      <label>
        Email:
        <input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
      </label>
      <label>
        Bio Description:
        <textarea name="bioDescription" value={formData.bioDescription} onChange={handleInputChange} />
      </label>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
