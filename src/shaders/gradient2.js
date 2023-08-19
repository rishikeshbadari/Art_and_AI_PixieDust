import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

export const GradientShader2Material = shaderMaterial(
    // Uniform
    { uTime: 0, uFreqData: new Uint8Array(20), uColor: new THREE.Color(0.0, 0.0, 0.0), uTexture: new THREE.Texture() },
    // Vertex Shader
    glsl`
      precision mediump float;
  
      varying vec2 vUv;
  
      void main() {
        vUv = uv;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4 (position, 1.0);
      }
    `,
    // Fragment shader
    glsl`
      precision mediump float;
  
      uniform vec3 uColor;
      uniform float[20] uFreqData;
      uniform float uTime;
      uniform sampler2D uTexture;
  
      varying vec2 vUv;
  
      void main() {
        float r = uFreqData[0] / 255.0;
        float g = uFreqData[7] / 255.0;
        float b = uFreqData[14] / 255.0;
        vec3 texture = vec3(r, g, b) + texture2D(uTexture, vUv).rbg;
        gl_FragColor = vec4(texture, 0.5);
      }
    `
);