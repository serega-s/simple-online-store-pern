import React, { useState } from "react"
import { Card, Col, Row } from "react-bootstrap"

import { createRating } from "../http/deviceAPI"

const DeviceRating = ({ id }) => {
  return (
    <div className="d-flex justify-content-center mt-2">
      <Row>
        <Col md={6}>
          <Card className="rating-card">
            <div className="rating-card-body text-center">
              {" "}
              <h4 className="mt-1">Rate device</h4>
              <fieldset className="rating">
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star5"
                  title="Awesome - 5 stars"
                ></label>{" "}
                <input
                  type="radio"
                  id="star4half"
                  name="rating"
                  value="4.5"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="star4half"
                  title="Pretty good - 4.5 stars"
                ></label>{" "}
                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star4"
                  title="Pretty good - 4 stars"
                ></label>{" "}
                <input
                  type="radio"
                  id="star3half"
                  name="rating"
                  value="3.5"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="star3half"
                  title="Meh - 3.5 stars"
                ></label>{" "}
                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star3"
                  title="Meh - 3 stars"
                ></label>{" "}
                <input
                  type="radio"
                  id="star2half"
                  name="rating"
                  value="2.5"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="star2half"
                  title="Kinda bad - 2.5 stars"
                ></label>{" "}
                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star2"
                  title="Kinda bad - 2 stars"
                ></label>{" "}
                <input
                  type="radio"
                  id="star1half"
                  name="rating"
                  value="1.5"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="star1half"
                  title="Meh - 1.5 stars"
                ></label>{" "}
                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star1"
                  title="Sucks big time - 1 star"
                ></label>{" "}
                <input
                  type="radio"
                  id="starhalf"
                  name="rating"
                  value="0.5"
                  onClick={(e) => createRating(id, e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="starhalf"
                  title="Sucks big time - 0.5 stars"
                ></label>{" "}
                <input
                  type="radio"
                  className="reset-option"
                  name="rating"
                  value="reset"
                />{" "}
              </fieldset>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DeviceRating
