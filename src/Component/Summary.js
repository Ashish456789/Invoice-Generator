import React, { useState } from "react";
import "./Summary.css";


function Summary({ items, taxRate = 0, discountRate = 0, validCoupons = [] }) {
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [notes, setNotes] = useState(""); // Notes state
  const [logo, setLogo] = useState(null); // Logo state
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark/Light mode state
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
    phone: "",
  }); // Company Info state

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file)); // Preview the logo
    }
  };

  const handleApplyCoupon = () => {
    if (validCoupons.includes(coupon)) {
      setError(""); // Clear error if coupon is valid
    } else {
      setError("Invalid coupon code");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const discount = subtotal * discountRate;
  const subtotalAfterDiscount = subtotal - discount;
  const tax = subtotalAfterDiscount * taxRate;
  const total = subtotalAfterDiscount + tax;

  // Coupon Discount Logic
  const couponDiscount = validCoupons.includes(coupon) ? subtotal * 0.1 : 0; // 10% discount for valid coupon
  const finalSubtotal = subtotalAfterDiscount - couponDiscount;
  const finalTotal = finalSubtotal + tax;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div style={{ backgroundColor: isDarkMode ? "#333" : "#fff", color: isDarkMode ? "#fff" : "#000", padding: "20px" }}>
      {/* Company Logo Upload */}
      <h3>Upload Company Logo</h3>
      <input type="file" accept="image/*" onChange={handleLogoChange} />
      {logo && <img src={logo} alt="Company Logo" style={{ width: "100px", marginTop: "10px" }} />}

      {/* Company Info */}
      <div style={{ marginTop: "20px" }}>
        <h3>Your Company Info</h3>
        <input
          type="text"
          name="name"
          value={companyInfo.name}
          onChange={handleInputChange}
          placeholder="Company Name"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="text"
          name="address"
          value={companyInfo.address}
          onChange={handleInputChange}
          placeholder="Company Address"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="text"
          name="phone"
          value={companyInfo.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>

      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td><strong>Subtotal:</strong></td>
            <td>₹ {subtotal.toFixed(2)}</td>
          </tr>
          {discount > 0 && (
            <tr>
              <td><strong>Discount ({(discountRate * 100).toFixed(0)}%):</strong></td>
              <td>₹ {discount.toFixed(2)}</td>
            </tr>
          )}
          <tr>
            <td><strong>Subtotal After Discount:</strong></td>
            <td>₹ {subtotalAfterDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Tax ({(taxRate * 100).toFixed(0)}%):</strong></td>
            <td>₹ {tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Total Before Coupon:</strong></td>
            <td>₹ {finalSubtotal.toFixed(2)}</td>
          </tr>
          {couponDiscount > 0 && (
            <tr>
              <td><strong>Coupon Discount (10%):</strong></td>
              <td>₹ {couponDiscount.toFixed(2)}</td>
            </tr>
          )}
          <tr>
            <td><strong>Final Total:</strong></td>
            <td><strong>₹ {finalTotal.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>

      {/* Notes / Terms */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter additional notes or terms"
        rows="4"
        style={{ width: "100%", marginTop: "20px" }}
      ></textarea>

      {/* Dark/Light Mode Toggle */}
      <button onClick={toggleTheme} style={{ padding: "10px", marginTop: "20px" }}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {/* Coupon Code Section */}
      <h3>Client Email</h3>
      <input type="email" placeholder="Enter client email" style={{ width: "100%", marginBottom: "10px" }} />
      <button style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white" }}>Send Invoice</button>
    </div>
  );
}

export default Summary;
