import { useEffect, useState } from "react";
import img4 from '../assets/images/profile.jpeg';
import { useFormik, FormikHelpers } from "formik";
import { Card, Col, Container, InputGroup, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./header";
import { AiTwotoneDashboard } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { API_URL } from "../config";
import { passwordChangeSchema } from "../validation/validation-schema";
import { MdEmail, MdOutlineDeleteOutline } from "react-icons/md";
import {FaBusinessTime, FaPhoneAlt, FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Helmet } from "react-helmet-async";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Personalinfo() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeSection, setActiveSection] = useState("personalInformation");
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
  const [country, setCountry] = useState(localStorage.getItem('country') || '');
  const [user_type, setUser_type] = useState(localStorage.getItem('user_type') || '');

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: passwordChangeSchema,
    onSubmit: async (values, { resetForm }: FormikHelpers<FormValues>) => {
        
      setError("");
      setSuccess("");

      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/change-password/`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            old_password: values.oldPassword,
            new_password: values.newPassword,
            confirm_password: values.confirmPassword
          }),
        });

        const data = await response.json();


        if (response.ok) {
          setSuccess("Password changed successfully");
          resetForm();
        } else {
          setError(data.error || "Old password is Incorrect.");
        }
      } catch (error) {
        setError("An error occurred");
      }
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success) {
      timer = setTimeout(() => {
        setSuccess("");
      }, 2000); 
    }
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <>  
       <Helmet>
          <title>{activeSection === "personalInformation"  ? "Personal Information" : "Change Password"}</title>
      </Helmet>

      <Header />
      <Container>
        <Row>
          <Col className="d-flex justify-content-between mb-2">
            <h3>Personal information</h3>
            <Link to="/userlist"><Button className="bg-primary border_radius">Back</Button></Link>
          </Col>
        </Row>    
        <Row>
          <Col md={3} className="Profile_Side_bar border_radias">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className={`nav-link  btn btn-primary radius text-start border_radius ${activeSection === "personalInformation" ? "active btn-primary text-white bg-primary" : "text_sidebar"}`} to="#" onClick={() => setActiveSection("personalInformation")}>
                  <AiTwotoneDashboard className=''/> Personal Information
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link  btn btn-primary radius text-start border_radius ${activeSection === "changePassword" ? "active btn-primary text-white bg-primary" : "text_sidebar"}`} to="#" onClick={() => setActiveSection("changePassword")}>
                  <RiLockPasswordFill  /> Change Password
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  btn btn-primary radius text-start text_sidebar border_radius" to="#">
                  <PiUsersThreeBold /> Delete Account
                </Link>
              </li>
            </ul>
          </Col>


        {activeSection === 'changePassword' && (
          <Col className="align-content-center col_1" md={9}>
            <Card className="p-4 border_radius">
              <Row>
                <h4><RiLockPasswordFill className="mb-2" /> <strong>Change Password</strong></h4>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="d-flex flex-wrap">
                    <Col md={7}>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>Current Password</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.oldPassword && formik.errors.oldPassword ? 'border-danger' : ''}`}
                            type="password"
                            placeholder="Enter Current Password"
                            id="oldPassword"
                            {...formik.getFieldProps('oldPassword')}
                          />
                        </InputGroup>
                        {formik.touched.oldPassword && formik.errors.oldPassword && <Col className="text-danger p-0">{formik.errors.oldPassword}</Col>}
                      </Form.Group>
                    </Col>

                    <Col md={7}>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>New Password</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.newPassword && formik.errors.newPassword ? 'border-danger' : ''}`}
                            type="password"
                            placeholder="Enter New Password"
                            id="newPassword"
                            {...formik.getFieldProps('newPassword')}
                          />
                        </InputGroup>
                        {formik.touched.newPassword && formik.errors.newPassword && <Col className="text-danger p-0">{formik.errors.newPassword}</Col>}
                      </Form.Group>
                    </Col>

                    <Col md={7}>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>Re-enter New Password</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-danger' : ''}`}
                            type="password"
                            placeholder="Re-enter New Password"
                            id="confirmPassword"
                            {...formik.getFieldProps('confirmPassword')}
                          />
                        </InputGroup>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <Col className="text-danger p-0">{formik.errors.confirmPassword}</Col>}
                      </Form.Group>
                    </Col>

                        {error && <Col md={7} className="text-danger mt-2 p-0">{error}</Col>}
                        {success && <Col md={7} className="text-success mt-2">{success}</Col>}
              
                    
                  </Row>
                    <Col className="container text-end mt-2">
                      <Button className="Submit_button p-2 border_radius" variant="primary" type="submit">
                        Update
                      </Button>
                    </Col>
                </Form>
              </Row>
            </Card>
          </Col>
        )}

        {activeSection === 'personalInformation' && (
           <Col className="wlc_card align-content-center" md={9}>
            <Card className="p-4 main_card border_radius">
              <h4 className="container">
                <strong>
                  <CiUser className='mb-1' /> Personal Information
                </strong>
              </h4>
              <div className='d-flex flex-wrap product_card_body_div pt-2'>
                <div className='col-sm-4 pl-0 pr-0 text-center rounded-circle Product_imag_profile'>
                  <img src={img4} className="w-100 h-100 rounded-circle object-fit-cover" alt="Profile" />
                </div>
                <div className="card-body col-sm-8">
                  <Col className="d-flex justify-content-between align-items-center p-0">
                    <h4 className="card-title Prof_name">{username}</h4>
                  </Col>
                  <p className="card-text p-0 m-0 Prof_compnay_name">{country}</p> <br />
                  <div className='Profile_button_div'>
                    <a href="#" className="btn btn-light btn-outline-primary border_radius">
                      <MdOutlineDeleteOutline /> Change
                    </a>
                    <a href="#" className="btn btn-light btn-outline-primary border_radius ml-2">
                      <CiUser /> Remove
                    </a>
                  </div>
                </div>
              </div>

              <Form>
                <div className="d-flex flex-wrap pt-2">
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>Name</strong>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="border_radius">
                          <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                          className="border_radius"
                          type="text"
                          placeholder="Enter your Name"
                          id="firstname"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
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
                        <InputGroup.Text className="border_radius">
                          <MdEmail />
                        </InputGroup.Text>
                        <Form.Control
                          className="border_radius"
                          type="email"
                          placeholder="Enter your Email"
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
                        <strong>Phone</strong>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="border_radius">
                          <FaPhoneAlt />
                        </InputGroup.Text>
                        <Form.Control
                          className="border_radius"
                          type="text"
                          placeholder="Enter your Phone"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>User type</strong>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="border_radius">
                          <FaBusinessTime />
                        </InputGroup.Text>
                        <Form.Control
                          className="border_radius"
                          type="text"
                          placeholder="Enter your Usertype"
                          id="user_type"
                          value={user_type}
                          onChange={(e) => setUser_type(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

            
                </div>
                <div className="container text-end">
                  <Button className="Submit_button border_radius" variant="primary">
                    Update
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        )}


        </Row>
      </Container>
    </>
  );
}
