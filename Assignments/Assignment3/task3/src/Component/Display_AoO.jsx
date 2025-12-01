const DisplayArrayOfObject = () => {
  const Students = [
    {
      name: "bakkiasri",
      dept: "Computer Application",
      year: "2023",
    },
    { name: "Dinakaran", dept: "EEE", year: "2026" },
    {
      name: "Vinoth",
      dept: "Computer Application",
      year: "2021",
    },
    {
      name: "Tharshika",
      dept: "B.E.,CSC",
      year: "2022",
    },
    {
      name: "Madhan kumar",
      dept: "B.E.,CSC",
      year: "2022",
    },
    {
      name: "Mouli",
      dept: "Computer Application",
      year: "2025",
    },
  ];
  console.log(Students);
  return (
    <>
      <div className="d-flex flex-column gap-5 mt-3 h4 justify-content-center align-items-center just">
        <div className="d-flex h1 justify-content-center lign-items-center just">
          display array of object
        </div>
        <div className="d-flex justify-content-center align-items-center gap-5 flex-wrap">
          {Students.map((items, index) => (
            <div
              key={index}
              style={{ width: "400px" }}
              className="d-flex flex-column gap-5 p-3 justify-content-center align-items-center rounded-5  shadow-lg border"
            >
              <p>{items.name}</p>
              <p>{items.dept}</p>
              <p>{items.year}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default DisplayArrayOfObject;
