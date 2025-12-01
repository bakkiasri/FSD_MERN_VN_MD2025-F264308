import { useState } from "react";

const Fomsss = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [submitted, SetSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    SetSubmitted({ name, email });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => SetName(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div>
        {submitted && (
          <div>
            <p>{submitted.name}</p>
            <p>{submitted.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fomsss;
