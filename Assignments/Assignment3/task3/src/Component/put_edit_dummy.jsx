import { useEffect, useState } from "react";
import axios from "axios";

function EditUser() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [msg, setMsg] = useState("");

  // Fetch user on load
  useEffect(() => {
    axios
      .get("https://dummyjson.com/users/1")
      .then((res) => {
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update user (PUT)
  const handleUpdate = () => {
    axios
      .put("https://dummyjson.com/users/1", user)
      .then((res) => {
        console.log("Updated:", res.data);
        setMsg("User Updated Successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h2>Edit User</h2>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleUpdate}>Update User</button>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
    </div>
  );
}

export default EditUser;
