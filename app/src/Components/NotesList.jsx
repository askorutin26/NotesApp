import React from "react";
import { useDispatch, batch } from "react-redux";
import { useTranslation } from "react-i18next";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem.js";
import Dropdown from "react-bootstrap/Dropdown";

import Card from "react-bootstrap/Card";

import { useAppContext } from "../Hooks/index.js";

import { setShow, setID } from "../store/modals.js";

export default function NotesList() {
  const AppContext = useAppContext();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { notes } = AppContext;

  const list = [];

  notes.forEach((elem) => {
    const { id, title } = elem;

    list.unshift(
      <ListGroupItem
        id={id}
        key={id}
        as="li"
        type="button"
        data-action="show"
        onClick={(e) => {
          e.preventDefault();
          const target = e.target;
          const targetID = target.id;
          const actionType = target.dataset.action;

          if (actionType === "show") {
            batch(() => {
              dispatch(setShow({ show: true }));
              dispatch(setID(targetID));
            });
          }
        }}
        className="d-flex justify-content-between align-items-start "
      >
        <div
          className="ms-2 me-auto text-truncate"
          id={id}
          key={id}
          type="button"
          data-action="show"
        >
          <div
            className="fw-bold text-truncate"
            id={id}
            key={id}
            data-action="show"
          >
            {title}
          </div>
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic" />

          <Dropdown.Menu>
            <Dropdown.Item
              href="#/action-1"
              data-action="change"
              id={id}
              onClick={(e) => {
                e.preventDefault();
                const target = e.target;
                const targetID = target.id;
                batch(() => {
                  dispatch(setShow({ show: true }));
                  dispatch(setID(targetID));
                });
              }}
            >
              {t("Notes.change")}
            </Dropdown.Item>
            <Dropdown.Item
              className="text-danger"
              href="#/action-2"
              id={id}
              onClick={(e) => {
                e.preventDefault();
                const target = e.target;
                const targetID = target.id;
                batch(() => {
                  dispatch(setShow({ delete: true }));
                  dispatch(setID(targetID));
                });
              }}
            >
              {t("Notes.delete")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroupItem>
    );
  });
  return (
    <div className="p-1 col-lg-4">
      <Card>
        <ListGroup as="ol" numbered>
          {list}
        </ListGroup>
      </Card>
    </div>
  );
}
