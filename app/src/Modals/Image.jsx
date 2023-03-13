import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import uniqueId from "lodash.uniqueid";

export default function ImageUploader({ props }) {
  const { images, setImages } = props;
  const [imageUrls, setImageUrls] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageUrls(newImageUrls);
  }, [images]);
  return (
    <Form.Group className="mb-3" controlid="task">
      <Form.Label>{t("Images.attachImage")}</Form.Label>

      <Form.Control
        type="file"
        accept="image/*"
        multiple
        name="files"
        onChange={(event) => {
          setImages([...event.target.files]);
        }}
      />
      <Row className="justify-content-md-start">
        {imageUrls.map((image) => {
          return (
            <Col xs={12} sm={4} md={4} key={uniqueId()}>
              <img
                src={image}
                key={uniqueId()}
                className="img-thumbnail"
                alt="preview"
                name="image"
              />
            </Col>
          );
        })}
      </Row>
    </Form.Group>
  );
}
//id to img
