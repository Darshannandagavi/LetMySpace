import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import BgAnimation from "../CustomStyles/BgAnimation";
import Loader from "../CustomStyles/Loader";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState("");
  const [showError, setShowError] = useState("");
  const [color, setColor] = useState("blue");
  const handleOldPass = (event) => {
    setOldPassword(event.target.value);
    console.log(event.target.value);
  };
  const handleNewPass = (event) => {
    setNewPassword(event.target.value);
    console.log(event.target.value);
  };
  const handleForgot = async () => {
    try {
      setLoader(true);
      const response = await axios.put(
        `http://localhost:8000/user/forgotPassword/${email}`
      );
      if (response.status === 200) {
        setShowSuccess("temporary password sent to email");
        setColor("green");
        setShowError("");
      }
    } catch (error) {
      setShowError("error in sending temporary password to email");
      setColor("red");
    } finally {
      setLoader(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      console.log(email, newPassword, oldPassword);
      const result = await axios.post(
        `http://localhost:8000/user/changepassword`,
        { email, oldPassword, newPassword }
      );
      if (result.status === 200) {
        console.log("password changed successfully");
        setShowSuccess("Password changed successfully");
        setColor("green");
        setShowError("");
      } else if (result.status === 400) {
        setShowError("old password is wrong");
        setShowSuccess("");
        setColor("red");
      }
    } catch (error) {
      setShowError("Error in changing password");
      setShowSuccess("");
      setColor("red");
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      {email && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            padding: "2px",
            margin: "0px",
          }}
        >
          <div
            style={{
              maxHeight: "400px",
              maxWidth: "700px",
              minWidth:"350px",
              width: "60vw",
              padding: "5vh",
              overflow: "hidden",
              zIndex: "100",
              borderRadius: "0px 30px 0 30px",
              background: "rgba(255, 255, 255, 0.19)",
              backdropFilter: "blur(15px)",
              color: "white",
              border: "3px solid rgb(147, 142, 142)",
            }}
          >
            {loader && <Loader size="40px" border="4px" color="black" />}
            {showError && <Alert>{showError}</Alert>}
            {showSuccess && <Alert>{showSuccess}</Alert>}
            <Container>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-6" controlId="header_changepass">
                      <h2 style={{ color: "black" }}>Change Password </h2>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group className="mb-6" controlId="oldPass">
                      <Form.Control
                         style={{boxShadow:"0px 0px 10px grey"}}
                        type="text"
                        placeholder="Enter old password"
                        name="oldPassword"
                        onChange={handleOldPass}
                        value={oldPassword}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group className="mb-6" controlId="newPass">
                      <Form.Control
                        style={{boxShadow:"0px 0px 10px grey"}}
                        type="text"
                        placeholder="Enter new Password"
                        name="newPassword"
                        onChange={handleNewPass}
                        value={newPassword}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="text-center ">
                    <Button type="submit" >
                      Done
                    </Button>
                  </Col>
                  <Col md={6} className="text-center ">
                    <Button
                      type="button"
                      className="border-white"
                      style={{
                        background: "transparent",
                        color: "blue",
                        border: "none",
                        textDecoration: "underline",
                      }}
                      onClick={handleForgot}
                    >
                      forgot password
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
          <BgAnimation bg={color} />
        </div>
      )}
      {!email && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <h3>
            Not logged in but ready to change the password?
            <br /> We admire your confidence.
          </h3>
          <div>
            <br />
            <Button
              style={{ textAlign: "center" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log-In
            </Button>
          </div>
        </span>
      )}
    </>
  );
};

export default ChangePassword;
