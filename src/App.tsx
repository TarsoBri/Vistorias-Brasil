import "./App.css";

// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar/NavBar";

// Pages
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import EnterLogin from "./pages/EnterLogin/EnterLogin";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/CreateClient" element={<Create />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/EnterLogin" element={<EnterLogin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
