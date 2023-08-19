import * as THREE from 'three'
import { useRef, Suspense } from 'react';
import { extend, useFrame } from '@react-three/fiber'

import { InvertShaderMaterial } from "./../shaders/invert";
import { useTexture } from '@react-three/drei';
extend({ InvertShaderMaterial });

var clock = new THREE.Clock();

export function Frames(props) {
  const ref = useRef();
  //TODO: replace this with the actual texture that gets passed in from app

  const textureLoader = new THREE.TextureLoader()
  textureLoader.crossOrigin = "Anonymous"
  const texture = textureLoader.load(props.textureURL)

  // const texture = useTexture(require('./../assets/images/Dali.jpeg'));

  return (
    <group>
      <mesh position={[-1.16, 0, 0]}>
        <planeGeometry args={[0.5, 1.2, 8, 8]} />
        <invertShaderMaterial uTime={clock.getElapsedTime()} uColor={"green"} uTexture={texture} uFreq={props.freq} ref={ref} />
      </mesh>

      <mesh position={[-0.58, 0, 0]}>
        <planeGeometry args={[0.5, 1.2, 8, 8]} />
        <invertShaderMaterial uTime={clock.getElapsedTime()} uColor={"green"} uTexture={texture} uFreq={props.freq1} ref={ref} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[0.5, 1.2, 8, 8]} />
        <invertShaderMaterial uTime={clock.getElapsedTime()} uColor={"green"} uTexture={texture} uFreq={props.freq2} ref={ref} />
      </mesh>

      <mesh position={[0.58, 0, 0]}>
        <planeGeometry args={[0.5, 1.2, 8, 8]} />
        <invertShaderMaterial uTime={clock.getElapsedTime()} uColor={"green"} uTexture={texture} uFreq={props.freq3} ref={ref} />
      </mesh>

      <mesh position={[1.16, 0, 0]}>
        <planeGeometry args={[0.5, 1.2, 8, 8]} />
        <invertShaderMaterial uTime={clock.getElapsedTime()} uColor={"green"} uTexture={texture} uFreq={props.freq4} ref={ref} />
      </mesh>
    </group>

  )
}