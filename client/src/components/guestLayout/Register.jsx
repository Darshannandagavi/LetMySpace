import React, { useEffect, useState } from "react";
import Loader from "../CustomStyles/Loader";
import axios from "axios";
import { Row, Col, Form, Alert, Button, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import CustomCursor from "../CustomStyles/CustomCursor";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: "linear",
      once: true,
    });
  }, []);
  const today = new Date().toISOString().split("T")[0];
  const [loader, setLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [spammer, setSpammer] = useState();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emailVerification: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    profilePicture: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    maritalStatus: "",
    userName: "",
    password: "",
    confirmPassword: "",
    userStatus: "inactive",
    role: "User",
  });

  //handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
    console.log(e.target.value);
    if (registerData.dob > today) {
      console.log("enter valid date");
    }
  };
  const handleVerify = async () => {
    if (registerData.email.includes("@gmail.com")) {
      setLoader(true);
      try {
        const res = await axios.post(`http://localhost:8000/user/verifyEmail`, {
          email: registerData.email,
        });
        const audio = new Audio("/Success_Sound.mp3");
        audio.currentTime = 1;
        audio.play();
        console.log(res.data.verificationCode);
        setSuccessMessage("Email Verification Code sent");
      } catch (error) {
        setError("Error in sending verification code");
        const audio = new Audio("/Error_Sound.mp3");
        audio.currentTime = 0.5;
        audio.play();
        console.log(error);
      }
    }
    setLoader(false);
  };
  //handle file change for image upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        alert("Please upload a valid image file");
        setImage(null);
        setImagePreview(null);
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);

    const form = event.currentTarget;
    //trigger bootstrap validation styles
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true); //mark the form as validated
    //if the form is valid,proceed with file upload and user registration
    if (form.checkValidity()) {
      try {
        const spammer = await axios.post("http://localhost:8000/user/spam", {
          email: registerData.email,
        });
        if (spammer) setSpammer(true);
      } catch (error) {
        console.log("error in spam check:", error);
        setError("Error in Spam check");
      }
      if (spammer) {
        setError();
        setError("you are banned from this site ");
      } else {
        try {
          let filePath = "";
          //if there's an image file,upload it first
          if (image) {
            const formData = new FormData();
            formData.append("file", image);
            //upload the file
            const uploadResponse = await axios.post(
              "http://localhost:8000/upload",
              formData,
              {
                headers: { "Content-type": "multipart/form-data" },
              }
            );
            if (uploadResponse.data.filePath) {
              filePath = uploadResponse.data.filePath;
            } else {
              setError("File upload failed.please try again.");
              setSuccessMessage("");
              return;
            }
          }
          // Now, include the filePath in the registerData and proceed with user registration
          const updateRegisterData = {
            ...registerData,
            profilePicture: filePath,
          };
          //send the registration data to backend API
          const registerResponse = await axios.post(
            "http://localhost:8000/user",
            updateRegisterData
          );
          if (registerResponse.status === 201) {
            setSuccessMessage("User registered successfully"); //set success message
            setError("");
            const audio = new Audio("/Success_Sound.mp3");
            audio.currentTime = 1;
            audio.play();
            setRegisterData({
              firstName: "",
              lastName: "",
              email: "",
              emailVerification: "",
              phoneNumber: "",
              gender: "",
              dob: "",
              profilePicture: "",
              country: "",
              state: "",
              city: "",
              pincode: "",
              address: "",
              maritalStatus: "",
              userName: "",
              password: "",
              confirmPassword: "",
              userStatus: "inactive",
              role: "User",
            });
            setImage("");
            setImagePreview(null);
          } else if (registerResponse.status === 420) {
            setError("Invalid Verification Code");
            const audio = new Audio("/Error_Sound.mp3");
            audio.currentTime = 0.5;
            audio.play();
            console.log("invalid verification code");
          } else {
            setError("Error registering user.Please try again.");
            setSuccessMessage("");
            const audio = new Audio("/Error_Sound.mp3");
            audio.currentTime = 0.5;
            audio.play();
          }
        } catch (error) {
          setError(
            error.response?.data?.message ||
              "Error uploading file or registering user.please try again."
          );
          const audio = new Audio("/Error_Sound.mp3");
          audio.currentTime = 0.5;
          audio.play();
          setSuccessMessage("");
          console.log(error);
        }
      }
    }
  };
  const styles = {
    border: "2px solid black",
    backgroundImage:
      "linear-gradient(rgba(255, 147, 15,0.3),rgba(255, 249, 91,0.3))",
    borderRadius: "0 30px",
  };
  return (
    <div
      style={{
        padding: "5vw",
        backgroundImage:
          "linear-gradient(rgba(255, 147, 15,0.1),rgba(255, 249, 91,0.1),rgba(255,147,15,0.1))",
      }}
    >
      <CustomCursor color="red" size="20px" index="0" />

      <Container style={styles} data-aos="fade-down">
        <center>
          <h2>Register</h2>
        </center>
        <div>
          {loader && <Loader size="30px" border="6px" color="rgb(0, 0, 0)" />}
        </div>
        {error && (
          <Alert variant="danger" dismissible>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" dismissible>
            {successMessage}
          </Alert>
        )}
        <Form
          noValidate
          onSubmit={handleSubmit}
          validated={validated ? true : false}
        >
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="first name"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleChange}
                  required
                  pattern="[a-zA-Z]{2,9}"
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid first name (2-9 characters,alphabets
                  only)
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleChange}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Label>verification</Form.Label>
              <br />
              <Button onClick={handleVerify}>Get verification code</Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="verificationCode">
                <Form.Label>verification code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Verification Code sent to email"
                  name="emailVerification"
                  value={registerData.emailVerification}
                  onChange={handleChange}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid code
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Phone number"
                  name="phoneNumber"
                  value={registerData.phoneNumber}
                  onChange={handleChange}
                  required
                  pattern="[6789][0-9]{9}"
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid phone number (10 digits) and it should
                  start from 6, 7, 8, and 9
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={registerData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a gender.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="maritalStatus">
                <Form.Label>Marital Status</Form.Label>
                <Form.Control
                  as="select"
                  name="maritalStatus"
                  value={registerData.maritalStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a marital status.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={registerData.dob}
                  onChange={handleChange}
                  max={today}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select valid date of birth.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleFileChange}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                Please upload a valid image file.
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={9}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={registerData.address}
                  onChange={handleChange}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter an address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="pincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pincode"
                  value={registerData.pincode}
                  name="pincode"
                  onChange={handleChange}
                  required
                  minLength={6}
                  maxLength={6}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid pincode.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City"
                  value={registerData.city}
                  onChange={handleChange}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a city.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="state"
                  name="state"
                  value={registerData.state}
                  onChange={handleChange}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a state.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="country">
                <Form.Label>country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="country"
                  name="country"
                  value={registerData.country}
                  onChange={handleChange}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a country.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="userName"
              value={registerData.userName}
              onChange={handleChange}
              required
              autoComplete="new-password"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please enter a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  autoComplete="new-password"
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Password must be at least 6 characters.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <Form.Control.Feedback type="invalid">
                  Passwords must match.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="text-center" style={{ lineHeight: "20px" }}>
              <Nav.Link as={NavLink} to={"/login"}>
                already have an Account?
              </Nav.Link>
            </Col>
            <Col md={6} className="text-center">
              <Button
                type="submit"
                variant="primary"
                className="mb-3 mt-2"
                style={{ justifyContent: "center" }}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
