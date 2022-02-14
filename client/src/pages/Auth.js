import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import { Button, Card, Container, Form, Row } from "react-bootstrap"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Context } from ".."
import { login, registration } from "../http/userAPI"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts"

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const history = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const sign = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      history(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-4">
        <h2 className="mx-auto">{isLogin ? "Login" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between mt-3">
            {isLogin ? (
              <div>
                Don't have an account?{"  "}
                <NavLink
                  to={REGISTRATION_ROUTE}
                  className="text-decoration-none"
                >
                  Register
                </NavLink>
              </div>
            ) : (
              <div>
                Have an account?{"  "}
                <NavLink to={LOGIN_ROUTE} className="text-decoration-none">
                  Login
                </NavLink>
              </div>
            )}
            <Button
              variant="outline-success"
              className="mt-3 align-self-end"
              onClick={sign}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
