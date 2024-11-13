import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        farmerName: '',
        farmerMobile: '',
        agroClimaticZone: '',
        soilTexture: '',
        synced: '0',
        farmer_json_data: ''
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(formData);

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            farmer_json_data: formData,
          
        };
        try {
            const response = await fetch("https://services.indevconsultancy.in/pwa_api/inser_farmer_data_json.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });
            if (response.ok) {
                const data = await response.json(); // Parse response body if needed
                console.log("Product submitted successfully:", data);
                setProductName("");
                setProductDescription("");
                setProductPrice("");
                Swal.fire({
                    title: 'Success!',
                    text: 'Your data has been saved successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/farmerList');
                    }
                });
            } else {
                console.error("Error submitting product:", await response.text());
            }
        } catch (error) {
            console.error("Error submitting product:", error);
        }
    };


    return (
        <div>
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
                                    <Row>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Click on the button to fetch geolocation </Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>

                                        <Col sm={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>State  </Form.Label>
                                                <Form.Control required
                                                    type="text"
                                                    placeholder="Enter State  "
                                                    name="Village"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>District </Form.Label>
                                                <Form.Control required
                                                    type="text"
                                                    placeholder="Enter District "
                                                    name="District "
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Village</Form.Label>
                                                <Form.Control required
                                                    type="text"
                                                    placeholder="Enter Village"
                                                    name="Village"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Technical staff Name</Form.Label>
                                                <Form.Control required
                                                    type="text"
                                                    placeholder="Enter Technical staff Name"
                                                    name="farmerName"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Organisation </Form.Label>
                                                <Form.Control required
                                                    type="text"
                                                    placeholder="Enter Organisation "
                                                    name="farmerName"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </fieldset>
                                <Button variant="primary" type="submit" className='mt-3'>
                                    Submit
                                </Button>
                            </Form>
                        </fieldset>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default About;
