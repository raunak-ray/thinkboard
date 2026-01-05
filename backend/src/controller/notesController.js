import Note from "../models/Notes.js";

const getAllNote = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("[NoteController] Error fetching all notes:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      console.warn(`[NoteController] Note not found (ID: ${req.params.id})`);
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(
      `[NoteController] Error fetching note by ID (${req.params.id}):`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();

    console.info("[NoteController] Note created successfully");
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("[NoteController] Error creating note:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      console.warn(
        `[NoteController] Note not found for update (ID: ${req.params.id})`
      );
      return res.status(404).json({ message: "Note not found" });
    }

    console.info(
      `[NoteController] Note updated successfully (ID: ${req.params.id})`
    );
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error(
      `[NoteController] Error updating note (ID: ${req.params.id}):`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      console.warn(
        `[NoteController] Note not found for deletion (ID: ${req.params.id})`
      );
      return res.status(404).json({ message: "Note not found" });
    }

    console.info(
      `[NoteController] Note deleted successfully (ID: ${req.params.id})`
    );
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(
      `[NoteController] Error deleting note (ID: ${req.params.id}):`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
};

export { getAllNote, createNote, updateNote, deleteNote, getNoteById };
