import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap"
import {
  createDevice,
  fetchBrands,
  fetchDevices,
  fetchTypes,
} from "../../http/deviceAPI"
import { Context } from "../../index"

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevices().then((data) => device.setDevices(data.rows))
  }, [])

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }])
  }

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", `${price}`)
    formData.append("img", file)
    formData.append("brandId", device.selectedBrand.id)
    formData.append("typeId", device.selectedType.id)
    formData.append("info", JSON.stringify(info))
    createDevice(formData).then((data) => onHide())
  }

  return (
    <Modal size="md" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a Device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || "Select type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Select brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            placeholder="Enter a device name"
            className="mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            placeholder="Enter a device price"
            min={0}
            className="mt-3"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Add a new property
          </Button>
          {info.map((i) => (
            <Row key={i.number} className="mt-4">
              <Col md={4}>
                <Form.Control
                  placeholder="Enter a property name"
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Enter a property description"
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4} onClick={() => removeInfo(i.number)}>
                <Button variant="outline-danger">Delete</Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice
