import styled from "styled-components";
import { RadialProgressBar } from "../../common";

const style = (Component) => styled(Component)`
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;

  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--color-text);
  position: relative;
  padding: 1rem;

  ${RadialProgressBar} {
    margin-top: 3rem;
    align-self: center;
  }

  .title {
    font-family: "Love Ya Like A Sister", cursive;
    font-size: 1rem;
    z-index: 50;
    margin-left: 1rem;
  }

  p {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    span {
      &.category {
        font-weight: bolder;
        font-size: 1.2rem;
        margin-bottom: 0.2rem;
        font-family: "Love Ya Like A Sister", cursive;
        svg {
          margin-left: 0.3rem;
          background-color: var(--color-alert);
          border-radius: 1rem;
          stroke: var(--color-background);
          padding: 0.2rem;

          &.disable {
            opacity: 0.1;
          }
        }
      }
      &.score {
      }
      &.details {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

export default style;
