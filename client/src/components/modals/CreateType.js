import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { createType } from "../../http/deviceAPI"

const CreateType = observer(({ show, onHide }) => {
  const [value, setValue] = useState("")

  const addType = () => {
    createType({ name: value }).then((data) => {
      setValue("")
      onHide()
    })
  }

  return (
    <Modal size="md" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add a Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Enter a type name"}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addType}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateType
