import styled from "styled-components";

const style = (Component) => styled(Component)`
  color: var(--color-text);
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .drop-zone {
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
    border: 2px dashed var(--color-gray-300);

    svg {
      fill: var(--color-gray-300);
      align-self: end;
    }

    :last-child {
      align-self: start;
    }
  }

  .mouse {
    width: 50px;
    height: 90px;
    border: 3px solid #333;
    border-radius: 60px;
    position: relative;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      border-radius: 50%;
      opacity: 1;
      animation: wheel 2s infinite;
      -webkit-animation: wheel 2s infinite;
    }
  }

  @keyframes wheel {
    to {
      opacity: 0;
      top: 60px;
    }
  }

  @-webkit-keyframes wheel {
    to {
      opacity: 0;
      top: 60px;
    }
  }
`;

export default style;
