const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Database se Connection
// 'mern-crud' hamare database ka naam hai
mongoose
  .connect("mongodb://127.0.0.1:27017/mern-crud")
  .then(() => console.log("MongoDB se kamyabi se connect ho gaya!"))
  .catch((err) => console.log("Database Error: ", err));

// Schema aur Model
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const User = mongoose.model("User", UserSchema);

// CRUD Routes
// 1. GET - Saara data fetch karna
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. POST - Naya data save karna
app.post("/api/users", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. DELETE - Data delete karna
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User delete ho gaya" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server port 5000 par chal raha hai");
});
