import { Link } from "react-router";

import { Logo } from "../../assets/images";

export default function BrandLogo() {
  return (
    <Link to="/">
      <img src={Logo} alt="Logo principal da página" />
    </Link>
  );
}
