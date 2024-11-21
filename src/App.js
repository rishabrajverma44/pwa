import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Modal } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeNew from "./HomeNew.js";
import About from "./About";
import Users from "./Users";
import AddFromNew from "./AddFromNew.js";
import ListFarmer from "./ListFarmer.js";
import FarmerDetails from "./FarmerDetails.js";
import Document from "./Document.js";
import Vedio from "./Vedio.js";
import { openDB } from "idb";
import Doc1HTML from "./doc1HTML";
import Doc2HTML from "./doc2HTML.js";

function App() {
  const html1 = Doc1HTML;
  const html2 = Doc2HTML;
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const saveVideosToIndexedDB = async () => {
    try {
      const db = await openDB("videoDatabase", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("videos")) {
            db.createObjectStore("videos");
          }
        },
      });
      const response1 = await fetch("/demo.mp4");
      const blob1 = await response1.blob();

      const response2 = await fetch("/newdemo.mp4");
      const blob2 = await response2.blob();
      await db.put("videos", blob1, "demoVideo");
      await db.put("videos", blob2, "demoVideo1");
    } catch (error) {
      console.error("Failed to save videos to IndexedDB:", error);
    }
  };

  saveVideosToIndexedDB();
  localStorage.setItem("documentContent1", html1);
  localStorage.setItem("documentContent2", html2);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const promptEvent = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);

      if (isMobile) {
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
      } else {
        setShowModal(true);
      }
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
        <Navbar bg="white">
          <Container>
            <div className="d-flex flex-column flex-sm-row w-100 py-md-3 justify-content-between align-items-center">
              <div className="d-flex justify-content-center">
                <Navbar.Brand as={Link} to="/">
                  <img
                    src="/images/svgviewer-png-output.png"
                    alt="AgroTutor Logo"
                    style={{ height: "30px" }}
                  />
                </Navbar.Brand>
              </div>

              <div className="d-flex justify-content-center mt-3 mt-sm-0">
                <h3>
                  <b>AgroTutor</b>
                </h3>
              </div>
            </div>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/ListFarmer" element={<ListFarmer />} />
          <Route path="/Document" element={<Document />} />
          <Route path="/video" element={<Vedio />} />
          <Route path="/" element={<HomeNew />} />
          <Route path="/FarmerDetails" element={<FarmerDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/AddFromNew" element={<AddFromNew />} />
        </Routes>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Install AgroTutor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-around">
              <p>Would you like to install AgroTutor?</p>

              <div className="text-center">
                <Button variant="primary" onClick={handleInstall}>
                  Install
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Router>
    </div>
  );
}

export default App;
