// https://codesandbox.io/s/r3f-sky-dome-dgbmm

import { Suspense, useRef } from "react";
import * as THREE from "three";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
  ReactThreeFiber,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as S from "./styles";

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}
function Controls(props: any) {
  const { camera, gl } = useThree();
  const ref = useRef<OrbitControls>();
  useFrame(() => ref.current?.update());
  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      {...props}
      args={[camera, gl.domElement]}
    />
  );
}

function Dome() {
  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/imoveis/immersive/download.jpg"
  );
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
export default function ImmersiveCam() {
  return (
    <S.ImmersiveCam>
      <Canvas camera={{ position: [0, 0, 0.1] }}>
        <Controls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.2}
          rotateSpeed={-0.5}
        />
        <Suspense fallback={null}>
          <Dome />
        </Suspense>
      </Canvas>
    </S.ImmersiveCam>
  );
}
