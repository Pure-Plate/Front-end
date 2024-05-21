import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pureplate from "./pages/Pureplate/Pureplate";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Pureplate />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;