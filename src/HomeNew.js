import React, { useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";

const HomeNew = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAddFarmerClick = () => {
    navigate("/AddFromNew");
  };

  const handleListFarmerClick = () => {
    navigate("/ListFarmer");
  };

  const handleDocumentClick = () => {
    navigate("/Document");
  };
  const handleVedioClick = () => {
    navigate("/video");
  };

  return (
    <div
      id="backgroundimages"
      style={{
        backgroundImage: `url(/images/BG.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Container>
        <Card
          className="text-center"
          style={{
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <Card.Body className="mt-5">
            <Card.Text
              style={{
                fontFamily: "Inter",
                fontSize: "28px",
                fontWeight: 800,
                lineHeight: "33.89px",
                textAlign: "left",
                color: "#003B49",
              }}
            >
              <strong>
                Discover sustainable intensification technologies tailored to
                enhance soil health right in your location
              </strong>
            </Card.Text>

            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="primary"
                size="lg"
                style={{
                  padding: "10px 10px",
                  borderRadius: "6px",
                  background: "#279A82",
                  border: "1px solid #279A82",
                }}
                onClick={handleAddFarmerClick}
              >
                Add Farmer
              </Button>
              <Button
                variant="primary"
                size="lg"
                // style={{
                //   padding: "10px 10px",
                //   borderRadius: "6px",
                //   background: "#FFFFFF",
                //   border: "1px solid #279A82",
                //   color: "#279A82",
                // }}
                style={{
                  padding: "10px 10px",
                  borderRadius: "6px",
                  background: "#279A82",
                  border: "1px solid #279A82",
                }}
                onClick={handleListFarmerClick}
              >
                List of Farmers
              </Button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button
                variant="primary"
                size="lg"
                style={{
                  padding: "10px 10px",
                  borderRadius: "6px",
                  background: "#FFFFFF",
                  border: "1px solid #279A82",
                  color: "#279A82",
                }}
                onClick={handleDocumentClick}
              >
                Document
              </Button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button
                variant="primary"
                size="lg"
                style={{
                  padding: "10px 10px",
                  borderRadius: "6px",
                  background: "#FFFFFF",
                  border: "1px solid #279A82",
                  color: "#279A82",
                }}
                onClick={handleVedioClick}
              >
                Videos
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default HomeNew;
