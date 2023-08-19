import { Canvas } from '@react-three/fiber'
import { DropDown } from './components/DropDown';
import { Warning } from './components/Warning';
import { StartButton } from "./components/StartButton";
import { Html, OrbitControls } from '@react-three/drei'
import ImageUploadBtn from './components/ImageUploadBtn';
import { BasicSphere } from './components/BasicSphere';
import { ParticleSphere } from './components/ParticleSphere';

export function LandingPage(props) {
  return (
      <div>
        <Canvas style={{ height: `100vh`, width: '100vw' }} >
          <StartButton click={props.toggleMicrophone} />
          <ParticleSphere count={5000} />
          <Html >
            <ImageUploadBtn loadedTexture={props.loadedTexture}/>
            <DropDown/>
            <Warning/>
          </Html>
          <pointLight position={[500, 500, 0]} />
          <ambientLight intensity={0.4} />
        </Canvas>
      </div>
  )
}
