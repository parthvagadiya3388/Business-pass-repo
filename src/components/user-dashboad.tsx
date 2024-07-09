import { Helmet } from 'react-helmet-async';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Bar, Bubble, Doughnut, Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import Header from './header';
import Sidebar from './side-bar';
import { ChartData } from './chart-data';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);



const Dashboard = () => {

  const countryColors = {
    'IN': 'rgba(54, 162, 235, 0.6)',
    'USA': 'rgba(255, 99, 132, 0.6)',
    'UK': 'rgba(75, 192, 192, 0.6)',
  };


  const countryData = {
    labels: ['IN', 'USA' , 'UK'],
    datasets: [
      {
        label: 'Country',
        data: [...new Set(ChartData.map(user => user.country))].map(
          country => ChartData.filter(user => user.country === country).length
        ),
        backgroundColor: ['IN', 'USA', 'UK'].map(country => countryColors[country]),
        borderColor: ['IN', 'USA', 'UK'].map(country => countryColors[country].replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  const genderColors = {
    'male': 'rgba(54, 162, 235, 0.6)',
    'female': 'rgba(255, 99, 132, 0.6)',
  };

  const genderData = {
    labels: ['male', 'female'],
    datasets: [
      {
        label: 'Gender',
        data: ['male', 'female'].map(
          gender => ChartData.filter(user => user.gender === gender).length
        ),
        backgroundColor: ['male', 'female'].map(gender => genderColors[gender]),
        borderColor: ['male', 'female'].map(gender => genderColors[gender].replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  const UsersData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Users',
        data: [900, 300, 600, 500, 600, 100, 800],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };


  const ageGroups = ['20-25', '25-35', '35-50', '50+'];
  const ageGroupColors = ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'];

  const ageData = {
    labels: ageGroups,
    datasets: [
      {
        label: 'Age Groups',
        data: ageGroups.map(group => {
          const [min, max] = group.split('-').map(Number);
          return ChartData.filter(user => {
            if (group === '50+') {
              return user.age > 50;
            }
            return user.age >= min && user.age <= max;
          }).length;
        }),
        backgroundColor: ageGroupColors,
        borderColor: ageGroupColors.map(color => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Header />
      <Container>
        <Row>
          <Col md={3} className="bg-light">
            <Sidebar />
          </Col>
          <Col md={9} className="p-4">
            <h1 className="mb-4">Good Morning, User</h1>
            <Row>
              <Col md={8}>
                <Card className="mb-4 w-100 h-100">
                  <Card.Body>
                    <Card.Title>Users</Card.Title>
                    <h6>3.5k Users</h6>
                    <Bar data={UsersData}  />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4 w-100 h-100">
                  <Card.Body>
                    <Card.Title>Country</Card.Title>
                    <Pie data={countryData}/>
                  </Card.Body>
                </Card>
              </Col>
            </Row><br />
            <Row>
            <Col md={6}>
                <Card className="mb-4 w-100 h-100">
                  <Card.Body>
                    <Card.Title>Gender</Card.Title>
                    <Bar data={genderData} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-4 w-100 h-100">
                  <Card.Body>
                    <Card.Title>Age Groups</Card.Title>
                    {/* <Bubble data={ageData} /> */}
                    {/* <Scatter data={ageData} /> */}
                    <Doughnut data={ageData} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
