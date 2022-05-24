import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/speaker/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            geometry={nodes.pCylinder4_lambert1_0.geometry}
            material={materials.lambert1}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/speaker/scene.gltf");
