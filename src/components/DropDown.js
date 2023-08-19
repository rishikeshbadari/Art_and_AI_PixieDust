// General imports
import React, { useState, useEffect } from "react";
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'


extend({ TextGeometry });


/* Button CSS */
const buttonStyle = {
  backgroundColor: "#000000",
  border: "2px solid rgb(255,255,255)",
  borderRadius: ".0rem",
  width: "230px",
  height: "50px",

  color: "#FFFFFF",
  fontFamily: "PT Mono",
  fontSize: "1rem",
  fontWeight: "600",
  lineHeight: "1.25rem",
  padding: ".2rem .5rem",
  textDecoration: "none #D1D5DB solid",
  textDecorationThickness: "auto",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  top: "-45vh",
  right: "-40vw",

  "&:hover": {
    color: "#000000",
  }
}


const optionStyle = {
  margin: "0.5rem",
  backgroundColor: "#252525",
  width: "200px",
  height: "20px",

  "&:hover": {
    color: "#000000",
  }
};

//variable for bgc that is changed by dropdown onChange
const backgroundColor = {};
//import this into other files to access option chosen
export default backgroundColor;

export function DropDown(props){
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("---Choose theme---");

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleClick = (option) => {
    console.log("selected", option, "in dropdown");
    backgroundColor.theme = option;
    setSelectedOption(option);
    toggleOpen();
  };
  const optionsStyle = {
    display: isOpen ? "block" : "none",
    backgroundColor: "#252525",
    color: "#FFFFFF",
    padding: "0.5rem",
    position: "absolute",
    cursor: "pointer",
    top: "-45vh",
    right: "-40vw",
    zIndex: "1",
    width: "230px",
    "&:hover": {
      color: "#000000",
    }
  };

return (
  <div>
    <button style={buttonStyle} onClick={toggleOpen}>
      {selectedOption} ▼
    </button>
    {isOpen && (
      <div style={optionsStyle}>
        <div style={optionStyle} onClick={() => handleClick("---Choose theme---")}>
          ---Choose theme---
        </div>
        <div style={optionStyle} onClick={() => handleClick("Mood")}>
          Mood
        </div>
        <div style={optionStyle} onClick={() => handleClick("Image")}>
          Image
        </div>
      </div>
    )}
  </div>
);

};