import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header";
import Userpage from "./components/user-page";
import Createpage from "./components/create-page";
import Loginpage from "./components/login-page";

function App() {
  return (
    <>  
  
      <Router>

          <Routes>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/header" element={<Header />} />
            <Route path="/userpage" element={<Userpage />} />
            <Route path="/createpage" element={<Createpage />} />

          </Routes>


      </Router>
    </>
  );
}

export default App;
