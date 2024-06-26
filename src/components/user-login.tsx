import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser } from "react-icons/fi";
import Mainheader from "./main-header";
import img1 from '../assets/images/cofee.jpg';
import { Button, Card, Col, Container, Form, Image, Row, InputGroup, Alert } from "react-bootstrap";
import useLoginStore from '../zustandstore/loginApiStore';
import useUserStore from '../zustandstore/userApisStore';

export default function Loginpage() {
  const navigate = useNavigate();
  const {
    username_or_email,
    password,
    error,
    usernameError,
    passwordError,
    setUsernameOrEmail,
    setPassword,
    login
  } = useLoginStore();
  const { users } = useUserStore();

  console.log("******************************************",users);

  // console.log(" //////////////////////////",username_or_email , password , error , usernameError , passwordError );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(navigate);
  };

  return (
    <Col>
      <Mainheader />
      <Container fluid>
        <Row>
          <Col className="p-4 wlc_card" sm={12} md={12} lg={5}>
            <Card className="p-4 main_card">
              <h2><strong>Welcome Back</strong></h2>
              <p>Please Enter Your Details</p>
              <Col className="d-flex">
                <Button className="col-6 button bg-light text-dark Submit_button border-0 btn-outline-primary">
                  <label className="w-100 h-100 mt-1 bussines_button">
                    <input type="radio" name="for" defaultChecked /> For Business
                  </label>
                </Button>
                <Button className="col-6 button ml-1 bg-light text-dark Submit_button border-0">
                  <label className="w-100 h-100 mt-1 enq_button">
                    <input type="radio" name="for" /> For Enquiry
                  </label>
                </Button>
              </Col>
              <br />
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label><strong>Username</strong></Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FiUser /></InputGroup.Text>
                    <Form.Control
                      className="radius"
                      type="text"
                      placeholder="Enter Your Username"
                      value={username_or_email}
                      autoComplete="username"
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                  </InputGroup>
                  {usernameError && <Col className='text-danger p-0'>{usernameError}</Col>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label><strong>Password</strong></Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FiLock /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  {passwordError && <Col className='text-danger p-0'>{passwordError}</Col>}
                </Form.Group>

                <Button className="Submit_button w-100" variant="primary" type="submit">
                  Gate Access
                </Button>
              </Form>
            </Card>
          </Col>

          <Col sm={12} md={12} lg={7} className="object-fit-cover">
            <Image className="Wel_img w-100 h-100" src={img1} />
          </Col>
        </Row>
      </Container>
    </Col>
  );
}
