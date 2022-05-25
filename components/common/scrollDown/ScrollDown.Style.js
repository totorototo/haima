import styled from "styled-components";

const style = (Component) => styled(Component)`
  width: 50px;
  height: 90px;
  border: 1px solid var(--color-text);
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
    background-color: var(--color-text);
    border-radius: 50%;
    opacity: 1;
    animation: wheel 2s infinite;
    -webkit-animation: wheel 2s infinite;
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
