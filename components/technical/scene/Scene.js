import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

import style from "./Scene.Style";
import User from "../user/User";
import Source from "../source/Source";

const Scene = ({ className, width, height }) => {
  return (
    <div className={className}>
      <div className={"title"}>{"scene"}</div>
      <div className={"commands"}>commands</div>
      <Canvas
        style={{ background: "white", width, height }}
        shadows
        dpr={[1, 2]}
        camera={{ position: [-2, 1, 7], fov: 50 }}
      >
        <pointLight position={[3, 5, 2]} intensity={3} color={0xffffff} />
        <directionalLight
          intensity={0.8}
          castShadow
          shadow-mapSize-height={1512}
          shadow-mapSize-width={1512}
        />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.1, 0]}
          receiveShadow
        >
          <planeBufferGeometry
            attach="geometry"
            args={[15, 15]}
            receiveShadow
          />
          <meshPhongMaterial
            attach="material"
            color="#ccc"
            side={THREE.DoubleSide}
            receiveShadow
          />
          {/*  <meshBasicMaterial
            opacity={0.09}
            attach="material"
            map={texture}
            side={THREE.DoubleSide}
          />*/}
        </mesh>

        <gridHelper args={[60, 60]} />

        <User />
        <Source position={[2, 3, 2]} />
        <Source position={[6, 1, -2]} />
        <Source position={[-2, 3, 5]} />

        <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />
        <OrbitControls minZoom={10} maxZoom={150} />
      </Canvas>
    </div>
  );
};

export default style(Scene);
