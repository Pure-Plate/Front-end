// import "./styles.css";
import { AuthProvider } from "./AuthContext";
import Pureplate from "./Pureplate/Pureplate";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Pureplate />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
