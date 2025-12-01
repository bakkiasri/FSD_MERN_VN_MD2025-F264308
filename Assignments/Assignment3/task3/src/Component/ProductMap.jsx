const ProductOfMap = () => {
  const Products = [
    {
      name: "Orange",
      id: "101",
      price: "1200",
    },
    {
      name: "Mango",
      id: "102",
      price: "1250",
    },
    {
      name: "Apple",
      id: "103",
      price: "2000",
    },
  ];
  return (
    <div>
      <table className="border-1">
        <tr className="border-1">
          <th className="border-1">ID</th>
          <th className="border-1">NAME</th>
          <th className="border-1">PRICE</th>
        </tr>
        {Products.map((items, index) => (
          <tr className="border-1" key={index}>
            <td className="border-1">{items.id}</td>
            <td className="border-1">{items.name}</td>
            <td className="border-1">{items.price}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default ProductOfMap;
