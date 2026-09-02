import { Link } from "react-router";

import { BrandLogo, Button, Nav, Text } from "../ui";

export default function Header() {
  return (
    <header className="flex items-center justify-between md:px-22 md:py-10 py-8">
      <BrandLogo />

      <div className="flex md:gap-4">
        <Nav to="/" end className="px-5">
          Solicitações de reembolso
        </Nav>

        <Button as={Link} to="/new">
          <Text
            as={"span"}
            textColor={"inverted"}
            weight="bold"
            className="md:hidden"
          >
            Nova
          </Text>
          <Text
            as={"span"}
            textColor={"inverted"}
            weight="bold"
            className="hidden md:inline"
          >
            Nova Solicitação
          </Text>
        </Button>
      </div>
    </header>
  );
}
