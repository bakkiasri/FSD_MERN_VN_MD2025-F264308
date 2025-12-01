import { useState, useEffect } from "react";

const Dummy_Json_Display_Loading = () => {
  const [data, SetData] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(false);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        console.log("retrieved data", result.products);
        SetData(result.products);
        SetLoading(false);
      })
      .catch((err) => {
        console.log(err);
        SetLoading(false);
        SetError(true);
      });
  }, []);

  return (
    <div>
      <h1>Displaying the data</h1>
      {error ? (
        <div className="text-danger h3 ">Error loading data</div>
      ) : (
        <div>
          {loading ? (
            <div>Loading</div>
          ) : (
            <div className="h4">
              {data.map((items, index) => (
                <div key={index}>
                  <p>{items.title}</p>
                  <p>{items.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dummy_Json_Display_Loading;
