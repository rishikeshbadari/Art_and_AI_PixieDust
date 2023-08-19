import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

export const GradientShader3Material = shaderMaterial(
    // Uniform
    { uTime: 0, uFreqArray: new Uint8Array(20), uColor1: new THREE.Color(0.0, 0.0, 0.0), uColor2: new THREE.Color(0.0, 0.0, 0.0), uColor3: new THREE.Color(0.3, 0.4, 1.0), uTexture: new THREE.Texture() },
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
  
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
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

        uColors[0] = vec3(0.502,0.,0.);
        uColors[1] = vec3(0.604,0.388,0.141);
        uColors[2] = vec3(0.502,0.502,0.);
        uColors[3] = vec3(0.275,0.6,0.565);
        uColors[4] = vec3(0.,0.,0.459);
        
        uColors[5] = vec3(0.863,0.745,1.);
        uColors[6] = vec3(0.667,1.,0.765);
        uColors[7] = vec3(0.98,0.745,0.831);
        uColors[8] = vec3(1.,0.847,0.694);
        uColors[9] = vec3(1.,0.98,0.784);


        vec3 color1 = uColors[0];
        vec3 color2;
        vec3 color3;
        float max = 0.0;
        int idx = 0;
        for (int i = 0; i < uFreqArray.length(); i++) {
          if (uFreqArray[i] >= max) {
            max = uFreqArray[i];
            idx = i;
          }
        }

        if (idx <= 1) {
          color1 = uColors[0];
        } else if (idx <= 3) {
          color1 = uColors[1];
        } else if (idx <= 5) {
          color1 = uColors[2];
        } else if (idx <= 7) {
          color1 = uColors[3];
        } else if (idx <= 9) {
          color1 = uColors[4];
        } else if (idx <= 11) {
          color1 = uColors[5];
        } else if (idx <= 13) {
          color1 = uColors[6];
        } else if (idx <= 15) {
          color1 = uColors[7];
        } else if (idx <= 17) {
          color1 = uColors[8];
        } else if (idx <= 19) {
          color1 = uColors[9];
        }
        
        // if (idx < 10) {
        //   color1 = uColors[idx];
        // }
        
        color2 = vec3(color1.b, color1.r, color1.g);
        color3 = vec3(color1.g, color1.b, color1.r);
        
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

        // NORMAL GRADIENT
        // float oscillation = sin( uTime ) * 0.5 + 0.5;
        // vec3 texture = texture2D(uTexture, vUv).rbg; // image texture
        // //vec2 vUv = gl_FragCoord.xy / 600.0; // uncomment for different gradient
        // vec3 mix1 = mix( color1,  uColor3,  mix(vUv.x, vUv.y, 0.5 ) ); // swap y and x's to modify 
        // vec3 mix2  = mix( uColor2, color1,  mix( vUv.x, vUv.y, 0.5 ) );
        // vec3 color = mix( mix1, mix2, oscillation );
        // vec3 texture2 = color; // dynamic gradient, can add image also
        // vec3 texture3 = mix(uColor1, uColor2, mix(vUv.x, vUv.y, 0.5)); // static gradient
        // gl_FragColor = vec4( texture2, 1.0 );

        // TURBULENT FLOW
        // vec2 col;
        // float t = uTime*.1;
        // vec2 uv = (gl_FragCoord.xy)/1000.0+vec2(t,t*2.0);
        // float factor = 0.2;
        // vec2 v1;
        // for(int i=0;i<uFreqArray.length();i++)
        // {
        //   uv *= -factor*factor;
        //   v1 = uv.yx/factor;
        //   uv += sin(v1+col+t*5.0)/factor;
        //   col += vec2(sin(uv.x-uv.y+v1.x-col.y),sin(uv.y-uv.x+v1.y-col.x));
        // }
        // vec3 texture2 = vec3(col.x, sin(col.x+col.y), col.y);
        // gl_FragColor = vec4(texture2, 1.0);
      }
    `
);