import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";

import { TestShaderMaterial } from "../shaders/test";
extend ({ TestShaderMaterial });

export function Test(props) {

  const texture = useTexture(require('./../assets/images/Dali.jpeg'));
  const textureSize = [texture.image.width, texture.image.height];

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.5, 1.5, 8, 8]} />
        <testShaderMaterial uTexture={texture} uTextureSize={textureSize}/>
      </mesh>
      
    </group>
  )

}