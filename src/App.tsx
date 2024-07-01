import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Loginpage from "./components/user-login";
import Welcome from "./components/welcome-page";
import useLoginStore from './zustandstore/loginApiStore';
import Userlist from "./components/user-list";
import Adduser from "./components/add-users";
import Personalinfo from "./components/personal-info";
import { Helmet } from "react-helmet-async";
import Notfound from "./components/404notfound-error";

function App() {
  const isAuthenticated = useLoginStore(state => state.isAuthenticated);
  const username = localStorage.getItem('username'); 

  console.log(username); 

  return (
    <Router>
      <Helmet>
        <title>Businesspass</title>
      </Helmet>
      
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/userlist" /> : <Loginpage />} />
        <Route path="/header" element={<Header />} />
        {isAuthenticated && username ? (
          <>
            <Route path="/userlist" element={<Userlist />} />
            <Route path="/adduser" element={<Adduser />} />
            {username === 'admin' && <Route path="/personalinfo" element={<Personalinfo />} />}
          </>
        ) : null}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
