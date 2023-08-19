import { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useTexture, OrthographicCamera } from '@react-three/drei'
import { useRef, Suspense } from 'react';
import { MovingStars } from './components/MovingStars';
import { ParticleSphere } from './components/ParticleSphere';
import { Background } from './components/Background';
import { ParticlePlane } from './components/ParticlePlane';


export function PixieDust(props) {
  const freqArray = props.freqData;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas >
        <Suspense fallback={null}>
    
          <Background texture={props.texture} freq={freqArray}/>

          {/* <ParticleSphere count={15000} /> */}

          <ParticlePlane texture={props.texture} freq={freqArray}/>

          {/* <MovingStars scale={0.1} move={0} /> */}

          {/* <OrbitControls /> */}
          <OrthographicCamera makeDefault zoom={550} position={[0.5, 0.5, 200]} />
          <pointLight position={[500, 500, 0]} />
          <ambientLight intensity={0.4} />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  )
}