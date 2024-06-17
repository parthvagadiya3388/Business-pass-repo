import { Col , Button, Card , Table } from "react-bootstrap";

export default function Usermodel() {

  
  return (
    <div>
       {/* <Modal show={show}> */}
        <Card className="p-4 togl_card">
          <div className="d-flex">
              <Col md={10} className="p-0">
                <h3><strong> Delete User </strong></h3>
              </Col>
              <Col md={2} className="text-end">
                <button type="button" className="btn-close toggle_button m-2 ml-2"></button>
              </Col>
          </div>
          <p>Are you sure you want to delete this user?</p>
        
            <Table>
                  <tr>
                    <td>Name</td>
                    <td>willam</td>
                  </tr>
            </Table>
       
          <Col className="d-flex justify-content-end">
            <Button className="Submit_button border_radius bg-btn-outline-primary border-primary" variant="white" type="submit">
              Cencel
            </Button>
            <Button className="Submit_button border_radius ml-2" variant="danger" type="submit">
              Delete User  
            </Button>
          </Col>
        </Card>
      {/* </Modal> */}
    </div>
  )
}
