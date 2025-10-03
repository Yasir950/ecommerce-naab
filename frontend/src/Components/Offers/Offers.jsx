import React from "react";
import "./offers.css";

function WaterDropSVG({ width = 50, height = 50 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="dropGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#00b4ff" />
          <stop offset="55%" stopColor="#00d2a8" />
          <stop offset="100%" stopColor="#6a34ff" />
        </linearGradient>
      </defs>

      {/* main drop shape */}
      <path
        d="M32 4 C22 18 12 28 12 40 A20 20 0 0 0 52 40 C52 28 42 18 32 4 Z"
        fill="url(#dropGrad)"
        stroke="#0a7a9a"
        strokeWidth="1"
      />

      {/* subtle highlight */}
      <path
        d="M24 20 C26 16 30 14 34 18"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
export default function Features() {
  const features = [
    {
      title: "Lab Tested",
      img: "https://img.icons8.com/color/96/microscope.png",
    },
    {
      title: "Pure Zamzam Water",
      icon: <WaterDropSVG />, // proper drop
    },
    {
      title: "Food Authority Certified",
      img: "https://img.icons8.com/color/96/approval.png",
    },
    {
      title: "Naturally Pure",
      img: "https://img.icons8.com/color/96/leaf.png",
    },
  ];

  return (
    <section className="offers">
      <div className="container text-center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          {/* Heading */}
          <h1
            className=" line"
            style={{
              fontFamily: "DM Sans",
            }}
          >
            WHY CHOOSE US
          </h1>
        </div>
        {/* Features Grid */}
        <div className="row">
          {features.map((item, index) => (
            <div
              key={index}
              className="col-6 col-md-3 mb-4 d-flex flex-column align-items-center feature-connector"
            >
              <div className="circle-wrapper">
                {/* SVG Circle with Text */}
                <svg viewBox="0 0 200 200" className="circle-svg">
                  <defs>
                    <path
                      id={`circlePath${index}`}
                      d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                    />
                  </defs>
                  <text fontSize="16" fill="#000" fontWeight="800">
                    <textPath
                      href={`#circlePath${index}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {item.title.toUpperCase()}
                    </textPath>
                  </text>
                  <circle
                    cx="100"
                    cy="100"
                    r="65"
                    fill="#FFF  "
                    stroke="#234E41"
                    strokeWidth="4"
                    className="circle-border"
                  />
                </svg>

                {/* Center Icon */}
                <div className="circle-icon">
                  {item.icon ? (
                    item.icon
                  ) : (
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ width: 50, height: 50 }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
