import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faLocationDot,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

const FarmerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const farmer = location.state?.farmer || {};

  let recommendations = {};
  let hedingtest = {};
  if (
    farmer.agroClimaticZone == "Lakeshore" &&
    farmer.soilTexture == "Clayey"
  ) {
    hedingtest = {
      testlableHedind: ["Land Preparation"],
      Choice_of_Combinations: [],
      Choice_of_Carop: ["Choice of Doubled-up Legume Rotation (DLR) Crops"],
      NutrientManagement: ["Nutrient Management"],
      Agroforestry: ["Agroforestry"],
      notSuitable_testlableHedind: [],
      notSuitable_Choice_of_Combinations: [
        "Choice of planting density and Combinations",
      ],
      notSuitable_Choice_of_Carop: [],
      notSuitable_NutrientManagement: [],
      notSuitable_Agroforestry: [],
    };
    recommendations = {
      suitable: {
        landPreparation: ["Ripping", "Permanently raised beds"],
        dLRCombinations: [],
        dLRCrops: [
          "Doubled-up legume rotation: Pigeon pea + soybean ",
          "Doubled-up legume rotation: Pigeon pea + cowpea",
          "Doubled-up legume rotation: Pigeon pea + groundnut",
        ],
        nutrientManagement: [
          "Inorganic Fertilizer - NPK & Urea Mulching",
          "Livestock Manure: High quality manure (poultry/pig)",
          "Combined Fertilizer: Low quality manure + N fertilizer",
          "Combined Fertilizer: High quality manure + N fertilizer",
        ],
        agroforestry: ["Gliricidia-maize intercropping"],
      },

      notSuitable: {
        landPreparation1: [],
        ontsuitabledLRCombination: [
          "Planting Density: Low maize density",
          "Planting Density: Low legume density",
          "Planting Density: High legume density",
        ],
        notdLRCrops: [],
        notnutrientManagement: [],
        notagroforestry: [],
      },
    };

    // } else if (
    //   farmer.agroClimaticZone == "Lakeshore" &&
    //   farmer.soilTexture == "Sandy"
    // ) {
    //   hedingtest = {
    //     testlableHedind: ["Land Preparation"],
    //     Choice_of_Combinations: [],
    //     Choice_of_Carop: ["Choice of Doubled-up Legume Rotation (DLR) Crops"],
    //     NutrientManagement: ["Nutrient Management"],
    //     Agroforestry: ["Agroforestry"],

    //     notSuitable_testlableHedind: ["Land Preparation"],
    //     notSuitable_Choice_of_Combinations: [
    //       "Choice of planting density and Combinations",
    //     ],
    //     notSuitable_Choice_of_Carop: [],
    //     notSuitable_NutrientManagement: ["Nutrient Management"],
    //     notSuitable_Agroforestry: ["Agroforestry"],
    //   };
    //   recommendations = {
    //     suitable: {
    //       landPreparation: ["Conservation Agriculture", "Ripping", "Tied ridges"],
    //       dLRCombinations: [],

    //       dLRCrops: [
    //         "Doubled-up legume rotation: Pigeon pea + soybean",
    //         "Doubled-up legume rotation: Pigeon pea + cowpea",
    //         "Doubled-up legume rotation: Pigeon pea + groundnut",
    //       ],
    //       nutrientManagement: [
    //         "Livestock Manure: High quality manure (poultry/pig)",
    //         "Combined Fertilizer: Low quality manure + N fertilizer",
    //         "Combined Fertilizer: High quality manure + N fertilizer",
    //         " Nutrient Management: Inorganic Fertilizer - NPK & Urea",
    //       ],
    //       agroforestry: ["Gliricidia-maize intercropping"],
    //     },

    //     notSuitable: {
    //       landPreparation1: ["Permanently raised beds "],
    //       ontsuitabledLRCombination: [
    //         "Planting Density: Low maize density",
    //         "Planting Density: Low legume density",
    //         "Planting Density: High legume density",
    //       ],
    //       notdLRCrops: [],
    //       notnutrientManagement: [
    //         "  Combined Fertilizer: Green manuring legumes",
    //       ],
    //       notagroforestry: ["Biomass transfer"],
    //     },
    //   };
    // } else if (
    //   farmer.agroClimaticZone == "Mid-Altitude" &&
    //   farmer.soilTexture == "Clayey"
    // ) {
    //   hedingtest = {
    //     testlableHedind: ["Land Preparation"],
    //     Choice_of_Combinations: [],
    //     Choice_of_Carop: ["Choice of Doubled-up Legume Rotation (DLR) Crops"],
    //     NutrientManagement: ["Nutrient Management"],
    //     Agroforestry: ["Agroforestry"],

    //     notSuitable_testlableHedind: ["Land Preparation"],
    //     notSuitable_Choice_of_Combinations: [
    //       "Choice of planting density and Combinations",
    //     ],
    //     notSuitable_Choice_of_Carop: [],
    //     notSuitable_NutrientManagement: [],
    //     notSuitable_Agroforestry: [],
    //   };

    //   recommendations = {
    //     suitable: {
    //       landPreparation: ["Ripping", "Permanently raised beds"],
    //       dLRCombinations: [],

    //       dLRCrops: [
    //         "Doubled-up legume rotation: Pigeon pea + cowpea",
    //         "Doubled-up legume rotation: Pigeon pea + groundnut",
    //       ],
    //       nutrientManagement: [
    //         "Nutrient Management: Inorganic Fertilizer - NPK & Urea",
    //         " Combined Fertilizer: High quality manure + N fertilizer",
    //         "Livestock Manure: High quality manure (poultry/pig)",
    //         " Combined Fertilizer: Green manuring legumes ",
    //       ],
    //       agroforestry: ["Gliricidia-maize intercropping"],
    //     },

    //     notSuitable: {
    //       landPreparation1: ["Tied ridges"],
    //       ontsuitabledLRCombination: [
    //         "Planting Density: Low maize density",
    //         "Planting Density: Low legume density",
    //       ],
    //       notdLRCrops: [],
    //       notnutrientManagement: [],
    //       notagroforestry: [],
    //     },
    //   };
    // } else if (
    //   farmer.agroClimaticZone == "Mid-Altitude" &&
    //   farmer.soilTexture == "Sandy"
    // ) {
    //   hedingtest = {
    //     testlableHedind: ["Land Preparation"],
    //     Choice_of_Combinations: [],
    //     Choice_of_Carop: ["Choice of Doubled-up Legume Rotation (DLR) Crops"],
    //     NutrientManagement: ["Nutrient Management"],
    //     Agroforestry: ["Agroforestry"],

    //     notSuitable_testlableHedind: ["Land Preparation"],
    //     notSuitable_Choice_of_Combinations: [
    //       "Choice of planting density and Combinations",
    //     ],
    //     notSuitable_Choice_of_Carop: [],
    //     notSuitable_NutrientManagement: [],
    //     notSuitable_Agroforestry: ["Agroforestry"],
    //   };
    //   recommendations = {
    //     suitable: {
    //       landPreparation: ["Conservation Agriculture", "Ripping"],
    //       dLRCombinations: [],
    //       dLRCrops: [
    //         "Doubled-up legume rotation: Pigeon pea + groundnut",
    //         "Doubled-up legume rotation: Pigeon pea + cowpea",
    //       ],
    //       nutrientManagement: [
    //         "Nutrient Management: Inorganic Fertilizer - NPK & Urea",
    //         "Livestock Manure: High quality manure (poultry/pig)",
    //         " Combined Fertilizer: High quality manure + N fertilizer",
    //         " Combined Fertilizer: Green manuring legumes ",
    //       ],
    //       agroforestry: ["Gliricidia-maize intercropping"],
    //     },

    //     notSuitable: {
    //       landPreparation1: ["Permanently raised beds "],
    //       ontsuitabledLRCombination: [
    //         "Planting Density: Low maize density",
    //         "Planting Density: Low legume density",
    //         "Planting Density: High legume density",
    //       ],
    //       notdLRCrops: [],
    //       notnutrientManagement: [],
    //       notagroforestry: ["Biomass transfer "],
    //     },
    //   };
    // } else if (
    //   farmer.agroClimaticZone == "High-Altitude" &&
    //   farmer.soilTexture == "Clayey"
    // ) {
    //   hedingtest = {
    //     testlableHedind: ["Land Preparation"],
    //     Choice_of_Combinations: ["Choice of planting density and Combinations"],
    //     Choice_of_Carop: ["Choice of Doubled-up Legume Rotation (DLR) Crops"],
    //     NutrientManagement: ["Nutrient Management"],
    //     Agroforestry: ["Agroforestry"],

    //     notSuitable_testlableHedind: ["Land Preparation"],
    //     notSuitable_Choice_of_Combinations: [
    //       "Choice of planting density and Combinations",
    //     ],
    //     notSuitable_Choice_of_Carop: [
    //       "Choice of Doubled-up Legume Rotation (DLR) Crops",
    //     ],
    //     notSuitable_NutrientManagement: [],
    //     notSuitable_Agroforestry: [],
    //   };
    //   recommendations = {
    //     suitable: {
    //       landPreparation2: ["Permanently raised beds"],
    //       dLRCombinations: ["Planting Density: High maize density"],
    //       dLRCrops: [],
    //       nutrientManagement: [
    //         "Nutrient Management: Inorganic Fertilizer - NPK & Urea",
    //         "Livestock Manure: High quality manure (poultry/pig)",
    //         " Combined Fertilizer: High quality manure + N fertilizer",
    //       ],
    //       agroforestry: ["Gliricidia-maize intercropping"],
    //     },

    //     notSuitable: {
    //       landPreparation1: [
    //         "Conservation Agriculture",
    //         "Tied ridges",
    //         "Planting basins",
    //       ],
    //       ontsuitabledLRCombination: [
    //         "Planting Density: Low maize density",
    //         "Planting Density: Low legume density",
    //       ],
    //       notdLRCrops: [" Doubled-up legume rotation: Pigeon pea + cowpea"],

    //       notnutrientManagement: [],
    //       notagroforestry: [],
    //     },
    //   };
    // } else if (
    //   farmer.agroClimaticZone == "High-Altitude" &&
    //   farmer.soilTexture == "Clayey"
    // ) {
    //   hedingtest = {
    //     testlableHedind: ["Land Preparation"],
    //     Choice_of_Combinations: ["Choice of planting density and Combinations"],
    //     Choice_of_Carop: ["Choice of Doubled-up Legume Rotation (DLR) Crops"],
    //     NutrientManagement: ["Nutrient Management"],
    //     Agroforestry: ["Agroforestry"],

    //     notSuitable_testlableHedind: [],
    //     notSuitable_Choice_of_Combinations: [
    //       "Choice of planting density and Combinations",
    //     ],
    //     notSuitable_Choice_of_Carop: [
    //       "Choice of Doubled-up Legume Rotation (DLR) Crops",
    //     ],
    //     notSuitable_NutrientManagement: ["Nutrient Management"],
    //     notSuitable_Agroforestry: ["Agroforestry"],
    //   };
    //   recommendations = {
    //     suitable: {
    //       landPreparation2: ["Conservation Agriculture"],

    //       dLRCombinations: [
    //         "Planting Density: High maize density",
    //         "Doubled-up legume rotation: Pigeon pea + cowpea",
    //       ],
    //       dLRCrops: [],

    //       nutrientManagement: [
    //         "Nutrient Management: Inorganic Fertilizer - NPK & Urea",
    //         "  Livestock Manure: High quality manure (poultry/pig)",
    //         "  Combined Fertilizer: High quality manure + N fertilizer ",
    //       ],
    //       agroforestry: ["Gliricidia-maize intercropping"],
    //     },

    //     notSuitable: {
    //       landPreparation1: [],
    //       ontsuitabledLRCombination: [
    //         "Planting Density: Low maize density",
    //         "Planting Density: Low legume density",
    //       ],
    //       notdLRCrops: ["Doubled-up legume rotation: Pigeon pea + cowpea"],
    //       notnutrientManagement: [" Combined Fertilizer: Green manuring legumes"],
    //       notagroforestry: ["Biomass transfer"],
    //     },
    //   };
  }
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
      <Card className="p-3 d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div className="user-icon" style={userIconStyle}>
            {farmer.farmerName ? farmer.farmerName[0] : "F"}
          </div>
          <div>
            <h5>{farmer.farmerName || "Farmer Name"}</h5>
            <p className="mb-0" style={{ color: "#6B7280" }}>
              {farmer.farmerMobile || "Farmer Mobile"}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span style={{ color: "#6B7280" }}>
            {farmer.villageName || "Village Name"}
          </span>
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ color: "#279A82", marginLeft: "5px" }}
          />
        </div>
      </Card>

      <div className="my-3">
        {/* <h6> {farmer.farmerName}</h6> */}
        <Row className="mb-3">
          <Col md={12}>
            <h5 className="mb-3 fw-bold">{hedingtest?.testlableHedind}</h5>
          </Col>
          <Col md={6} xs={6}>
            {hedingtest?.testlableHedind?.length > 0 && (
              <Card className="flex-fill h-100">
                <div
                  className="d-flex align-items-center rounded-top gap-2"
                  style={doCardStyle}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <h6 className="mb-0">Better bets</h6>
                </div>
                <Card.Body className="p-0 m-0 bg-card-body">
                  <Card.Text className="p-2" style={{ color: "#6B7280" }}>
                    <span className="py-2">
                      {recommendations?.suitable?.landPreparation?.map(
                        (prep, idx) => (
                          <p key={idx} className="p-0 m-0">
                            {idx + 1}. {prep}
                          </p>
                        )
                      )}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={6} xs={6}>
            {hedingtest?.notSuitable_testlableHedind?.length > 0 && (
              <Card className="flex-fill h-100">
                <div
                  className="d-flex align-items-center rounded-top gap-2"
                  style={dontCardStyle}
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    transform={{ rotate: 180 }}
                  />
                  <h6 className="mb-0" style={{ backgroundColor: "#FAE681" }}>
                    Practises with challenges
                  </h6>
                </div>
                <Card.Body className="p-0 m-0 card-body-footer">
                  <Card.Text className="p-2" style={{ color: "#6B7280" }}>
                    {recommendations?.notSuitable &&
                      recommendations?.notSuitable?.landPreparation1?.map(
                        (prep7, idx7) => (
                          <p key={idx7} className="p-0 m-0">
                            {idx7 + 1}. {prep7}
                          </p>
                        )
                      )}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <h5 className="mb-3 fw-bold">{hedingtest?.Choice_of_Carop}</h5>
          </Col>
          <Col md={6} xs={6}>
            {hedingtest?.Choice_of_Carop?.length > 0 && (
              <Card className="flex-fill h-100">
                <div
                  className="d-flex align-items-center rounded-top gap-2"
                  style={doCardStyle}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <h6 className="mb-0">Better bets</h6>
                </div>
                <Card.Body className="p-0 m-0 bg-card-body">
                  <Card.Text className="p-2" style={{ color: "#6B7280" }}>
                    <span className="py-2">
                      {recommendations?.suitable?.dLRCrops?.map(
                        (prep1, idx1) => (
                          <p key={idx1} className="p-0 m-0">
                            {idx1 + 1}. {prep1}
                          </p>
                        )
                      )}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={6} xs={6}>
            {hedingtest?.notSuitable_Choice_of_Combinations?.length > 0 && (
              <Card className="flex-fill h-100">
                <div
                  className="d-flex align-items-center rounded-top gap-2"
                  style={dontCardStyle}
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    transform={{ rotate: 180 }}
                  />
                  <h6 className="mb-0" style={{ backgroundColor: "#FAE681" }}>
                    Practises with challenges
                  </h6>
                </div>
                <Card.Body className="p-0 m-0 card-body-footer">
                  <Card.Text className="p-2" style={{ color: "#6B7280" }}>
                    {recommendations?.notSuitable &&
                      recommendations?.notSuitable?.ontsuitabledLRCombination?.map(
                        (prep6, idx6) => (
                          <p key={idx6} className="p-0 m-0">
                            {idx6 + 1}. {prep6}
                          </p>
                        )
                      )}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        <Row className="mb-3"></Row>
        <Row className="mb-3">
          <Col md={12}>
            <h5 className="mb-3 fw-bold">{hedingtest?.NutrientManagement}</h5>
          </Col>
          <Col md={6} xs={6}>
            {hedingtest?.NutrientManagement?.length > 0 && (
              <Card className="flex-fill h-100">
                <div
                  className="d-flex align-items-center rounded-top gap-2"
                  style={doCardStyle}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <h6 className="mb-0">Better bets</h6>
                </div>
                <Card.Body className="p-0 m-0 bg-card-body">
                  <Card.Text className="p-2" style={{ color: "#6B7280" }}>
                    <span className="py-2">
                      {recommendations?.suitable?.nutrientManagement?.map(
                        (prep2, idx2) => (
                          <p key={idx2} className="p-0 m-0">
                            {idx2 + 1}. {prep2}
                          </p>
                        )
                      )}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={6} xs={6}>
            {hedingtest?.notSuitable_NutrientManagement?.length > 0 && (
              <Card className="flex-fill h-100">
                <div
                  className="d-flex align-items-center rounded-top gap-2"
                  style={dontCardStyle}
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    transform={{ rotate: 180 }}
                  />
                  <h6 className="mb-0" style={{ backgroundColor: "#FAE681" }}>
                    Practises with challenges
                  </h6>
                </div>
                <Card.Body className="p-0 m-0 card-body-footer">
                  <Card.Text className="p-2" style={{ color: "#6B7280" }}>
                    {recommendations?.notSuitable &&
                      recommendations?.notSuitable?.notnutrientManagement?.map(
                        (prep6, idx6) => (
                          <p key={idx6} className="p-0 m-0">
                            {idx6 + 1}. {prep6}
                          </p>
                        )
                      )}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <h5 className="mb-3 fw-bold">{hedingtest?.Agroforestry}</h5>
          </Col>
          <Col md={6} xs={6}>
            {hedingtest?.Agroforestry?.length > 0 && (
              <Card className="flex-fill h-100">
                <div
                  className="d-flex align-items-center rounded-top gap-2"
                  style={doCardStyle}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <h6 className="mb-0">Better bets</h6>
                </div>
                <Card.Body className="p-0 m-0 bg-card-body">
                  <Card.Text className="p-2" style={{ color: "#6B7280" }}>
                    <span className="py-2">
                      {recommendations?.suitable?.agroforestry?.map(
                        (prep3, idx3) => (
                          <p key={idx3} className="p-0 m-0">
                            {idx3 + 1}. {prep3}
                          </p>
                        )
                      )}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={6} xs={6}>
            {hedingtest?.notSuitable_Agroforestry?.length > 0 && (
              <Card className="flex-fill h-100">
                <div
                  className="d-flex align-items-center rounded-top gap-2"
                  style={dontCardStyle}
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    transform={{ rotate: 180 }}
                  />
                  <h6 className="mb-0" style={{ backgroundColor: "#FAE681" }}>
                    Practises with challenges
                  </h6>
                </div>
                <Card.Body className="p-0 m-0 card-body-footer">
                  <Card.Text className="p-2" style={{ color: "#6B7280" }}>
                    {recommendations?.notSuitable &&
                      recommendations?.notSuitable?.notagroforestry?.map(
                        (prep6, idx6) => (
                          <p key={idx6} className="p-0 m-0">
                            {idx6 + 1}. {prep6}
                          </p>
                        )
                      )}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
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
            See Farmer List
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
const userIconStyle = {
  backgroundColor: "#279A82",
  color: "white",
  fontSize: "24px",
  fontWeight: "bold",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80px",
  height: "80px",
  marginRight: "15px",
};

const doCardStyle = {
  backgroundColor: "#8BC943",
  color: "#000000",
  padding: "10px",
};

const dontCardStyle = {
  backgroundColor: "#FAE681",
  color: "#000000",
  padding: "10px",
};

export default FarmerDetails;
