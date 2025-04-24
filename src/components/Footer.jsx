import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>BATA Roots of Renewal</h3>
          <p>Let's transform our urban spaces into green havens together.</p>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <button onClick={() => scrollToSection("home")}>Home</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")}>About</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("projects")}>
                Projects
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")}>
                Contact
              </button>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@batarootsofrenewal.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Nature Street, New York</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} BATA Roots of Renewal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
