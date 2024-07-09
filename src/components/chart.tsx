import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './side-bar';
import Header from './header';
import { Helmet } from 'react-helmet-async';
import { ChartData } from './chart-data';


const Chart = () => {

    return (
        <>
        <Col>   
            <Helmet>
                <title>Chart</title>
            </Helmet>
            <Header/>
      <Container>
        <Row>
          <Col md={3} className=''>
            <Sidebar />
          </Col>

          <Col className="wlc_card bg-light" md={9}>
            <h2>User Data</h2>
            <Col className='table-responsive p-0'>
                        <table className="table table-hover w-100 table_Div table-striped">
                            <thead className='thead-light'>
                                <tr className='Table_header'>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ChartData.map((user) => (
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>{user.country}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                   </Col>
          
          </Col>

         
        </Row>
      </Container>
    </Col>
        </>
    );
};

export default Chart;
