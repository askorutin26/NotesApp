import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useDispatch } from "react-redux";
import { setShow } from "../store/modals.js";
import { useTranslation } from "react-i18next";
function AddTaskBtn() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="p-1 col-lg-3 col">
      <Card className="bg-light">
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
          <Card.Title>
            <p className="text-center"> {t("Modals.addNew")}</p>
          </Card.Title>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setShow({ add: true }));
            }}
          >
            {t("Modals.add")}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddTaskBtn;
