import axios from "axios";
import React from "react";
import { Container, Nav, Navbar, NavbarToggle } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const UserNavbar = () => {
  const handleLogout = async () => {
    try {
      const email = localStorage.getItem("email");
      console.log(email);
      const res = await axios.put(
        `http://localhost:8000/user/logout/?email=${email}`
      );
      console.log(res);
      localStorage.removeItem("email");
    } catch (error) {
      console.log(error);
    }
  };
  const audio = new Audio("/NavbarSound3.mp3");
  const playsound=()=>{audio.currentTime=0.2;audio.play();}
  return (
    <div>
      <style>
        {`
        /* General Navbar Style */
        .navbarStyle {
            transition: all 0.3s ease;
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
            color:rgb(255, 255, 255);
            /* Management color (blue) */
            padding: 0 5px;
        }

        /* Navigation Item Style */
        .navItemStyle {
            font-size: 20px;
            padding:0 15px;
            transition: all 0.3s ease;
        }

        /* Hover Effect for Navbar Items */
        .navbar:hover {
            background-color: #333;
        }

        .navbar .nav-item:hover {
            color: #white;
            border-bottom:2px solid white;
            text-shadow:0 0 10px white;
            /* Change color on hover */
            transform: scale(1.05);
            /* Slightly enlarge the item on hover */
        }

        /* Logo Zoom Effect */
        .zoomEffect {
            transition: transform 0.3s ease;
            /* Smooth transition */
        }

        .zoomEffect {
           
            animation:rotateImage ease-in-out 2s infinite;
            /* Zoom in the image by 80% */
        }
           @keyframes rotateImage{
            to{
            transform:rotate(-360deg);
            }
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
            text-transform:uppercase;
            letter-spacing:6px;
            font-size:2vw;
            cursor:pointer;
            }
            .imgcont{
            padding:2px;
            border:3px solid transparent;
            border-left:3px solid white;
            border-right:3px solid white;
            border-radius:50%;
            animation:imgCont ease-in-out 2s infinite;
            }
             @keyframes imgCont{
            to{
            transform:rotate(360deg);
            }
            }
            .Navs{
            gap:10px;
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
            to="/user/userhome"
            className="navbar-brand brandStyle"
          >
            <div className="imgcont">
              <img
                src="https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg"
                alt="Event management logo"
                className="zoomEffect"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "60px",
                  objectFit: "cover",
                }}
              />
            </div>

            <span className="managementStyle">
              <div className="navImage">Let My Space</div>
            </span>
          </Navbar.Brand>

          <NavbarToggle
            aria-controls="responsive-navbar-nav"
            aria-label="Toggle navigation"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto Navs">
              <Nav.Link
                as={NavLink}
                to="/user/userhome"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "2px solid #ffcc00" : null,
                  color:isActive?"#ffcc00":null,
                  textShadow:isActive?"0 0 10px #ffcc00":null,
                  scale:isActive?"1.1":null,
                })}
                className="nav-item navItemStyle"
                onClick={playsound}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/user/propertyUploader"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "2px solid #ffcc00" : null,
                  color:isActive?"#ffcc00":null,
                  textShadow:isActive?"0 0 10px #ffcc00":null,
                  scale:isActive?"1.1":null,
                })}
                onClick={playsound}
              >
                New-Property
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/user/uploadedProperties"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid #ffcc00" : null,
                    color:isActive?"#ffcc00":null,
                    textShadow:isActive?"0 0 10px #ffcc00":null,
                    scale:isActive?"1.1":null,
                  })}
                  onClick={playsound}
              >
                Listed-Properties
              </Nav.Link>

              {/* <Nav.Link as={NavLink} to='/user/category' className='nav-item navItemStyle'>category</Nav.Link>                 */}
              <Nav.Link
                as={NavLink}
                to="/user/changepassword"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid #ffcc00" : null,
                    color:isActive?"#ffcc00":null,
                    textShadow:isActive?"0 0 10px #ffcc00":null,
                    scale:isActive?"1.1":null,
                  })}
                  onClick={playsound}
              >
                change password
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/home"
                className="nav-item navItemStyle"
                onClick={()=>{handleLogout();playsound();}}
                style={({ isActive }) => ({
                    color:isActive?"#ffcc00":null,
                    borderBottom: isActive ? "2px solid #ffcc00" : null,
                    textShadow:isActive?"0 0 10px #ffcc00":null,
                    scale:isActive?"1.1":null,
                  })}
                  
              >
                Log-out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserNavbar;
