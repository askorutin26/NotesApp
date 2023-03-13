import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useAppContext } from "../Hooks/index.js";

import { setShow } from "../store/modals.js";
import { changeNote } from "../store/notes.js";
import routes from "../routes.js";
import axios from "axios";

const { server } = routes;

export default function Note() {
  const AppContext = useAppContext();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const handleClose = () => dispatch(setShow({ show: false }));

  const { modals, notes, images } = AppContext;

  const show = modals.show;
  const noteID = Number(modals.noteID);

  const noteToShow = notes.find((elem) => elem.id === noteID);
  const noteImages = images.filter((elem) => Number(elem.note_id) === noteID);

  const { id, title } = noteToShow;

  const [oldTitle, setTitle] = useState(title);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  return (
    <>
      <Modal show={show}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setButtonDisabled(true);
            const data = {
              id: noteID,
              title: oldTitle,
            };
            axios.put(server.postNote(), data).then((response) => {
              const { title: newTitle } = response.data;
              dispatch(changeNote({ id, changes: { title: newTitle } }));
              setButtonDisabled(false);
              handleClose();
            });
          }}
        >
          <Modal.Header>
            <Modal.Title>{`Запись ${id}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Form.Group>
                  <Card.Title>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={oldTitle}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="border-0 fs-5 mb-2"
                    />
                  </Card.Title>
                </Form.Group>
              </Card.Body>
            </Card>

            {noteImages.length > 0 && (
              <Card.Body>
                <Form.Group className="mb-3" controlid="image">
                  <Row className="justify-content-md-start">
                    {noteImages.map((image) => {
                      const { id, path } = image;
                      return (
                        <Col xs={12} sm={4} md={4} key={id}>
                          <img
                            src={path}
                            className="img-thumbnail"
                            alt="preview"
                            name="image"
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </Form.Group>
              </Card.Body>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
            >
              {t("Modals.cancel")}
            </Button>
            <Button
              variant="primary"
              id={id}
              type="submit"
              disabled={buttonDisabled}
            >
              {t("Modals.save")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
