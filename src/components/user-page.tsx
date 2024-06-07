import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaEye } from 'react-icons/fa';
import { TiEdit } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';
import { AiTwotoneDashboard } from 'react-icons/ai';
import { PiUsersThreeBold } from 'react-icons/pi';
import { TbUsers } from 'react-icons/tb';
import axios from 'axios';

interface Users {
  name: string;
  email: string;
  country: string;
  phone: number;
  key: number;
  usertype: string;
  status: string;
}

export default function User() {
  const [userdatas, setUserdatas] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://192.168.1.17:3000/api/users/");
        console.log("===================" , response);
        setUserdatas(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Container fluid className=''>
        <Row>
          <Col md={3} className=''>
            <div className="Profile_Side_bar border_radias">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary radius text-start text-dark border_radius" to="#">
                    <AiTwotoneDashboard className='' /> Dashboard
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

          <Col className="wlc_card bg-light" md={9}>
            <div className='main_card List_card d-flex justify-content-between flex-wrap'>
              <Col md={5} sm={12} className='Employr_title p-0 align-content-center'>
                <h4> Users</h4>
              </Col>
              <Col md={7} sm={12} className='d-flex justify-content-between flex-wrap w-100 p-0 mt-2'>
                <div className="form-group has-search Input_button_emp">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search User..."
                  />
                </div>
                <Button className='border_radias form-control Input_button_emp border_radius'>
                  <Link to='/createpage' className='text-white text-decoration-none link_tag'>Add User</Link>
                </Button>
              </Col>
            </div>
            <br />
            <div className="table-responsive">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <table className="table table-hover w-100 table_Div table-striped">
                  <thead className="thead-light">
                    <tr className='Table_header'>
                      <th className='align-content-center'>Name</th>
                      <th className='align-content-center'>Email</th>
                      <th className='align-content-center'>Country</th>
                      <th className='align-content-center'>Phone</th>
                      <th className='align-content-center'>Key</th>
                      <th className='align-content-center'>User Type</th>
                      <th className='align-content-center'>Status</th>
                      <th className='align-content-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userdatas.map((user, index) => (
                      <tr key={index}>
                        <td className='align-content-center'>{user.name}</td>
                        <td className='align-content-center'>{user.email}</td>
                        <td className='align-content-center'>{user.country}</td>
                        <td className='align-content-center'>{user.phone}</td>
                        <td className='align-content-center'>{user.key}</td>
                        <td className='align-content-center'>{user.usertype}</td>
                        <td className='align-content-center'>
                          <button className={`badge p-2 ${user.status === 'Deleted' ? 'btn-outline-danger status_delete' : 'btn-outline-success status_active'}`}>
                            {user.status}
                          </button>
                        </td>
                        <td className='align-content-center'>
                          <button className='border-0 bg-transparent text-dark'>
                            <FaEye />
                          </button>
                          <button className='border-0 bg-transparent text-dark'>
                            <TiEdit />
                          </button>
                          <button className='border-0 bg-transparent text-dark'>
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
