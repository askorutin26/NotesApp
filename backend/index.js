import Express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { notesMethods, usersMethods, imagesMethods } from "./methods.js";

const PORT = process.env.PORT || 3001;

const app = new Express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(Express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgPath = path.join(__dirname, "images");
const buildPath = path.join(__dirname, "../", "app", "build");

app.use(Express.static(buildPath));

app.use("/images", Express.static(imgPath));

app.get("/notes", notesMethods.getNotes);
app.post("/note", notesMethods.createNote);
app.put("/note", notesMethods.updateNote);
app.delete("/note", notesMethods.deleteNote);

app.post("/signUp", usersMethods.createUser);
app.put("/user/:id", usersMethods.updateUser);
app.delete("/user/:id", usersMethods.deleteUser);

app.post("/login", usersMethods.logIn);

app.get("/image", imagesMethods.getImage);
app.delete("/images", imagesMethods.deleteImages);
app.post(
  "/upload",
  imagesMethods.getUpload().array("files"),
  imagesMethods.saveImages
);

app.get("*", function (req, res) {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
