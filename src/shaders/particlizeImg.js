import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const UNIFORM = 
{ 
  uTexture: new THREE.Texture(),
  uTextSize: new THREE.Vector2(),
  uFreqArray: new Uint8Array(20),
  uBase: 0.0
}

const VERTEX_SHADER  =
glsl`
  precision mediump float;

  attribute vec3 rgb;

  uniform float uBass;
  uniform sampler2D uTexture;
  uniform float[20] uFreqArray;
    
  varying vec2 vUv;
  varying vec3 vColor;
  varying float noise;
  varying vec3 fNormal;

  void main() {
    // vColor = rgb;
    vUv = vec2(position.x, position.y);
    float high = (uFreqArray[8]) / 270.0;
    float mid = (uFreqArray[1])/ 255.0;
    float bass = (uFreqArray[0] / 255.0) * 2.0;

    vec4 color = texture2D(uTexture, vUv);
    float disp = (color.r ) * high;
    float d = 0.0;

    vec3 displacedPosition = position;
    displacedPosition += vec3(disp, 0.0, 0.0);

    
    if (color.r < 0.2 && color.g < 0.2 && color.b < 0.2) {
      d = (color.b + 0.3) * bass;
      displacedPosition += vec3(-d * 1.2, 0.0, 0.0);
      gl_PointSize = 10.0 * bass;
    } else {
      displacedPosition += vec3(disp, 0.0, disp);
      gl_PointSize = 6.0 * mid;
    }
    
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
 

  }
`

const FRAGMENT_SHADER = 
glsl`
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec2 uTextSize;

  varying vec2 vUv;
  varying vec3 vColor;

  varying float noise;
  varying vec3 fNormal;
  
  void main() {

    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture, 1.0);

    

    // add color tint
    // vec4 color = vec4( vColor, 1.0 );
    // vec4 texColor = texture2D( uTexture, vUv );
    // gl_FragColor = color * texColor;

    
  }
  
`
export const ParticlizeImgShaderMaterial = shaderMaterial(UNIFORM, VERTEX_SHADER, FRAGMENT_SHADER);