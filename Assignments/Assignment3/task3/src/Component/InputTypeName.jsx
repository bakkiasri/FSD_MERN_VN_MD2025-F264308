import { useState } from "react";
const Input_Live_show = () => {
  const [Name, SetName] = useState("");
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <label>Name:</label>
      <input
        type="text"
        name="Name"
        onChange={(e) => SetName(e.target.value)}
      />
      <br />
      <div>{Name}</div>
    </div>
  );
};
export default Input_Live_show;
