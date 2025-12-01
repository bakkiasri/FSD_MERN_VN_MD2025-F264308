import { useState, useEffect } from "react";

const Dummy_Json_Display = () => {
  const [data, SetData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        console.log("retrieved data", result.products);
        SetData(result.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Displaying the data</h1>

      <div>
        {data.map((items, index) => (
          <div key={index}>
            <p>{items.title}</p>
            <p>{items.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dummy_Json_Display;
