import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Dropdown, Modal } from "react-bootstrap";
import img4 from "../assets/images/profile.jpeg";
import useLoginStore from "../zustandstore/loginApiStore";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useLoginStore();
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <Container>
        <Row className="align-items-center d-flex flex-wrap pt-2">
          <Col xs={6}>
            <h4 className="d-inline-block">
              <NavLink className="navbar-brand" to="/">
                <strong>
                  <i className="fa-solid fa-film text-primary"></i> BusinessPass
                </strong>
              </NavLink>
            </h4>
          </Col>

          <Col
            xs={6}
            className="text-end d-flex justify-content-end align-items-center p-0"
          >
            <Dropdown show={showDropdown} onToggle={toggleDropdown}>
              <Dropdown.Toggle
                as={Button}
                variant="white"
                className="text-dark border-0 d-flex align-items-center p-0"
              >
                <img
                  src={img4}
                  alt="Profile"
                  className="rounded-circle"
                  width="40"
                />
                <span className="ms-1 me-0">Admin_1</span>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end" className="mt-2 border_radius">
                <Dropdown.Item
                  as={NavLink}
                  to="/personalinfo"
                  className="d-flex align-items-center"
                >
                  <FaUserEdit className="me-2" /> Edit Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={handleShow}
                  className="d-flex align-items-center text-danger"
                >
                  <FaSignOutAlt className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

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
      <hr />
    </>
  );
};

export default Header;
