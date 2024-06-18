import { Link } from "react-router-dom";
import Header from "./header";
import { AiTwotoneDashboard } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { Card, Col, Container, InputGroup, Row, Form, Button } from "react-bootstrap";
import { BsBagCheck } from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../zustandstore/userApisStore';

interface FormValues {
    name: string;
    email: string;
    country: string;
    phone_number: string;
    key: string;
    user_type: string;
    password: any;
    confirm_password: any;
  }

  const initialValues: FormValues = {
    name: "",
    email: "",
    country: "",
    phone_number: "",
    key: "",
    user_type: "",
    password: "",
    confirm_password: "",
  };


export default function UpdatePagee() {

    const { selectedUser, userUpdateApis, clearSelectedUser } = useUserStore();
    const [formData, setFormData] = useState<FormValues>(selectedUser || initialValues);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // console.log("selesctuser update------------",selectedUser);

    useEffect(() => {
        if (!selectedUser) {
          navigate('/userpage');
        }
      }, [selectedUser, navigate]);
    
      const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token && selectedUser) {
          try {
            await userUpdateApis(token, selectedUser.id, formData);
            clearSelectedUser();
            navigate('/userpage');
          } catch (error) {
            setError('Failed to update user');
          }
        }
      };
  
  return (
    <>
      <Header />  
      <div className="server_error"> </div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="Profile_Side_bar border_radius">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary radius text-start text-dark border_radius" to="#">
                    <AiTwotoneDashboard /> Dashboard
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
                <p><BsBagCheck className="mb-2" /> <strong>Update User</strong></p>   
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex flex-wrap">
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <strong>Name</strong>
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius`}
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            />
                            {error && <div className="text-danger">{error.name}</div>}
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
                            className={`radius border_radius`}
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        <strong>Country</strong>
                      </Form.Label>
                      <select
                        className={`form-select radius border_radius`}
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select your Country</option>
                        <option value="IN">IN</option>
                        <option value="USA">USA</option>
                      </select>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <strong>Phone</strong>
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius`}
                            type="text"
                            placeholder="999XXXXXXX"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
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
                            className={`radius border_radius`}
                            type="text"
                            placeholder="0"
                            name="key"
                            value={formData.key}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        <strong>User Type</strong>
                      </Form.Label>
                      <select
                        className={`form-select radius border_radius`}
                        name="user_type"
                        value={formData.user_type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select user type</option>
                        <option value="Business">Business</option>
                        <option value="Personal">Personal</option>
                      </select>
                    </Col>

                    {/* <Col md={6}>
                      <Form.Group >
                        <Form.Label>
                          <strong>Password</strong>
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius`}
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>
                          <strong>Confirm Password</strong>
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius`}
                            type="password"
                            placeholder="Enter your password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col> */}

                    <div className="container text-end">
                      <Button className="Submit_button p-2 border_radius" variant="primary" type="submit">
                      Update
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
