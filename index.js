const express = require("express");
const app = express();
const multer = require("multer");
const firebsae = require("firebase/app");
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDrivDepUTZev9ylJ-5KnjsLCZ8PfSw4yQ",
  authDomain: "tutorial-ee9f6.firebaseapp.com",
  projectId: "tutorial-ee9f6",
  storageBucket: "tutorial-ee9f6.appspot.com",
  messagingSenderId: "447918902995",
  appId: "1:447918902995:web:34e46d03ea005fb3688e26",
};

firebsae.initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) => {
  res.json("Firebase Storage");
});

app.post("/", upload.single("filename"), (req, res) => {
  const storageRef = ref(storage, `files/${req.file.originalname}`);

  uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
    console.log("file uplaoded");
  });
  console.log(req.file);
});

app.listen(5000);
