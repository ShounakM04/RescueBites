import "./styles/start.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsumerLogin from "./pages/ConsumerLogin"
import Start from "./Components/Start";
import ProviderLogin from "./pages/ProviderLogin"
import ProviderDetails from "./pages/ProviderDetails";
import ConsumerRequest from "./pages/ConsumerRequest";
import Dashboard from "./pages/ProviderDashboard";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/consumerlogin" element={<ConsumerLogin />} />
          <Route path="/providerlogin" element={<ProviderLogin />} />
          <Route path="/providerdetails" element={<ProviderDetails />} />
          <Route path="/ConsumerRequest" element={<ConsumerRequest />} />
          <Route path="/providerdashboard" element={<Dashboard/>} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
