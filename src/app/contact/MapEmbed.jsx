// components/MapEmbed.js
"use client";
import React from "react";

const MapEmbed = ({path}) => {
  return (
    <div style={{ width: "100%", height: "450px", marginTop: "40px" }}>
      <iframe
        src={path}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
