import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import BgAnimation from "../CustomStyles/BgAnimation";
import Login from "../guestLayout/Login";

const Dashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [userLen, setUserLen] = useState(0);
  const [propCount, setPropCount] = useState(0);
  const [properties, setProperties] = useState([]);
  const [online, setOnline] = useState(0);
  const [offline, setOffline] = useState(0);
  const [showProperty, setShowProperty] = useState(null);
  useEffect(() => {
    getUserCount();
    getProperties();
  }, []);
  const getUserCount = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/dashboard");
      setUserLen(res.data.users.length);
      console.log(res.data.users);
      let onlineCount = 0;
      let offlineCount = 0;
      res.data.users.forEach((user) => {
        if (user.userStatus === "Active") {
          onlineCount++;
        } else if (user.userStatus === "inactive") {
          offlineCount++;
        }
      });
      setOnline(onlineCount);
      setOffline(offlineCount);
      console.log(res.data);
      console.log(res.data.users.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getProperties = async () => {
    try {
      const propRes = await axios.get("http://localhost:8000/user/properties");
      console.log(propRes);

      setProperties(propRes.data.reverse());
      setPropCount(propRes.data.length);
      console.log(properties);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("first");
    }
  };
  const handleDelete = async (id) => {
    let conf = window.confirm("Are you sure you want to delete this property!");
    if (conf) {
      try {
        const delRes = await axios.delete(
          `http://localhost:8000/user/uploadedproperties/${id}`
        );
        if (delRes.status === 200) {
          alert("property deleted successfully");
          getProperties();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <style>
        {`
      .status{
        height:180px;
        width:250px;
        padding:10px;
        background-image:linear-gradient(135deg, white,skyblue);
        border-radius:10px;
        box-shadow:0px 0px 20px grey;
        display:grid;
        justify-content:left;
        align-items:center;
        
       }
        .status{
          font-size:60px;
          text-shadow:2px 2px 15px grey;
        }
          .userStatus{
          z-index:2;
        }
          #users{
          background-image:linear-gradient(45deg,white,rgba(0, 42, 255, 0.57))
          }
           #offline{
          background-image:linear-gradient(45deg,white,rgba(255, 0, 0, 0.57))
          }
          #propCount{
            background-image:linear-gradient(45deg,white,rgba(255, 174, 0, 0.57))
          }
          .delbtn{
          background:rgb(244, 123, 123)
          }
          .delbtn:active{
          opacity:0.7;
          }
          .delbtn:hover{
          background:rgb(248, 38, 38);
          }
          @media(max-width:768px){
          .propCard{
          width:380px;
          }
          .userStatus{
          font-size:18px;
          
          }
          }
      `}
      </style>

      {email && (
        <span>
          <h1
            style={{
              margin: "120px 20px 20px 20px",
              background: "rgb(34, 30, 48)",
              color: "white",
              display: "inline-block",
              padding: "5px 40px",
              marginLeft: "-10px",
              borderRadius: "0 45px 45px 0px",
            }}
          >
            Users Status
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "20px",
              padding: "0 30px",
            }}
            className="statusCard"
          >
            <div className="status" id="users">
              <h1>{userLen}</h1>
              <h1 className="userStatus">Users</h1>
            </div>
            <div className="status" id="online">
              <h1>{online}</h1>
              <h1 className="userStatus">Online</h1>
            </div>
            <div className="status" id="offline">
              <h1>{offline}</h1>
              <h1 className="userStatus">Offline</h1>
            </div>
            <div className="status" id="propCount">
              <h1>{propCount}</h1>
              <h1 className="userStatus">Properties</h1>
            </div>
          </div>

          <h1
            style={{
              margin: "60px 20px 20px 20px",
              background: "rgb(34, 30, 48)",
              color: "white",
              display: "inline-block",
              padding: "10px 50px",
              marginLeft: "-30px",
              borderRadius: "0 35px 35px 0px",
            }}
          >
            Users Properties
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "content-fit",
              justifyContent: "space-around",
            }}
          >
            {properties.map((prop) => {
              return (
                <div
                  key={prop._id}
                  className="propCard"
                  style={{
                    width: "480px",
                    // background: "rgb(39, 34, 56)",
                    background: "rgb(251, 243, 222)",
                    margin: "10px 0",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 15px rgb(74, 74, 74)",
                  }}
                >
                  <div style={{ display: "grid" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        src={
                          prop.propImg1
                            ? `http://localhost:8000/${prop.propImg1}`
                            : `https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg`
                        }
                        style={{
                          height: "180px",
                          width: "280px",
                          borderRadius: "5px",
                          objectFit: "cover",
                          border: "2px solid grey",
                        }}
                        alt=""
                      />
                      <div style={{}}>
                        {prop.propertyType === "RentHome" && (
                          <p
                            style={{
                              background: "#b07d00",
                              textAlign: "center",
                              color: "white",
                              borderRadius: "5px",
                              padding: "10px",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                            }}
                          >
                            Rent Home
                          </p>
                        )}

                        {prop.propertyType === "SaleHome" && (
                          <p
                            style={{
                              background: "#2e7d32",
                              textAlign: "center",
                              color: "white",
                              borderRadius: "5px",
                              padding: "10px",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                            }}
                          >
                            Sale Home
                          </p>
                        )}
                        {prop.propertyType === "RentShop" && (
                          <p
                            style={{
                              background: "#4b3b8f",
                              textAlign: "center",
                              color: "white",
                              borderRadius: "5px",
                              padding: "10px",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                            }}
                          >
                            Rent Shop
                          </p>
                        )}
                        {prop.propertyType === "SaleShop" && (
                          <p
                            style={{
                              background: "#c1440e",
                              textAlign: "center",
                              color: "white",
                              borderRadius: "5px",
                              padding: "10px",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                            }}
                          >
                            Sale Shop
                          </p>
                        )}
                        {prop.propertyType === "SaleLand" && (
                          <p
                            style={{
                              background: "#5d4b1f",
                              textAlign: "center",
                              color: "white",
                              borderRadius: "5px",
                              padding: "10px",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                            }}
                          >
                            Sale Land
                          </p>
                        )}
                        <p
                          style={{
                            background: "rgba(255, 225, 0, 0.47)",
                            textAlign: "center",

                            borderRadius: "5px",
                            padding: "10px",
                            marginTop: "10px",
                            textTransform: "uppercase",
                          }}
                        >
                          {prop.propertyWorth}
                        </p>
                        <Button
                          style={{ padding: "10px 50px" }}
                          onClick={() => setShowProperty(prop._id)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "10px",
                          borderRadius: "5px",
                          padding: "6px 12px",
                          background: "rgba(0, 98, 255, 0.3)",
                          width: "280px",
                        }}
                      >
                        {prop.ownerEmail}
                      </p>
                      <Button
                        className="delbtn"
                        style={{
                          height: "45px",
                          width: "132px",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => handleDelete(prop)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  {showProperty === prop._id && (
                    <div
                      style={{
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        background: "rgba(0, 0, 0, 0.52)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0px 0px 15px black",
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
                          display: "grid",
                          justifyContent: "center",
                          border: "2px solid white",
                          background: "rgb(205, 193, 169)",
                          width: "fit-content",
                          borderRadius: "inherit",
                          padding: "3vw",
                          textAlign: "center",
                        }}
                      >
                        <h2
                          style={{
                            textAlign: "left",
                            marginBottom: "20px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Full Property Details
                        </h2>
                        <Row>
                          <Col md={6}>
                            {prop.propertyType === "RentHome" && (
                              <p
                                style={{
                                  background: "#b07d00",
                                  textAlign: "center",
                                  color: "white",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  textTransform: "uppercase",
                                  letterSpacing: "2px",
                                }}
                              >
                                Rent Home
                              </p>
                            )}

                            {prop.propertyType === "SaleHome" && (
                              <p
                                style={{
                                  background: "#2e7d32",
                                  textAlign: "center",
                                  color: "white",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  textTransform: "uppercase",
                                  letterSpacing: "2px",
                                }}
                              >
                                Sale Home
                              </p>
                            )}
                            {prop.propertyType === "RentShop" && (
                              <p
                                style={{
                                  background: "#4b3b8f",
                                  textAlign: "center",
                                  color: "white",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  textTransform: "uppercase",
                                  letterSpacing: "2px",
                                }}
                              >
                                Rent Shop
                              </p>
                            )}
                            {prop.propertyType === "SaleShop" && (
                              <p
                                style={{
                                  background: "#c1440e",
                                  textAlign: "center",
                                  color: "white",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  textTransform: "uppercase",
                                  letterSpacing: "2px",
                                }}
                              >
                                Sale Shop
                              </p>
                            )}
                            {prop.propertyType === "SaleLand" && (
                              <p
                                style={{
                                  background: "#5d4b1f",
                                  textAlign: "center",
                                  color: "white",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  textTransform: "uppercase",
                                  letterSpacing: "2px",
                                }}
                              >
                                Sale Land
                              </p>
                            )}
                            <div
                              className="wrapper"
                              style={{ borderRadius: "5px", border: "none" }}
                            >
                              <div
                                className="img"
                                style={{
                                  height: "150px",
                                  width: "300px",
                                  marginRight: "50px",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  borderRadius: "inherit",
                                  border: "none",
                                  backgroundImage: `url("${
                                    prop.propImg1
                                      ? `http://localhost:8000/${prop.propImg1.replace(
                                          /\\/g,
                                          "/"
                                        )}`
                                      : "https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg"
                                  }")`,
                                }}
                              ></div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div style={{ textAlign: "left" }}>
                              <p>
                                <strong>email:</strong> {prop.ownerEmail}
                              </p>
                              <p>
                                <strong>Contact:</strong> {prop.ownerContact}
                              </p>
                              <p>
                                <strong>Size:</strong> {prop.propertySize}
                              </p>
                              <p>
                                <strong>Location:</strong>{" "}
                                {prop.propertyLocation}
                              </p>
                              <p>
                                <strong>Worth:</strong> ₹{prop.propertyWorth}
                              </p>
                              {prop.bedrooms && (
                                <p>
                                  <strong>Bedrooms:</strong> {prop.bedrooms}
                                </p>
                              )}
                              {prop.bathrooms && (
                                <p>
                                  <strong>bathrooms:</strong> {prop.bathrooms}
                                </p>
                              )}
                              {prop.description && (
                                <p>
                                  <strong>description:</strong>{" "}
                                  {prop.description}
                                </p>
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                                flexWrap: "nowrap",
                              }}
                            >
                              <Button
                                className="primaryBtn"
                                onClick={() => setShowProperty(null)}
                              >
                                Close
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </span>
      )}
      {!email && (
        <div
          style={{
            height: "100vh",
            width:"100vw",
            display: "grid",
            background:"rgb(54, 23, 47)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Please <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Log-In
          </Button> first </h1>
          <div style={{zIndex:"1000"}}>
         <Login  bg="transparent"/></div>
         <div style={{zIndex:"100"}}>
         <BgAnimation bg="rgb(54, 23, 47)"/></div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
