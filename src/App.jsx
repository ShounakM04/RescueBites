import "./styles/start.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsumerLogin from "./pages/ConsumerLogin"
import Start from "./Components/Start";
import ProviderLogin from "./pages/ProviderLogin"

function App() {
  return (
    <Router>
      <div className="start">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/consumerlogin" element={<ConsumerLogin />} />
          <Route path="/providerlogin" element={<ProviderLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
