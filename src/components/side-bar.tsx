import { Link } from "react-router-dom";
import { AiTwotoneDashboard } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { Col } from "react-bootstrap";


export default function Sidebar() {
  return (
    <Col className="Profile_Side_bar border_radias p-0">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary radius text-start border_radius text_sidebar" to="#">
                    <AiTwotoneDashboard className='' /> Dashboard
                  </Link>
                </li>
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
          
              </ul>
            </Col>
  )
}
