import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save button → switch to display mode
  const handleSave = () => {
    setIsEditing(false);
  };

  // Edit button → switch back to edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h3>Profile</h3>

      {isEditing ? (
        // ------------------------
        // EDIT MODE
        // ------------------------
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        // ------------------------
        // DISPLAY MODE
        // ------------------------
        <div>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>

          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
