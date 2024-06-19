import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Container, InputGroup, Row, Form, Button } from "react-bootstrap";
import { BsBagCheck } from "react-icons/bs";
import { API_URL } from "../config";
import { useFormik, FormikHelpers } from "formik";
import schema from "../validation/validation-schema";
import Header from "./header";
import Sidebar from "./side-bar";
import useUserStore from "../zustandstore/userApisStore";

interface FormValues {
  name: string;
  email: string;
  country: string;
  phone_number: string;
  key: string;
  user_type: string;
  password: string;
  confirm_password: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  country: "IN",
  phone_number: "",
  key: "",
  user_type: "Business",
  password: "",
  confirm_password: "",
};

export default function CreatePage() {
  const [error, setError] = useState({} as Record<string, string>);
  const navigate = useNavigate();
  const { selectedUser , clearSelectedUser } = useUserStore();

  console.log("selectUser---" , selectedUser);

  const formik = useFormik<FormValues>({
    initialValues: selectedUser || initialValues,
    validationSchema: schema,
    onSubmit: async (values, { resetForm }: FormikHelpers<FormValues>) => {
      try {
        const token = localStorage.getItem('token');
        const url = selectedUser ? `${API_URL}/users/${selectedUser.id}/` : `${API_URL}/users/`;
        const method = selectedUser ? 'PATCH' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (response.status === 400) {
          const errorData = await response.json();
          setError(errorData.errors);
          return;
        }

        resetForm();
        if (selectedUser) {
          clearSelectedUser();
        }
        navigate('/userpage');
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  useEffect(() => {
    if (selectedUser) {
      formik.setValues(selectedUser);
    }
  }, [selectedUser]);

  return (
    <>
      <Header />  
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
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
                <p><BsBagCheck className="mb-2" /> <strong>{selectedUser ? 'Update User' : 'Create User'}</strong></p>   
                <Form onSubmit={formik.handleSubmit}>
                  <div className="d-flex flex-wrap">
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>Name</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.name && formik.errors.name ? 'border-danger' : ''}`}
                            type="text"
                            placeholder="Enter your name"
                            id="name"
                            {...formik.getFieldProps('name')}
                          />
                        </InputGroup>
                        {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
                        {error && <div className="text-danger">{error.name}</div>}
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>Email</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.email && formik.errors.email ? 'border-danger' : ''}`}
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            {...formik.getFieldProps('email')}
                          />
                        </InputGroup>
                        {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                        {error && <div className="text-danger">{error.email}</div>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Label><strong>Country</strong></Form.Label>
                      <select
                        className={`form-select radius border_radius ${formik.touched.country && formik.errors.country ? 'border-danger' : ''}`}
                        id="country"
                        {...formik.getFieldProps('country')}
                      >
                        <option value="">Select your Country</option>
                        <option value="IN">IN</option>
                        <option value="USA">USA</option>
                      </select>
                      {formik.touched.country && formik.errors.country && <div className="text-danger">{formik.errors.country}</div>}
                      {error && <div className="text-danger">{error.country}</div>}
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>Phone</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.phone_number && formik.errors.phone_number ? 'border-danger' : ''}`}
                            type="text"
                            placeholder="999XXXXXXX"
                            id="phone_number"
                            {...formik.getFieldProps('phone_number')}
                          />
                        </InputGroup>
                        {formik.touched.phone_number && formik.errors.phone_number && <div className="text-danger">{formik.errors.phone_number}</div>}
                        {error && <div className="text-danger">{error.phone_number}</div>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>Key</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.key && formik.errors.key ? 'border-danger' : ''}`}
                            type="text"
                            placeholder="0"
                            id="key"
                            {...formik.getFieldProps('key')}
                          />
                        </InputGroup>
                        {formik.touched.key && formik.errors.key && <div className="text-danger">{formik.errors.key}</div>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Label><strong>User Type</strong></Form.Label>
                      <select
                        className={`form-select radius border_radius ${formik.touched.user_type && formik.errors.user_type ? 'border-danger' : ''}`}
                        id="user_type"
                        {...formik.getFieldProps('user_type')}
                      >
                        <option value="">Select user type</option>
                        <option value="Business">Business</option>
                        <option value="Personal">Personal</option>
                      </select>
                      {formik.touched.user_type && formik.errors.user_type && <div className="text-danger">{formik.errors.user_type}</div>}
                      {error && <div className="text-danger">{error.user_type}</div>}
                    </Col>

                    <Col md={6}>
                      <Form.Group >
                        <Form.Label><strong>Password</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.password && formik.errors.password ? 'border-danger' : ''}`}
                            type="password"
                            placeholder="Enter your password"
                            id="password"
                            {...formik.getFieldProps('password')}
                          />
                        </InputGroup>
                        {formik.touched.password && formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group >
                        <Form.Label><strong>Confirm Password</strong></Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={`radius border_radius ${formik.touched.confirm_password && formik.errors.confirm_password ? 'border-danger' : ''}`}
                            type="password"
                            placeholder="Enter your password"
                            id="confirm_password"
                            {...formik.getFieldProps('confirm_password')}
                          />
                        </InputGroup>
                        {formik.touched.confirm_password && formik.errors.confirm_password && <div className="text-danger">{formik.errors.confirm_password}</div>}
                      </Form.Group>
                    </Col>

                    <div className="container text-end">
                      <Button className="Submit_button p-2 border_radius" variant="primary" type="submit">
                        {selectedUser ? 'Update' : 'Create'}
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
