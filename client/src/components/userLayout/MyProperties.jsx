import React, { useEffect, useState } from "react";
import Loader from "../CustomStyles/Loader";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import Aos from "aos";
import { FaUser } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { PiResizeFill } from "react-icons/pi";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { MdBathroom } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import { RiLandscapeAiFill } from "react-icons/ri";
const MyProperties = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  useEffect(() => {
    fetchMyProperties();
    window.scrollTo(0, 0);
    Aos.init({
      delay: 0,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  const [property, setProperty] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchMyProperties = async () => {
    try {
      setLoader(true);

      if (email) {
        console.log(email);
        const res = await axios.get(
          `http://localhost:8000/user/uploadedProperties/?email=${email}`
        );
        console.log(res.data);
        setProperty(res.data.reverse());
      }
      if (!email) {
        // alert("Hold up! Your space awaits - Just sign in to explore.");
        // navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async (property) => {
    let conf = window.confirm(
      "Are you sure you want to delete your property listing!"
    );
    if (conf) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/user/uploadedProperties/${property._id}`
        );
        console.log(res);
        fetchMyProperties();
      } catch (error) {
        console.log("error in deleting property:", error);
      }
    }
  };

  return (
    <>
      <style>
        {`
    h1,h2,h3{
    font-size:16px;
    white-space:nowrap;
    }
    .propcontainer{
    margin:0;
    width:100vw;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-evenly;
    }
    .propertyCard{
    text-align:left;
    min-width:30vw;
    
        }
    .propType{
    font-size:30px;
    text-align:left;
    padding-left:25px;

    border-radius:8px 8px 0 0;
    height:50px;
    line-height:50px;
    color:white;
    margin:-10px;
    }
    .delete{
    padding: 6px 24px;
    border: 2px solid transparent;
    border-radius: 4px;
    color: white;
    background: rgb(245, 142, 142);
    }
    .delete:hover{
    background:rgba(255, 0, 0, 0.81);
    border: 2px solid white;
    cursor: pointer;
    }
    .noProperty{
    user-select:none;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    }
    .addBtn:hover{
    scale:1.1;
    border:1px solid black;
    transition:all 0.5s;
    
    }
    @media (max-width: 600px) {
  .propType   {
    width:100%;
    font-size: 30px;
    height:100px;
    line-height:100px;
    margin:0;
  }
    h3{
    font-size:20px;
    }
    .noProp{
    font-size:12px;
    }
    .propertyCard{
    text-align:left;
    min-width:90vw;
    
        }
    .container{
    margin:0;
    }
    }
    `}
      </style>
      {email && (
        <span>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              gap: "0px",
            }}
            className="propcontainer"
          >
            {loader && (
              <div
                style={{
                  zIndex: "10",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <Loader size="50px" border="8px" color="rgb(82, 81, 81)" />
              </div>
            )}
            {!loader && (
              <div>
                {property.length === 0 && (
                  <center className="noProperty">
                    <img
                      className="noProp"
                      height={"200px"}
                      src="https://assets-v2.lottiefiles.com/a/4661caea-1174-11ee-9703-ebaa4f8754af/e0Hairmjip.gif"
                      alt="noFileFoundGif"
                    />
                    <h3 className="noProp">
                      You haven't uploaded any properties yet.,
                    </h3>
                    <h3
                      className="noProp"
                      style={{ color: "rgba(1, 1, 1, 0.42)" }}
                    >
                      List your property now and connect with thousands of
                      seekers!
                    </h3>
                    <span>
                      <Nav.Link
                        as={NavLink}
                        to={"/user/propertyUploader"}
                        className="addBtn"
                        style={{
                          backgroundColor: "rgb(38, 104, 245)",
                          display: "inline-block",
                          padding: "6px 12px",
                          color: "white",
                          borderRadius: "4px",
                          marginTop: "10px",
                        }}
                      >
                        Add Property
                      </Nav.Link>
                    </span>
                    <br />
                  </center>
                )}
              </div>
            )}
            {property.map((property) => (
              <div
                key={property._id}
                style={{
                  display: "grid",
                  justifyContent: "center",
                  border: "2px solid grey",
                  background: "rgba(246, 226, 192, 0.67)",
                  backdropFilter: "blur(15px)",
                  maxWidth:"690px",
                  width: "fit-content",
                  borderRadius: "0px 30px 0px 30px ",
                  padding: "2vw",
                  textAlign: "center",
                  margin: "20px",
                }}
              >
                <Row>
                  <Col md={6}>
                    {property.propertyType === "RentHome" && (
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

                    {property.propertyType === "SaleHome" && (
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
                    {property.propertyType === "RentShop" && (
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
                    {property.propertyType === "SaleShop" && (
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
                    {property.propertyType === "SaleLand" && (
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
                    <div className="wrapper">
                      <div
                        className="img"
                        style={{
                          height: "150px",
                          width: "280px",
                          marginRight: "50px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          margin: "auto",
                          borderRadius: "5px",
                          backgroundImage: `url("${
                            property.propImg1
                              ? `http://localhost:8000/${property.propImg1.replace(
                                  /\\/g,
                                  "/"
                                )}`
                              : "https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg"
                          }")`,
                        }}
                      ></div>
                      <div
                        style={{
                          textAlign: "left",
                          marginTop: "30px",
                          paddingLeft: "20px",
                        }}
                      >
                        {property.bedrooms && (
                          <p className="propAlign">
                            <strong>
                              <MdBedroomParent />
                              &nbsp;&nbsp;Bedrooms:
                            </strong>{" "}
                            {property.bedrooms}
                          </p>
                        )}
                        {property.bathrooms && (
                          <p className="propAlign">
                            <strong>
                              <MdBathroom />
                              &nbsp;&nbsp;bathrooms:
                            </strong>{" "}
                            {property.bathrooms}
                          </p>
                        )}
                        {property.landType && (
                          <p className="propAlign">
                            <strong>
                              <RiLandscapeAiFill />
                              &nbsp;&nbsp;Land Type:
                            </strong>{" "}
                            {property.landType}
                          </p>
                        )}
                        {property.builtYear && (
                          <p className="propAlign">
                            <strong>
                              <MdAccessTimeFilled />
                              &nbsp;&nbsp;Built Year:
                            </strong>{" "}
                            {property.builtYear}
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div
                      style={{
                        textAlign: "left",
                        height: "100%",
                        paddingLeft: "20px",
                      }}
                    >
                      <p>
                        <strong>
                          <FaUser />
                          &nbsp;&nbsp;Owner:
                        </strong>{" "}
                        {property.propertyOwner}
                      </p>
                      <p>
                        <strong>
                          <IoMdMailUnread />
                          &nbsp;&nbsp;email:
                        </strong>{" "}
                        {property.ownerEmail}
                      </p>
                      <p>
                        <strong>
                          <IoMdContact />
                          &nbsp;&nbsp;Contact:
                        </strong>{" "}
                        {property.ownerContact}
                      </p>
                      <p className="propAlign">
                        <strong>
                          <PiResizeFill />
                          &nbsp;&nbsp;Size:
                        </strong>{" "}
                        {property.propertySize}
                      </p>
                      <p className="propAlign">
                        <strong>
                          <FaLocationDot />
                          &nbsp;&nbsp;Location:
                        </strong>{" "}
                        {property.propertyLocation}
                      </p>
                      <p className="propAlign">
                        <strong>
                          <RiMoneyRupeeCircleFill />
                          &nbsp;&nbsp;Worth:
                        </strong>{" "}
                        ₹{property.propertyWorth}
                      </p>

                      {property.description && (
                        <p className="propAlign">
                          <strong>
                            <MdDescription />
                            &nbsp;&nbsp;description:
                          </strong>{" "}
                          {property.description}
                        </p>
                      )}
                      <div>
                        <button
                          className="delete"
                          onClick={() => {
                            handleDelete(property);
                          }}
                        >
                          <MdDelete />
                          &nbsp;&nbsp;Delete
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </span>
      )}
      {!email && (
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "30px", whiteSpace: "wrap" }}>
            Unlock the uploader -{" "}
            <Button
              style={{ fontSize: "20px" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log-In
            </Button>{" "}
            to list your property now!
          </h2>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      )}
    </>
  );
};

export default MyProperties;
