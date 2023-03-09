import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./Hooks";
import { AuthProvider } from "./Context/Auth.jsx";

import Navigation from "./Components/Navigation.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/SignUp.jsx";
import routes from "./routes";
import Notes from "./Components/Notes";
import Container from "react-bootstrap/Container";
const { app } = routes;

function PrivatePage({ children }) {
  const auth = useAuthContext();
  const { logged } = auth;
  return logged ? children : <Navigate to={app.login()} />;
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container fluid className="h-100 g-0">
          <Navigation />
          <Routes>
            <Route
              path={app.home()}
              element={
                <PrivatePage>
                  <Notes />
                </PrivatePage>
              }
            />
            <Route path={app.login()} element={<Login />} />
            <Route path={app.signUp()} element={<Signup />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
