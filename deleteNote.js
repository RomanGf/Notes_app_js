import { render } from "./script.js";
import { getAllNotes } from "./getters.js";
import { setNotesToLocalStorage } from "./setters.js";

import { ARCHIVED_NOTES_KEY, ARCHIVED_MODE, NOTES_KEY, EDIT_NOTE_ID } from "./arrNotes.js";

export function deleteNote(noteId) {
  const confirmDel = confirm("Delete this note?");

  if (!confirmDel) {
    return;
  }

  const notesList = getAllNotes();
  const filteredNotes = notesList.filter((note) => note.id !== noteId);

  const activeNotes = filteredNotes.filter((x) => !x.archived);
  setNotesToLocalStorage(activeNotes);

  const archivedNotes = filteredNotes.filter((x) => x.archived);
  setNotesToLocalStorage(archivedNotes, ARCHIVED_NOTES_KEY);

  render();
}

export function deleteAllNotes() {
  setNotesToLocalStorage([]);
  setNotesToLocalStorage([], ARCHIVED_NOTES_KEY);
  render();
}
