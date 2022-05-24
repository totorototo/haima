import styled from "styled-components";

const style = (Component) => styled(Component)`
  position: relative;

  .title {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-family: "Love Ya Like A Sister", cursive;
    font-size: 1rem;
    z-index: 50;
  }

  svg {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default style;
