import React, { useState, useRef } from 'react';
import * as THREE from 'three';

import '../css/UploadButton.css'

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
  right: "-23vw",

  "&:hover": {
    backgroundColor: "rgb(249,250,251)"
  }
}
const sStyle = {
  backgroundColor: "none",
  width: "400px",
  color: "#FFFFFF",
  fontFamily: "PT Mono",
  fontSize: "1rem",
  fontWeight: "600",
  lineHeight: "1.25rem",
  padding: ".2rem .5rem",
  textDecoration: "none #D1D5DB solid",
  textDecorationThickness: "auto",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  top: "-38vh",
  right: "-35vw",

}

/**
 * FileInput component that allows selecting a file.
 * @param {object} props - The props object.
 * @param {function} props.onFileSelect - Callback function called when a file is selected.
 */
const FileInput = ({ onFileSelect }) => {
  // Create a ref to the file input element
  const fileInputRef = useRef(null);

  // Handle file selection event
  const handleFileSelect = () => {
    const file = fileInputRef.current.files[0];
    onFileSelect(file);
  };

  // Render the file input element and button to select files
  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
      <button style={buttonStyle} onClick={() => fileInputRef.current.click()}>Select Image</button>
    </div>
  );
};

/**
 * FileUploadButton component that allows uploading a file and displaying the loaded texture.
 * @param {object} props - The props object.
 * @param {function} props.loadedTexture - Callback function called when the texture is loaded.
 */
const ImageUploadBtn = ({ loadedTexture }) => {
  // State variable to store the loaded texture
  const [texture, setTexture] = useState(null);
  // State variable to store the name of the uploaded image
  const [imageName, setImageName] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);

  // Load texture from file
  const loadTexture = (file, onLoad) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      URL.createObjectURL(file),
      texture => {
        // Set the texture state variable
        onLoad(texture);

        // Call the loadedTexture callback function with the loaded texture
        loadedTexture(texture);

        // Set the image name state variable
        setImageName(file.name);
      },
      undefined,
      error => console.error('Error loading texture', error),
    );
  };

  // Handle file selection event
  const handleFileSelect = file => {
    loadTexture(file, 
      texture => {//setTexture(texture);
      setImageSelected(true);
    });
  };

  // Render the file input button and the loaded texture
  return (
    <div>
      <FileInput onFileSelect={handleFileSelect} />
      {imageSelected && 
      (<p style={sStyle}>Selected Image: {imageName}</p>)
      }
      {texture && (
        <div>
          <p> Selected Image: {imageName}</p>
          <img className={"loaded-texture"} src={texture.image.src} alt="Selected texture" />
        </div>
      )}
    </div>
  );
};

export default ImageUploadBtn;
