import React from "react";
import {  NavLink } from "react-router-dom";
import { Button, Col, Container , Row} from 'react-bootstrap';
import { FaCaretDown } from "react-icons/fa";
import img4 from '../assets/images/profile.jpeg'; 

const Header: React.FC = () => {
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
          <Col xs={6} className="text-end d-flex justify-content-end align-items-center p-0">
            <img src={img4} alt="Profile" className="rounded-circle" width="40" />
            <span className="ms-1 me-0">Admin_1</span>
            <Button className="bg-white text-dark border-0">
              <FaCaretDown />
            </Button>
          </Col>
        </Row>

      </Container><hr />
    </>
  );
};

export default Header;
