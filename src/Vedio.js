import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { openDB } from "idb";

const VedioViewer = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState(null);
  const [videoUrl1, setVideoUrl1] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const db = await openDB("videoDatabase", 1);
        const videoBlob = await db.get("videos", "demoVideo");
        const videoBlob1 = await db.get("videos", "demoVideo1");

        if (videoBlob && videoBlob instanceof Blob) {
          const videoURL = URL.createObjectURL(videoBlob);
          setVideoUrl(videoURL);
        } else {
          console.error("demoVideo is not a Blob or not found.");
        }

        if (videoBlob1 && videoBlob1 instanceof Blob) {
          const videoURL1 = URL.createObjectURL(videoBlob1);
          setVideoUrl1(videoURL1);
        } else {
          console.error("demoVideo1 is not a Blob or not found.");
        }

        if (!videoBlob && !videoBlob1) {
          console.log("Videos not found in IndexedDB.");
        }
      } catch (error) {
        console.error("Failed to retrieve videos from IndexedDB:", error);
      }
    };

    fetchVideos();
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (videoUrl1) URL.revokeObjectURL(videoUrl1);
    };
  }, []);

  const handleOpenVideo = (videoNumber) => {
    setActiveButton(videoNumber);

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <div>
      <Container className="my-4">
        <div
          style={{ cursor: "pointer", marginBottom: "10px" }}
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ marginRight: "5px" }}
          />
          <b>Video Viewer</b>
        </div>

        <div className="d-flex flex-column align-items-center mt-4">
          <Button
            size="lg"
            className="btnSI"
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "10px 10px",
              borderRadius: "6px",
              background: activeButton === 1 ? "#279A82" : "#FFFFFF",
              border: "1px solid #279A82",
              color: activeButton === 1 ? "#FFFFFF" : "#279A82",
            }}
            onClick={() => handleOpenVideo(1)}
          >
            Play Video 1
          </Button>

          <Button
            size="lg"
            className="btnSI mt-3"
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "10px 10px",
              borderRadius: "6px",
              background: activeButton === 2 ? "#279A82" : "#FFFFFF",
              border: "1px solid #279A82",
              color: activeButton === 2 ? "#FFFFFF" : "#279A82",
            }}
            onClick={() => handleOpenVideo(2)}
          >
            Play Video 2
          </Button>
        </div>

        <Row className="mt-4">
          <Col>
            {activeButton && (
              <video
                ref={videoRef}
                className="video-player"
                width="100%"
                height="400"
                controls
              >
                <source
                  src={activeButton === 1 ? videoUrl : videoUrl1}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VedioViewer;
