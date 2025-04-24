import React, { useRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

function ContactSection() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic to be implemented
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <h2>Contact Us</h2>
          <p>
            We are here to help you transform your spaces into sustainable green
            oases.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>
                  123 Innovation Street
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>contact@batarootsofrenewal.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>Hours</h3>
                <p>
                  Monday - Friday: 9 AM - 6 PM
                  <br />
                  Saturday: 10 AM - 4 PM
                </p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
