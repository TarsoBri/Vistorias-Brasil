import "./App.css";

// context
import useAuthenticate from "./hooks/useAuthenticate";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Logout from "./components/Logout/Logout";

// Pages
import Home from "./pages/Home";
import RegisterClient from "./pages/RegisterClient";
import RegisterSurveryor from "./pages/RegisterSurveryor";
import Login from "./pages/Login";
import EnterLogin from "./pages/EnterLogin";
import MyVistory from "./pages/MyVistory";
import SurveryorData from "./pages/SurveryorData";
import EnterSurveryor from "./pages/EnterSurveryor";
import Vistory from "./pages/Vistory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollTop from "./components/ScrollTop";
import SendEmailPage from "./pages/SendEmailPage";

const App = () => {
  const { user } = useAuthenticate();

  return (
    <BrowserRouter>
      <ScrollTop />
      <div className="App">
        <Logout />
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/About" element={<About />} />

            <Route path="/Contact" element={<Contact />} />

            {user && user.surveyor !== true ? (
              <Route path="/MyVistory" element={<MyVistory />} />
            ) : (
              <Route path="/MyVistory" element={<Navigate to="/" />} />
            )}

            {user && user.surveyor === true ? (
              <Route path="/SurveryorData" element={<SurveryorData />} />
            ) : (
              <Route path="/SurveryorData" element={<Navigate to="/" />} />
            )}

            {user && user.surveyor === true ? (
              <Route path="/Vistory/:id" element={<Vistory />} />
            ) : (
              <Route path="/Vistory/:id" element={<Navigate to="/" />} />
            )}

            {!user ? (
              <Route path="/Login" element={<Login />} />
            ) : (
              <Route path="/Login" element={<Navigate to="/" />} />
            )}

            {!user ? (
              <Route path="/SendEmail" element={<SendEmailPage />} />
            ) : (
              <Route path="/SendEmail" element={<Navigate to="/" />} />
            )}

            {!user ? (
              <Route path="/RegisterClient" element={<RegisterClient />} />
            ) : (
              <Route path="/RegisterClient" element={<Navigate to="/" />} />
            )}

            {!user ? (
              <Route
                path="/RegisterSurveryor"
                element={<RegisterSurveryor />}
              />
            ) : (
              <Route path="/RegisterSurveryor" element={<Navigate to="/" />} />
            )}

            {!user ? (
              <Route path="/EnterSurveryor" element={<EnterSurveryor />} />
            ) : (
              <Route path="/EnterSurveryor" element={<Navigate to="/" />} />
            )}

            {!user ? (
              <Route path="/EnterLogin" element={<EnterLogin />} />
            ) : (
              <Route path="/EnterLogin" element={<Navigate to="/" />} />
            )}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
