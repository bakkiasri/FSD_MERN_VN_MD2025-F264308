import { useState } from "react";

const Filter_Map = () => {
  const [search, Setsearch] = useState("");
  const products = [
    {
      name: "fan",
      Category: "Electronics",
    },
    {
      name: "jean",
      Category: "Clothes",
    },
    {
      name: "fan",
      Category: "Electronics",
    },
    {
      name: "kurtis",
      Category: "Clothes",
    },
    {
      name: "fan",
      Category: "Electronics",
    },
    {
      name: "tops",
      Category: "Clothes",
    },
  ];
  const Filter =
    search.toLowerCase() == "all"
      ? products
      : products.filter((items) =>
          items.Category.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <>
      <div>
        <div>
          <label>Search</label>
          <input
            type="text"
            name="search"
            onChange={(e) => Setsearch(e.target.value)}
          />
        </div>
        <div>
          {Filter.map((items, index) => (
            <div key={index}>
              <p></p>
              <p>{items.name}</p>
              <p>{items.Category}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Filter_Map;
