import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { openDB } from "idb";

const DocumentViewer = () => {
  const navigate = useNavigate();
  const [documentContent, setDocumentContent] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const handleOpenDocument1 = () => {
    setActiveButton(1);
    setDocumentContent(localStorage.getItem("documentContent1") || "");
  };

  const handleOpenDocument2 = () => {
    setActiveButton(2);
    setDocumentContent(localStorage.getItem("documentContent2") || "");
  };

  useEffect(() => {
    const savedContent1 = localStorage.getItem("documentContent1");
    const savedContent2 = localStorage.getItem("documentContent2");

    if (savedContent1 && activeButton === 1) {
      setDocumentContent(savedContent1);
    }

    if (savedContent2 && activeButton === 2) {
      setDocumentContent(savedContent2);
    }
  }, [activeButton]);

  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoUrl1, setVideoUrl1] = useState(null);

  // Fetch videos from IndexedDB
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
          <b>Document Viewer</b>
        </div>
        <div className="mt-4 d-flex flex-column flex-md-row justify-content-around gap-2">
          <Button
            size="lg"
            className="btnSI"
            style={{
              borderRadius: "6px",
              background: activeButton === 1 ? "#279A82" : "#FFFFFF",
              border: "1px solid #279A82",
              color: activeButton === 1 ? "#FFFFFF" : "#279A82",
            }}
            onClick={handleOpenDocument1}
          >
            SI Technology Participatory Decision Tool
          </Button>

          <Button
            size="lg"
            className="btnSI"
            style={{
              borderRadius: "6px",
              background: activeButton === 2 ? "#279A82" : "#FFFFFF",
              border: "1px solid #279A82",
              color: activeButton === 2 ? "#FFFFFF" : "#279A82",
            }}
            onClick={handleOpenDocument2}
          >
            SI Training Strategy 2024-07
          </Button>

          <Button
            size="lg"
            className="btnSI"
            style={{
              borderRadius: "6px",
              background: activeButton === 3 ? "#279A82" : "#FFFFFF",
              border: "1px solid #279A82",
              color: activeButton === 3 ? "#FFFFFF" : "#279A82",
            }}
            onClick={() => handleOpenVideo(3)}
          >
            Play Video 1
          </Button>

          <Button
            size="lg"
            className="btnSI"
            style={{
              borderRadius: "6px",
              background: activeButton === 4 ? "#279A82" : "#FFFFFF",
              border: "1px solid #279A82",
              color: activeButton === 4 ? "#FFFFFF" : "#279A82",
            }}
            onClick={() => handleOpenVideo(4)}
          >
            Play Video 2
          </Button>
        </div>

        <Row className="mt-4">
          <Col>
            {activeButton && (activeButton === 3 || activeButton === 4) && (
              <video
                ref={videoRef}
                className="video-player"
                width="100%"
                height="400"
                controls
              >
                <source
                  src={
                    activeButton === 3
                      ? videoUrl
                      : activeButton === 4
                      ? videoUrl1
                      : null
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </Col>
        </Row>

        {documentContent && (activeButton === 1 || activeButton === 2) && (
          <div
            className="document-content mt-4"
            dangerouslySetInnerHTML={{ __html: documentContent }}
          />
        )}
      </Container>
    </div>
  );
};

export default DocumentViewer;
