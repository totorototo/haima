import styled from "styled-components";

const style = (Component) => styled(Component)`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;

  .title {
    font-family: "Love Ya Like A Sister", cursive;
    font-size: 1rem;
    z-index: 50;
    margin-left: 1rem;
  }

  .subtitle {
    //font-family: "Love Ya Like A Sister", cursive;
    font-weight: 100;
    font-size: 1rem;
    z-index: 50;
    margin-left: 2rem;
  }

  .heatmap-container {
    display: flex;
    flex: 1;
    margin: 1rem;
  }
`;

export default style;
