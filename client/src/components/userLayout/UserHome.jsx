import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Button, Row, Card, Badge, Modal } from "react-bootstrap";
import Loader from "../CustomStyles/Loader";
import { NavLink, useNavigate } from 'react-router-dom'
import { Nav } from "react-bootstrap";

const UserHome = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [properties, setProperties] = useState([]);
  const [userAgreed, setUserAgreed] = useState(false);
  const [showPropertyDetails, setShowPropertyDetails] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
   
    email && fetchProperties()
  }, []);

  useEffect(() => {
    const status = localStorage.getItem("status") === 'true';
    setUserAgreed(status);
  }, []);

  const fetchProperties = async () => {
    try {
      if (!email) {
        alert("Hold up! Your space awaits - Just sign in to explore.");
        navigate("/login");
        return;
      }
      if (email) {
        setLoader(true);
        let response = await axios.get("http://localhost:8000/user/properties");
        setProperties(response.data.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const getPropertyTypeStyle = (type) => {
    const styles = {
      RentHome: { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" },
      SaleHome: { background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white" },
      RentShop: { background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "white" },
      SaleShop: { background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", color: "white" },
      SaleLand: { background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", color: "white" }
    };
    return styles[type] || { background: "#6c757d", color: "white" };
  };

  return (
    <>
      <style>
        {`
          .user-home-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
          }

          .properties-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
          }

          .property-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: none;
            overflow: hidden;
            height: fit-content;
          }

          .property-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .property-image-container {
            position: relative;
            height: 250px;
            overflow: hidden;
          }

          .property-image {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            transition: transform 0.5s ease;
          }

          .property-card:hover .property-image {
            transform: scale(1.05);
          }

          .property-type-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            padding: 8px 16px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 0.8rem;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }

          .property-card-content {
            padding: 20px;
          }

          .property-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2c5530;
            margin-bottom: 10px;
          }

          .property-location {
            color: #6c757d;
            font-size: 0.9rem;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .property-features {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            padding: 15px 0;
            border-top: 1px solid #e9ecef;
            border-bottom: 1px solid #e9ecef;
          }

          .feature {
            text-align: center;
            flex: 1;
          }

          .feature-value {
            font-weight: 700;
            color: #495057;
            font-size: 1.1rem;
          }

          .feature-label {
            font-size: 0.8rem;
            color: #6c757d;
            margin-top: 5px;
          }

          .view-details-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            width: 100%;
          }

          .view-details-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1050;
            padding: 20px;
          }

          .modal-content-custom {
            background: white;
            border-radius: 20px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            border: none;
          }

          .modal-header-custom {
            background: #222147ff;
            color: white;
            padding: 25px;
            border-radius: 20px 20px 0 0;
            border: none;
          }

          .modal-body-custom {
            padding: 30px;
          }

          .property-detail-image {
            width: 100%;
            height: 300px;
            border-radius: 15px;
            background-size: cover;
            background-position: center;
            margin-bottom: 20px;
          }

          .detail-section {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 15px;
            border-left: 4px solid #667eea;
          }

          .detail-label {
            font-weight: 600;
            color: #495057;
            margin-bottom: 5px;
          }

          .detail-value {
            color: #212529;
            font-size: 1.1rem;
          }

          .close-modal-btn {
            background: #6c757d;
            border: none;
            padding: 10px 25px;
            border-radius: 20px;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .close-modal-btn:hover {
            background: #5a6268;
            transform: translateY(-2px);
          }

          .guidelines-modal {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          }

          .guidelines-list {
            list-style: none;
            padding: 0;
          }

          .guidelines-list li {
            padding: 15px;
            margin-bottom: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #667eea;
          }

          .login-prompt {
            height: 70vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .login-btn-large {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-size: 1.2rem;
            font-weight: 600;
            margin-left: 20px;
            transition: all 0.3s ease;
          }

          .login-btn-large:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(102, 126, 234, 0.3);
          }

          @media (max-width: 768px) {
            .properties-grid {
              grid-template-columns: 1fr;
              padding: 10px;
              gap: 20px;
            }
            
            .modal-content-custom {
              margin: 10px;
              max-height: 95vh;
            }
            
            .property-features {
              flex-wrap: wrap;
              gap: 10px;
            }
            
            .feature {
              flex: 1 0 45%;
            }
          }

          @media (max-width: 480px) {
            .property-card {
              margin: 0 10px;
            }
            
            .modal-body-custom {
              padding: 20px;
            }
            
            .guidelines-modal {
              padding: 25px;
            }
          }
        `}
      </style>

      {email && (
        <>
          {!userAgreed && (
            <div className="modal-overlay">
              <div className="guidelines-modal">
                <h2 style={{ color: "#495057", marginBottom: "25px" }}>🚨 User Guidelines & Rules</h2>
                <p style={{ color: "#6c757d", marginBottom: "25px" }}>Please read carefully before continuing:</p>
                <ul className="guidelines-list">
                  <li>
                    <strong>🚫 No Spamming:</strong> Do not send repetitive or promotional messages to other users. Spamming will lead to a permanent ban.
                  </li>
                  <li>
                    <strong>✅ Post Your Own Properties Only:</strong> You are allowed to post only the properties you own or have legal rights to list.
                  </li>
                  <li>
                    <strong>🚫 Illegal Activities are Strictly Prohibited:</strong> Any form of fraud or unlawful actions will result in immediate suspension.
                  </li>
                  <li>
                    <strong>🤝 Respect All Users:</strong> Use respectful language and behavior when interacting with others.
                  </li>
                  <li>
                    <strong>📌 Accurate Information Required:</strong> All property details must be truthful and up-to-date.
                  </li>
                </ul>

                <div style={{ 
                  background: "linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)", 
                  padding: "20px", 
                  borderRadius: "10px", 
                  margin: "25px 0",
                  border: "2px solid #ffd43b"
                }}>
                  <p style={{ margin: 0, color: "#856404", fontWeight: "600" }}>
                    ⚠️ <strong>Violation of these rules may lead to warning, suspension, or permanent account ban.</strong>
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "30px" }}>
                  <Nav.Link
                    as={NavLink}
                    to={"/home"}
                    style={{
                      backgroundColor: "#dc3545",
                      padding: "10px 25px",
                      color: "white",
                      borderRadius: "20px",
                      textDecoration: "none",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
                  >
                    Cancel
                  </Nav.Link>
                  <Button
                    onClick={() => {
                      setUserAgreed(true);
                      localStorage.setItem("status", "true");
                    }}
                    style={{
                      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      border: "none",
                      padding: "10px 30px",
                      borderRadius: "20px",
                      fontWeight: "600"
                    }}
                  >
                    I Agree
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="user-home-container">
            {loader && (
              <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 1000
              }}>
                <Loader size="60px" border="8px" color="#667eea" />
              </div>
            )}

            <div className="properties-grid">
              {properties.map((item, index) => (
                <Card 
                  key={item._id} 
                  className="property-card"
               
                >
                  <div className="property-image-container">
                    <div
                      className="property-image"
                      style={{
                        backgroundImage: `url("${
                          item.propImg1
                            ? `http://localhost:8000/${item.propImg1.replace(/\\/g, "/")}`
                            : "https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg"
                        }")`
                      }}
                    />
                    <div 
                      className="property-type-badge"
                      style={getPropertyTypeStyle(item.propertyType)}
                    >
                      {item.propertyType}
                    </div>
                  </div>

                  <div className="property-card-content">
                    <div className="property-price">₹{item.propertyWorth}</div>
                    <div className="property-location">
                      📍 {item.propertyLocation}
                    </div>
                    
                    <div className="property-features">
                      <div className="feature">
                        <div className="feature-value">{item.propertySize}</div>
                        <div className="feature-label">SIZE</div>
                      </div>
                      {item.bedrooms && (
                        <div className="feature">
                          <div className="feature-value">{item.bedrooms}</div>
                          <div className="feature-label">BEDS</div>
                        </div>
                      )}
                      {item.bathrooms && (
                        <div className="feature">
                          <div className="feature-value">{item.bathrooms}</div>
                          <div className="feature-label">BATHS</div>
                        </div>
                      )}
                    </div>

                    <Button 
                      className="view-details-btn"
                      onClick={() => setShowPropertyDetails(item._id)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {showPropertyDetails && (
              <div className="modal-overlay">
                <div className="modal-content-custom">
                  <div className="modal-header-custom">
                    <h4 style={{ margin: 0 }}>Property Details</h4>
                    <Button 
                      variant="light" 
                      onClick={() => setShowPropertyDetails(null)}
                      style={{ 
                        borderRadius: "50%", 
                        width: "40px", 
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      ×
                    </Button>
                  </div>
                  
                  <div className="modal-body-custom">
                    {properties.filter(item => item._id === showPropertyDetails).map(item => (
                      <Row key={item._id}>
                        <Col md={6}>
                          <div
                            className="property-detail-image"
                            style={{
                              backgroundImage: `url("${
                                item.propImg1
                                  ? `http://localhost:8000/${item.propImg1.replace(/\\/g, "/")}`
                                  : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                              }")`
                            }}
                          />
                        </Col>
                        
                        <Col md={6}>
                          <div className="detail-section">
                            <div className="detail-label">Property Type</div>
                            <div className="detail-value">
                              <Badge style={getPropertyTypeStyle(item.propertyType)}>
                                {item.propertyType}
                              </Badge>
                            </div>
                          </div>

                          <div className="detail-section">
                            <div className="detail-label">Contact Information</div>
                            <p className="detail-value">📧 {item.ownerEmail}</p>
                            <p className="detail-value">📞 {item.ownerContact}</p>
                          </div>

                          <div className="detail-section">
                            <div className="detail-label">Property Details</div>
                            <p className="detail-value">📍 {item.propertyLocation}</p>
                            <p className="detail-value">📐 {item.propertySize}</p>
                            <p className="detail-value">💰 ₹{item.propertyWorth}</p>
                            {item.bedrooms && <p className="detail-value">🛏️ {item.bedrooms} Bedrooms</p>}
                            {item.bathrooms && <p className="detail-value">🚿 {item.bathrooms} Bathrooms</p>}
                          </div>

                          {item.description && (
                            <div className="detail-section">
                              <div className="detail-label">Description</div>
                              <p className="detail-value">{item.description}</p>
                            </div>
                          )}

                          <div style={{ textAlign: "center", marginTop: "25px" }}>
                            <Button 
                              className="close-modal-btn"
                              onClick={() => setShowPropertyDetails(null)}
                            >
                              Close Details
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!email && (
        <div className="login-prompt">
          <div>
            <h1 style={{ marginBottom: "30px", color: "#495057" }}>
              Your space awaits — just
            </h1>
            <Button 
              className="login-btn-large"
              onClick={() => { navigate("/login") }}
            >
              Log In to Explore
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserHome;