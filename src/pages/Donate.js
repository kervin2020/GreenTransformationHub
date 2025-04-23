import React, { useState } from "react";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Donation processing logic
    console.log("Donation submitted:", amount || customAmount);
  };

  return (
    <div className="donate-page">
      <section className="donation-section">
        <div className="container">
          <h1>Make a Donation</h1>
          <p className="donation-intro">
            Your donation helps us transform more urban spaces into sustainable
            green areas. Every contribution matters!
          </p>
          <form onSubmit={handleSubmit} className="donation-form">
            <div className="donation-amounts">
              <button
                type="button"
                className={`amount-btn ${amount === "10" ? "active" : ""}`}
                onClick={() => setAmount("10")}
              >
                €10
              </button>
              <button
                type="button"
                className={`amount-btn ${amount === "25" ? "active" : ""}`}
                onClick={() => setAmount("25")}
              >
                €25
              </button>
              <button
                type="button"
                className={`amount-btn ${amount === "50" ? "active" : ""}`}
                onClick={() => setAmount("50")}
              >
                €50
              </button>
              <button
                type="button"
                className={`amount-btn ${amount === "100" ? "active" : ""}`}
                onClick={() => setAmount("100")}
              >
                €100
              </button>
            </div>
            <div className="custom-amount">
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-donation">
              Donate Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Donate;
