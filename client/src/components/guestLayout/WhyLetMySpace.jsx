import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
const WhyLetMySpace = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const cursScaleRef=useRef(null);
  useGSAP(() => {
    const container = "#container";

    gsap.to(`${container} .gsapAnime`, {
      x: "-85%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        scrub: 0.1,
        pin: true,
        start: "top top",
        end: "top -400%",
        anticipatePin: 5,
      },
    });
  });

  return (
    <>
      <style>
        {`
        *{
        transition:all 0s;
        }
        #container{
          min-height:100vh;
          max-width:100vw;
          background:#F4F8D3;
          display:flex;
          align-items:center;
          overflow-x:hidden;
          white-space:nowrap;
          transition:none;
        }
        .gsapAnime{
          white-space:nowrap;
          background:transparent;
          display:flex;
          align-items:center;
        }
        .letcard{
        width:600px;
        height:270px;
        line-height:40px;
        backdrop-filter:blur(10px);
        z-index:20;
        margin:0 50px;
        background:rgba(247, 214, 160, 0.56);
        flex-shrink:0;
        align-content:center;
        border-radius:20px;
        text-align:center;
        box-shadow:0px 0px 15px black;
        border:2px solid rgb(255, 255, 255);
        transition:all 0.3s;
        }
        .letcard:hover{
          transform:translate(0px ,-20px);
          box-shadow:10px 10px 15px rgba(1, 1, 1, 0.8);
          transition:all 0.3s;
          scale:1.1;
        }
        .whyLet{
        white-space:nowrap;
        font-size:15vw;
        text-transform:uppercase;
        color:black;
        text-shadow:5px 5px 10px rgb(71, 67, 67);
        margin:5vw 5vw;
        }
        .letcard h1{
        text-transform:uppercase;
        }
        .letcard .icon{
        position:absolute;
        scale:5;
        top:50%;
        left:50%;
        // transform:translate(-50%,-50%);
        z-index:-1;
        opacity:0.2;
        }
        
        `}
      </style>
      <div>
        <div id="container">
          <div className="gsapAnime">
            <h1 className="whyLet" ref={cursScaleRef}><span style={{background:"black",color:"white", padding:"0 20px",borderRadius:"25px"}}>LET</span><span style={{background:"transparent",color:"black",padding:"0 20px"}}>MY</span><span style={{background:"black",color:"white",padding:"0 20px",borderRadius:"25px"}}>SPACE</span></h1>
            <div className="letcard">
              <h1 className="icon">🏠</h1>
              <h1> Clear Property Details</h1>Every listing includes full info
              like amenities, rules, and location.
            </div>
            <div className="letcard">
            <h1 className="icon">🛡️</h1>
              <h1> Verified Listings,</h1>
              All listings are manually verified to ensure safety and
              authenticity.
            </div>
            <div className="letcard">
              <h1 className="icon">🚀</h1>
              <h1> Fast Booking</h1>
              Book your preferred space in just a few clicks — no long forms
            </div>
            <div className="letcard">
            <h1 className="icon">🏙️</h1>
              <h1> Wide Network,</h1>
              Access spaces across multiple cities and local neighborhoods.
            </div>
            <div className="letcard">
            <h1 className="icon">💬</h1>
              <h1> Easy Chat</h1>
              Connect directly with hosts through our built-in chat system
            </div>
            <div className="letcard">
            <h1 className="icon">🔍</h1>
              <h1> Smart Filters</h1>
              Find your ideal space using filters like price, type, and
              location.
            </div>
            <div className="letcard">
            <h1 className="icon">📅</h1>
              <h1> Flexible Dates</h1>
              Choose from hourly, daily, or monthly bookings — your call..
            </div>
            <div className="letcard">
            <h1 className="icon">🧾</h1>
              <h1> Transparent Pricing</h1>
              No hidden charges — what you see is what you pay.
            </div>
            <div className="letcard">
            <h1 className="icon">📱</h1>
              <h1> Mobile Friendly</h1>
              Book, chat, and explore seamlessly from any device.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyLetMySpace;
