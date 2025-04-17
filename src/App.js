import "./App.css";


import React, { useState } from "react";
import InvoiceForm from "./Component/InvoiceForm";
import ItemTable from "./Component/ItemTable";
import Summary from "./Component/Summary";
import { generatePDF } from "./Component/PDFGenerator";

function App() {
  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    address: "",
    invoiceNo: "",
    date: "",
  });

  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0, total: 0 }
  ]);

  const [tax, setTax] = useState(0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Invoice Generator</h1>

      <label>Tax (%): </label>
      <input
        type="number"
        value={tax}
        onChange={(e) => setTax(parseFloat(e.target.value))}
        style={{ marginBottom: "10px", marginLeft: "5px" }}
      />

      <InvoiceForm
        clientInfo={clientInfo}
        setClientInfo={setClientInfo}
      />

      <div
        id="invoice"
        style={{
          padding: "20px",
          backgroundColor: "white",
          border: "1px solid #ddd",
          marginTop: "20px",
        }}
      >
        <ItemTable items={items} setItems={setItems} />
        {/* ✅ Summary ke andar tax as prop bhej rahe hain */}
        <Summary items={items} taxRate={tax / 100} />
      </div>

      <button
        onClick={generatePDF}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </div>
  );
}

export default App;
