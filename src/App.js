import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Ambient from "./components/Ambient";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home/Home";
import Resume from "./components/Resume/ResumeNew";
import "./style.css";
import "./App.css";

function App() {
  return (
    <Router basename="/">
      <Ambient />
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
