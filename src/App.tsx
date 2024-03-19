import "./App.css";

// context
import useAuthenticate from "./hooks/useAuthenticate";

// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar/NavBar";
import Logout from "./components/Logout/Logout";

// Pages
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import EnterLogin from "./pages/EnterLogin/EnterLogin";
import MyVistory from "./pages/MyVistoy/MyVistory";

function App() {
  const { user } = useAuthenticate();

  return (
    <BrowserRouter>
      <div className="App">
        <Logout />
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateClient" element={<Create />} />
            {user && <Route path="/MyVistory" element={<MyVistory />} />}
            {!user && <Route path="/Login" element={<Login />} />}
            {!user && <Route path="/EnterLogin" element={<EnterLogin />} />}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
