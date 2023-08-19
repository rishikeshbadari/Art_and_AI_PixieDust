// General imports
import React, { useState, useEffect } from "react";
import { extend } from '@react-three/fiber'
import { useRef } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

import '../css/UploadButton.css'

extend({ TextGeometry });

const sendRequest = async(img) => {
  var myHeaders = new Headers();

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: img,
    redirect: 'follow'
  };

  fetch("https://6ckjv4toq0.execute-api.us-east-1.amazonaws.com/default/upload", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    sendRequest(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export function UploadButton(props){
  const hiddenFileInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="Button"
      >Upload</button>

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={hiddenFileInput}
        style={{display: 'none'}}
        onChange={async(event) => {
          const file = event.target.files[0]
          getBase64(file);
          props.click();
        }}
      />
    </>
  )
}