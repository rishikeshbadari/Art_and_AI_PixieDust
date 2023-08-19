import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import { ParticlizeImgShaderMaterial } from "../shaders/particlizeImg";
extend ({ ParticlizeImgShaderMaterial });

var clock = new THREE.Clock();


export function ParticlePlane(props) {
  // Define a texture
  // const textureLoader = new THREE.TextureLoader()
  // textureLoader.crossOrigin = "Anonymous"
  // const texture = textureLoader.load(props.textureURL)

  // const texture = useTexture(require('./../assets/images/Dali.jpeg'));

  const texture = props.texture;
  const textSize = [texture.image.width, texture.image.height];

  const freq = props.freq;
  const bass = freq[1] / 255.0;

  // Number of total particles
  const count = 155000;

  const points = useRef();


  // Create a plane of particles using the parametric equation of a plane
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

      let x = (1.0 * Math.random()) 
      let y = (1.0 * Math.random()) 
      let z = (1.0 * Math.random()) 

      positions.set([x, y, z], i * 3);

    }

    return positions;

  }, [count]);

  const colors = useMemo(() => {
    const colorsArr = new Float32Array(count*3);

    for (let i = 0; i < count; i++) {

      colorsArr.set([1.0, 1.0, 1.0], i * 3);
    }

    return colorsArr;

  }, [count]);


  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
        {/* <bufferAttribute
          attach="attributes-rgb"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        /> */}
      </bufferGeometry>

      {/* <pointsMaterial color="#FFFFFF" size={0.05} map={texture} /> */}

      <particlizeImgShaderMaterial
        uTexture={texture}
        uTextSize={textSize}
        uBass={bass}
        uFreqArray={freq}
        ref={points}
      />
    </points>
  );
}