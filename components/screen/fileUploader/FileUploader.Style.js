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
`;

export default style;
