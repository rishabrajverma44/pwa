import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Pagination,
  Dropdown,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaSync } from "react-icons/fa";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

const ListFarmer = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [farmersPerPage] = useState(5);
  const [showDropdown, setShowDropdown] = useState(false);
  const [reset, setReset] = useState(false);

  const getFarmersFromStorage = () => {
    const storedFarmers = localStorage.getItem("farmer");
    return storedFarmers ? JSON.parse(storedFarmers) : [];
  };
  let allFarmers = getFarmersFromStorage();

  useEffect(() => {
    if (reset) {
      setReset(false);
    }

    const filtered = allFarmers.filter((farmer) => {
      const matchesSearch =
        !search ||
        farmer.farmerMobile.includes(search) ||
        farmer.farmerName.includes(search);
      const matchesProvince = !province || farmer.province === province;
      const matchesDistrict = !district || farmer.districtName === district;
      const matchesVillage = !village || farmer.villageName.includes(village);
      return (
        matchesSearch && matchesProvince && matchesDistrict && matchesVillage
      );
    });

    setFilteredFarmers(filtered);
    setCurrentPage(1);
  }, [province, district, village, search, reset]);

  const totalPages = Math.ceil(filteredFarmers.length / farmersPerPage);

  const paginate = (pageNumber) => {
    const validPageNumber = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(validPageNumber);
  };

  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  const currentFarmers = filteredFarmers.slice(
    indexOfFirstFarmer,
    indexOfLastFarmer
  );

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
    }
    setDistrict("");
  };

  const handleChangedistict = (event) => {
    setDistrict(event.target.value);
  };

  const handleReset = () => {
    setReset(true);
    setSearch("");
    setProvince("");
    setDistrict("");
    setVillage("");
    setCurrentPage(1);
    setFilteredFarmers(allFarmers);
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
        confirmButtonColor: "#279A82",
      });
    } else if (unsyncedFarmers.length === 0) {
      Swal.fire({
        text: "All data are synced",
        confirmButtonColor: "#279A82",
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
            "https://mne.agrotutor.co/apinew/farmer_insert.php",
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
            html: `<b>Somthing went wrong !</b>`,
            allowOutsideClick: false,
            confirmButtonColor: "#279A82",
          });
        }
      }
      Swal.close();
      saveFarmersToStorage(allFarmers);
    } else {
      Swal.fire({
        html: `<b>Somthing went wrong !</b>`,
        allowOutsideClick: false,
        confirmButtonColor: "#28a745",
      });
    }
  };

  const sync = () => {
    syncDataOneByOne();
  };
  useEffect(() => {
    const pageLinks = document.querySelectorAll(".page-link");
    pageLinks.forEach((pageLink) => {
      if (pageLink.parentElement.classList.contains("active")) {
        pageLink.style.backgroundColor = "#279A82";
        pageLink.style.borderColor = "#279A82";
        pageLink.style.color = "white";
      } else {
        pageLink.style.backgroundColor = "";
        pageLink.style.borderColor = "";
        pageLink.style.color = "";
      }
    });
  }, [currentFarmers]);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between">
        <div
          style={{ cursor: "pointer" }}
          className="my-4"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ marginRight: "5px" }}
          />
          <b>List of Farmers</b>
        </div>
        <div className="my-4">
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
        </div>
      </div>
      <Row>
        <Col>
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
                top: "72%",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="d-flex justify-content-around">
        <Button
          variant="success"
          id="dropdown-basic"
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            width: "140px",
            borderRadius: "6px",
            background: "#279A82",
            border: "1px solid #279A82",
            color: "#FFFFFF",
            fontWeight: 500,
          }}
        >
          {showDropdown ? "Hide Filter" : "Show Filter"}
        </Button>

        <Button
          variant="primary"
          onClick={handleReset}
          style={{
            borderRadius: "6px",
            width: "140px",
            background: "#FFFFFF",
            border: "1px solid #279A82",
            color: "#279A82",
            fontWeight: 500,
          }}
        >
          Reset
        </Button>
      </Row>

      <Row>
        <Dropdown show={showDropdown} className="mt-2">
          <Dropdown.Menu style={{ width: "95%" }}>
            <div>
              <Row className="px-2">
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
              </Row>
              <Row className="px-2">
                <Form.Group className="mb-3">
                  <Form.Label>District</Form.Label>
                  <Form.Select value={district} onChange={handleChangedistict}>
                    <option value="">Select District</option>
                    {districts &&
                      districts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="px-2">
                <Form.Group className="mb-3">
                  <Form.Label>Village</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name of the Village"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </Row>

      <hr />

      <div className="farmer-list">
        {currentFarmers.length > 0 ? (
          currentFarmers.map((farmer, index) => (
            <div key={index} className="card m-2">
              <Card
                className="p-2"
                onClick={() => handleFarmerClick(farmer)}
                style={{ cursor: "pointer" }}
              >
                <h5>
                  <div className="d-flex justify-content-between">
                    <div>{farmer.farmerName || "Farmer Name"}</div>
                    <div style={{ color: "#6B7280" }}>
                      {farmer.farmerMobile || "Farmer Mobile"}
                    </div>
                  </div>
                </h5>
                <div className="d-flex">
                  <div className="fw-bold" style={{ width: "25%" }}>
                    Location :
                  </div>
                  <div style={{ width: "75%" }}>
                    <p style={{ color: "#6B7280" }}>
                      {farmer.province}, {farmer.districtName},{" "}
                      {farmer.villageName}
                    </p>
                  </div>
                </div>
              </Card>
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
            className="mx-1"
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              onClick={() => paginate(index + 1)}
              active={index + 1 === currentPage}
              style={{
                backgroundColor: index + 1 === currentPage ? "#279A82" : "",
                borderColor: index + 1 === currentPage ? "#279A82" : "",
              }}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-1"
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
          borderColor: "#279A82",
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
