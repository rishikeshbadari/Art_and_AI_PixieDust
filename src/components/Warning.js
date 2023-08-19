// General imports
import React, { useState, useEffect } from "react";
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { RepeatWrapping } from "three";

extend({ TextGeometry });

/* Button CSS */
const textBox = {
  backgroundImage: "url(warn.png)",
  backgroundPosition: "left center",
  backgroundSize: "auto 90%",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#000000",
  border: "2px solid rgb(255,255,255)",
  borderRadius: ".0rem",
  width: "300px",
  height: "100px",

  color: "#FFFFFF",
  fontFamily: "PT Mono",
  fontSize: "0.75rem",
  fontWeight: "600",
  lineHeight: "0.75rem",
  textAlign: "left",
  textDecoration: "none #D1D5DB solid",
  textDecorationThickness: "auto",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  top: "-45vh",
  left: "-45vw",
  paddingLeft: "90px",
  text: "WARNING: Visualization may potentially trigger seizures for people with photosensitive epilepsy. Viewer discretion advised",
  
  "&:hover": {
    backgroundColor: "rgb(249,250,251)"
  }
}
  
//variable for bgc that is changed by dropdown onChange
const backgroundColor = {};
//import this into other files to access option chosen
export default backgroundColor;

export function Warning(props){
    return (
        <button style={textBox} className="Button">
        WARNING: Visualization may potentially trigger seizures for people with photosensitive epilepsy. Viewer discretion advised
        </button>
    )
  }