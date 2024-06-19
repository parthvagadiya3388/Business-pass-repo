import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header";
import Userpage from "./components/user-page";
import Createpage from "./components/create-page";
import Loginpage from "./components/login-page";
import Welcome from "./components/welcome-page";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/header" element={<Header />} />
          <Route
            path="/userpage"
            element={
              <ProtectedRoute>
                <Userpage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createpage"
            element={
              <ProtectedRoute>
                <Createpage />
              </ProtectedRoute>
            }
          />
     
        </Routes>
      </Router>
    </>
  );
}

export default App;
