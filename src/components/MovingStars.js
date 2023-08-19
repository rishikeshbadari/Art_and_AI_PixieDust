
import * as THREE from 'three'
import { Star } from './Star';

var clock = new THREE.Clock();

export function MovingStars(props) {
  return (
    <group>
      <Star scale={Math.sin(props.scale)} position={[-0.8, Math.sin(clock.getElapsedTime()) + 0.4, 0]}/>
      <Star scale={props.scale} position={[0, Math.cos(clock.getElapsedTime()), 0]}/>
      <Star scale={props.scale} position={[0.8,Math.sin(clock.getElapsedTime()) - 0.4, 0]}/>
    </group>
  )
}