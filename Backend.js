import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(
  cors({
    origin: "*",
  })
);

server.use(express.json());

// Database connection
mongoose
  .connect(
    "mongodb+srv://img2021025:hari1234@cluster0.n8vjnaa.mongodb.net/Assignmenrt",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database is connected");
  })
  .catch((e) => console.log(e));

const tableDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  hobby: String,
});

const TableData = mongoose.model("TableData", tableDataSchema);

// form submitting data
server.post("/submitForm", async (req, res) => {
  const { username, email, phone, hobby } = req.body;

  try {
    const user = await TableData.create({
      name: username,
      email: email,
      phone: phone,
      hobby: hobby,
    });

    res.json(user);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "An error occurred while saving the data." });
  }
});

// updating data

server.post("/update", async (req, res) => {
  const { id, username, email, phone, hobby } = req.body;

  try {
    const updatedUser = await TableData.findByIdAndUpdate(
      id,
      {
        name: username,
        email: email,
        phone: phone,
        hobby: hobby,
      },
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
});

// fetching data

server.get("/getData", async (req, res) => {
  try {
    const data = await TableData.find({});

    res.json(data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
});

// deleting data from database

server.post("/delete", async (req, res) => {
  const idToDelete = req.body.id;

  try {
    const deletedDocument = await TableData.findByIdAndDelete(idToDelete);

    if (deletedDocument) {
      res.json({ message: "Document deleted successfully." });
    } else {
      res.status(404).json({ message: "Document not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the document." });
  }
});

// listening the server on port 5000

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
