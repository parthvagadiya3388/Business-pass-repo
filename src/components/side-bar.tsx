import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../zustandstore/loginApiStore";
import { AiTwotoneDashboard } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export default function Sidebar() {
    const { logout } = useLoginStore();
    const navigate = useNavigate();
    const [show, setShow] = useState<boolean>(false);


    const handleLogout = () => {
        logout();
        navigate('/login');
      };    

    const handleShow = () => {
        setShow(true); 
    };

    const handleClose = () => {
        setShow(false);
    };

  return (
    <div className="Profile_Side_bar border_radias">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary radius text-start text-dark border_radius" to="#">
                    <AiTwotoneDashboard className='' /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active btn btn-primary radius text-start text-white border_radius" to="#">
                    <PiUsersThreeBold /> Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark btn btn-primary radius text-start text-dark border_radius" to="#">
                    <PiUsersThreeBold /> Activate accounts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark btn btn-primary radius text-start border_radius" to="#">
                    <TbUsers /> Explore membership
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark btn btn-primary radius text-start border_radius" to="#">
                    <TbUsers /> For Workspaces
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark btn btn-primary radius text-start border_radius" to="#">
                    <TbUsers /> For Communities
                  </Link>
                </li>
                <li className="nav-item">
                  <Button className="w-100 nav-link text-dark btn btn-primary radius text-start border_radius" onClick={() => handleShow()}>
                    <TbUsers /> Log out
                  </Button>
                </li>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Logout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to log out?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Modal.Footer>
                </Modal>

              </ul>
            </div>
  )
}
