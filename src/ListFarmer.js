import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Pagination,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ListFarmer = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [farmersPerPage] = useState(5);

  const getFarmersFromStorage = () => {
    const storedFarmers = localStorage.getItem("farmer");
    return storedFarmers ? JSON.parse(storedFarmers) : [];
  };

  useEffect(() => {
    const allFarmers = getFarmersFromStorage();
    const filtered = allFarmers.filter(
      (farmer) =>
        (!location || farmer.villageName === location) &&
        (!number || farmer.farmerMobile.includes(number))
    );
    setFilteredFarmers(filtered);
    setCurrentPage(1);
  }, [location, number]);

  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  const currentFarmers = filteredFarmers.slice(
    indexOfFirstFarmer,
    indexOfLastFarmer
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFarmerClick = (farmer) => {
    navigate("/FarmerDetails", { state: { farmer } });
  };

  return (
    <Container className="my-4">
      <div
        style={{ cursor: "pointer" }}
        className="my-4"
        onClick={() => navigate("/")}
      >
        <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: "5px" }} />
        <b>List of Farmers</b>
      </div>
      <Row className="mb-3">
        <Col md={4} xs={4}>
          <Form.Group controlId="location">
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={8} xs={8}>
          <Form.Group controlId="number" style={{ position: "relative" }}>
            <Form.Control
              type="text"
              placeholder="Search Mobile Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{ paddingLeft: "30px" }}
            />
            <FaSearch
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="farmer-list">
        {currentFarmers.length > 0 ? (
          currentFarmers.map((farmer, index) => (
            <div key={index}>
              <div
                className="farmer-card p-3 mb-2 d-flex align-items-center"
                onClick={() => handleFarmerClick(farmer)}
                style={{ cursor: "pointer" }}
              >
                {farmer.image ? (
                  <Image
                    src={farmer.image}
                    roundedCircle
                    style={{
                      width: "80px",
                      height: "80px",
                      marginRight: "15px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      color: "#fff",
                      marginRight: "15px",
                    }}
                  >
                    {farmer.farmerName
                      ? farmer.farmerName.charAt(0).toUpperCase()
                      : ""}
                  </div>
                )}

                <div>
                  <h6 style={{ marginBottom: "5px" }}>{farmer.farmerName}</h6>
                  <p style={{ marginBottom: "3px" }}>{farmer.farmerMobile}</p>
                  <p style={{ marginBottom: "0" }}>{farmer.villageName}</p>
                </div>
              </div>
              {index < currentFarmers.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <>
            <div>
              <div className="text-center">
                <FontAwesomeIcon
                  style={{ height: "50px", color: "#AFAFAF" }}
                  icon={faTriangleExclamation}
                />
                <h4>Farmer is not here</h4>
                <p style={{ color: "#AFAFAF" }}>
                  We couldn't find any farmers in this area at the moment.
                  Please check again later or try searching with different
                  criteria. We're constantly updating our listings to provide
                  the most accurate and up-to-date results.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <Pagination className="justify-content-center my-3">
        {Array.from(
          { length: Math.ceil(filteredFarmers.length / farmersPerPage) },
          (_, i) => (
            <Pagination.Item key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
      <Button
        variant="primary"
        onClick={() => navigate("/AddFromNew")}
        style={{
          marginTop: "20px",
          width: "100%",
          height: "50px",
          background: "#279A82",
          top: "710px",
          left: "16px",
          padding: "13px 21px",
          gap: "0px",
          borderRadius: "6px 6px 6px 6px",
          opacity: 1,
        }}
      >
        Add Farmer
      </Button>
    </Container>
  );
};

export default ListFarmer;
