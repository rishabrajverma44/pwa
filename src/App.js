import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeNew from "./HomeNew.js";
import About from "./About";
import Users from "./Users";
import AddFromNew from "./AddFromNew.js";
import ListFarmer from "./ListFarmer.js";
import FarmerDetails from "./FarmerDetails.js";
import Document from "./Document.js";
import Vedio from "./Vedio.js";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const promptEvent = (event) => {
      setDeferredPrompt(event);
      setShowModal(true);
    };

    window.addEventListener("beforeinstallprompt", promptEvent);

    return () => {
      window.removeEventListener("beforeinstallprompt", promptEvent);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome);
        setDeferredPrompt(null);
        setShowModal(false);
      });
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar bg="white" expand="lg">
          <Container className="justify-content-center justify-content-sm-between">
            <Navbar.Brand as={Link} to="/">
              <img
                src="/svgviewer-png-output.png"
                alt="AgroTutor Logo"
                style={{ height: "30px" }}
              />
            </Navbar.Brand>
            <hr />
            <div className="text-center my-3">
              <h3>
                <b>AgroTutor</b>
              </h3>
            </div>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/ListFarmer" element={<ListFarmer />} />
          <Route path="/Document" element={<Document />} />
          <Route path="/video" element={<Vedio />} />
          <Route path="/" element={<HomeNew />} />
          <Route path="/FarmerDetails" element={<FarmerDetails />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />} />
          <Route path="/AddFromNew" element={<AddFromNew />} />
        </Routes>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Install AgroTutor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Would you like to install AgroTutor ?</p>

            <div className="text-center">
              <Button variant="primary" onClick={handleInstall}>
                Install
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Router>
    </div>
  );
}

export default App;
