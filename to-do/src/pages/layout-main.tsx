import Container from "../components/container";
import { NavLink, Outlet } from "react-router";
import Text from "../components/text";
import Header from "../core-components/header";
import MainContent from "../core-components/main-content";
import Footer from "../core-components/footer";

export default function LayoutMain() {
  return (
    <>
      <Header />

      <MainContent>
        <Outlet></Outlet>
      </MainContent>

      <Footer />
    </>
  );
}
