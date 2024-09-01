import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameBoard from "@/pages/GameBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
