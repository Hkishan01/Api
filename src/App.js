import "./App.css";
import Form from "./Components/Form";
import Tble from "./Components/Tble";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Tble />} />
      </Routes>
    </div>
  );
}

export default App;
