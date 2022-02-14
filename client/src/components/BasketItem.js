import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Col, Row, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Context } from ".."
import { DEVICE_ROUTE } from "../utils/consts"

const BasketItem = observer(({ clearBasket }) => {
  const basketData = JSON.parse(localStorage.getItem("basket"))
  const { basket } = useContext(Context)

  const changeQuantity = (value, item) => {
    if (Number(value) === 0) {
      removeItem(item)
    }
    const exists = basket.items.filter((i) => i.id === item.id)

    if (exists.length) {
      exists[0].quantity = Number(value)
      localStorage.setItem("basket", JSON.stringify(basket.items))
    }
  }
  const removeItem = (item) => {
    const newItems = basket.items.filter((i) => i.id !== item.id)
    basket.setItems(newItems)
    localStorage.setItem("basket", JSON.stringify(newItems))
  }

  return (
    <Col lg={8}>
      <div className="items">
        {basket.items.map((item) => (
          <div className="product" key={item.id}>
            <Row>
              <Col md={3}>
                <Image src={process.env.REACT_APP_API_URL + item.img} fluid />
              </Col>
              <Col md={8}>
                <div className="info">
                  <Row>
                    <Col md={5} className="product-name">
                      <div className="product-name">
                        <Link to={DEVICE_ROUTE + "/" + item.id}>
                          {item.name}
                        </Link>
                      </div>
                    </Col>
                    <Col md={4} className="quantity">
                      <label>Quantity:</label>
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        onChange={(e) => changeQuantity(e.target.value, item)}
                        className="form-control quantity-input"
                      />
                    </Col>
                    <Col md={3}>
                      <span className="price">${item.price}</span>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </Col>
  )
})

export default BasketItem
