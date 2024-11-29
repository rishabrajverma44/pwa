import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  faLocationDot,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

const FarmerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const farmer = location.state?.farmer || {};

  const [sectionOne, setSectionOne] = useState({
    Land_Preparation: [
      { green_card: ["Ripping"] },
      {
        yellow_card: [
          "Conservation Agriculture",
          "Planting basins",
          "Tied ridges",
        ],
      },
      { gray_card: ["Permanently raised beds"] },
    ],
    "Choice of Doubled-up Legume Rotation (DLR) Crops": [
      {
        green_card: [
          "Doubled-up legume rotation: Pigeon pea + soybean",
          "Doubled -up legume rotation: Pigeon pea + cowpea",
        ],
      },
      {
        gray_card: ["Doubled -up legume rotation: Pigeon pea + groundnut"],
      },
    ],
    Nutrient_Management: [
      {
        green_card: [
          "Inorganic Fertilizer - NPK & Urea",
          "Livestock Manure: High quality manure (poultry/pig)",
          "Combined Fertilizer: Low quality manure + N fertilizer",
          "Combined Fertilizer: Low quality manure + N fertilizer",
        ],
        yellow_card: ["Combined Fertilizer: Green manuring legumes"],
      },
    ],
    Agroforestry: [
      {
        green_card: ["Gliricidia-maize intercropping"],
      },
      {
        yellow_card: ["Biomass transfer"],
      },
    ],
  });
  const [sectionTwo, setSectionTwo] = useState({
    Land_Preparation: [
      { green_card: ["Conservation Agriculture"] },
      {
        yellow_card: ["Planting basins"],
      },
      { gray_card: ["Ripping", "Tied ridges", "Permanently raised beds"] },
    ],
    "Choice of Doubled-up Legume Rotation (DLR) Crops": [
      {
        green_card: ["Doubled -up legume rotation: Pigeon pea + groundnut"],
      },
      {
        gray_card: [
          "Doubled -up legume rotation: Pigeon pea + cowpea",
          "Doubled -up legume rotation: Pigeon pea + cowpea",
        ],
      },
    ],
    Nutrient_Management: [
      {
        green_card: [
          "Livestock Manure: High quality manure (poultry/pig)",
          "Combined Fertilizer: High quality manure + N fertilizer",
        ],
        gray_card: [
          "Combined Fertilizer: Low quality manure + N fertilizer",
          "Nutrient Management: Inorganic Fertilizer - NPK & Urea",
          "Combined Fertilizer: Green manuring legumes",
        ],
      },
    ],
    Agroforestry: [
      {
        green_card: ["Gliricidia-maize intercropping"],
      },
      {
        gray_card: ["Biomass transfer"],
      },
    ],
  });
  const [sectionThree, setSectionThree] = useState({
    Land_Preparation: [
      { green_card: ["Ripping"] },
      {
        yellow_card: ["Planting basins", "Conservation Agriculture"],
      },
      { gray_card: ["Permanently raised beds", "Tied ridges"] },
    ],
    "Choice of Doubled-up Legume Rotation (DLR) Crops": [
      {
        green_card: ["Doubled -up legume rotation: Pigeon pea + cowpea"],
      },
      { yellow_card: ["Doubled -up legume rotation: Pigeon pea + soybean"] },
      {
        gray_card: ["Doubled -up legume rotation: Pigeon pea + groundnut"],
      },
    ],
    Nutrient_Management: [
      {
        green_card: [
          "Management: Inorganic Fertilizer - NPK",
          "Combined Fertilizer: High quality manure + N fertilizer",
        ],
        gray_card: [
          "Livestock Manure: High quality manure (poultry/pig)",
          "CombinedFertilizer:Greenmanuring",
        ],
        yellow_card: ["Combined Fertilizer: Low quality manure + N fertilizer"],
      },
    ],
    Agroforestry: [
      {
        green_card: ["Gliricidia-maize intercropping"],
      },
      {
        gray_card: ["Biomass transfer"],
      },
    ],
  });
  const [sectionFour, setSectionFour] = useState({
    Land_Preparation: [
      { green_card: ["Conservation Agriculture"] },
      { gray_card: ["Ripping", "Permanently raised beds"] },
      {
        yellow_card: ["Tied ridges", "Planting basins"],
      },
    ],
    "Choice of Doubled-up Legume Rotation (DLR) Crops": [
      {
        green_card: [
          "Doubled -up legume rotation: Pigeon pea + groundnut",
          "Doubled -up legume rotation: Pigeon pea + cowpea",
        ],
      },
      { yellow_card: ["Doubled -up legume rotation: Pigeon pea + soybean"] },
    ],
    Nutrient_Management: [
      {
        green_card: [
          "Inorganic Fertilizer - NPK & Urea",
          "Livestock Manure: High quality manure (poultry/pig)",
          "Combined Fertilizer: High quality manure + N fertilizer",
        ],
        yellow_card: ["Combined Fertilizer: Low quality manure + N fertilizer"],
        gray_card: ["Combined Fertilizer : Greenmanuring"],
      },
    ],
    Agroforestry: [
      {
        green_card: ["Gliricidia-maize intercropping"],
      },
      {
        gray_card: ["Biomass transfer"],
      },
    ],
  });
  const [sectionFive, setSectionFive] = useState({
    Land_Preparation: [
      { green_card: ["Permanently raised beds"] },
      {
        yellow_card: ["Ripping"],
      },
      {
        gray_card: [
          "Conservation Agriculture",
          "Tied ridges",
          "Planting basins",
        ],
      },
    ],
    "Choice of Doubled-up Legume Rotation (DLR) Crops": [
      {
        green_card: ["Planting Density: High maize density"],
      },
      {
        yellow_card: [
          "Planting Density: High legume density",
          "Doubled -up legume rotation: Pigeon pea + soybean",
        ],
      },
      {
        gray_card: ["Doubled -up legume rotation: Pigeon pea + cowpea"],
      },
    ],
    Nutrient_Management: [
      {
        green_card: [
          "Nutrient Management: Inorganic Fertilizer - NPK & Urea",
          "Combined Fertilizer: High quality manure + N fertilizer",
        ],
        yellow_card: [
          "Combined Fertilizer: Low quality manure + N fertilizer",
          "Combined Fertilizer: Green manuring",
        ],
        gray_card: ["Livestock Manure: High quality manure (poultry/pig)"],
      },
    ],
    Agroforestry: [
      {
        green_card: ["Gliricidia-maize intercropping"],
      },
      { yellow_card: ["Biomass transfer"] },
    ],
  });
  const [sectionSix, setSectionSix] = useState({
    Land_Preparation: [
      { green_card: ["Conservation Agriculture"] },
      {
        yellow_card: [
          "Ripping",
          "Tied ridges",
          "Planting basins",
          "Permanently raised beds",
        ],
      },
    ],
    "Choice of Doubled-up Legume Rotation (DLR) Crops": [
      {
        yellow_card: [
          "Doubled -up legume rotation: Pigeon pea + groundnut",
          "Doubled -up legume rotation: Pigeon pea + soybean",
        ],
        gray_card: ["Doubled -up legume rotation: Pigeon pea + cowpea"],
      },
    ],
    Nutrient_Management: [
      {
        green_card: [
          "Nutrient Management: Inorganic Fertilizer - NPK & Ur",
          "Livestock Manure: High quality manure (poultry/pig)",
          "Combined Fertilizer: High quality manure + N fertilizer",
        ],
        yellow_card: ["Combined Fertilizer: Low quality manure + N fertilizer"],
        gray_card: ["Combined Fertilizer: Green manuring legumes"],
      },
    ],
    Agroforestry: [
      {
        green_card: ["Gliricidia-maize intercropping", "Biomass transfer"],
      },
    ],
  });
  const [sections, setSections] = useState({});
  const LoadData = () => {
    if (
      farmer.agroClimaticZone == "Lakeshore" &&
      farmer.soilTexture == "Clayey"
    ) {
      setSections(sectionOne);
    } else if (
      farmer.agroClimaticZone == "Lakeshore" &&
      farmer.soilTexture == "Sandy"
    ) {
      setSections(sectionTwo);
    } else if (
      farmer.agroClimaticZone == "Mid-Altitude" &&
      farmer.soilTexture == "Clayey"
    ) {
      setSections(sectionThree);
    } else if (
      farmer.agroClimaticZone == "Mid-Altitude" &&
      farmer.soilTexture == "Sandy"
    ) {
      setSections(sectionFour);
    } else if (
      farmer.agroClimaticZone == "High-Altitude" &&
      farmer.soilTexture == "Clayey"
    ) {
      setSections(sectionFive);
    } else if (
      farmer.agroClimaticZone == "High-Altitude" &&
      farmer.soilTexture == "Sandy"
    ) {
      setSections(sectionSix);
    }
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <Container className="my-5">
      <div
        style={{ cursor: "pointer" }}
        className="my-4"
        onClick={() => navigate("/ListFarmer")}
      >
        <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: "5px" }} />
        <b>Farmers Details</b>
      </div>
      <Card className="p-2">
        <h5>
          <div className="d-flex justify-content-between">
            <div>{farmer.farmerName || "Farmer Name"}</div>
            <div style={{ color: "#6B7280" }}>
              {farmer.farmerMobile || "Farmer Mobile"}
            </div>
          </div>
        </h5>
        <div className="d-flex">
          <div className="fw-bold" style={{ width: "30%" }}>
            Location :
          </div>
          <div style={{ width: "70%" }}>
            <p style={{ color: "#6B7280" }}>
              {farmer.stateName}, {farmer.districtName}, {farmer.villageName}
            </p>
          </div>
        </div>
      </Card>

      <div className="my-3">
        {Object.entries(sections).map(([sectionName, cards]) => (
          <Card key={sectionName} className="p-2 my-2">
            <h2 className="text-xl font-bold mb-2">
              {sectionName.replace(/_/g, " ")}
            </h2>
            <div>
              <Row className="mb-1">
                {cards.map((cardObj, index) =>
                  Object.entries(cardObj).map(([cardType, items]) => {
                    if (cardType === "green_card") {
                      return (
                        <Col key={`green-card-${index}`} md={12}>
                          <Card className="flex-fill h-100">
                            <div
                              className="rounded-top py-2 px-4"
                              style={greenCardStyle}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faThumbsUp} />
                                <h6 className="mb-0">BEST BET</h6>
                              </div>
                              <p className="p-0 m-0">
                                Encouraged practices that can help
                              </p>
                            </div>
                            <Card.Body className="p-0 m-0 bg-card-body">
                              <Card.Text className="p-2">
                                {items.map((item, id) => (
                                  <p key={id} className="p-0 m-0">
                                    {id + 1}.{" "}
                                    <span style={{ color: "#6B7280" }}>
                                      {item}
                                    </span>
                                  </p>
                                ))}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    }
                    return null;
                  })
                )}
              </Row>

              <Row className="gap-2">
                {cards.map((cardObj, index) =>
                  Object.entries(cardObj).map(([cardType, items]) => {
                    if (
                      cardType === "yellow_card" ||
                      cardType === "gray_card"
                    ) {
                      return (
                        <Col
                          key={`${cardType}-${index}`}
                          md={6}
                          sm={12}
                          className="mb-1"
                        >
                          <Card className="flex-fill h-100">
                            <div
                              className="rounded-top py-2 px-4"
                              style={
                                cardType === "yellow_card"
                                  ? yellowCardStyle
                                  : grayCardStyle
                              }
                            >
                              <div className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon
                                  icon={
                                    cardType === "yellow_card"
                                      ? faTriangleExclamation
                                      : faThumbsDown
                                  }
                                />
                                <h6 className="mb-0">
                                  {cardType === "yellow_card"
                                    ? "VIABLE"
                                    : "LESS VIABLE"}
                                </h6>
                              </div>
                              <p className="p-0 m-0">
                                {cardType === "yellow_card"
                                  ? "Tryout with Caution"
                                  : "Practices with Challenges"}
                              </p>
                            </div>
                            <Card.Body className="p-0 m-0 bg-card-body">
                              <Card.Text className="p-2">
                                {items.map((item, idx) => (
                                  <p key={idx} className="p-0 m-0">
                                    {idx + 1}.{" "}
                                    <span style={{ color: "#6B7280" }}>
                                      {item}
                                    </span>
                                  </p>
                                ))}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    }
                    return null;
                  })
                )}
              </Row>
            </div>
          </Card>
        ))}
      </div>

      <Row className="mb-3">
        <Col md={6} xs={6}>
          <Button
            className="w-100"
            variant="primary"
            onClick={() => navigate("/AddFromNew")}
            size="lg"
            style={{
              padding: "10px 10px",
              borderRadius: "6px 6px 6px 6px",
              background: "#279A82",
              border: "1px solid #279A82",
            }}
          >
            Add Farmer
          </Button>
        </Col>
        <Col md={6} xs={6}>
          <Button
            className="w-100"
            variant="primary"
            onClick={() => navigate("/ListFarmer")}
            size="lg"
            style={{
              padding: "10px 10px",
              borderRadius: "6px 6px 6px 6px",
              background: "#FFFFFF",
              border: "1px solid #279A82",
              color: "#279A82",
            }}
          >
            See List
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const greenCardStyle = {
  backgroundColor: "#8BC943",
  color: "#1E1E1E",
};

const yellowCardStyle = {
  backgroundColor: "#FAE681",
  color: "#1E1E1E",
};

const grayCardStyle = {
  backgroundColor: "#AFAFAF",
  color: "#1E1E1E",
};

export default FarmerDetails;
