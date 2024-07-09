import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './header';
import { Alert, Button, Card, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { FaEye } from 'react-icons/fa';
import { TiEdit } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';
import useUserStore from '../zustandstore/userApisStore';
import Sidebar from './side-bar';
import { Helmet } from 'react-helmet-async';
import ReactPaginate from 'react-paginate';

export default function Userlist() {
  const { users, error, userApis, deleteUserApis, setSelectedUser } = useUserStore();
  const [searchInput, setSearchInput] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [actionType, setActionType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
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
    setCurrentPage(0); 
  };

  const handleEdit = (user: any) => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    setSelectedUser(user);
    navigate('/adduser');
  };

  const handleDelete = async () => {
    if (token && userToDelete) {
      await deleteUserApis(token, userToDelete.id);
      setShow(false);
    }
  };

  const handleAdd = () => {
    localStorage.removeItem("selectedUser"); 
    setSelectedUser(null); 
    navigate('/adduser');
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const filteredUsers = users.filter((user) => {
    const searchString = searchInput.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(searchString)) ||
      (user.email && user.email.toLowerCase().includes(searchString))
    );
  });

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + itemsPerPage);

  console.log("cuurentpage" , currentPage)
  console.log("itemperpage" , itemsPerPage)
  console.log("pagecount" , pageCount)
  console.log("offset" , offset)
  console.log("current user" , currentUsers)

  return (
    <Col>
      <Helmet>
        <title>Users</title>
      </Helmet>
      
      <Header />
      <Container>
        <Row>
          <Col md={3} className=''>
            <Sidebar />
          </Col>

          <Col className="wlc_card bg-light" md={9}>
            <Col className='main_card List_card d-flex justify-content-between flex-wrap p-0'>
              <Col md={5} sm={12} className='Employr_title p-0 align-content-center'>
                <h4> Users</h4>
              </Col>
              <Col md={7} sm={12} className='d-flex justify-content-between flex-wrap w-100 p-0 mt-2'>
                <Col className="form-group has-search Input_button_emp p-0 mr-1">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search User..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                </Col>
                <Button className='border_radias form-control Input_button_emp border_radius' onClick={handleAdd}>
                  <Link to='/adduser' className='text-white text-decoration-none link_tag'>Add User</Link>
                </Button>
              </Col>
            </Col>
            <br />
            <Col className="table-responsive p-0">
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
                  {currentUsers.map((user, index) => (
                    <tr key={index}>
                      <td className='align-content-center'>{user.name}</td>
                      <td className='align-content-center'>{user.email}</td>
                      <td className='align-content-center'>{user.country}</td>
                      <td className='align-content-center'>{user.phone_number}</td>
                      <td className='align-content-center'>{user.key}</td>
                      <td className='align-content-center'>{user.user_type}</td>
                      <td className='align-content-center'>
                        <button className='border-0 bg-transparent text-dark' onClick={() => handleShow(user, 'invite')}>
                          <FaEye />
                        </button>
                        <button className='border-0 bg-transparent text-dark' onClick={() => handleEdit(user)}>
                          <TiEdit />
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
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
                disabledClassName={'disabled'}
              />
            </Col>
          </Col>

          <Modal show={show} onHide={handleClose}>
            <Card className="p-4 togl_card">
              <Col className="d-flex p-0">
                <Col md={10} className="p-0">
                  <h3><strong> {actionType === 'invite' ? 'Invite User' : 'Delete User'} </strong></h3>
                </Col>
                <Col md={2} className="text-end">
                  <button type="button" className="btn-close toggle_button m-2 ml-2" onClick={handleClose}></button>
                </Col>
              </Col>
              <p>Are you sure you want to {actionType === 'invite' ? 'invite' : 'delete'} this user?</p>
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
    </Col>
  );
}
