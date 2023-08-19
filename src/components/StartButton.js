// General imports
import React, { useState, useEffect } from "react";
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react';

// Fonts and Shader imports
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import inconsolata from './../assets/fonts/Inconsolata_Regular.json'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { TextWaveShaderMaterial } from "./../shaders/textwave";

extend({ TextGeometry });
extend({ TextWaveShaderMaterial });

var clock = new THREE.Clock();

const font = new FontLoader().parse(inconsolata);

export function StartButton(props){
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));
  const ref = useRef();
  return (
    <mesh
      position={[-1.8, -0.3, 0]}
      onClick={props.click}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >

      <textGeometry args={['Start', { font, size: 1, height: 1 }]} />
      <textWaveShaderMaterial uTime={clock.getElapsedTime()} color={"green"} ref={ref} wireframe />
    </mesh>
  )
}