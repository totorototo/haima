import Chrome from "../chrome/Chrome";
import LeftSide from "../leftSide/LeftSide";
import RightSide from "../rightSide/RightSide";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Main from "../main/Main";

//FIXME: to be defined
const MENU_ITEMS = {
  hAismA: {
    label: "how Atmos is my ADM ?",
    href: "/project/haisma",
  },
};

const Layout = ({ children }) => {
  return (
    <Chrome
      renderHeader={() => <Header items={MENU_ITEMS} />}
      renderFooter={() => <Footer />}
      renderMain={() => <Main>{children}</Main>}
      renderLeftSide={() => <LeftSide />}
      renderRightSide={() => <RightSide />}
    />
  );
};

export default Layout;
