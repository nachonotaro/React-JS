import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CartWidget } from "./CartWidget";

export const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Wels MotorBikes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">400cc</Nav.Link>
            <Nav.Link href="#features">600cc</Nav.Link>
            <Nav.Link href="#pricing">1000cc</Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    </>
  );
};
