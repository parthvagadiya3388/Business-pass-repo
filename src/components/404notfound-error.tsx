import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <Col className="text-center p-5">
      <h1 className="text-danger">404</h1>
      <h2>Not your usual ‘Oops, page not found!’</h2>
      <Link to='/login'>
            <Button variant="dark">
                Dashboard
            </Button>
      </Link>
    </Col>
  )
}
