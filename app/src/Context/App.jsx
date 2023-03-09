import React, { createContext } from "react";

import { useSelector } from "react-redux";
import { notesSelector } from "../store/notes.js";
import { imagesSelector } from "../store/images.js";

const AppContext = createContext({});
function AppProvider({ children }) {
  const modals = useSelector((state) => state.modals);
  const notes = useSelector(notesSelector.selectAll);
  const images = useSelector(imagesSelector.selectAll);

  const appProps = {
    modals,
    notes,
    images,
  };
  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
}
export { AppContext };
export { AppProvider };
