import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { Context } from "../index"
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE } from "../utils/consts"
const NavBar = observer(() => {
  const { user } = useContext(Context)
  const history = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.clear()
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <NavLink className="text-decoration-none text-white" to="/">
            BuyDevice
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Button
            variant="outline-light"
            className="me-2"
            onClick={() => history(BASKET_ROUTE)}
          >
            Basket
          </Button>
          {user.isAuth ? (
            <div>
              {user.user.role === "ADMIN" ? (
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => history(ADMIN_ROUTE)}
                >
                  Admin
                </Button>
              ) : (
                ""
              )}
              <Button variant="outline-light" onClick={() => logOut()}>
                Log Out
              </Button>
            </div>
          ) : (
            <Button
              variant="outline-light"
              onClick={() => history(LOGIN_ROUTE)}
            >
              Auth
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
})

export default NavBar
