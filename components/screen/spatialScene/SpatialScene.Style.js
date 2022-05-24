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
  .commands {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    height: 2rem;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    z-index: 11;

    > svg {
      &.active {
        fill: var(--color-primary);
      }
    }
  }
`;

export default style;
