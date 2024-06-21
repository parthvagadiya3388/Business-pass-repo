import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Userpage from "./components/user-page";
import Createpage from "./components/create-page";
import Loginpage from "./components/login-page";
import Welcome from "./components/welcome-page";
import useLoginStore from './zustandstore/loginApiStore';
import PasswordForgot from "./components/password-forgot";

function App() {
  const isAuthenticated = useLoginStore(state => state.isAuthenticated);

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/userpage" /> : <Loginpage />} />
        <Route path="/header" element={<Header />} />
        {isAuthenticated ? (
          <>
            <Route path="/userpage" element={<Userpage />} />
            <Route path="/createpage" element={<Createpage />} />
            <Route path="/pwdfor" element={<PasswordForgot />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
