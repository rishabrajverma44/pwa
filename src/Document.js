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
        </div>

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
