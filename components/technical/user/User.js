import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const User = ({ ...props }) => {
  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF("/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Idle.play();
    scene.traverse(
      (obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [actions, scene]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={2.11}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.Object_7.geometry}
            material={nodes.Object_7.material}
            skeleton={nodes.Object_7.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_9.geometry}
            material={nodes.Object_9.material}
            skeleton={nodes.Object_9.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_11.geometry}
            material={nodes.Object_11.material}
            skeleton={nodes.Object_11.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_13.geometry}
            material={materials.Material}
            skeleton={nodes.Object_13.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_15.geometry}
            material={materials.Character_2}
            skeleton={nodes.Object_15.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_17.geometry}
            material={nodes.Object_17.material}
            skeleton={nodes.Object_17.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_19.geometry}
            material={nodes.Object_19.material}
            skeleton={nodes.Object_19.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_21.geometry}
            material={nodes.Object_21.material}
            skeleton={nodes.Object_21.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_23.geometry}
            material={materials.Character_4}
            skeleton={nodes.Object_23.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_25.geometry}
            material={nodes.Object_25.material}
            skeleton={nodes.Object_25.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_27.geometry}
            material={materials.Tshirt_Design_1}
            skeleton={nodes.Object_27.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_29.geometry}
            material={nodes.Object_29.material}
            skeleton={nodes.Object_29.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

export default User;

useGLTF.preload("/scene.gltf");
