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
  const [number, setNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [name, setName] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [farmersPerPage] = useState(5);

  const getFarmersFromStorage = () => {
    const storedFarmers = localStorage.getItem("farmer");
    return storedFarmers ? JSON.parse(storedFarmers) : [];
  };

  useEffect(() => {
    const allFarmers = getFarmersFromStorage();
    const filtered = allFarmers.filter((farmer) => {
      const matchesNumber = !number || farmer.farmerMobile.includes(number);
      const matchesName = !name || farmer.farmerName.includes(name);
      const matchesProvince = !province || farmer.stateName === province;
      const matchesDistrict = !district || farmer.districName === district;
      const matchesVillage = !village || farmer.villageName.includes(village);
      return (
        matchesNumber &&
        matchesProvince &&
        matchesDistrict &&
        matchesVillage &&
        matchesName
      );
    });
    setFilteredFarmers(filtered);
    setCurrentPage(1);
  }, [number, province, district, village, name]);

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

  const [districts, setDistricts] = useState([]);
  const northernDistricts = [
    "Chitipa",
    "Karonga",
    "Rumphi",
    "Nkhata Bay",
    "Likoma",
    "Mzimba",
  ];
  const centralDistricts = [
    "Kasungu",
    "Nkhotakota",
    "Ntchisi",
    "Dowa",
    "Mchinji",
    "Lilongwe",
    "Dedza",
    "Ntcheu",
    "Salima",
  ];
  const southernDistricts = [
    "Mangochi",
    "Machinga",
    "Balaka",
    "Zomba",
    "Chiradzulu",
    "Blantyre",
    "Mwanza",
    "Thyolo",
    "Phalombe",
    "Mulanje",
    "Chikwawa",
    "Nsanje",
  ];

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setProvince(region);

    if (region === "Northern region") {
      setDistricts(northernDistricts);
    } else if (region === "Central Region") {
      setDistricts(centralDistricts);
    } else if (region === "Southern Region") {
      setDistricts(southernDistricts);
    } else {
      setDistricts([]);
    }
    setDistrict("");
  };

  const handleChangedistict = (event) => {
    setDistrict(event.target.value);
  };

  const handleReset = () => {
    setNumber("");
    setProvince("");
    setDistricts([]);
    setVillage("");
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
      {currentFarmers.length !== 0 && (
        <div>
          <Row>
            <Col md={3}>
              <Form.Group
                controlId="number"
                style={{ position: "relative" }}
                className="mb-3"
              >
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Search Mobile Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  style={{ paddingLeft: "30px" }}
                />
                <FaSearch
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Farmer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of the Farmer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Province</Form.Label>
                <Form.Select onChange={handleRegionChange} value={province}>
                  <option value="" disabled>
                    Select Province
                  </option>
                  <option value="Northern region">Northern region</option>
                  <option value="Central Region">Central Region</option>
                  <option value="Southern Region">Southern Region</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>District</Form.Label>
                <Form.Select value={district} onChange={handleChangedistict}>
                  <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Village</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of the Village"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                variant="primary"
                onClick={handleReset}
                style={{ marginTop: "30px" }}
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </div>
      )}
      <hr />
      <div className="farmer-list">
        {currentFarmers.length > 0 ? (
          currentFarmers.map((farmer, index) => (
            <div key={index} className="card m-2">
              <div
                className="farmer-card p-3 m-2 d-flex align-items-center"
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
                  {farmer.stateName ? (
                    <p style={{ marginBottom: "0" }}>
                      <span class="fw-bold">Province </span>:{farmer.stateName}
                    </p>
                  ) : null}
                  {farmer.districName ? (
                    <p style={{ marginBottom: "0" }}>
                      <span class="fw-bold">District </span>:
                      {farmer.districName}
                    </p>
                  ) : null}
                  {farmer.villageName ? (
                    <p style={{ marginBottom: "0" }}>
                      <span class="fw-bold">Village </span>:{farmer.villageName}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <FontAwesomeIcon
              style={{ height: "50px", color: "#AFAFAF" }}
              icon={faTriangleExclamation}
            />
            <h4>Farmer is not here</h4>
            <p style={{ color: "#AFAFAF" }}>
              We couldn't find any farmers in this area at the moment. Please
              check again later or try searching with different criteria. We're
              constantly updating our listings to provide the most accurate and
              up-to-date results.
            </p>
          </div>
        )}
      </div>
      {currentFarmers.length !== 0 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(filteredFarmers.length / farmersPerPage))].map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                onClick={() => paginate(index + 1)}
                active={index + 1 === currentPage}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredFarmers.length / farmersPerPage)
            }
          />
        </Pagination>
      )}
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
