import styled from "styled-components";

const style = (Component) => styled(Component)`
  position: relative;

  > svg {
    position: absolute;
    //background-color: var(--color-gray-100);
    left: 10px;
    top: 10px;
  }

  .horizontal-ticks {
    g {
      text {
        opacity: 0;
      }
      line {
        opacity: 0.1;
      }
    }
    g:nth-child(4n + 1) {
      text {
        opacity: 1;
      }
      line {
        opacity: 1;
      }
    }
  }

  .vertical-ticks {
    g {
      text {
        opacity: 0;
      }
      line {
        opacity: 0.1;
      }
    }
    g:nth-child(4n + 0) {
      text {
        opacity: 1;
      }
      line {
        opacity: 1;
      }
    }
  }
`;

export default style;
