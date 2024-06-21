import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Container, InputGroup, Row, Form, Button } from "react-bootstrap";
import { BsBagCheck } from "react-icons/bs";
import { API_URL } from "../config";
import { useFormik, FormikHelpers } from "formik";
import Header from "./header";
import Sidebar from "./side-bar";
import useUserStore from "../zustandstore/userApisStore";
import { schema } from "../validation/validation-schema";

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

const SELECTED_USER_STORAGE_KEY = "selectedUser";

export default function CreatePage() {
  const [error, setError] = useState({} as Record<string, string>);
  const navigate = useNavigate();
  const { selectedUser, clearSelectedUser, setSelectedUser } = useUserStore();

  console.log("selectUser---", selectedUser);

  const formik = useFormik<FormValues>({
    initialValues: selectedUser ? { ...selectedUser, password: "", confirm_password: "" } : initialValues,
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
    const savedSelectedUser = localStorage.getItem(SELECTED_USER_STORAGE_KEY);
    if (savedSelectedUser) {
      const parsedUser = JSON.parse(savedSelectedUser);
      if (!selectedUser || JSON.stringify(selectedUser) !== JSON.stringify(parsedUser)) {
        formik.setValues({ ...parsedUser, password: "", confirm_password: "" });
        setSelectedUser(parsedUser); 
      }
    } else {
      if (selectedUser) {
        localStorage.setItem(SELECTED_USER_STORAGE_KEY, JSON.stringify(selectedUser));
      } else {
        localStorage.removeItem(SELECTED_USER_STORAGE_KEY);
      }
    }
  }, [selectedUser, setSelectedUser]);

  return (
    <>
      <Header />  
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>

          <Col className="bg-light align-content-center" md={9}>
            <Col className="d-flex justify-content-between pt-2 pb-2">
              <h3>Users</h3>
              <Button className="Submit_button p-2 border_radius" variant="primary">
                <Link to='/userpage' className="w-100 text-white text-decoration-none">Back</Link>
              </Button>
            </Col>

            <Card className="bg-light p-4 border_radius">
              <Row>
                <p><BsBagCheck className="mb-2" /> <strong>
                  {selectedUser ? 'Update User' : 'Create User'}
                  </strong></p>   
                <Form onSubmit={formik.handleSubmit}>
                  <Col className="d-flex flex-wrap">
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
                        {formik.touched.name && formik.errors.name && <Col className="text-danger p-0">{formik.errors.name}</Col>}
                        {error.name && <Col className="text-danger">{error.name}</Col>}
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
                        {formik.touched.email && formik.errors.email && <Col className="text-danger p-0">{formik.errors.email}</Col>}
                        {error.email && <Col className="text-danger">{error.email}</Col>}
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
                      {formik.touched.country && formik.errors.country && <Col className="text-danger p-0">{formik.errors.country}</Col>}
                      {error.country && <Col className="text-danger p-0">{error.country}</Col>}
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
                        {formik.touched.phone_number && formik.errors.phone_number && <Col className="text-danger p-0">{formik.errors.phone_number}</Col>}
                        {error.phone_number && <Col className="text-danger p-0">{error.phone_number}</Col>}
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
                        {formik.touched.key && formik.errors.key && <Col className="text-danger p-0">{formik.errors.key}</Col>}
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
                      {formik.touched.user_type && formik.errors.user_type && <Col className="text-danger p-0">{formik.errors.user_type}</Col>}
                      {error.user_type && <Col className="text-danger p-0">{error.user_type}</Col>}
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
                        {formik.touched.password && formik.errors.password && <Col className="text-danger p-0">{formik.errors.password}</Col>}
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
                        {formik.touched.confirm_password && formik.errors.confirm_password && <Col className="text-danger p-0">{formik.errors.confirm_password}</Col>}
                      </Form.Group>
                    </Col> 

                    <Col className="container text-end mt-2">
                      <Button className="Submit_button p-2 border_radius" variant="primary" type="submit">
                        {selectedUser ? 'Update' : 'Create'}
                      </Button>
                    </Col>
                  </Col>
                </Form>
              </Row>
            </Card>
          </Col>
        </Row> 
      </Container>
    </>
  );
}
