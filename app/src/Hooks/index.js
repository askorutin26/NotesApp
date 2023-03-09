import { useContext } from "react";

import { AuthContext, AppContext } from "../Context/index.js";

export const useAuthContext = () => useContext(AuthContext);
export const useAppContext = () => useContext(AppContext);
