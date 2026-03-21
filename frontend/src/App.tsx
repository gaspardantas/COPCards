import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CardUI from "./components/CardUI";
import Register from "./components/Register";
import Bubbles from "./components/Bubbles";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="ocean-bg" />
      <Bubbles />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cards" element={<CardUI />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
