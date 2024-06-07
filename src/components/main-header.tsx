import React from "react";
import { Link } from "react-router-dom";

const Mainheader: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid col-12 p-2">
          <div className="col-8">
            <Link className="navbar-brand" to="/login">
              <strong>
                <i className="fa-solid fa-film text-primary"></i> BusinessPass
              </strong>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse p-2" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  For Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  For Work Space
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Mainheader;
