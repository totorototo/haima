import style from "./SpatialScene.Style";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  Cone,
  OrbitControls,
  OrthographicCamera,
  Sphere,
} from "@react-three/drei";
import { Source, User, Speaker } from "../../index";
import { useEffect, useRef, useState, Suspense } from "react";
import { Pause, Play, Restart, Stop } from "@styled-icons/remix-line";
import { useRecoilValue } from "recoil";
import { sceneState } from "../../../model";

const SpatialScene = ({ className, width, height }) => {
  const sources = useRecoilValue(sceneState);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      interval.current = setInterval(() => {
        setTime((time) => time + 10);
      }, 1000);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isActive, isPaused]);

  return (
    <div className={className} style={{ width, height }}>
      <div className={"title"}>spatial scene</div>
      <div className={"commands"}>
        <Play
          className={`${isActive && !isPaused && "active"}`}
          size={"24"}
          onClick={() => {
            setIsActive(true);
            setIsPaused(false);
          }}
        />
        <Pause
          className={`${isPaused && isActive && "active"}`}
          size={"24"}
          onClick={() => {
            setIsActive(true);
            setIsPaused(true);
          }}
        />

        <Stop
          size={"24"}
          onClick={() => {
            setIsActive(false);
            setIsPaused(true);
            setTime(0);
          }}
        />
        <Restart
          size={"20"}
          onClick={() => {
            setIsActive(true);
            setIsPaused(false);
            setTime(0);
          }}
        />
      </div>
      <Canvas
        className={className}
        style={{ background: "white", width, height }}
        shadows
        dpr={[1, 2]}
        camera={{ position: [-2, 1, 7], fov: 50 }}
      >
        <axisHelper />
        <pointLight position={[-3, 3, -3]} intensity={1} color={0xffffff} />
        <directionalLight
          intensity={0.8}
          castShadow
          shadow-mapSize-height={1512}
          shadow-mapSize-width={1512}
        />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeBufferGeometry
            attach="geometry"
            args={[20, 20]}
            receiveShadow
          />
          <meshPhongMaterial
            attach="material"
            color="#ccc"
            side={THREE.DoubleSide}
            receiveShadow
          />
        </mesh>

        <gridHelper args={[20, 20]} />

        <User scale={1.5} rotation={[0, Math.PI, 0]} />

        <Cone
          args={[4, 10]}
          position={[0, 4, -5]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        >
          <meshBasicMaterial transparent opacity={0.3} color={"pink"} />
        </Cone>

        {sources &&
          sources.length > 0 &&
          sources.map((source, index) => {
            if (source.definition === "DirectSpeakers") {
              const deltaX = 0 - source.steps[0].position[0];
              const deltaZ = 0 - source.steps[0].position[2];
              const theta = Math.atan2(deltaZ, deltaX);

              return (
                <Suspense key={index} fallback={null}>
                  <Speaker
                    rotation={[
                      0,
                      theta >= 0 ? -theta : Math.abs(theta),
                      source.steps[0].position[1] > 0
                        ? ((-1 / 4) * Math.PI) / 2
                        : 0,
                    ]}
                    scale={15}
                    key={index}
                    color={source.color}
                    position={[
                      source.steps[0].position[0] * 10,
                      source.steps[0].position[1] * 10,
                      source.steps[0].position[2] * 10,
                    ]}
                  />
                </Suspense>
              );
            } else {
              const step = source.steps.find(
                (step) =>
                  time * 1000 >= step.startTime &&
                  time * 1000 <= step.startTime + step.duration
              );

              if (step) {
                return (
                  <Source
                    key={index}
                    color={source.color}
                    position={[
                      step.position[0] * 10,
                      step.position[1] * 10,
                      step.position[2] * 10,
                    ]}
                  />
                );
              }
            }
          })}

        <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />
        <OrbitControls minZoom={10} maxZoom={150} />
      </Canvas>
    </div>
  );
};

export default style(SpatialScene);
