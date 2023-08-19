import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const UNIFORM = 
{ 
  uTime: 0, 
  uFreqArray: new Uint8Array(20),
  uColor1: new THREE.Color(0.0, 0.0, 0.0), 
  uTexture: new THREE.Texture() 
}

const VERTEX_SHADER  =
glsl`
  precision mediump float;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4 (position, 1.0);
  }
`

const FRAGMENT_SHADER = 
glsl`
  precision mediump float;

  uniform vec3 uColor1;
  uniform float uTime;
  uniform float[20] uFreqArray;
  vec3[10] uColors;
  uniform sampler2D uTexture;

  varying vec2 vUv;

  mat2 Rot(float a)
  {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
  }

  vec2 hash( vec2 p )
  {
      p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
    return fract(sin(p)*43758.5453);
  }

  float noise( in vec2 p )
  {
      vec2 i = floor( p );
      vec2 f = fract( p );
    
    vec2 u = f*f*(3.0-2.0*f);

      float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                          dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                    mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                          dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
    return 0.5 + 0.5*n;
  }

  void main() {

    
    vec3 color1 = uColor1;
    vec3 color2 = vec3(color1.b, color1.r, color1.g);
    vec3 color3 = vec3(color1.g, color1.b, color1.r);
    
    // GRADIENT FLOW
    vec2 uv = gl_FragCoord.xy / 2000.0;
    float ratio = 1.;

    vec2 tuv = uv;
    tuv -= .5;

    // rotate with Noise
    float degree = noise(vec2(uTime*.1, tuv.x*tuv.y));

    tuv.y *= 1./ratio;
    tuv *= Rot(radians((degree-.5)*720.+180.));
    tuv.y *= ratio;

    // Wave warp with sin
    float frequency = 3.;
    float amplitude = 30.;
    float speed = uTime * 2.;
    tuv.x += sin(tuv.y*frequency+speed)/amplitude;
    tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);        
    
    // mix colors
    vec3 mix1 = mix(color1, color2, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
    
    vec3 mix2 = mix(color1, color3, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
    
    vec3 col = mix(mix1, mix2, smoothstep(.5, -.3, tuv.y));
    
    gl_FragColor = vec4( col, 1.0 );
  }
`
export const BgGradientShaderMaterial = shaderMaterial(UNIFORM, VERTEX_SHADER, FRAGMENT_SHADER);