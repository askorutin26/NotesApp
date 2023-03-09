import pool from "./database.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const createJWT = (username) => {
  const token = crypto.randomBytes(64).toString("hex");
  return jwt.sign(username, token, { expiresIn: "1800s" });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getImageFolderPath = (userID, noteID) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imgPath = path.join(__dirname, "images");

  return path.join(imgPath, `${userID}`, `${noteID}`);
};
const usersMethods = {
  createUser: async function (req, res) {
    const { username, password } = req.body;

    const JWT = createJWT({ username });
    const userExists = await pool.query(
      "SELECT * FROM users where name = $1 and password = $2",
      [username, password]
    );

    if (userExists.rows[0] === undefined) {
      const newUser = await pool.query(
        "INSERT INTO users (name, password) values ($1, $2) RETURNING *",
        [username, password]
      );
      const firstNote = "First note.";
      await pool.query(
        "INSERT INTO notes (title, user_id) values ($1, $2) RETURNING *",
        [firstNote, newUser.rows[0].id]
      );

      const response = {
        token: JWT,
        userID: newUser.rows[0].id,
      };
      res.json(response);
    } else {
      res.status(409).send("user already exists");
    }
  },

  logIn: async function (req, res) {
    const { username, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM users where name = $1 and password = $2",
      [username, password]
    );
    const currentUser = user.rows[0];
    if (currentUser === undefined) {
      res.status(401).send("user not found");
    } else {
      const JWT = createJWT({ username });
      const response = {
        token: JWT,
        id: currentUser.id,
      };
      res.json(response);
    }
  },

  updateUser: async function (req, res) {
    const { id, name, password } = req.body;
    const user = await pool.query(
      "UPDATE users set name = $1, password = $2 where id = $3 RETURNING *",
      [name, password, id]
    );
    res.json(user.rows[0]);
  },

  deleteUser: async function (req, res) {
    const { id } = req.params;
    await pool.query("delete FROM users where id = $1", [id]);
    res.json({
      deleted: true,
    });
  },
};

const notesMethods = {
  createNote: async function (req, res) {
    const { title, userID } = req.body;
    const newPost = await pool.query(
      "INSERT INTO notes (title, user_id) values ($1, $2) RETURNING *",
      [title, userID]
    );
    res.json(newPost.rows[0]);
  },
  getNotes: async function (req, res) {
    const { userID } = req.query;
    const notes = await pool.query("SELECT * FROM notes WHERE user_id = $1", [
      userID,
    ]);
    const images = await pool.query("SELECT * FROM images WHERE user_id = $1", [
      userID,
    ]); //TODO join select
    res.json({ notes: notes.rows, images: images.rows });
  },
  deleteNote: async function (req, res) {
    const { noteID, userID } = req.body;
    const folderPath = getImageFolderPath(userID, noteID);

    await pool.query("delete FROM notes where id = $1", [noteID]);
    await pool.query("delete FROM images where user_id = $1", [userID]);

    return fs.rm(folderPath, { recursive: true, force: true }).then(() => {
      res.json({ deleted: true, noteID, userID });
    });
  },
  updateNote: async function (req, res) {
    const { id, title } = req.body;
    const updatedNote = await pool.query(
      "UPDATE notes set title = $1 where id = $2 RETURNING *",
      [title, id]
    );
    res.json(updatedNote.rows[0]);
  },
};

const createDirectory = (path) => {
  return fs.mkdir(path, { recursive: true }).then(() => path);
};

const imagesMethods = {
  saveImages: async function (req, res) {
    const images = req.files;
    const { id, user_id } = req.headers;
    const imagesArr = [];
    for (const image of images) {
      const { path } = image;
      const newImage = await pool.query(
        "INSERT INTO images (path, user_id, note_id) values ($1, $2, $3) RETURNING *",
        [path, user_id, id]
      );
      imagesArr.push(newImage.rows[0]);
    }
    res.json(imagesArr);
  },
  getUpload: function () {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const { id, user_id } = req.headers;
        const path = `images/${user_id}/${id}`;
        return createDirectory(path).then((path) => {
          cb(null, path);
        });
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}|${file.originalname}`;
        cb(null, filename);
      },
    });

    const upload = multer({ storage });
    return upload;
  },
  getImage: async function (req, res) {
    res.json(req.url);
  },

  deleteImages: async function (req, res) {
    const { id, user_id } = req.body;
    await pool.query("delete FROM images where user_id = $1 and note_id = $2", [
      user_id,
      id,
    ]);
    res.json({ deleted: true, id });
  },
};
export { notesMethods, usersMethods, imagesMethods };
