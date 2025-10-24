import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Button, Row } from "react-bootstrap";
import AOS from "aos";
import Loader from "../CustomStyles/Loader";
import {NavLink, useNavigate} from 'react-router-dom'
import { Nav } from "react-bootstrap";

const UserHome = () => {
  const navigate=useNavigate();
  const email=localStorage.getItem("email");
  const [properties, setProperties] = useState([]);
  const [userAgreed,setUserAgreed]=useState(false);
  const [showPropertyDetails, setShowPropertyDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  console.log(email);
  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: "ease-in-out",
      once: true,
    });
    email && fetchProperties()
  },[]);
 useEffect(()=>{
  const status=localStorage.getItem("status")==='true';
  setUserAgreed(status);
 },[])
  const fetchProperties = async () => {
    try {
      console.log(email);
      if(!email){
        alert("Hold up! Your space awaits - Just sign in to explore.");
        navigate("/login");
      }
      if(email){
      setLoader(true);
      let response = await axios.get("http://localhost:8000/user/properties");
      console.log(response.data);
      setProperties(response.data.reverse());
      setLoader(false);}
    } catch (error) {
      console.log(error);
    }finally{
      setLoader(false);
    }
  };

  return (
    <>
      <style>
        {`
    *{
    box-sizing:border-box;
    }
    .containerStyle{
      display:flex;
      flex-wrap:wrap;
      overflow:hidden;
      justify-content:space-evenly;
    }
    .secondary{
      background:#198754;
      color:white;
      padding:8px 20px;
      border:none;
      border-radius:5px;
      width:45%;
    }
      .secondary:hover{
      letter-spacing:3px;
      }
      .primaryBtn:active,.secondary:active{
      opacity:0.6;
      }
    .primaryBtn{
      color:#0d6efd;
      transition:all 0.5s;
      width:45%;
      border:1px solid #0d6efd;
      border-radius:5px;
      background:transparent;
      padding:6px 12px;
    }
      .primaryBtn:hover{
      background:#0d6efd;
      color:white;
      letter-spacing:3px;
      }
      .element{
      margin: 0 auto;
      }
      .cancelbtn:hover{
      opacity:0.8;
      }
      .card {
      display: flex;
      flex-direction: column;
      padding: 15px;
      border-radius:0px 20px 0px  20px;
      background: rgb(251, 243, 222);
      margin: 25px 20px;
      flex: 2 1 calc(35% - 1rem);
      width: 22vw;
      min-width: 300px;
      max-width: 50vw;
      box-shadow: 0 0 15px grey;
    }
      .propAlign{
      display:flex;
      justify-content:space-between;
      }
      @media (width: 689) {
        .card {
          min-width: 100vw; /* 1 per row */
        }
      }
        .wrapper{
        overflow:hidden;
        border-radius:inherit;
        }
        .img{
        background-size:cover;
        }
        .img:hover{
          transform:scale(1.1);
        }
        
    `}
      </style>
     {email && <> {userAgreed &&<div style={{height:"100vh",width:"100vw",display:"flex",marginTop:"-80px",alignItems:"center",justifyContent:"center",position:"fixed",zIndex:"150"}}>
      <div className="user-guidelines" style={{borderRadius:"10px",padding:"30px",border:"4px solid rgba(92, 90, 90, 0.6)",background:"white"}}>
        <h2>🚨 User Guidelines & Rules</h2>
        <p>Please read carefully before continuing:</p>
        <ul>
          <li>
            <strong>🚫 No Spamming:</strong> Do not send repetitive or
            promotional messages to other users. Spamming will lead to a
            permanent ban.
          </li>
          <li>
            <strong>✅ Post Your Own Properties Only:</strong> You are allowed
            to post only the properties you own or have legal rights to list.
            Fake or misrepresented listings will be removed immediately.
          </li>
          <li>
            <strong>🚫 Illegal Activities are Strictly Prohibited:</strong> Any
            form of fraud, misleading information, or unlawful actions will
            result in immediate suspension and may be reported to authorities.
          </li>
          <li>
            <strong>🤝 Respect All Users:</strong> Use respectful language and
            behavior when interacting with others. Harassment, abuse, or threats
            are not tolerated.
          </li>
          <li>
            <strong>📌 Accurate Information Required:</strong> All property
            details must be truthful and up-to-date. Misleading photos, prices,
            or locations are not allowed.
          </li>
        </ul>

        <p className="alert-warning">
          ⚠️{" "}
          <strong>
            Violation of these rules may lead to warning, suspension, or
            permanent account ban without prior notice.
          </strong>
        </p>
        <div style={{display:"flex",justifyContent:"right", gap:"30px"}}><Nav.Link
                as={NavLink}
                to={"/home"}
                className="cancelbtn"
                style={{
                  backgroundColor: "rgba(248, 0, 0, 0.79)",
                  display: "inline-block",
                  padding: "6px 12px",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                Cancel
              </Nav.Link>
              <Button
                onClick={()=>{
                  setUserAgreed(true);
                  localStorage.setItem("status","true");
                }}
              >
               I agree
              </Button></div>
      </div></div>}

      <div style={{ padding: "5px", overflowX: "hidden",backdropFilter:"blur(4px)" ,background:"rgba(0, 0, 0, 0.23)"}}>
        {loader && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Loader size="50px" border="8px" color="rgb(82, 81, 81)" />
          </div>
        )}
        <div className="containerStyle">
          {properties.map((item, index) => (
            <Row key={item._id}>
              <Col>
                <div key={index} className="card">
                  <div className="wrapper">
                  <div 
                    className="img"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      height: "200px",
                      backgroundPosition: "center",
                      borderRadius: "inherit",
                      backgroundImage: `url("${
                        item.propImg1
                          ? `http://localhost:8000/${item.propImg1.replace(
                              /\\/g,
                              "/"
                            )}`
                          : "https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg"
                      }")`,
                    }}
                  ></div></div>
                  <div
                    style={{
                      margin: "15px 0",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p>Type:{item.propertyType}</p>
                      <p>Size:{item.propertySize}</p>
                      <p>location:{item.propertyLocation}</p>
                    </div>

                    <div
                      style={{
                        margin: "0 0 0 40px",
                        display: "grid",
                        justifyContent: "space-between",
                        alignItems: "center",
                        float: "right",
                      }}
                    >
                      <h5>Worth:₹{item.propertyWorth}</h5>
                      <br></br>
                      <Button onClick={() => setShowPropertyDetails(item._id)}>
                        View
                      </Button>
                    </div>
                  </div>
                </div>
                {showPropertyDetails === item._id && (
                  
                  <div
                    style={{
                      position:"fixed",
                      width:"100%",
                      height:"100%",
                      top: "50%",
                      left: "50%",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      transform: "translate(-50%,-50%)",
                      background: "rgba(0, 0, 0, 0.52)",
                      backdropFilter: "blur(20px)",
                      boxShadow:"0px 0px 15px black",
                      zIndex: "15",
                      flexWrap: "no-wrap",
                      color: "black",
                      padding: "20px",
                      overflowY: "auto",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        // display: "",
                        // // justifyContent: "center",
                        border: "2px solid white",
                        background:"rgb(205, 193, 169)",
                        width:"fit-content",
                        borderRadius: "inherit",
                        padding: "3vw",
                        textAlign:"center",
                        position:"fixed",
                        top:"50%",
                        left:"50%",
                        transform:"translate(-50%,-50%)"
                      }}
                    >
                      <h2 style={{textAlign:"left",marginBottom:"20px", whiteSpace: "nowrap"}}>
                        Full Property Details
                      </h2>
                      <Row>
                      <Col md={6}>
                      {item.propertyType === "RentHome" && (
                        <p
                          style={{
                            background: "#b07d00",
                            textAlign: "center",
                            color: "white",
                            borderRadius: "5px",
                            padding: "10px",
                            textTransform:"uppercase",
                            letterSpacing:"2px"
                          }}
                        >
                          Rent Home
                        </p>
                      )}
                      
                      {item.propertyType === "SaleHome" && (
                        <p
                          style={{
                            background: "#2e7d32",
                            textAlign: "center",
                            color: "white",
                            borderRadius: "5px",
                            padding: "10px",
                            textTransform:"uppercase",letterSpacing:"2px"
                          }}
                        >
                          Sale Home
                        </p>
                      )}
                      {item.propertyType === "RentShop" && (
                        <p
                          style={{
                            background: "#4b3b8f",
                            textAlign: "center",
                            color: "white",
                            borderRadius: "5px",
                            padding: "10px",
                            textTransform:"uppercase",letterSpacing:"2px"
                          }}
                        >
                          Rent Shop
                        </p>
                      )}
                      {item.propertyType === "SaleShop" && (
                        <p
                          style={{
                            background: "#c1440e",
                            textAlign: "center",
                            color: "white",
                            borderRadius: "5px",
                            padding: "10px",
                            textTransform:"uppercase",letterSpacing:"2px"
                          }}
                        >
                          Sale Shop
                        </p>
                      )}
                      {item.propertyType === "SaleLand" && (
                        <p
                          style={{
                            background: "#5d4b1f",
                            textAlign: "center",
                            color: "white",
                            borderRadius: "5px",
                            padding: "10px",
                            textTransform:"uppercase",letterSpacing:"2px"
                          }}
                        >
                          Sale Land
                        </p>
                      )}
                      <div className="wrapper" style={{borderRadius:"5px",border:"none"}}>
                      <div className="img" style={{height:"150px",width:"300px",marginRight:"50px",backgroundSize:"cover",backgroundPosition:"center",borderRadius:"inherit",border:"none",backgroundImage: `url("${item.propImg1
                          ? `http://localhost:8000/${item.propImg1.replace(/\\/g,"/")}`
                          : "https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg"
                      }")`}}></div></div>
                      </Col>
                      <Col md={6}>
                      <p className="propAlign">
                        <strong>email:</strong> {item.ownerEmail}
                      </p>
                       <p className="propAlign">
                        <strong>Contact:</strong> {item.ownerContact}
                      </p>
                      <p className="propAlign">
                        <strong>Size:</strong> {item.propertySize}
                      </p>
                      <p className="propAlign">
                        <strong>Location:</strong> {item.propertyLocation}
                      </p>
                      <p className="propAlign">
                        <strong>Worth:</strong> ₹{item.propertyWorth}
                      </p>
                      {item.bedrooms && (
                        <p className="propAlign">
                          <strong>Bedrooms:</strong> {item.bedrooms}
                        </p>
                      )}
                      {item.bathrooms && (
                        <p className="propAlign">
                          <strong>bathrooms:</strong> {item.bathrooms}
                        </p>
                      )}
                      {item.description && (
                        <p className="propAlign">
                          <strong>description:</strong> {item.description}
                        </p>
                      )}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          className="primaryBtn"
                          onClick={() => setShowPropertyDetails(null)}
                        >
                          Close
                        </button>
                        {/* <button
                          style={{ margin: "0 0px 0 20px" }}
                          className="secondary"
                        >
                          
                        </button> */}
                      </div></Col>
                      </Row>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          ))}
        </div>
      </div></>}
       {!email && <div style={{height:"70vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h1>Your space awaits — just &nbsp;&nbsp;<Button style={{fontSize:"20px"}} onClick={()=>{navigate("/login")}}>Log-In</Button></h1></div>}
    </>
  );
};

export default UserHome;
