import React, { useState, useEffect, useRef } from "react";
import { useDispatch, batch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import ImageUploader from "./Image.jsx";
import { useAppContext, useAuthContext } from "../Hooks/index.js";
import { setShow } from "../store/modals.js";
import { useTranslation } from "react-i18next";

import axios from "axios";
import routes from "../routes.js";

import { addNote } from "../store/notes.js";
import { addImages } from "../store/images.js";
const { server } = routes;
export default function NewNote() {
  const inputEl = useRef();

  const [title, setTitle] = useState("");
  const { t } = useTranslation();

  const [images, setImages] = useState([]);

  const AppContext = useAppContext();
  const AuthContext = useAuthContext();
  const { userID } = AuthContext;

  const { modals } = AppContext;
  const show = modals.add;

  const handleClose = () => dispatch(setShow({ add: false }));
  const dispatch = useDispatch();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      userID,
    };
    axios
      .post(server.postNote(), data)
      .then((response) => {
        const newNote = response.data;
        batch(() => {
          dispatch(addNote(newNote));
        });

        return newNote;
      })
      .then((note) => {
        const { id, user_id } = note;
        const formData = new FormData();
        const config = {
          headers: {
            id,
            user_id,
          },
        };
        images.forEach((image) => {
          formData.append("files", image);
        });
        axios.post(server.uploadImg(), formData, config).then((response) => {
          const savedImages = response.data;
          batch(() => {
            dispatch(addImages(savedImages));
          });
          handleClose();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Modal show={show}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>{t("Modals.addNew")}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlid="task">
              <Form.Control
                required
                as="textarea"
                rows="3"
                placeholder="Что нужно сделать"
                value={title}
                ref={inputEl}
                onChange={(e) => {
                  e.preventDefault();
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlid="task">
              <ImageUploader props={{ images, setImages }} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              {t("Modals.cancel")}
            </Button>
            <Button type="submit" variant="primary">
              {t("Modals.save")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
