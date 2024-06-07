import { Link } from "react-router-dom";
import Header from "./header";
import { AiTwotoneDashboard } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { Card, Col, Container, InputGroup, Row, Form, Button } from "react-bootstrap";
import {  BsBagCheck } from "react-icons/bs";

export default function Createpage() {
  return (
    <>
      <Header/>
      <Container fluid>
        <Row>
          <Col md={3} className=''>
            <div className="Profile_Side_bar border_radias">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link  btn btn-primary radius text-start text-dark border_radius" to="#">
                    <AiTwotoneDashboard  className='' /> Dashboard
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
              </ul>
            </div>
          </Col>

          <Col className="bg-light align-content-center" md={9}>

                 <div className="d-flex justify-content-between pt-2 pb-2">
                     <h3>Users</h3>    
                    <Button className="Submit_button p-2 border_radius" variant="primary" type="submit">
                        <Link to='/userpage' className="w-100 text-white text-decoration-none">Back</Link>
                    </Button>
                </div>

            <Card className="bg-light p-4 border_radius">
              <Row>
              <p><BsBagCheck className="mb-2" /> <strong>Add user</strong></p>   
                <Form>
                    <div className="d-flex flex-wrap">

                   
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Name</strong>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        className="radius border_radius"
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={12}>
                   <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Email</strong>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        className="radius border_radius"
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                        <strong>Country</strong>
                        </Form.Label>
                        <InputGroup>
                        <Form.Control
                            className="radius border_radius"
                            type="text"
                            placeholder="Enter your Country"
                            id="Country"
                        />
                        </InputGroup>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                            <Form.Label>
                            <strong>Phone</strong>
                            </Form.Label>
                            <InputGroup>
                            <Form.Control
                                className="radius border_radius"
                                type="text"
                                placeholder="999XXXXXXX"
                                id="Phone"
                            />
                            </InputGroup>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                                <Form.Label>
                                <strong>Key</strong>
                                </Form.Label>
                                <InputGroup>
                                <Form.Control
                                    className="radius border_radius"
                                    type="text"
                                    placeholder="0"
                                    id="Key"
                                />
                                </InputGroup>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                                <Form.Label>
                                <strong>User Type</strong>
                                </Form.Label>
                                <InputGroup>
                                <Form.Control
                                    className="radius border_radius"
                                    type="text"
                                    placeholder="0"
                                    id="user"
                                />
                                </InputGroup>
                    </Form.Group>
                </Col>

                    <div className="container text-end">
                    <Button className="Submit_button p-2 border_radius" variant="primary" type="submit">
                        Create
                    </Button>
                    </div>
                    
                </div>

                </Form>

              </Row> 
            </Card>
          </Col>
        </Row> 
      </Container>
    </>
  );
}
