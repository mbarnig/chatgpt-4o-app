import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mockImages = [
  { src: "/mock1.jpg", id: 1 },
  { src: "/mock2.jpg", id: 2 },
  { src: "/mock3.jpg", id: 3 },
];

const options = ["Chat", "Chien", "Oiseau", "Voiture", "Fleur"];
const correctAnswers = ["Chat", "Chien", "Oiseau"];

export default function App() {
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
    <div className="flex flex-col items-center p-4">
      <img src="/cover.jpg" alt="Cover" className="mb-4 w-full rounded-xl" />
      <Button onClick={() => setPage("quiz")} className="text-xl">Commencer le Quiz</Button>
    </div>
  );

  const renderQuiz = () => (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 w-full bg-white z-10 p-2 border-b">
        <select
          value={selections[current]}
          onChange={handleSelect}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Sélectionnez une légende --</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex items-center justify-center mt-20 mb-20">
        <div className="relative">
          <img src={mockImages[current].src} alt="Quiz" className="rounded-lg max-h-96" />
          <span className="absolute top-2 left-2 bg-black text-white text-sm p-1 rounded">
            {String(current + 1).padStart(2, '0')}
          </span>
          {selections[current] && (
            <span className="absolute bottom-2 left-2 bg-white text-black text-sm p-1 rounded">
              {selections[current]}
            </span>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 w-full flex justify-between p-4 bg-white border-t">
        <Button onClick={handleValidate}>Validation</Button>
        <Button onClick={handleReset}>Reset</Button>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrent((prev) => (prev > 0 ? prev - 1 : prev))}
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => setCurrent((prev) => (prev < mockImages.length - 1 ? prev + 1 : prev))}
            variant="outline"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 w-full bg-white z-10 p-4 border-b text-center text-xl font-semibold">
        Consultation des Résultats
      </div>

      <div className="flex-1 overflow-auto mt-20 mb-20 p-4">
        {results.map((res, idx) => (
          <Card key={idx} className="mb-2">
            <CardContent className="p-2 text-sm">
              Image {String(idx + 1).padStart(2, '0')} : {selections[idx]} — {res}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 w-full flex justify-between p-4 bg-white border-t">
        <Button onClick={() => setPage("quiz")}><ChevronLeft /></Button>
        <Button onClick={() => setPage("home")}>MENU</Button>
        <Button onClick={() => { setCurrent(0); handleReset(); setPage("quiz"); }}><ChevronRight /></Button>
      </div>
    </div>
  );

  return page === "home"
    ? renderHome()
    : page === "quiz"
    ? renderQuiz()
    : renderResults();
}
