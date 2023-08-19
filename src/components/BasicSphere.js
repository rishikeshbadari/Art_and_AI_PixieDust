import { OrbitControls } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";


export function BasicSphere(props) {

  const points = useRef();

  return (
    <points ref={points}>
      <sphereGeometry args={[2.5, 48, 48]} />
      <pointsMaterial color="#FFFFFF" size={0.03} sizeAttenuation />
    </points>
  )
}