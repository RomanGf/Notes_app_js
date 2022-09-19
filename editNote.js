import { render } from "./script.js";
import getNoteDate, { getAllNotes } from "./getters.js";
import { setNotesToLocalStorage, setNotesIdToLocalStorage } from "./setters.js";

import { ARCHIVED_NOTES_KEY, ARCHIVED_MODE, NOTES_KEY, EDIT_NOTE_ID } from "./arrNotes.js";

export function editNote(noteId) {
  setNotesIdToLocalStorage(noteId, EDIT_NOTE_ID);
}

export function updateNote() {
  const noteToEditId = +localStorage.getItem(EDIT_NOTE_ID);

  const noteList = getAllNotes();
  const noteToEdit = noteList.find((x) => x.id === noteToEditId);

  const new_title = document.getElementById("note_new_title").value;
  const new_desc = document.getElementById("note_new_desc").value;
  const new_category = document.getElementById("note__category_edit").value;
  const new_date = getNoteDate(new_desc);

  if (!new_title || !new_desc) {
    return alert("Please add Note Title and Details");
  }

  noteToEdit.title = new_title;
  noteToEdit.text = new_desc;
  noteToEdit.category = new_category;
  noteToEdit.dates = noteToEdit.date_created + "-" + new_date;

  const activeNotes = noteList.filter((x) => !x.archived);
  setNotesToLocalStorage(activeNotes);

  const archivedNotes = noteList.filter((x) => x.archived);
  setNotesToLocalStorage(archivedNotes, ARCHIVED_NOTES_KEY);
  localStorage.setItem(EDIT_NOTE_ID, "");

  const checkBox = document.getElementById("modal__checkbox");
  checkBox.checked = !checkBox.checked;

  render();
}
