import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CartWidget } from "./CartWidget";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Wels Motorbikes
            </Nav.Link>
            <Nav.Link as={NavLink} to="/category/Deportiva">
              Deportiva
            </Nav.Link>
            <Nav.Link as={NavLink} to="/category/Adventure">
              Adventure
            </Nav.Link>
            <Nav.Link as={NavLink} to="/category/Cruiser">
              Crusier
            </Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    </>
  );
};
