import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WebpageDetails from "./pages/WebpageDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/webpage" element={<WebpageDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
