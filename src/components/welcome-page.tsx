import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import img1 from "../assets/images/office1.jpg";
import { FaCheckCircle } from "react-icons/fa";
import Header from "./header";

const services: string[] = [
  'Global accessibility',
  'Priority Services and Amenities',
  'Tailored Safety Measures',
  'Data Security',
  'Cost-Effectiveness',
  'Private Rooms',
  'Streamlined Booking Process',
  'Priority service request',
];

const Welcome: React.FC = () => {
  const firstHalf = services.slice(0, 4);
  const secondHalf = services.slice(4, 8);

  const listservices1 = firstHalf.map((first, index) => (
    <li key={index}>
      <FaCheckCircle /> {first}
    </li>
  ));
  
  const listservices2 = secondHalf.map((second, index) => (
    <li key={index}>
      <FaCheckCircle /> {second}
    </li>
  ));

  return (
    <>
      {/* <Mainheader/> */}
      <Header/>
      <Container fluid>
        <Row className="w-100 h-100">
          <Col md={6} sm={12} className="p-3">
            <div className="paragraph_div">
              <p className="p-2 m-2">
                "In the modern office, connections are the currency of success,
                and collaboration is the key to unlocking limitless potential."
              </p>
              <h2 className="p-2 m-2">
                Why <strong className="text-primary">Businesspass?</strong>
              </h2>
              <p className="p-2 m-2">
                As companies deeply committed to nurturing their global network
                of exceptional talent, we understand the paramount importance of
                facilitating connections, fostering collaboration, and
                empowering its workforce to thrive on a worldwide scale.
              </p>
              <p className="p-2 m-2">
                In today's interconnected business landscape, esteemed partners
                are scattered across the globe, each bringing their unique
                expertise and insights to the table.
              </p>
              <p className="p-2 m-2">
                That's why we place immense value on the concept of the business
                pass. Far more than just a credential, it represents a gateway
                to opportunity and a testament to our unwavering commitment to
                empowering workforce.
              </p>
              <p className="p-2 m-2">
                In the fast-paced world of modern business, success hinges on
                the ability to forge meaningful connections and leverage
                collective expertise. Yes. We're always interested in improving this generator
                and one of the best ways to do that is to add new and interesting paragraphs
                to the generator. If you'd like to contribute some random paragraphs, please
                contact us.
              </p>
            </div>
          </Col>
          <Col md={6} sm={12} className="align-content-center About_image_col">
            <div className="w-100 h-50 About_Image_div">
              <img src={img1} className="About_image object-fit-cover" alt="Office" />
            </div>
            <div className="list_item d-flex flex-wrap">
              <ul className="List_ul">{listservices1}</ul>
              <ul className="List_ul">{listservices2}</ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Welcome;
