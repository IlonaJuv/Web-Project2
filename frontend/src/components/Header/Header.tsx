//import React from ' react 'username;
//import { useNavigate } from ' react-router-dom' ;
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import style from "./style.module.css";

//redux
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";


function Header() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const user = useAppSelector((state: any) => state.user);


  useEffect(() => {
    if (user) {
      setUsername(user.user.username);
    }
  }, [user, dispatch]);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar expand="lg" className={style.header}>
      <Container fluid>
        <Navbar.Brand className={style.title} href="#">
          Music App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className={style.link} href="#Home">
              Home
            </Nav.Link>
            <Nav.Link className={style.link} href="#Restaurant">
              Restaurant{" "}
            </Nav.Link>
          </Nav>
          {user && (
            <>
              <Navbar.Text>Signed in as: </Navbar.Text>
              <Nav.Link className={style.username} href="#user">
                {username}
              </Nav.Link>
            </>
          )}
          <Button onClick={handleLogOut} className={style.btn}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

/*
 const Header = () => {
//className="bg-body-tertiary"
    return (
        <Navbar className={style.header}>
        <Container>
          <Navbar.Brand className={style.title} href="#home">Tourist guide</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
              Signed in as: Username
            </Navbar.Text>
          <Navbar.Text>
              <a href="#login">Logout:</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
*/
