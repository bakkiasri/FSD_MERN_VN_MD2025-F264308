import { useState } from "react";
import axios from "axios";

function PostForm() {
  const [data, setData] = useState({
    title: "",
    body: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await axios.post("https://dummyjson.com/posts/add", {
        title: data.title,
        body: data.body,
        userId: 1, // required by DummyJSON API
      });

      console.log("Response:", response.data);
      setMsg("Post Added!");

      // Clear form
      setData({ title: "", body: "" });
    } catch (error) {
      console.error("Error:", error);
      setMsg("Error adding post");
    }
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Body:</label>
          <textarea
            name="body"
            value={data.body}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
    </div>
  );
}

export default PostForm;
