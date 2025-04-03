import React, { useState } from 'react';

const mockImages = [
  { src: "/mock1.jpg", id: 1 },
  { src: "/mock2.jpg", id: 2 },
  { src: "/mock3.jpg", id: 3 },
];

const options = ["Chat", "Chien", "Oiseau", "Voiture", "Fleur"];
const correctAnswers = ["Chat", "Chien", "Oiseau"];

function App() {
  const [current, setCurrent] = useState(0);
  const [selections, setSelections] = useState(Array(mockImages.length).fill(""));
  const [page, setPage] = useState("home");
  const [results, setResults] = useState([]);

  const handleSelect = (e) => {
    const newSelections = [...selections];
    newSelections[current] = e.target.value;
    setSelections(newSelections);
  };

  const handleValidate = () => {
    const result = selections.map((choice, idx) =>
      choice === correctAnswers[idx] ? "Correct" : "Incorrect"
    );
    setResults(result);
    setPage("result");
  };

  const handleReset = () => {
    setSelections(Array(mockImages.length).fill(""));
    setCurrent(0);
  };

  const renderHome = () => (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <img src="/cover.jpg" alt="Cover" style={{ maxWidth: "100%", borderRadius: "1rem" }} />
      <button onClick={() => setPage("quiz")} style={{ marginTop: "1rem", padding: "1rem" }}>
        Commencer le Quiz
      </button>
    </div>
  );

  const renderQuiz = () => (
    <div style={{ padding: "1rem" }}>
      <div style={{ position: "fixed", top: 0, width: "100%", backgroundColor: "#fff", padding: "1rem" }}>
        <select value={selections[current]} onChange={handleSelect} style={{ width: "100%", padding: "0.5rem" }}>
          <option value="">-- Sélectionnez une légende --</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "5rem", textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={mockImages[current].src} alt="Quiz" style={{ maxHeight: "400px", borderRadius: "1rem" }} />
          <span style={{
            position: "absolute", top: "10px", left: "10px",
            background: "#000", color: "#fff", padding: "0.3rem", borderRadius: "0.3rem"
          }}>
            {String(current + 1).padStart(2, '0')}
          </span>
          {selections[current] && (
            <span style={{
              position: "absolute", bottom: "10px", left: "10px",
              background: "#fff", color: "#000", padding: "0.3rem", borderRadius: "0.3rem"
            }}>
              {selections[current]}
            </span>
          )}
        </div>
      </div>

      <div style={{
        position: "fixed", bottom: 0, width: "100%",
        display: "flex", justifyContent: "space-between",
        backgroundColor: "#fff", padding: "1rem"
      }}>
        <button onClick={handleValidate}>Validation</button>
        <button onClick={handleReset}>Reset</button>
        <div>
          <button onClick={() => setCurrent(prev => prev > 0 ? prev - 1 : prev)}>&lt;</button>
          <button onClick={() => setCurrent(prev => prev < mockImages.length - 1 ? prev + 1 : prev)}>&gt;</button>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ position: "fixed", top: 0, width: "100%", backgroundColor: "#fff", padding: "1rem", textAlign: "center" }}>
        Consultation des Résultats
      </h2>
      <div style={{ marginTop: "5rem" }}>
        {results.map((res, idx) => (
          <div key={idx} style={{
            border: "1px solid #ccc", margin: "0.5rem 0",
            padding: "1rem", borderRadius: "0.5rem"
          }}>
            Image {String(idx + 1).padStart(2, '0')} : {selections[idx]} — {res}
          </div>
        ))}
      </div>
      <div style={{
        position: "fixed", bottom: 0, width: "100%",
        display: "flex", justifyContent: "space-between",
        backgroundColor: "#fff", padding: "1rem"
      }}>
        <button onClick={() => setPage("quiz")}>&lt;</button>
        <button onClick={() => setPage("home")}>MENU</button>
        <button onClick={() => { setCurrent(0); handleReset(); setPage("quiz"); }}>&gt;</button>
      </div>
    </div>
  );

  return page === "home" ? renderHome() : page === "quiz" ? renderQuiz() : renderResults();
}

export default App;
