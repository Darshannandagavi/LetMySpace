import React, { useState } from "react";
import { Col, Row, Form, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PropertyUploader = () => {
  const navigate=useNavigate();
  const userEmail = localStorage.getItem("email");
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(false);
  const [showError, setShowError] = useState();
  const [showSuccess, setShowSuccess] = useState();
  const [propertyData, setPropertyData] = useState({
    propertyType: "RentHome",
    propertyOwner: "",
    propertySize: "",
    propertyWorth: "",
    ownerContact: "",
    ownerEmail: userEmail,
    propertyLocation: "",
    propImg1: "",
    landType: "",
    builtYear: "",
    description: "",
    bathrooms: "",
    bedrooms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
    console.log(propertyData);
  };
  const handleFileChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImage(true);
      setPropertyData({
        ...propertyData,
        propImg1: img, // Assign the file object directly
      });
    }
  };

  const handleSubmit = async (event) => {
    let filepath = "";
    event.preventDefault();
    window.scrollTo(0, 0);
    setLoader(true);
    if (propertyData.propImg1) {
      console.log("first");
      const formdata = new FormData();
      formdata.append("propImg1", propertyData.propImg1);
      try {
        const uploadResponse = await axios.post(
          "http://localhost:8000/propertyImages",
          formdata,
          {
            headers: { "Content-type": "multipart/form-data" },
          }
        );
        console.log(uploadResponse.data.filepath);
        if (uploadResponse.data.filepath) {
          filepath = uploadResponse.data.filepath;
        }
        console.log("uploaded image in database");
      } catch (error) {
        console.log("error in uploading image");
      }
    }
    try {
      const finalpropertyData = {
        ...propertyData,
        propImg1: filepath || propertyData.propImg1,
      };
      const result = await axios.post(
        "http://localhost:8000/user/propertyUploader",
        finalpropertyData
      );
      if (result.status === 200) {
        setShowSuccess("property data uploaded successfully");
          const audio = new Audio("/Success_Sound.mp3");
          audio.currentTime=1;
          audio.play();
        setShowError("");
        setPropertyData({
          propertyType: "RentHome",
          propertyOwner: "",
          propertySize: "",
          propertyWorth: "",
          ownerContact: "",
          propertyLocation: "",
          landType: "",
          builtYear: "",
          description: "",
          bathrooms: "",
          bedrooms: "",
        });
        window.location.reload();
      } else {
        setShowError("Error in uploading property Data");
        setShowSuccess("");
      }
    } catch (error) {
      setShowError("Error in uploading Property data");
      setShowSuccess("");
    } finally {
      setLoader(false);
    }
  };

  const containerStyle = {
    border: "2px solid white",
    padding: "2vw",
    borderRadius: "0px 40px 0px 40px",
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0px 0px 25px black",
    backdropFilter: "blur(10px)",
    color: "white",
  };

  // Map property types to their respective labels
  const propertyLabels = {
    null: "Home Price",
    RentHome: "Monthly Rent Amount",
    SaleHome: "Home Price",
    RentShop: "Shop Rent Price",
    SaleShop: "Shop Sale Price",
    SaleLand: "Land Price",
  };
  const propertySize = {
    null: "Home Size",
    RentHome: "Home Size",
    SaleHome: "Home Size",
    RentShop: "Shop Size",
    SaleShop: "Shop Size",
    SaleLand: "Land Size",
  };
  return (
    <>
      {userEmail && <div
        style={{
          display: "flex",
          padding: "4vw 0",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          height:"100vh",
          boxShadow: "0px 0px 25px black",
          // backgroundPosition: "100% 50%",
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2023/11/24/17/22/city-8410353_1280.jpg)",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Container style={containerStyle}>
            <h2 className="text-center mb-5">Upload Property</h2>
            {showError && (
              <Alert variant="danger" value={showError} dismissible>
                {showError}
              </Alert>
            )}
            {showSuccess && (
              <Alert variant="success" value={showSuccess} dismissible>
                {showSuccess}
              </Alert>
            )}
            {loader && (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundImage:
                    "linear-gradient(rgba(105, 115, 250, 0.22),rgba(238, 218, 163, 0.36))",
                  backdropFilter: "blur(30px)",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  borderRadius: "inherit",
                  textAlign: "right",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://i.pinimg.com/originals/a3/98/59/a39859d44ad68f19326456c71900eaf6.gif"
                  alt=""
                  height="200px"
                  width="200px"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </div>
            )}
            <Row className="mb-2 mt-2">
              <Col md={4}>
                <Form.Group controlId="propertyOwner" className="mb-2 mt-2">
                  <Form.Label>Name of Property Owner</Form.Label>
                  <Form.Control
                    type="text"
                    name="propertyOwner"
                    placeholder="Enter Your Name"
                    value={propertyData.propertyOwner}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter the value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="propertyType" className="mb-2 mt-2">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="propertyType"
                    value={propertyData.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select Property Type
                    </option>
                    <option value="RentHome">Home for Rent</option>
                    <option value="SaleHome">Home for Sale</option>
                    <option value="RentShop">Shop for Rent</option>
                    <option value="SaleShop">Shop for Sale</option>
                    <option value="SaleLand">Land for Sale</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select a type of property.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {propertyData.propertyType && (
                <Col md={4}>
                  <Form.Group controlId="propertySize" className="mb-2 mt-2">
                    <Form.Label>
                      {propertySize[propertyData.propertyType]}
                    </Form.Label>{" "}
                    {/* Dynamic label */}
                    <Form.Control
                      type="text"
                      name="propertySize"
                      value={propertyData.propertySize}
                      onChange={handleChange}
                      placeholder={propertySize[propertyData.propertyType]}
                      required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please enter the value.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Row className="mb-2 mt-2">
              {propertyData.propertyType && (
                <Col md={4}>
                  <Form.Group controlId="propertyWorth" className="mb-2 mt-2">
                    <Form.Label>
                      {propertyLabels[propertyData.propertyType]}
                    </Form.Label>{" "}
                    {/* Dynamic label */}
                    <Form.Control
                      type="number"
                      name="propertyWorth"
                      value={propertyData.propertyWorth}
                      onChange={handleChange}
                      placeholder={propertyLabels[propertyData.propertyType]}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the value.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              <Col md={4}>
                <Form.Group controlId="ownerContact" className="mb-2 mt-2">
                  <Form.Label>Contact Number</Form.Label>
                  {/* Dynamic label */}
                  <Form.Control
                    type="tel"
                    name="ownerContact"
                    value={propertyData.ownerContact}
                    onChange={handleChange}
                    placeholder="Enter Your Contact Number"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="propertyLocation" className="mb-2 mt-2">
                  <Form.Label>Property Location</Form.Label>
                  {/* Dynamic label */}
                  <Form.Control
                    type="text"
                    name="propertyLocation"
                    value={propertyData.propertyLocation}
                    onChange={handleChange}
                    placeholder="Enter property location"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2 mt-2">
              {(propertyData.propertyType === "SaleHome" ||
                propertyData.propertyType === "RentHome") && (
                <Col md={4}>
                  <Form.Group controlId="bedrooms" className="mb-2 mt-2">
                    <Form.Label>number of bedrooms</Form.Label>

                    <Form.Control
                      type="number"
                      name="bedrooms"
                      value={propertyData.bedrooms}
                      onChange={handleChange}
                      placeholder="Enter number of bedrooms"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the value.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              {(propertyData.propertyType === "SaleHome" ||
                propertyData.propertyType === "RentHome") && (
                <Col md={4}>
                  <Form.Group controlId="bathrooms" className="mb-2 mt-2">
                    <Form.Label>number of bathrooms</Form.Label>

                    <Form.Control
                      type="number"
                      name="bathrooms"
                      value={propertyData.bathrooms}
                      onChange={handleChange}
                      placeholder="Enter number of bathrooms"
                      min={0}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the value.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}

              {propertyData.propertyType === "SaleHome" && (
                <Col md={4}>
                  <Form.Group controlId="builtYear" className="mb-2 mt-2">
                    <Form.Label>Home built year</Form.Label>

                    <Form.Control
                      type="number"
                      name="builtYear"
                      value={propertyData.builtYear}
                      onChange={handleChange}
                      placeholder="Enter built year"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the value.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}

              {propertyData.propertyType === "SaleLand" && (
                <Col md={4}>
                  <Form.Group controlId="landType" className="mb-2 mt-2">
                    <Form.Label>Land Type</Form.Label>

                    <Form.Control
                      as="select"
                      name="landType"
                      value={propertyData.landType}
                      onChange={handleChange}
                    >
                      <option value="">Select Land Type</option>

                      <option value="Non-Irrigated">non-Irrigated</option>
                      <option value="Irrigated">Irrigated</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please enter the value.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Row className="mb-2 mt-2">
              <Col md={4}>
                <label>Add property images</label>

                <div
                  htmlFor="propImg1"
                  style={{
                    height: "100px",
                    width: "100px",
                    border: "2px solid white",
                    borderRadius: "10px",
                    background: image ? "rgba(21, 255, 0, 0.27)" : null,
                    textAlign: "center",
                    lineHeight: "40px",
                    marginTop: "20px",
                  }}
                >
                  <label
                    htmlFor="propImg1"
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                      textAlign: "center",
                      position: "relative",
                      lineHeight: "100px",
                      width: "100%",
                    }}
                  >
                    +
                  </label>
                  <input
                    type="file"
                    name="propImg1"
                    id="propImg1"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      height: "1px",
                      width: "1px",
                      position: "relative",
                      top: "-50%",
                      overflow: "hidden",
                    }}
                  />
                </div>
              </Col>

              <Col md={8}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter some advantages of your property 
                   1.Near School 
                   2.Near Market  
                   3.Near Bus Stand
                   4.Near Hospital
                   5.Near Temple"
                  rows={5}
                  name="description"
                  onChange={handleChange}
                ></Form.Control>
              </Col>
            </Row>
            <Col className="text-center mt-5">
              <Button style={{ padding: "7px 15px" }} type="submit">
                Upload
              </Button>
            </Col>
          </Container>
        </Form>
      </div>}
     
      {!userEmail && <div style={{height:"70vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h1>Unlock the uploader - <Button style={{fontSize:"20px"}} onClick={()=>{navigate("/login")}}>Log-In</Button> to list your property now!</h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>}
    </>
  );
};

export default PropertyUploader;
