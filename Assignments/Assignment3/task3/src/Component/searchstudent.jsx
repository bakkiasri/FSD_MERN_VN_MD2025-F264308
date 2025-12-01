import { useState } from "react";
const Search_Student = () => {
  const [search, SetSearch] = useState("");
  const Students = [
    "Dinakaran",
    "Sridhar",
    "Bharath",
    "Kalai",
    "tharshika",
    "Madan kumar",
  ];
  const Filter = Students.filter((items) =>
    items.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div>
        <label>Search</label>
        <input
          type="text"
          name="search"
          onChange={(e) => SetSearch(e.target.value)}
        />
      </div>
      <div>
        {Filter.map((items, index) => (
          <div key={index}>
            <p>{items}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Search_Student;
