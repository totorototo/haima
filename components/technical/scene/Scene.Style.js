import styled from "styled-components";

const style = (Component) => styled(Component)`
  width: 100%;
  height: 100%;

  position: relative;

  .title {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-family: "Love Ya Like A Sister", cursive;
    font-size: 1rem;
  }

  .commands {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    background-color: palevioletred;
  }
`;

export default style;
