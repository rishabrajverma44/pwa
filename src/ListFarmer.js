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
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaSync } from "react-icons/fa";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

const ListFarmer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [farmersPerPage] = useState(5);
  const [showDropdown, setShowDropdown] = useState(false);

  const getFarmersFromStorage = () => {
    const storedFarmers = localStorage.getItem("farmer");
    return storedFarmers ? JSON.parse(storedFarmers) : [];
  };
  useEffect(() => {
    const allFarmers = getFarmersFromStorage();
    const filtered = allFarmers.filter((farmer) => {
      const matchesSearch =
        !search ||
        farmer.farmerMobile.includes(search) ||
        farmer.farmerName.includes(search);
      const matchesProvince = !province || farmer.stateName === province;
      const matchesDistrict = !district || farmer.districName === district;
      const matchesVillage = !village || farmer.villageName.includes(village);
      return (
        matchesSearch && matchesProvince && matchesDistrict && matchesVillage
      );
    });
    setFilteredFarmers(filtered);
    setCurrentPage(1);
  }, [province, district, village, search]);

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
    setSearch("");
    setProvince("");
    setDistricts([]);
    setVillage("");
  };

  const checkInternetConnection = async () => {
    try {
      const response = await fetch(
        "https://api.allorigins.win/get?url=https://www.google.com/favicon.ico",
        {
          method: "HEAD",
          cache: "no-cache",
        }
      );
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const saveFarmersToStorage = (farmers) => {
    localStorage.setItem("farmer", JSON.stringify(farmers));
  };
  const [tittle, setTittle] = useState("");
  const syncDataOneByOne = async () => {
    const actualStatus = await checkInternetConnection();
    const allFarmers = getFarmersFromStorage();
    const unsyncedFarmers = allFarmers.filter((farmer) => farmer.synced === 0);

    if (!actualStatus) {
      Swal.fire({
        html: `<b>Check Internet connection !</b>`,
        allowOutsideClick: false,
      });
    } else if (unsyncedFarmers.length === 0) {
      Swal.fire({
        text: "All data are synced",
      });
    } else if (actualStatus && unsyncedFarmers.length !== 0) {
      let shouldCancel = false;
      Swal.fire({
        html: `<b>Syncing in progress...</b>${tittle} <br> You can cancel anytime.`,
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        didOpen: () => {
          Swal.showLoading();
        },
        preConfirm: () => {
          shouldCancel = true;
        },
      });

      for (let i = 0; i < unsyncedFarmers.length; i++) {
        if (shouldCancel) {
          Swal.close();
          alert("Syncing process canceled by the user.");
          break;
        }

        const farmer = unsyncedFarmers[i];
        const { synced, ...farmerData } = farmer;
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const response = await axios.post(
            "http://traningl.indevconsultancy.in/pwa-blog-api/farmer_insert.php",
            farmerData
          );
          console.log(response);
          console.log(`Syncing farmer: ${farmer.farmerName}`);
          farmer.synced = 1;
          setTittle(
            `${i + 1} synced successfully out of ${unsyncedFarmers.length}`
          );
        } catch (error) {
          console.error(`Failed to sync farmer ${farmer.farmerName}`, error);
          Swal.fire({
            html: `<b>Something went wrong...</b>`,
            allowOutsideClick: false,
          });
        }
      }
      Swal.close();
      saveFarmersToStorage(allFarmers);
      setLoading(false);
    } else {
      Swal.fire({
        html: `<b>Somthing went wrong !</b>`,
        allowOutsideClick: false,
      });
    }
  };

  const sync = () => {
    syncDataOneByOne();
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <Container className="my-4">
      <Row>
        <Col
          style={{ cursor: "pointer" }}
          className="my-4"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ marginRight: "5px" }}
          />
          <b>List of Farmers</b>
        </Col>
        <Col className="my-4">
          <Button
            onClick={sync}
            style={{
              borderRadius: "6px",
              background: "#279A82",
              border: "1px solid #279A82",
              background: "#FFFFFF",
              color: "#FFFFFF",
              fontWeight: 500,
            }}
          >
            <FaSync color="#279A82" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group
            controlId="number"
            style={{ position: "relative" }}
            className="mb-3"
          >
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search Mobile Number/ Farmer name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "30px" }}
            />
            <FaSearch
              style={{
                position: "absolute",
                left: "10px",
                top: "75%",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* <Row>
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
      </Row> */}
      {/* <Row>
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
            style={{
              borderRadius: "6px",
              background: "#279A82",
              border: "1px solid #279A82",
              background: "#FFFFFF",
              color: "#279A82",
              fontWeight: 500,
            }}
          >
            Reset Filters
          </Button>
        </Col>
      </Row> */}

      {/* <Row>
        <Col md={2}>
          <Button
            variant="primary"
            onClick={handleReset}
            style={{
              borderRadius: "6px",
              background: "#279A82",
              border: "1px solid #279A82",
              color: "#FFFFFF",
              fontWeight: 500,
            }}
          >
            Reset Filters
          </Button>
        </Col>
        <Col md={2}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            onClick={toggleDropdown}
            style={{
              borderRadius: "6px",
              background: "#279A82",
              border: "1px solid #279A82",
              color: "#FFFFFF",
              fontWeight: 500,
            }}
          >
            Open/Close
          </Dropdown.Toggle>
        </Col>
      </Row>
      <Row>
        <Dropdown show={showDropdown} onToggle={() => {}}>
          <Dropdown.Menu>
            <div style={{ padding: "10px" }}>
              <Row>
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
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>District</Form.Label>
                    <Form.Select
                      value={district}
                      onChange={handleChangedistict}
                    >
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
              </Row>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </Row> */}

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
