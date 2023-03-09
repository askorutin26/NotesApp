import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import { useAuthContext } from "../Hooks/index.js";
import { useTranslation } from "react-i18next";

import routes from "../routes";

const { app } = routes;

const Navigation = () => {
  const { t } = useTranslation();
  const authContext = useAuthContext();
  const { logged, logOut } = authContext;
  return (
    <Navbar bg="white" className="shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand href={app.home()}>Notes</Navbar.Brand>
        {logged ? (
          <Button
            as={Link}
            to={app.login()}
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              logOut();
            }}
          >
            {t("Navigation.logOut")}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Navigation;
