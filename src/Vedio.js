import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { openDB } from 'idb';

const VedioViewer = () => {
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState("/demo.mp4");
  const [videoUrl1, setVideoUrl1] = useState("/newdemo.mp4");
  const [activeButton, setActiveButton] = useState(1);

  const saveVideosToIndexedDB = async () => {
    try {
      const db = await openDB("videoDatabase", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("videos")) {
            db.createObjectStore("videos");
          }
        },
      });

      // Fetch the video files from public directory or other source
      const response1 = await fetch("/demo.mp4");
      const blob1 = await response1.blob();

      const response2 = await fetch("/newdemo.mp4");
      const blob2 = await response2.blob();

      // Save the videos to IndexedDB
      await db.put("videos", blob1, "demoVideo");
      await db.put("videos", blob2, "demoVideo1");
    } catch (error) {
      console.error("Failed to save videos to IndexedDB:", error);
    }
  };


  const getVideosFromIndexedDB = async () => {
    try {
      const db = await openDB("videoDatabase", 1);
      const videoBlob = await db.get("videos", "demoVideo");
      const videoBlob1 = await db.get("videos", "demoVideo1");

      if (videoBlob) {
        const videoURL = URL.createObjectURL(videoBlob);
        setVideoUrl(videoURL);
      }

      if (videoBlob1) {
        const videoURL1 = URL.createObjectURL(videoBlob1);
        setVideoUrl1(videoURL1);
      }
      if (!videoBlob && !videoBlob1) {
        console.log("Videos not found in IndexedDB.");
      }
    } catch (error) {
      console.error("Failed to retrieve videos from IndexedDB:", error);
    }
  };

  useEffect(() => {
    saveVideosToIndexedDB();
  }, []);


  const handleOpenVideo = (state) => {
     setActiveButton(state)
     getVideosFromIndexedDB();
   
  };

  return (
    <div>
      <Container className="my-4">
     
        <div
          style={{ cursor: "pointer", marginBottom: "10px" }}
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: "5px" }} />
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
            onClick={()=>handleOpenVideo(1)}
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
            onClick={()=>handleOpenVideo(2)}
          >
            Play Video 2
          </Button>
        </div>

        <Row className="mt-4">
          <Col>
            {videoUrl && (
              <iframe
                className="video-iframe"
                width="100%"
                height="400"
                src={activeButton==1?videoUrl:videoUrl1}
                title="Video Player"
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default VedioViewer;
