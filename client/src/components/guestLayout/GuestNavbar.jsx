import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const GuestNavbar = () => {
  
  const audio = new Audio("/NavbarSound3.mp3");
  const playsound=()=>{audio.currentTime=0.2;
  audio.play();}
  return (
    <>
      <style>
        {`
        *{
         transition: all 0.3s linear;
         box-sizing:border-box;
        }

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
            color:rgb(246, 248, 248);
            cursor:pointer;
            padding: 0 5px;
            
            
        }

        /* Navigation Item Style */
        .navItemStyle {
            font-size: 20px;
            padding:0px;
            margin:15px 5px;
            text-align:center;
            transition: background 0.3s linear;
            width:84px;
            border-radius:0px;
            border-bottom:2px solid transparent;
            box-sizing:border-box;
        }

        /* Hover Effect for Navbar Items */
        .navbar:hover {
            background-color: #333;
        }

        .navbar .nav-item:hover {
            color: rgb(255,255,255);
            /* Change color on hover */
            transform: scale(1.1);
            transition:all 0.3s;
           text-shadow:0 0 10px white;
            /* Slightly enlarge the item on hover */
        }
            

        /* Logo Zoom Effect */
        .zoomEffect {
            transition: transform 0.3s ease;
            /* Smooth transition */
        }

        .zoomEffect:hover {
             transform: scale(1.6);
            padding:2px;
            border:2px solid transparent;
            border-right:2px solid white;
            border-left:2px solid white;

            /* Zoom in the image by 80% */
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
                border-color: white;
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
            
        `}
      </style>
      <div style={{width:'100vw'}}>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
        className="custom-navbar navbarStyle"
      >
        <Container>
          {/* Logo Image inside Navbar.Brand */}
          <Navbar.Brand
            as={NavLink}
            to="/home"
            className="navbar-brand brandStyle"
          >
            <img
              src="https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg" // Replace with your logo URL
              alt="Let my space logo"
              className="zoomEffect"
              style={{
                width: "50px", // Adjust the width of the logo
                height: "50px", // Maintain aspect ratio
                borderRadius: "25px",
                objectFit: "cover",
              }}
            />
            
            <span className="managementStyle"><div className="navImage">Let My Space</div></span>
           
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            aria-label="Toggle navigation"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* Aligning the navigation links to the right */}
            <Nav className="ms-auto">
              <Nav.Link
                as={NavLink}
                to="/home"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                  // backgroundImage: isActive ? "linear-gradient(60% transparent,rgba(242, 227, 153, 0.43))" : null,
                  borderBottom: isActive ? "2px solid white" : null,
                  color: isActive ? "white" : null,
                  
                  textShadow:isActive?"0 0 10px white":null
                })}
                onClick={playsound}
              >
               Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/about"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                  // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
                  borderBottom: isActive ? "2px solid white" : null,
                 
                  
                  textShadow:isActive?"0 0 10px white":null
                  })}
                  onClick={playsound}
              >
                About
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/services"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                  // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
                  borderBottom: isActive ? "2px solid white" : null,
                  color: isActive ? "white" : null,
                  
                  textShadow:isActive?"0 0 10px white":null
                  })}
                  onClick={playsound}
              >
                Services
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/contact"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                  // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
                  borderBottom: isActive ? "2px solid white" : null,
                  color: isActive ? "white" : null,
                  
                  textShadow:isActive?"0 0 10px white":null
                  })}
                  onClick={playsound}
              >
               Contact
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/register"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                    // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
                    borderBottom: isActive ? "2px solid white" : null,
                    color: isActive ? "white" : null,
                    
                    textShadow:isActive?"0 0 10px white":null
                  })}
                  onClick={playsound}
              >
                Register
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/login"
                className="nav-item navItemStyle"
                style={({ isActive }) => ({
                  // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
                  borderBottom: isActive ? "2px solid white" : null,
                  color: isActive ? "white" : null,
                  textShadow:isActive?"0 0 10px white":null
                  })}
                  onClick={playsound}
              >
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar></div>
    </>
  );
};

export default GuestNavbar;
