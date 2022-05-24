import { useSpring, animated } from "@react-spring/three";

const Source = ({ position, color }) => {
  const { pos } = useSpring({
    pos: position,

    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });

  return (
    <animated.mesh position={pos}>
      <boxBufferGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial transparent opacity={0.2} color={color} />
    </animated.mesh>
  );
};

export default Source;
