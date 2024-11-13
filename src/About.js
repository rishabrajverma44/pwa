import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        farmerName: '',
        farmerMobile: '',
        agroClimaticZone: '',
        soilTexture: '',
        synced: '0',
        geolocation: '',
        stateName: '',
        districName: '',
        villageName: '',
        technicalName: '',
        orgnizationName: '',
        longitude1: '',
        latitude1: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save the form data
        const storedData = localStorage.getItem('farmer');
        const farmer = storedData ? JSON.parse(storedData) : [];
        farmer.push(formData);


        localStorage.setItem("farmer", JSON.stringify(farmer))
        console.log('Form Data Submitted:', formData);
        Swal.fire({
            title: 'Success!',
            text: 'Your data has been saved successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        });
    };

    useEffect(() => {
        fetchGeolocation();
    }, []);

    const fetchGeolocation = () => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
                console.log('Permission status:', permissionStatus.state);
                if (permissionStatus.state === 'granted') {
                    getGeolocation();
                } else if (permissionStatus.state === 'prompt') {
                    getGeolocation();
                } else if (permissionStatus.state === 'denied') {
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
                const coords = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;

                const { latitude, longitude } = position.coords;
                setFormData({
                    ...formData,
                    geolocation: coords,
                    latitude: latitude.toString(),
                    longitude: longitude.toString(),
                });
            },
            (error) => {
                console.error("Geolocation error:", error);
            }
        );
    };

    return (
        <div>
            {/* <div style={{ borderBottom: "3px solid #74bd43" }}></div> */}
            <Container>
                <div className='row mt-3'>
                    <div className='col-sm-8'>
                        <fieldset className='the-fieldset'>
                            <Form onSubmit={handleSubmit}>
                                <fieldset className='the-fieldset'>
                                    <legend className='fieldsetcustom'>Personal Details</legend>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name of the Farmer</Form.Label>
                                        <Form.Control required
                                            type="text"
                                            placeholder="Name of the Farmer"
                                            name="farmerName"
                                            value={formData.farmerName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Control required
                                        type="hidden"
                                        placeholder="Name of the Farmer"
                                        name="synced"
                                        value="0"
                                        onChange={handleChange}
                                    />

                                    <Form.Control 
                                        type="hidden"
                                        placeholder="Name of the Farmer"
                                        name="latitude1"
                                        value={formData.latitude1}
                                        onChange={handleChange}
                                    />
                                    <Form.Control 
                                        type="hidden"
                                        placeholder="Name of the Farmer"
                                        name="longitude1"
                                        value={formData.longitude1}
                                        onChange={handleChange}
                                    />

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Mobile Number of the Farmer</Form.Label>
                                        <Form.Control required
                                            type="number"
                                            placeholder="Enter Mobile Number of the Farmer"
                                            name="farmerMobile"
                                            value={formData.farmerMobile}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </fieldset>

                                <fieldset className='the-fieldset mt-2'>
                                    <legend className='fieldsetcustom'>Farm Details</legend>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Under which Agro-climatic zone does your field belong to?</Form.Label>
                                        <Form.Select required
                                            aria-label="Default select example"
                                            name="agroClimaticZone"
                                            value={formData.agroClimaticZone}
                                            onChange={handleChange}
                                        >
                                            <option>Select Agro-climatic zone</option>
                                            <option value="Lakeshore">Lakeshore</option>
                                            <option value="Mid-Altitude">Mid-Altitude</option>
                                            <option value="High-Altitude">High-Altitude</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>What is the texture of your soil?</Form.Label>
                                        <Form.Select required
                                            aria-label="Default select example"
                                            name="soilTexture"
                                            value={formData.soilTexture}
                                            onChange={handleChange}
                                        >
                                            <option>Select texture</option>
                                            <option value="Sandy">Sandy</option>
                                            <option value="Clayey">Clayey</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Your Geolocation:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="geolocation"
                                            value={formData.geolocation}
                                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                            rows={3}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control required
                                            type="text"
                                            placeholder="Name of the State"
                                            name="stateName"
                                            value={formData.stateName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>District</Form.Label>
                                        <Form.Control required
                                            type="text"
                                            placeholder="Name of the District"
                                            name="districName"
                                            value={formData.districName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Village</Form.Label>
                                        <Form.Control required
                                            type="text"
                                            placeholder="Name of the Village"
                                            name="villageName"
                                            value={formData.villageName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Technical Staff Name</Form.Label>
                                        <Form.Control required
                                            type="text"
                                            placeholder="Name of the Technical Staff "
                                            name="technicalName"
                                            value={formData.technicalName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Organisation</Form.Label>
                                        <Form.Control required
                                            type="text"
                                            placeholder="Name of the Organisation"
                                            name="orgnizationName"
                                            value={formData.orgnizationName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </fieldset>
                                <Button variant="primary" type="submit" className='mt-3'>
                                    Submit
                                </Button>
                            </Form>
                        </fieldset>
                    </div>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Location Access Denied</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        It looks like location access has been denied. To use this feature, please enable location access in your browser settings.
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

export default About;
