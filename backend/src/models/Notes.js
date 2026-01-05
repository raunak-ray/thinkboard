import mongoose from "mongoose";

//create schema
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//create model using schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
