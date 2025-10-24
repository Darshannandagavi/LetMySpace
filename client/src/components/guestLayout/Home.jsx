import React, {  useState } from "react";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import { Col, Row } from "react-bootstrap";
import WhyLetMySpace from "./WhyLetMySpace";
import { useEffect } from "react";
import CustomCursor from "../CustomStyles/CustomCursor";

const Home = () => {
  const [size, setSize] = useState("20px");
 useEffect(() => {
  const handleScroll=()=>{
    setSize("20px");
  };
  window.addEventListener("scroll",handleScroll);
  return ()=>window.removeEventListener("scroll",handleScroll);

  }, []);
  // const captionStyle = {
  //   background:
  //     "radial-gradient(961px at 1.9% 5%,rgb(242,241,36)0%,rgb(11,236,218)90%)",
  //   WebkitBackgroundClip: "text",
  //   color: "black",
  //   textShadow: "0px 0px 3px rgba(121,4,4,0.6)",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: "100%",
  //   textAlign: "center",
  // };

  const brand = "Welcome-to-LetMySpace";
  const brandChar = brand.split("");
  return (
    <>
      <style>
        {`
        .hoverstyle{
        z-index:300;
        line-height:35px;
        }
        
        
      .hoverstyle:hover{
        scale:1.03;
        
      }
        li{
        color:black;
        }
        
        
        .brand{font-size:3vw;display:inline-block;transition:all 5ms;}

        #br1{animation:rotatechar 2s ease 1s infinite}

        #br3{animation:rotatecharZ 2s ease 0s infinite}

        #br8{animation:rotatechar 3s ease 0s infinite}

        #br11{animation:rotatechar 3s ease 0s infinite}

        
        #br12{animation:barrel 3s linear 0.1s infinite}
        #br13{animation:barrel 3s linear 0.2s infinite}
        #br14{animation:barrel 3s linear 0.3s infinite}
        #br15{animation:barrel 3s linear 0.4s infinite}
        #br16{animation:barrel 3s linear 0.5s infinite}
        #br17{animation:barrel 3s linear 0.6s infinite}
        #br18{animation:barrel 3s linear 0.7s infinite}
        #br19{animation:barrel 3s linear 0.8s infinite}
        #br20{animation:barrel 3s linear 0.9s infinite}
        #br21{animation:barrel 3s linear 1s infinite}

        @keyframes rotatechar{
        from{transform:rotateY(0deg);}
        to{transform:rotateY(-360deg);}}

         @keyframes rotatecharZ{
        from{transform:rotate3d(0,0,0,0deg)}
        to{transform:rotate3d(1,0,0,360deg);}}

        @keyframes rotatechare{
            0%{left:0px;transform:rotateY(360deg)}
            90%{left:50px;transform:rotateY(0deg)}
            100%{left:0px;transform:rotateY(360deg);}
        }

       

        @keyframes barrel{
        0%{opacity:1;}
        100%{opacity:0;}
        }

       
        @keyframes spin{
        
        100%{transform:rotate(360deg);}}

          .brandAnime{
          height:100vh;    
          font-size:6vw;
          background-image:linear-gradient(rgba(241, 234, 154, 0.38),white);
          font-family:dafontSword;    
          color:black;
          }
          
          .brandText{
          position:absolute;
          }
          #let{
          top:30%;
          left:10%;
          }
          #my{
          top:50%;
          left:30%;
          }
          #space{
          top:70%;
          left:50%;
          }
        #head{
        font-family:Verdana;
        letter-spacing:2px;
        position:absolute;
        top:30%;
        left:10%
        }
        .brandA{
        font-size:5vw;
        }
        .punchline{
        font-weight:700;
        color:black;
        font-size:3vw;
        letter-spacing:10px;
        word-spacing:10px;
        position:absolute;
        top:61%;
        left:38%;
        text-shadow:0px 0px 15px rgba(1,1,1,0.4);
        }
        
      `}
      </style>

      {/* <div style={{ height: "120vh"}}>
        
        <div style={{position:"absolute",top:"50%"}
        }><h1 style={{fontSize:"100px",transform:"translateY(-100px)"}}>LET MY SPACE</h1><h1>Find your Space now</h1></div>
        <iframe
          src="https://my.spline.design/radialpattern-SkfyqABes504S2Yy1xtx5tyY/"
          title="spline"
          frameborder="0"
          width="150%"
          height="100%"
        ></iframe>
        
      </div> */}
      {/* <div className="brandAnime">
          <div className="letmyspace" id="head">
            {brandChar.map((ch, index) => (
              <span className="brand brandA" key={index} id={`br${index + 1}`}>
                {ch}
              </span>
            ))}
          </div>{" "}
          <p className="punchline">– Because Space Matters.</p>
        </div> */}
      <>
        <CustomCursor color="linear-gradient(135deg,rgb(255, 0, 0),rgb(255, 136, 0))" size={size} index="-10" />
        <div style={{ zIndex: "-30" }} >
          <Row style={{ zIndex: "-20" }}>
            <Col md={6}>
              <video
                style={{position:"relative",zIndex:"-300"}}
                src="https://v1.pinimg.com/videos/mc/720p/3b/3c/94/3b3c94a607978041348340c2028cd4cc.mp4"
                height="100%"
                width="100%"
                autoPlay
                loop
                muted
                
              ></video>
            </Col>
            <Col md={6}>
              <div
                style={{
                  height: "100%",
                  alignContent: "center",
                  fontFamily: "Verdana",
                  padding: "10px",
                  backgroundSize: "cover",
                }}
              >
                <div
                  onMouseEnter={() => setSize("650px")}
                  onMouseLeave={() => setSize("20px")}
                  style={{ zIndex: "1000", lineHeight: "100%" }}
                >
                  <div className="letmyspace" style={{ lineHeight: "50px" }}>
                    {brandChar.map((ch, index) => (
                      <span className="brand" key={index} id={`br${index + 1}`}>
                        {ch}
                      </span>
                    ))}
                  </div>

                  <br></br>
                  <span>
                    <span>
                      <div>
                        <div>
                          {" "}
                          <h3 id="heading">– Your Trusted Rental Partner</h3>
                          <p
                            style={{ lineHeight: "30px" }}
                            className="headtransp"
                          >
                            Finding the perfect home or shop for rent has never
                            been easier! At LetMySpace, we connect renters with
                            the best available spaces, ensuring a hassle-free
                            and seamless experience.
                          </p>
                        </div>
                        <br />

                        <ul>
                          <h3>
                            Why Choose LetMySpace?
                          </h3>
                          <li className="hoverstyle">
                            Wide Range of Listings – Explore homes, apartments,
                            and commercial spaces tailored to your needs.
                          </li>
                          <li className="hoverstyle">
                            Verified Properties – Rent with confidence through
                            trusted and verified listings.
                          </li>
                          <li className="hoverstyle">
                            Secure & Reliable – Transparent listings for a
                            stress-free renting process.
                          </li>
                        </ul>
                      </div>
                    </span>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div>
          <About />
          <WhyLetMySpace />
          <Services />
          <Contact />
        </div>
      </>
    </>
  );
};

export default Home;
