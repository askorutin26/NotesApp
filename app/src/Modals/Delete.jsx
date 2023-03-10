import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useAppContext, useAuthContext } from "../Hooks/index.js";

import { setShow } from "../store/modals.js";
import { deleteNote } from "../store/notes.js";
import axios from "axios";
import routes from "../routes.js";

const { server } = routes;

export default function SubmitDelete() {
  const AppContext = useAppContext();
  const AuthContext = useAuthContext();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const handleClose = () => dispatch(setShow({ delete: false }));

  const { modals } = AppContext;
  const { userID } = AuthContext;
  const show = modals.delete;
  const noteID = modals.noteID;

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{t("Modals.deleteNote")}</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("Modals.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              axios
                .delete(server.postNote(), { data: { noteID, userID } })
                .then((response) => {
                  handleClose();
                  dispatch(deleteNote(noteID));
                });
            }}
          >
            {t("Modals.delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
