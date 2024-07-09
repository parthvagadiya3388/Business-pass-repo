import { Link, useLocation } from "react-router-dom";
import { AiTwotoneDashboard } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [user_type, setUser_type] = useState("");
  const location = useLocation();

  useEffect(() => {
    const user_type = localStorage.getItem("user_type");
    setUser_type(user_type || "");
  }, []);

  return (
    <Col className="Profile_Side_bar border_radias p-0">
      <ul className="nav flex-column">
        {user_type !== "Business" && (
          <li className="nav-item">
            <Link
              className={`nav-link btn btn-primary radius text-start border_radius text_sidebar ${location.pathname === "/dashboad" ? "active" : ""}`}
              to="/dashboad"
            >
              <AiTwotoneDashboard /> Dashboard
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link
            className={`nav-link btn btn-primary radius text-start border_radius text_sidebar ${location.pathname.startsWith("/userlist") ? "active" : ""}`}
            to="/userlist"
          >
            <PiUsersThreeBold /> Users
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link btn btn-primary radius text-start border_radius text_sidebar ${location.pathname.startsWith("/employe-list") ? "active" : ""}`}
            to="/employe-list"
          >
            <PiUsersThreeBold /> Employees
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link btn btn-primary radius text-start border_radius text_sidebar ${location.pathname === "/user-chart" ? "active" : ""}`}
            to="/user-chart"
          >
            <PiUsersThreeBold /> User Charts
          </Link>
        </li>

        {user_type !== "Business" && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link btn btn-primary radius text-start border_radius text_sidebar ${location.pathname === "/explore-membership" ? "active" : ""}`}
                to="/explore-membership"
              >
                <TbUsers /> Explore membership
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link btn btn-primary radius text-start border_radius text_sidebar ${location.pathname === "/for-workspaces" ? "active" : ""}`}
                to="/for-workspaces"
              >
                <TbUsers /> For Workspaces
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link btn btn-primary radius text-start border_radius text_sidebar ${location.pathname === "/for-communities" ? "active" : ""}`}
                to="/for-communities"
              >
                <TbUsers /> For Communities
              </Link>
            </li>
          </>
        )}
      </ul>
    </Col>
  );
}
