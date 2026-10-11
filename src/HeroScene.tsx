import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, PresentationControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function FashionObject() {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.18
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.75) * 0.09
  })

  return (
    <group ref={group} rotation={[0.15, -0.55, -0.08]}>
      <mesh castShadow position={[0, -0.2, 0]} scale={[1.9, 2.2, 0.42]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#a60026" roughness={0.2} metalness={0.15} clearcoat={1} />
      </mesh>
      <mesh position={[0, 1.04, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.05, 1, 0.85]}>
        <torusGeometry args={[0.68, 0.09, 20, 64, Math.PI]} />
        <meshStandardMaterial color="#f7efe7" metalness={0.35} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.2, 0.43]}>
        <sphereGeometry args={[0.32, 48, 48]} />
        <MeshTransmissionMaterial color="#ffffff" transmission={1} roughness={0.05} thickness={0.7} ior={1.3} chromaticAberration={0.05} />
      </mesh>
      <mesh position={[-1.32, 0.55, -0.5]} rotation={[0.4, 0.3, 0.2]}>
        <torusKnotGeometry args={[0.22, 0.06, 90, 16]} />
        <meshStandardMaterial color="#e5b67b" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.7]} camera={{ position: [0, 0.25, 6], fov: 38 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={2.3} />
      <directionalLight position={[3, 5, 4]} intensity={4} />
      <pointLight position={[-3, -1, 2]} intensity={6} color="#ff6b81" />
      <PresentationControls global speed={1.2} zoom={0.9} polar={[-0.3, 0.35]} azimuth={[-0.6, 0.6]}>
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
          <FashionObject />
        </Float>
      </PresentationControls>
    </Canvas>
  )
}
