import React from "react";

function ItemTable({ items, setItems }) {
  // input change handler
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = name === "name" ? value : parseFloat(value);

    // total calculate karo
    updatedItems[index].total =
      updatedItems[index].quantity * updatedItems[index].price;

    setItems(updatedItems);
  };

  // naya item add
  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
  };

  // item delete
  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div>
      <h3>Invoice Items</h3>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>❌</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </td>
              <td>{item.total.toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(index)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={addItem}
        style={{ marginTop: "10px", padding: "8px", cursor: "pointer" }}
      >
        ➕ Add Item
      </button>
    </div>
  );
}

export default ItemTable;
