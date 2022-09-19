import { ARCHIVED_NOTES_KEY, ARCHIVED_MODE, NOTES_KEY } from "./arrNotes.js";

export function setNotesToLocalStorage(notes, key = NOTES_KEY) {
  localStorage.setItem(key, JSON.stringify(notes));
}

export function setNotesIdToLocalStorage(notes, key = NOTES_KEY) {
  localStorage.setItem(key, JSON.stringify(notes));
}
