import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

export const SpiralShaderMaterial = shaderMaterial(
  //Uniform
  { uTime: 0, radius: 0 },

  // Vertex Shader
  glsl`
    uniform float uTime;
    uniform float uRadius;

    mat3 rotation3dY(float angle) {
      float s = sin(angle);
      float c = cos(angle);
        return mat3(
          c, 0.0, -s,
          0.0, 1.0, 0.0,
          s, 0.0, c
        );
      }

    void main() {
      float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 2.0);
      vec3 particlePosition = position * rotation3dY(uTime * 0.02 * distanceFactor);

      vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
      gl_PointSize = 3.0;
    }
  `,

  // Fragment shader
  glsl`
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `
);