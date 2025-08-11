import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ScoreMeter from "./components/ScoreMeter";
import "./App.css";
import Hero3D from "./components/Hero3D"; 
export default function App() {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState([]); // new state for tips

const handleFileUpload = async (selectedFile) => {
  setLoading(true);
  setScore(null);
  setTips([]); // reset tips on new upload

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const res = await fetch("http://localhost:8000/api/predict", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log("Backend response:", data);

    // Parse and set score
    const parsedScore = Math.round(data.score || 0);
    setScore(parsedScore);

    // Set tips if present, else empty array
    setTips(Array.isArray(data.tips) ? data.tips : []);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong while analyzing your resume.");
    setTips([]); // clear tips on error
  } finally {
    setLoading(false);
  }
};


    



  return (
 <div className="hero">
      <div className="hero-text">
        <h1 className="title">
          🚀 CSE-Exclusive <span>AI ATS</span> Resume Checker
        </h1>
        <p className="subtitle">
          Built for Computer Science & Engineering students — get instant, AI-powered
          feedback on your resume. Highlight your skills in Python, Java, DSA, and more.
          Land interviews faster with an ATS-optimized resume.
        </p>

        <div className="container">
          {!score && !loading && <FileUpload onFileSelected={handleFileUpload} />}

          {loading && (
            <p className="message">🔍 Scanning your resume for CSE keywords...</p>
          )}

          {score !== null && (
            <div style={{ textAlign: "center" }}>
              <ScoreMeter score={score} />
              <p
  className={`result-text ${
    score >= 70 ? "strong" : score >= 40 ? "moderate" : "low"
  }`}
>
  {score >= 70
    ? "💡 Excellent Match! Your CSE resume is interview-ready."
    : score >= 40
    ? "⚡ Moderate Match — polish it for better results."
    : "🚨 Low Match — let's strengthen your resume."}
</p>
            </div>
          )}
        </div>
      </div>

    <div className="hero-image">
  <div className="hero-3d-wrapper">
    <Hero3D />
  </div>
  {tips.length > 0 && (
    <div className="tips-container">
      <h3>📝 Tips to Improve Your Resume:</h3>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  )}
</div>

      </div>
  


  );
}
