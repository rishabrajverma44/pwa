import React, { useEffect, useState } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AddFrpmNew = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isExtensionOfficer, setIsExtensionOfficer] = useState(null);

  const [formData, setFormData] = useState({
    farmerName: "",
    farmerMobile: "",
    farmerGender: "",
    ageRange: "",
    selectedItems: [],
    otherItem: "",
    agroClimaticZone: "",
    soilTexture: "",
    synced: "0",
    geolocation: "",
    stateName: "",
    districName: "",
    villageName: "",
    technicalName: "",
    orgnizationName: "",
    longitude1: "",
    latitude1: "",
    officerName: "",
    officerOrganization: "",
  });

  const handleChangedistict = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      districName: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setIsExtensionOfficer(e.target.value === "yes");
  };
  const handleGenderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      ageRange: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const storedData = localStorage.getItem("farmer");
    const farmer = storedData ? JSON.parse(storedData) : [];
    farmer.push(formData);
    localStorage.setItem("farmer", JSON.stringify(farmer));
    Swal.fire({
      title: "Success!",
      text: "Your data has been saved successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/ListFarmer");
      }
    });
  };

  useEffect(() => {
    fetchGeolocation();
  }, []);

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            getGeolocation();
          } else if (permissionStatus.state === "prompt") {
            getGeolocation();
          } else if (permissionStatus.state === "denied") {
            setShowModal(true);
          }
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevData) => ({
          ...prevData,
          geolocation: `Latitude: ${latitude}, Longitude: ${longitude}`,
          latitude1: latitude.toString(),
          longitude1: longitude.toString(),
        }));
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const [selectedRegion, setSelectedRegion] = useState("");
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
  const SouthernDistricts = [
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
    setSelectedRegion(region);
    setFormData((prevData) => ({
      ...prevData,
      stateName: region,
      districtName: "",
    }));

    if (region === "Northern region") {
      setDistricts(northernDistricts);
    } else if (region === "Central Region") {
      setDistricts(centralDistricts);
    } else if (region === "Southern Region") {
      setDistricts(SouthernDistricts);
    } else {
      setDistricts([]);
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        selectedItems: [...prevData.selectedItems, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        selectedItems: prevData.selectedItems.filter((item) => item !== value),
      }));
    }
  };

  const handleOtherInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      otherItem: e.target.value,
    }));
  };

  return (
    <div>
      <Container>
        <div className="step-indicator">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className={`step ${currentStep === index + 1 ? "active" : ""}`}
            >
              <span>{`0${index + 1}`}</span>
              <br />
              {index === 0
                ? "Farmer Details"
                : index === 1
                ? "Farm Details"
                : "My Details"}
            </div>
          ))}
        </div>
        <hr />

        <Form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <fieldset className="the-fieldset">
              <legend className="fieldsetcustom" style={{ color: "#003B49" }}>
                Farmer Details
              </legend>

              <Form.Group className="mb-3">
                <Form.Label>Name of the Farmer</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter farmer name"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number of the Farmer</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter farmer mobile number"
                  name="farmerMobile"
                  value={formData.farmerMobile}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Label>Gender</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Check
                  type="radio"
                  id="male"
                  label="Male"
                  name="farmerGender"
                  value="male"
                  onChange={handleGenderChange}
                  checked={formData.farmerGender === "male"}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  id="female"
                  label="Female"
                  name="farmerGender"
                  value="female"
                  onChange={handleGenderChange}
                  checked={formData.farmerGender === "female"}
                />
              </div>

              <Form.Group className="mt-3">
                <Form.Label>Age</Form.Label>
                <Form.Select
                  required
                  name="ageRange"
                  value={formData.ageRange}
                  onChange={handleAgeChange}
                >
                  <option>Select Age</option>
                  <option value="0-14">0-14</option>
                  <option value="15-24">15-24</option>
                  <option value="25-54">25-54</option>
                  <option value="54-64">54-64</option>
                  <option value=">65+">65+</option>
                </Form.Select>
              </Form.Group>

              <Form.Label>What primary crop(s) do you grow ?</Form.Label>

              <Form.Check
                type="checkbox"
                id="Maize"
                label="Maize"
                value="Maize"
                className="my-2"
                checked={formData.selectedItems.includes("Maize")}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                type="checkbox"
                id="Patatoes"
                label="Patatoes"
                value="Patatoes"
                checked={formData.selectedItems.includes("Patatoes")}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                type="checkbox"
                id="Cassava"
                label="Cassava"
                value="Cassava"
                className="my-2"
                checked={formData.selectedItems.includes("Cassava")}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                type="checkbox"
                id="Tabacco"
                label="Tabacco"
                value="Tabacco"
                checked={formData.selectedItems.includes("Tabacco")}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                type="checkbox"
                id="Tea"
                label="Tea"
                value="Tea"
                className="my-2"
                checked={formData.selectedItems.includes("Tea")}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                type="checkbox"
                id="Sweet Patato"
                label="Sweet Patato"
                value="Sweet Patato"
                checked={formData.selectedItems.includes("Sweet Patato")}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                type="checkbox"
                id="Groundnut"
                label="Groundnut"
                value="Groundnut"
                className="my-2"
                checked={formData.selectedItems.includes("Groundnut")}
                onChange={handleCheckboxChange}
              />

              <Form.Check
                type="checkbox"
                id="other"
                label="Others"
                value="Other"
                checked={formData.selectedItems.includes("Other")}
                onChange={handleCheckboxChange}
              />

              {formData.selectedItems.includes("Other") && (
                <Form.Group controlId="otherItem" className="px-2 mt-1">
                  <Form.Control
                    type="text"
                    value={formData.otherItem || ""}
                    onChange={handleOtherInputChange}
                    placeholder="Add crop name"
                  />
                </Form.Group>
              )}
            </fieldset>
          )}

          {currentStep === 2 && (
            <fieldset className="the-fieldset">
              <legend className="fieldsetcustom" style={{ color: "#003B49" }}>
                Farm Details
              </legend>
              <Form.Group className="mb-3">
                <Form.Label>Agro-climatic Zone</Form.Label>
                <Form.Select
                  required
                  name="agroClimaticZone"
                  value={formData.agroClimaticZone}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Agro-climatic zone
                  </option>
                  <option value="Lakeshore">Lakeshore</option>
                  <option value="Mid-Altitude">Mid-Altitude</option>
                  <option value="High-Altitude">High-Altitude</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>What is your texture of your Soil ?</Form.Label>
                <Form.Select
                  required
                  name="soilTexture"
                  value={formData.soilTexture}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select texture
                  </option>
                  <option value="Sandy">Sandy</option>
                  <option value="Clayey">Clayey</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Province</Form.Label>
                <Form.Select
                  required
                  name="stateName"
                  value={formData.stateName}
                  onChange={handleRegionChange}
                >
                  <option value="" disabled selected>
                    Select Province
                  </option>
                  <option value="Northern region">Northern region</option>
                  <option value="Central Region">Central Region</option>
                  <option value="Southern Region">Southern Region</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>District</Form.Label>
                <Form.Select
                  required
                  name="districtName"
                  value={formData.districName}
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
              <Form.Group className="mb-3">
                <Form.Label>Village</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name of the Village"
                  name="villageName"
                  value={formData.villageName}
                  onChange={handleChange}
                />
              </Form.Group>
            </fieldset>
          )}
          {currentStep === 3 && (
            <fieldset className="the-fieldset">
              <legend className="fieldsetcustom">
                Are you an Extension officer?
              </legend>
              <Form>
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="radio"
                    id="radioYes"
                    label="Yes"
                    name="extensionOfficer"
                    value="yes"
                    onChange={handleRadioChange}
                    checked={isExtensionOfficer === true}
                    className="me-3"
                  />
                  <Form.Check
                    type="radio"
                    id="radioNo"
                    label="No"
                    name="extensionOfficer"
                    value="no"
                    onChange={handleRadioChange}
                    checked={isExtensionOfficer === false}
                  />
                </div>

                {isExtensionOfficer && (
                  <>
                    <Form.Group controlId="officerName" className="mt-3">
                      <Form.Label>Officer Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="officerName"
                        value={formData.officerName}
                        onChange={handleInputChange}
                        placeholder="Enter Officer Name"
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="officerOrganization"
                      className="mt-3"
                    >
                      <Form.Label>Organization</Form.Label>
                      <Form.Control
                        type="text"
                        name="officerOrganization"
                        value={formData.officerOrganization}
                        onChange={handleInputChange}
                        placeholder="Enter Organization Name"
                      />
                    </Form.Group>
                  </>
                )}
              </Form>
            </fieldset>
          )}
          <div className="button-group mb-2">
            {currentStep > 1 && (
              <Button
                variant="secondary"
                onClick={prevStep}
                style={{
                  padding: "10px 10px",
                  borderRadius: "6px 6px 6px 6px",
                  background: "#FFFFFF",
                  border: "1px solid #279A82",
                  color: "#279A82",
                  width: "45%",
                }}
              >
                Previous{" "}
              </Button>
            )}
            <Button
              variant="primary"
              onClick={currentStep < 3 ? nextStep : handleSubmit}
              disabled={
                currentStep === 1 &&
                (!formData.farmerName || !formData.farmerMobile)
              }
              style={{
                background: "#279A82",
                padding: "10px 10px",
                borderRadius: "6px 6px 6px 6px",
                border: "1px solid #279A82",
                width: currentStep === 1 ? "100%" : "45%",
              }}
            >
              {currentStep < 3 ? "Continue" : "Submit"}
            </Button>
          </div>
        </Form>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Location Access Denied</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            It looks like location access has been denied. To use this feature,
            please enable location access in your browser settings.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AddFrpmNew;
