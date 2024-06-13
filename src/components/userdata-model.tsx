import { Col , Button, Card, Form, InputGroup } from "react-bootstrap";
import { FiLock, FiMail } from "react-icons/fi";

export default function Usermodel() {
  return (
    <div>
       {/* <Modal show={show}> */}
        <Card className="p-4 togl_card">
          <div className="d-flex">
              <Col md={10} className="p-0">
                <h2><strong>Explore Membership</strong></h2>
              </Col>
              <Col md={2} className="text-end">
                <button type="button" className="btn-close toggle_button m-2 ml-2"></button>
              </Col>
          </div>
          <p>Please Enter Your Details</p>
          <Form className="">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label><strong>Email</strong></Form.Label>
              <InputGroup>
                <InputGroup.Text><FiMail /></InputGroup.Text>
                <Form.Control type="email" placeholder="Enter email" />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><strong>Password</strong></Form.Label>
              <InputGroup>
                <InputGroup.Text><FiLock /></InputGroup.Text>
                <Form.Control type="password" placeholder="Password" />
              </InputGroup>
            </Form.Group>
          </Form>
          
            <p>Please Enter Your Details</p> 
          <Form className="d-flex justify-content-between">
              <Form.Check  label="Service" id="servicecheckBox"/>
              <Form.Check  label="Fund" id="fundcheckBox"/>
              <Form.Check  label="Detail" id="detailcheckBox"/>
          </Form><br />

          <Button className="Submit_button" variant="primary" type="submit">
            Submit
          </Button>
        </Card>
      {/* </Modal> */}
    </div>
  )
}
