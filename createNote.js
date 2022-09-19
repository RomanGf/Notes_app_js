import { render } from "./script.js";
import getNoteDate, { getNotesOrEmptyList } from "./getters.js";
import { setNotesToLocalStorage } from "./setters.js";
import { ARCHIVED_NOTES_KEY, ARCHIVED_MODE, NOTES_KEY, EDIT_NOTE_ID } from "./arrNotes.js";

class Note {
  constructor(name, text, category, dates) {
    this.id = Math.random();
    this.title = name;
    this.text = text;
    this.date_created = new Date().toLocaleDateString();
    this.dates = dates;
    this.category = category;
    this.archived = false;
  }
}

export function createNote() {
  const noteName = document.getElementById("note-title")?.value;
  const noteContent = document.getElementById("note-text")?.value;
  const noteCategory = document.getElementById("note__category")?.value;
  const noteDate = getNoteDate(noteContent);

  if (!noteName || !noteContent) {
    return alert("Please add Note Title and Details");
  }

  const notesList = getNotesOrEmptyList();

  const newNote = new Note(noteName, noteContent, noteCategory, noteDate);
  notesList.push(newNote);
  setNotesToLocalStorage(notesList);

  render();
}
