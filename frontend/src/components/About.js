import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container my-5"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem",
        borderRadius: "10px",
        minHeight: "80vh",
      }}
    >
      <button
        onClick={() => navigate("/")} // Navigate back to home (News page)
        className="btn mb-4"
        style={{
          backgroundColor: "#34495e",
          color: "#fff",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: "500",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c3e50")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#34495e")}
      >
        ← Back to News
      </button>

      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#2c3e50",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        About Spicey
      </h1>

      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "1.1rem",
          color: "#2c3e50",
          lineHeight: "1.8",
          textAlign: "justify",
          marginBottom: "1.5rem",
        }}
      >
        Welcome to <strong>Spicey</strong>, your premier destination for the latest and most engaging news from India and beyond. At Spicey, we believe that news should not only inform but also inspire. Our mission is to bring you stories that matter—crafted with elegance, delivered with precision, and spiced with a touch of curiosity.
      </p>

      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "1.1rem",
          color: "#2c3e50",
          lineHeight: "1.8",
          textAlign: "justify",
          marginBottom: "1.5rem",
        }}
      >
        Launched in 2025, Spicey is designed to keep you connected to the pulse of the world. Whether it’s breaking headlines, in-depth features, or thought-provoking insights, we curate content that reflects the vibrancy and diversity of our times. Powered by cutting-edge technology and a passion for storytelling, we aim to make every visit to our site a delightful experience.
      </p>

      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "1.1rem",
          color: "#2c3e50",
          lineHeight: "1.8",
          textAlign: "justify",
          marginBottom: "1.5rem",
        }}
      >
        Our team is dedicated to upholding the highest standards of journalism while embracing a modern, user-friendly approach. From the sleek design to the seamless navigation, every detail of Spicey is crafted to elevate your news-reading journey. Thank you for choosing us as your trusted source—let’s explore the world together, one story at a time.
      </p>

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        <a
          href="sk1609525@gmail.com" // Replace with your contact email
          className="btn"
          style={{
            backgroundColor: "#34495e",
            color: "#fff",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "500",
            padding: "0.75rem 1.5rem",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c3e50")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#34495e")}
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default About;