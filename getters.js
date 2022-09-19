import { setNotesToLocalStorage } from "./setters.js";
import { render } from "./script.js";

import { ARCHIVED_NOTES_KEY, ARCHIVED_MODE, NOTES_KEY } from "./arrNotes.js";

export function getNotesOrEmptyList(key = NOTES_KEY) {
  let notesStr = localStorage.getItem(key);
  return notesStr ? JSON.parse(notesStr) : [];
}

export function getAllNotes() {
  return [...getNotesOrEmptyList(), ...getNotesOrEmptyList(ARCHIVED_NOTES_KEY)];
}

export function getNoteHtmlRow(note) {
  const MAX_BODY_LENGTH = 10;

  return `
      <div class="notes__row">
          <p class="notes__header-item"> ${note.title} </p>
          <p class="notes__header-item">${note.date_created}</p>
          <p class="notes__header-item"> ${note.category} </p>
          <p class="notes__header-item">
            ${note.text.substring(0, MAX_BODY_LENGTH)}
            ${note.text.length > MAX_BODY_LENGTH ? "..." : ""}
           </p>
          <p class="notes__header-item"> ${note.dates} </p>
          <p class="notes__header-item">
            <label class="m-x-sm" for="modal__checkbox">
              <i class="fa-solid fa-pen" onclick="editNote(${note.id})"></i>
            </label>
            <i class="fa-solid ${
              note.archived ? "fa-box-open" : "fa-box"
            } m-x-sm" onclick=toggleNoteArchivation(${note.id})></i>
            <i class="fa-solid fa-trash m-x-sm" onclick="deleteNote(${
              note.id
            })"></i>
          </p>
      </div>
    `;
}

export function getNoteCategoryHtmlRow(category, unarhived, archived) {
  return `
      <div class="notes__row">
          <p class="notes__header-item">${category}</p>
          <p class="notes__header-item">${unarhived}</p>
          <p class="notes__header-item">${archived}</p>
          
      </div>
    `;
}

export default function getNoteDate(desc) {
  const regexp =
    /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})(?=\W)|\b(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])?|(?:(?:16|[2468][048]|[3579][26])00)?)))(?=\W)|\b(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))(\4)?(?:(?:1[6-9]|[2-9]\d)?\d{2})?(?=\b)/g;
  const result = [...desc.matchAll(regexp)];

  const dates = result.map((x) => x[0]).join(",");
  return dates;
}

export function toggleNoteArchivation(noteId) {
  const notesList = getAllNotes();
  const toggledNotes = notesList.map((note) => {
    note.archived = note.id === noteId ? !note.archived : note.archived;
    return note;
  });
  setNotesToLocalStorage(
    toggledNotes.filter((x) => x.archived),
    ARCHIVED_NOTES_KEY
  );
  setNotesToLocalStorage(toggledNotes.filter((x) => !x.archived));
  render();
}
