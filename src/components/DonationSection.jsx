import React, { useRef, useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

function DonationSection() {
  const sectionRef = useRef(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);

  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const handleDonationClick = (amount) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount("custom");
    }
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();

    const amount = donationAmount === "custom" ? customAmount : donationAmount;
    const donationType = isMonthly ? "monthly" : "one-time";

    console.log("Donation submitted:", { amount, donationType });

    // This would typically submit to a payment processor
    alert(`Thank you for your ${donationType} donation of $${amount}!`);
  };

  return (
    <section id="donate" className="donations-section" ref={sectionRef}>
      <div className="container">
        <div className="donations-content">
          <div className="section-title">
            <h2>Support Our Mission</h2>
            <p>
              Your generous donations help us create more green spaces in urban
              areas and make a positive impact on our environment.
            </p>
          </div>

          <div className="donation-options">
            <div className="donation-option">
              <div className="donation-amount">$25</div>
              <h3>Seed Starter</h3>
              <p>Provides materials for a small community garden</p>
              <button className="btn btn-primary">Donate Now</button>
            </div>

            <div className="donation-option">
              <div className="donation-amount">$50</div>
              <h3>Garden Builder</h3>
              <p>
                Supports the transformation of a vacant lot into public space
              </p>
              <button className="btn btn-primary">Donate Now</button>
            </div>

            <div className="donation-option">
              <h3>$100</h3>
              <p className="description">
                Finance a rainwater collection system for sustainable irrigation
              </p>
              <button
                className="donation-button"
                onClick={() => handleDonationClick("100")}
              >
                Donate $100
              </button>
            </div>

            <div className="donation-option">
              <h3>$250</h3>
              <p className="description">
                Supports the transformation of a vacant lot into a public green
                space
              </p>
              <button
                className="donation-button"
                onClick={() => handleDonationClick("250")}
              >
                Donate $250
              </button>
            </div>
          </div>

          <form onSubmit={handleDonationSubmit} className="donation-form">
            <div className="form-group">
              <label>Custom Amount</label>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter your amount"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={isMonthly}
                  onChange={(e) => setIsMonthly(e.target.checked)}
                />
                Don mensuel
              </label>
            </div>

            <button type="submit" className="donation-button">
              Faire un don
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DonationSection;
