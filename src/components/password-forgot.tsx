import { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { Card, Col, Container, InputGroup, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./header";
import { AiTwotoneDashboard } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { API_URL } from "../config";
import { passwordChangeSchema } from "../validation/validation-schema";

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

export default function PasswordForgot() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      <Header />
      <Container>
        <Row>
          <Col className="d-flex justify-content-between mb-2">
            <h3>Personal information</h3>
            <Link to="/userpage"><Button className="bg-primary border_radius">Back</Button></Link>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="Profile_Side_bar border_radias">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link btn btn-primary radius text-start text-dark border_radius" to="#">
                  <AiTwotoneDashboard className='' /> Personal Information
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active btn btn-primary radius text-start text-white border_radius" to="#">
                  <RiLockPasswordFill /> Change Password
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark btn btn-primary radius text-start text-dark border_radius" to="#">
                  <PiUsersThreeBold /> Delete Account
                </Link>
              </li>
            </ul>
          </Col>

          <Col className="bg-light align-content-center" md={9}>
            <Card className="bg-light p-4 border_radius">
              <Row>
                <h4><RiLockPasswordFill className="mb-2" /> <strong>Change Password</strong></h4>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="d-flex flex-wrap">
                    <Col md={12}>
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

                    <Col md={12}>
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

                    <Col md={12}>
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

                        {error && <Col className="text-danger mt-2 p-0">{error}</Col>}
                        {success && <Col className="text-success mt-2">{success}</Col>}
              
                    <Col className="container text-end mt-2">
                      <Button className="Submit_button p-2 border_radius" variant="primary" type="submit">
                        Update
                      </Button>
                    </Col>
                    
                  </Row>
                </Form>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
