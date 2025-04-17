import React from "react";

function InvoiceForm({ clientInfo, setClientInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientInfo({ ...clientInfo, [name]: value });
  };

  return (
    <div className="section">
      <h3 className="section-title">Client Information</h3>

      <input
        type="text"
        name="clientName"
        placeholder="Client Name"
        value={clientInfo.clientName}
        onChange={handleChange}
        className="form-input"
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={clientInfo.address}
        onChange={handleChange}
        className="form-input"
      />

      <input
        type="text"
        name="invoiceNo"
        placeholder="Invoice No"
        value={clientInfo.invoiceNo}
        onChange={handleChange}
        className="form-input"
      />

      <input
        type="date"
        name="date"
        value={clientInfo.date}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
}

export default InvoiceForm;
