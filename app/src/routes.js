const { origin } = window.location;
const base = origin;
const routes = {
  app: { home: () => "/", login: () => "/login", signUp: () => "/signup" },
  server: {
    signUp: () => base.concat("/signUp"),
    logIn: () => base.concat("/logIn"),
    postNote: () => base.concat("/note"),
    getNotes: () => base.concat("/notes"),
    uploadImg: () => base.concat("/upload"),
    image: () => base.concat("/image"),
  },
};

export default routes;
