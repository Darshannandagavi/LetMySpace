import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import AOS from "aos";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../CustomStyles/Loader";
import CustomCursor from "../CustomStyles/CustomCursor";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");
  const [showSuccess, setShowSuccess] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showforgot, setShowForgot] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [showbg,setshowbg]=useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleEmail = (event) => {
    setEmail(event.target.value.trim());
    if (
      event.target.value.length >= 10 &&
      event.target.value.includes("@gmail.com")
    )
      setShowForgot(true);
    else setShowForgot(false);
  };
  const handlePassword = (event) => {
    if (event.target.value.length >= 5 && email.length >= 10)
      setShowLogin(true);
    else setShowLogin(false);
    setPassword(event.target.value);
  };
  const handleForgot = async (e) => {
    e.stopPropagation();
    if (email.length === 0) {
      setShowError("please enter email to send temporary password");
      setShowSuccess("");
    } else if (email.length <= 10 || !email.includes("@gmail.com")) {
      setShowError("please enter a valid email");
      setShowSuccess("");
    } else {
      try {
        setLoader(true);
        const response = await axios.put(
          `http://localhost:8000/user/forgotPassword/${email}`
        );
        if (response.status === 200) {
          setShowSuccess("temporary password sent to email");
          setShowError("");
        }
      } catch (error) {
        alert(error.response.data.message)
        setShowError("error in sending temporary password to email");
      } finally {
        setLoader(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setShowError("enter email and password before login");
      setShowSuccess("");
    } else if (email.length <= 10 || !email.includes("@gmail.com")) {
      setShowError("enter valid email address");
      setShowSuccess("");
    } else {
      setLoader(true);
      try {
        const result = await axios.post("http://localhost:8000/user/login", {
          email,
          password,
        });
        console.log(result.data);
        if (result.status === 200) {
          localStorage.setItem("email", email);
          console.log(result.data.user.role);
          const audio = new Audio("/Success_Sound.mp3");
          audio.currentTime = 0;
          audio.play();
          if (result.data.user.role === "Admin") navigate("/admin/dashboard");
          else if (result.data.user.role === "User") navigate("/user/userhome");
        } else {
          const audio = new Audio("/Error_Sound.mp3");
          audio.currentTime = 0;
          audio.play();
          setShowError("Wrong Username or Password");
          setShowSuccess("");
        }
      } catch (error) {
        const audio = new Audio("/Error_Sound.mp3");
        audio.currentTime = 0;
        audio.play();
        setShowError("Invalid email or Password");
        setShowSuccess("");
      } finally {
        setLoader(false);
      }
    }
  };

  AOS.init({
    duration: 300,
    easing: "linear",
    once: true,
  });
  return (
    <>
      <style>
        {`
        *{
        transition:all 1s;
        box-sizing:border-box;
        user-select:none;
        }
      .inputs{
      background:rgba(255,255,255,0.6);
      border:1px solid white;
      }
      
      .scaleonhover:hover{
          transition:all 1s;
          scale:1.07;
      }
      `}
      </style>
      <CustomCursor color="rgb(90, 132, 205)" size="20px" index="0" />
      <div
        style={{
          height: "100vh",
          // width:`${props.width}`,
          display: "grid",
          placeItems: "center",
          background: props.bg
            ? `${props.bg}`
            : "url(https://cdn.pixabay.com/photo/2020/04/19/23/51/forsythia-5065900_1280.jpg)",
          backgroundSize: "cover",
        }}
        className="cont"
      >
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          scale={1.05}
          tiltReverse={true}
          gyroscope={true}
          gyroscopeMinAngleX={-45}
          gyroscopeMaxAngleX={45}
          gyroscopeMinAngleY={-45}
          gyroscopeMaxAngleY={45}
        >
          <Form onSubmit={handleSubmit}>
            <Container
              style={{
                borderRadius: "20px",
                backdropFilter: "blur(8px)",
                background: "transparent",
                padding: "30px",
                width: "80vw",
                maxWidth: "540px",
                border: "2px solid white",
                zIndex:"1000",
                boxShadow: "0px 0px 40px black",
              }}
              data-aos="zoom-in"
            >
              {showError && (
                <Alert variant="danger" dismissible>
                  {showError}
                </Alert>
              )}
              {showSuccess && (
                <Alert variant="success" dismissible>
                  {showSuccess}
                </Alert>
              )}
              {loader && (
                <Loader size="30px" border="6px" color="rgb(0, 0, 0)" />
              )}
              <Row>
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <h2
                      className="scaleonhover"
                      style={{
                        color: "white",
                        fontFamily: "dafontSword",
                        textShadow: "0px 0px 15px black",
                      }}
                    >
                      Log-In
                    </h2>
                    <br></br>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="username">
                    <Form.Control
                      className="inputs"
                      type="text"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={handleEmail}
                      required
                    />
                    <br></br>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="password">
                    <Form.Control
                      className="inputs"
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={password}
                      onChange={handlePassword}
                    />
                    <br></br>
                  </Form.Group>
                </Col>
              </Row>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {showforgot && (
                  <button
                    className="scaleonhover"
                    type="button"
                    style={{
                      color: "white",
                      background: "transparent",
                      border: "none",
                      textDecoration: "underline",
                    }}
                    onClick={handleForgot}
                  >
                    Forgot Password?
                  </button>
                )}
                {showLogin && (
                  <Button
                    variant="primary"
                    className="scaleonhover"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Log-In
                  </Button>
                )}
                {/* <Nav.Link as={NavLink} to={"/register"} className="scaleonhover" style={{color:"white",lineHeight:'37px',textDecoration:'underline'}}>
                Create your account
                </Nav.Link> */}
              </div>
            </Container>
          </Form>
        </Tilt>
      </div>
    </>
  );
};

export default Login;
