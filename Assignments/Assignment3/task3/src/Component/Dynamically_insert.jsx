import { useState } from "react";

const Dynamicaly_insertion = () => {
  const [addOne, SetaddOne] = useState("");
  const [Fruits, SetFruits] = useState(["Apple", "Orange", "Mango"]);

  const handlesubmit = () => {
    if (addOne.trim() === "") return;

    SetFruits([...Fruits, addOne]);
    SetaddOne("");
  };
  const handledelete = (index) => {
    const deleteFrutis = Fruits.filter((n, i) => !i == index);
    SetFruits(deleteFrutis);
    console.log(index);
  };
  return (
    <div>
      <div>
        <label>Insert the data</label>
        <input
          type="text"
          name="addOne"
          value={addOne}
          onChange={(e) => SetaddOne(e.target.value)}
        />
      </div>

      <div>
        <button type="button" onClick={handlesubmit}>
          Add This
        </button>
      </div>

      <div>
        <h1>Displaying the Array</h1>
        <div>
          {Fruits.map((items, index) => (
            <div key={index} className="d-flex gap-4 p-4">
              <div>
                <p>{items}</p>
                <button type="submit" onClick={() => handledelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dynamicaly_insertion;
