import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import { AiTwotoneDashboard } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { Card, Col, Container, InputGroup, Row, Form, Button } from "react-bootstrap";
import { BsBagCheck } from "react-icons/bs";

export default function Createpage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [key, setKey] = useState('');
  const [user_type, setUser_type] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email, country, phone_number, key, user_type };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://192.168.1.17:3000/api/users/', {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
          });

        console.log("create responce--------------",response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.error('Error:', error);

    }
  };

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col md={3} className="">
            <div className="Profile_Side_bar border_radias">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary radius text-start text-dark border_radius" to="#">
                    <AiTwotoneDashboard className="" /> Dashboard
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
              <Button className="Submit_button p-2 border_radius" variant="primary">
                <Link to='/userpage' className="w-100 text-white text-decoration-none">Back</Link>
              </Button>
            </div>

            <Card className="bg-light p-4 border_radius">
              <Row>
                <p><BsBagCheck className="mb-2" /> <strong>Add user</strong></p>   
                <Form onSubmit={handleSubmit}>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
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
                            id="phone"
                            value={phone_number}
                            onChange={(e) => setPhone_number(e.target.value)}
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
                            id="key"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        <strong>User Type</strong>
                      </Form.Label>
                      <select
                        className="form-select border_radius"
                        value={user_type}
                        onChange={(e) => setUser_type(e.target.value)}
                      >
                        <option value="Business">Business</option>
                        <option value="Personal">Personal</option>
                      </select>
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
