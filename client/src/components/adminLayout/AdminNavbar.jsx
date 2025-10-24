import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
const AdminNavbar = () => {
  const audio = new Audio("/NavbarSound3.mp3");
  const playsound = () => {
    audio.currentTime = 0.2;
    audio.play();
  };

  const handleLogout = async () => {
    const email = localStorage.getItem("email");
    if (email) {
      const logout = await axios.put(
        `http://localhost:8000/user/logout/?email=${email}`
      );
      console.log(logout);
      localStorage.removeItem("email");
    }
  };
  return (
    <>
      <style>
        {`
        /* General Navbar Style */
        .navbarStyle {
            transition: all 0.3s ease;
            position:fixed;
            width:100%;
            top:0;
            z-index:10000;
            /* Smooth transition for hover effects */
        }

        /* Logo and Text Alignment */
        .brandStyle {
            display: flex;
            align-items: center;
            gap: 15px;
            /* Add gap between logo and text */
        }

        /* Text Animation for Event Management */
        .textAnimationStyle {
            font-size: 24px;
            font-weight: bold;
            margin-left: 25px;  
            transition: transform 0.3s ease;
            /* Smooth transition for zoom effect */
        }

        .textAnimationStyle:hover {
            transform: scale(1.2);
            /* Zoom in the text by 20% on hover */
        }

        /* Individual Style for Event and Management Text */
        .eventStyle {
            padding-right: 20px;
            font-size: 32px;
            color: #ff5733;
            /* Event color (red-orange) */
            padding: 0 5px;
        }

        .managementStyle {
            color: #33c1ff;
            /* Management color (blue) */
            padding: 0 5px;
        }

        /* Navigation Item Style */
        .navItemStyle {
            font-size: 20px;
            padding: 15px;
            transition: all 0.3s ease;
        }

        /* Hover Effect for Navbar Items */
        .navbar:hover {
            background-color: #333;
        }

        .navbar .nav-item:hover {
            color: #ffcc00;
            /* Change color on hover */
            transform: scale(1.1);
            /* Slightly enlarge the item on hover */
        }

        /* Logo Zoom Effect */
        .zoomEffect {
            transition: transform 0.3s ease;
            /* Smooth transition */
        }

        

        /* Keyframes for Typing Animation */
        @keyframes typing {
            0% {
                width: 0;
            }

            100% {
                width: 14em;
            }
        }

        /* Keyframes for Blinking Cursor Effect */
        @keyframes blink {
            50% {
                border-color: transparent;
            }
        }

        /* Media Queries for Responsiveness */
        @media (max-width: 992px) {
            .navbar-brand span {
                font-size: 20px;
                /* Reduce font size on smaller screens */
            }

            .navbar .nav-item {
                font-size: 14px;
                /* Smaller nav item font size on mobile */
            }
        }

        @media (max-width: 576px) {
            .navbar-brand span {
                font-size: 18px;
                /* Reduce font size even further on extra small screens */
            }

            .navbar .nav-item {
                font-size: 12px;
                /* Even smaller nav item font size on extra small screens */
            }
        }
            .navImage{
            font-family:dafont;
            color:white;
            text-transform:uppercase;
            letter-spacing:6px;
            font-size:2vw;
            cursor:pointer;
            }
            
            .ms-auto{
            gap:10px;
            }
            .imgCont{
                border:4px solid transparent;
                border-left:4px solid white;
                border-right:4px solid white;
                border-radius:50%;
                padding:2px;
                animation:rotateCont 5s linear infinite;
            }
            .logoImg{
            animation:rotateImg 5s linear infinite;
            }
                @keyframes rotateCont{
                100%{
                transform:rotate(360deg);
                }
                }
                 @keyframes rotateImg{
                to{
                transform:rotate(-360deg);
                }
                }
        `}
      </style>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
        className="custom-navbar navbarStyle"
      >
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/admin/dashboard"
            className="navbar-brand brandStyle"
          >
            <div className="imgCont">
              <img
                src="https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg"
                alt="My"
                className="zoomEffect logoImg"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <span className="managementStyle">
              <div className="navImage">Let My Space</div>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            aria-label="Toggle navigation"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={NavLink}
                to="/admin/dashboard"
                className="nav-item navItemStyle"
                onClick={playsound}
              >
                Dashboard
              </Nav.Link>
              {/* <Nav.Link as={NavLink} to="/admin/contentmanagement" className="nav-item navItemStyle" >Content Management</Nav.Link> */}
              <Nav.Link
                as={NavLink}
                to="/admin/users"
                className="nav-item navItemStyle"
                onClick={playsound}
              >
                Users
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/admin/admins"
                className="nav-item navItemStyle"
                onClick={playsound}
              >
                Admins
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/admin/feedback"
                className="nav-item navItemStyle"
                onClick={playsound}
              >
                Feedbacks
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/home"
                className="nav-item navItemStyle"
                onClick={() => {
                  handleLogout();
                  playsound();
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
