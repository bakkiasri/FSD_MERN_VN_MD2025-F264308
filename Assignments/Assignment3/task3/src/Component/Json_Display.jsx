import { useState, useEffect } from "react";

const Json_Display = () => {
  const [data, SetData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((result) => {
        console.log("retrieved data", result);
        SetData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Displaying the data</h1>

      <div>
        {data.map((items, index) => (
          <div key={index}>
            <p>{items.product_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Json_Display;
