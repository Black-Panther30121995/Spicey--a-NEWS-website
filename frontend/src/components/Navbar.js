import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#2c3e50",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          padding: "1rem 2rem",
        }}
      >
        <div className="container-fluid">
          <NavLink
            className="navbar-brand"
            to="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "#ecf0f1",
              letterSpacing: "1px",
            }}
          >
            SPICEY
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "#ecf0f1",
                    padding: "0.75rem 1.5rem",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3498db")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = e.target.className.includes("active")
                      ? "#3498db"
                      : "#ecf0f1")
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/about"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "#ecf0f1",
                    padding: "0.75rem 1.5rem",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3498db")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = e.target.className.includes("active")
                      ? "#3498db"
                      : "#ecf0f1")
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;