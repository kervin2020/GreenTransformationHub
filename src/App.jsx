import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{ marginTop: "80px", width: "100%" }}>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
