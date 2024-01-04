import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, "specialCharecter and Space not allowed"],
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, "specialCharecter and Space not allowed"],
  },
  email: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/, "Enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
