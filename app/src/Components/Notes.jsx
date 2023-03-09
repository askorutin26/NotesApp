import React, { useEffect } from "react";
import { useDispatch, batch } from "react-redux";

import Container from "react-bootstrap/Container";
import AddTaskBtn from "./AddButton.jsx";
import NewNote from "../Modals/NewNote.jsx";
import NotesList from "./NotesList.jsx";
import Note from "../Modals/Note.jsx";
import SubmitDelete from "../Modals/Delete.jsx";
import { useAuthContext, useAppContext } from "../Hooks/index.js";
import { addNotes } from "../store/notes.js";
import { addImages } from "../store/images.js";
import routes from "../routes.js";
import axios from "axios";
const { server } = routes;

export default function Notes() {
  const { userID } = useAuthContext();
  const { modals, notes } = useAppContext();
  const { add: showAdd, show: showNote, delete: showDelete } = modals;
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(server.getNotes(), { params: { userID } })
      .then((response) => {
        const { notes: userNotes, images: userImages } = response.data;
        batch(() => {});
        dispatch(addNotes(userNotes));
        dispatch(addImages(userImages));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <div className="my-4 row justify-content-md-center">
        <AddTaskBtn />
        {showAdd && <NewNote />}
        {showNote && <Note />}
        {showDelete && <SubmitDelete />}
        {notes.length !== 0 && <NotesList />}
      </div>
    </Container>
  );
}
