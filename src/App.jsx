import "./styles/start.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login"
import Start from "./Components/Start";

function App() {
  return (
    <Router>
      <div className="start">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
