import styled from "styled-components";
import THEME from "../../../theme/Theme";

const style = (Component) => styled(Component)`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  justify-content: center;
  color: var(--color-text);
  font-family: "Love Ya Like A Sister", cursive;

  .menu {
    font-size: 1.1em;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    //margin-top: 1rem;

    .title {
      transition: background-color 0.5s ease, color 0.5s ease;
    }

    .menu-items {
      display: none;
    }

    .settings {
      display: none;
    }

    .hamburger {
      z-index: 2000;
    }

    @media screen and (min-width: ${THEME.breakpoints[0]}) {
      .settings {
        display: flex;
      }

      .menu-items {
        display: flex;

        align-items: center;
        justify-content: space-around;

        a {
          padding: 8px 8px 8px 8px;
          text-decoration: none;
          color: var(--color-text);
          display: block;
          transition: 0.3s;
        }

        a:hover {
          color: var(--color-gray-200);
        }
      }

      .hamburger {
        display: none;
      }
    }
  }
`;

export default style;
