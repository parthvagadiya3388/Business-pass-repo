import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './header';
import { Alert, Button, Card, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { FaEye } from 'react-icons/fa';
import { TiEdit } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';
import { AiTwotoneDashboard } from 'react-icons/ai';
import { PiUsersThreeBold } from 'react-icons/pi';
import { TbUsers } from 'react-icons/tb';
import useUserStore from '../zustandstore/userApisStore';
import useUserEditStore from '../zustandstore/userEditstore';

export default function User() {
  const { users, error,selectedUser, userApis, deleteUserApis, setSelectedUser ,userUpdateApis } = useUserStore();
  const [searchInput, setSearchInput] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [actionType, setActionType] = useState<string>("");
  const { isEdit, setIsEdit } = useUserEditStore(); 

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
console.log("data---2-------------------",users);

  console.log("actionType***************",actionType)
  console.log("isEdit***************",isEdit);

  const handleClose = () => setShow(false);

  const handleShow = (user: any, action: string) => {
    setUserToDelete(user);
    setActionType(action);
    setShow(true);
  };

  useEffect(() => {
    if (token) {
      userApis(token);
    }
  }, [token, userApis]);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEdit(false);
    navigate('/createpage');
  };

  const handleAdd = () => {
    setIsEdit(true);
  };

  const handleDelete = async () => {
    if (token && userToDelete) {
      await deleteUserApis(token, userToDelete.id);
      setShow(false);
    }
  };

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
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                </div>
                <Button className='border_radias form-control Input_button_emp border_radius'>
                  <Link to='/createpage' className='text-white text-decoration-none link_tag' onClick={handleAdd}>Add User</Link>
                </Button>
              </Col>
            </div>
            <br />
            <div className="table-responsive">
              <table className="table table-hover w-100 table_Div table-striped">
                <thead className="thead-light">
                  <tr className='Table_header'>
                    <th className='align-content-center'>Name</th>
                    <th className='align-content-center'>Email</th>
                    <th className='align-content-center'>Country</th>
                    <th className='align-content-center'>Phone</th>
                    <th className='align-content-center'>Key</th>
                    <th className='align-content-center'>User Type</th>
                    <th className='align-content-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter((user) => {
                    const searchString = searchInput.toLowerCase();
                    return (
                      user.name.toLowerCase().includes(searchString) ||
                      user.email.toLowerCase().includes(searchString)
                    );
                  }).map((user, index) => (
                    <tr key={index}>
                      <td className='align-content-center'>{user.name}</td>
                      <td className='align-content-center'>{user.email}</td>
                      <td className='align-content-center'>{user.country}</td>
                      <td className='align-content-center'>{user.phone_number}</td>
                      <td className='align-content-center'>{user.id}</td>
                      <td className='align-content-center'>{user.user_type}</td>
                      <td className='align-content-center'>
                        <button className='border-0 bg-transparent text-dark' onClick={() => handleShow(user, 'invite')}>
                          <FaEye />
                        </button>
                        <button className='border-0 bg-transparent text-dark' onClick={() => handleEdit(user)}>
                          <TiEdit /> edit
                        </button>
                        <button className='border-0 bg-transparent text-dark' onClick={() => handleShow(user, 'delete')}>
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {error && <Alert variant="danger">{error}</Alert>}
            </div>
          </Col>

          <Modal show={show} onHide={handleClose}>
            <Card className="p-4 togl_card">
              <div className="d-flex">
                <Col md={10} className="p-0">
                  <h3><strong> {actionType === 'invite' ? 'Invite User' : 'Delete User'} </strong></h3>
                </Col>
                <Col md={2} className="text-end">
                  <button type="button" className="btn-close toggle_button m-2 ml-2" onClick={handleClose}></button>
                </Col>
              </div>
              <p>Are you sure you want to user?</p>
              <Table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{userToDelete?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userToDelete?.email}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{userToDelete?.country}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{userToDelete?.phone_number}</td>
                  </tr>
                  <tr>
                    <td>Id</td>
                    <td>{userToDelete?.id}</td>
                  </tr>
                  <tr>
                    <td>User Type</td>
                    <td>{userToDelete?.user_type}</td>
                  </tr>
                </tbody>
              </Table>
              <Col className="d-flex justify-content-end">
                <Button className="Submit_button border_radius bg-btn-outline-primary border-primary" variant="white" onClick={handleClose}>
                  Cancel
                </Button>
                <Button className={`Submit_button border_radius ml-2 ${actionType === 'invite' ? 'btn-primary' : 'btn-danger'}`} onClick={actionType === 'invite' ? handleClose : handleDelete}>
                  {actionType === 'invite' ? 'Invite' : 'Delete User'}
                </Button>
              </Col>
            </Card>
          </Modal>

        </Row>
      </Container>
    </div>
  );
}
