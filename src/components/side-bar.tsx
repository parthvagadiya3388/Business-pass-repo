import { Link } from "react-router-dom";
import { AiTwotoneDashboard } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";


export default function Sidebar() {

  const [user_type, setUser_type] = useState("");

  useEffect(() => {
    const user_type = localStorage.getItem("user_type");
    setUser_type(user_type || "");
  }, []);


  return (
    <Col className="Profile_Side_bar border_radias p-0">
              <ul className="nav flex-column">
              {user_type !== "Business" && (
                  <li className="nav-item">
                    <Link className="nav-link btn btn-primary radius text-start border_radius text_sidebar" to="#">
                      <AiTwotoneDashboard /> Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link active btn btn-primary radius text-start text-white border_radius text_sidebar" to="#">
                    <PiUsersThreeBold /> Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary radius text-start border_radius text_sidebar" to="#">
                    <PiUsersThreeBold /> Activate accounts
                  </Link>
                </li>

                {user_type !== "Business" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link btn btn-primary radius text-start border_radius text_sidebar" to="#">
                        <TbUsers /> Explore membership
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link btn btn-primary radius text-start border_radius text_sidebar" to="#">
                        <TbUsers /> For Workspaces
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link btn btn-primary radius text-start border_radius text_sidebar" to="#">
                        <TbUsers /> For Communities
                      </Link>
                    </li>
                  </>
                )}
          
              </ul>
            </Col>
  )
}
