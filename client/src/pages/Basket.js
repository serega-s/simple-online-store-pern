import { observer } from "mobx-react-lite"
import "../assets/styles/Basket.css"
import React, { useContext, useEffect } from "react"
import { Row, Card, Col, Form, Button, Container } from "react-bootstrap"
import { Context } from ".."
import BasketItem from "../components/BasketItem"

const Basket = observer(() => {
  const { basket } = useContext(Context)
  const basketData = JSON.parse(localStorage.getItem("basket"))

  const clearBasket = () => {
    basket.setItems([])

    // localStorage.setItem("basket", JSON.stringify(basket.items))
    localStorage.setItem("basket", JSON.stringify([]))
  }

  const cartTotalLength = () => {
    return basket.items.reduce((acc, curVal) => {
      return parseInt((acc += parseInt(curVal.quantity)))
    }, 0)
  }
  const cartTotalPrice = () => {
    return basket.items.reduce((acc, curVal) => {
      return parseFloat((acc += curVal.price * curVal.quantity))
    }, 0)
  }

  return (
    <section class="shopping-cart dark">
      <Container>
        <div class="block-heading">
          <h2>Shopping Basket</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam
            urna, dignissim nec auctor in, mattis vitae leo.
          </p>
        </div>
        <div class="content">
          {basket.items.length ? (
            <Row>
              <BasketItem clearBasket={clearBasket} />
              <Col lg={4}>
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-item">
                    <span className="text">Items</span>
                    <span className="price">{cartTotalLength()}</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Total</span>
                    <span className="price">${cartTotalPrice()}</span>
                  </div>
                  <Button
                    type="button"
                    variant={"outline-dark"}
                    size={"lg"}
                    onClick={clearBasket}
                  >
                    Checkout
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col lg={8}>
                <span className="h3">Basket is empty...</span>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </section>
  )
})

export default Basket
