import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const UNIFORM = 
{ 
  uTexture: new THREE.Texture(),
  uTextureSize: new THREE.Vector2(),
}

const VERTEX_SHADER  =
glsl`
  precision mediump float;

  uniform vec2 uTextureSize;
  uniform sampler2D uTexture;
    
  varying vec2 vUv;
  varying vec2 vPUv;

  void main() {
    vUv = uv;

    vec2 puv = vUv / uTextureSize;
    vPUv = puv;

    vec4 colA = texture2D(uTexture, puv);
    float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;

    float psize = 0.5;
    psize *= max(grey, 0.2);
    psize *= 1.58;

    vec4 mvPosition = modelViewMatrix * vec4(1.0, 1.0, 1.0, 1.0);;
    mvPosition.xyz += position * psize;
    vec4 finalPosition = projectionMatrix * mvPosition;

    gl_Position = finalPosition;
  
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);


  }
`

const FRAGMENT_SHADER = 
glsl`
  uniform sampler2D uTexture;

  varying vec2 vPUv;
  varying vec2 vUv;
  
  void main() {

    vec4 color = vec4(0.0);
    vec2 uv = vUv;
    vec2 puv = vPUv;

    vec4 colA = texture2D(uTexture, puv);

    float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
    vec4 colB = vec4(grey, grey, grey, 1.0);

    float border = 0.3;
    float radius = 0.2;
    float dist = radius - distance(uv, vec2(0.5));
    float t = smoothstep(0.0, border, dist);

    uv = 2.0 * uv - 1.0;

    float circle = (uv.x * uv.x + uv.y * uv.y) * 0.2;
    vec4 color1 = vec4(0.1, 0.2, 0.8, 1.0); // Red
    vec4 color2 = vec4(0.2, 0.1, 0.8, 1.0); // Blue

    color = mix(color1, color2, circle);
    // final color
    color = colB;
    color.a = t;

    gl_FragColor = color;

    // vec3 texture = texture2D(uTexture, vUv).rgb;
    // gl_FragColor = vec4(texture, 1.0);
    
  }
  
`
export const TestShaderMaterial = shaderMaterial(UNIFORM, VERTEX_SHADER, FRAGMENT_SHADER);