import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ScrollText from "./pages/ScrollText";
import Guestbook from "./pages/Guestbook";
import NavBar from "./com/NavBar";

function App() {
  return (
    <Router>
      <div>
         <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/scrolltext" element={<ScrollText />} />
            <Route path="/guestbook" element={<Guestbook />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
