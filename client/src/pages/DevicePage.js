import React, { useContext, useEffect, useState } from "react"
import "../assets/styles/DeviceRating.css"
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { Context } from ".."
import bigStar from "../assets/bigStar.png"
import { fetchOneDevice } from "../http/deviceAPI"
import DeviceRating from "../components/DeviceRating"

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()

  const { basket } = useContext(Context)
  const basketData = JSON.parse(localStorage.getItem("basket"))
  basket.setItems(basketData || [])

  const addToBasket = (item) => {
    const exists = basket.items.filter((i) => i.id === item.id)

    if (exists.length) {
      exists[0].quantity = parseInt(exists[0].quantity) + 1
    } else {
      basket.pushItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        img: item.img,
      })
    }

    localStorage.setItem("basket", JSON.stringify(basket.items))
  }

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data))
  }, [id])

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>From: {device.price} руб.</h3>
            <Button
              variant={"outline-dark"}
              onClick={() => addToBasket(device)}
            >
              Add to Basket
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Performance</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
      <Row>
        <DeviceRating id={id} />
      </Row>
    </Container>
  )
}

export default DevicePage
