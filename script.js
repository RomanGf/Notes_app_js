import {
  getAllNotes,
  getNotesOrEmptyList,
  getNoteCategoryHtmlRow,
  getNoteHtmlRow,
} from "./getters.js";

import { ARCHIVED_NOTES_KEY, ARCHIVED_MODE, NOTES_KEY } from "./arrNotes.js";

const selectCategory = document.querySelectorAll("[id='note__category']");
let optionValues = [...selectCategory[0].options].map((o) => o.value);

export function showArhivedNotes() {
  const mode = !JSON.parse(localStorage.getItem(ARCHIVED_MODE));
  localStorage.setItem(ARCHIVED_MODE, JSON.stringify(mode));
  render();
}

function renderNotesTableRows(isArhivedMode) {
  let notesList = getNotesOrEmptyList(
    isArhivedMode ? ARCHIVED_NOTES_KEY : NOTES_KEY
  );
  let html = "";
  notesList.forEach(function (note, index) {
    html += getNoteHtmlRow(note, index);
  });
  const notesContainer = document.getElementById("notes");
  notesContainer.innerHTML =
    notesList.length !== 0
      ? html
      : `No Notes Yet! Add a note using the form above.`;
}

function renderNotesCategoryTableRows() {
  let notesList = getAllNotes();
  let html = "";
  optionValues.forEach(function (category) {
    const unarchived = notesList.filter(
      (x) => x.category == category && x.archived == false
    ).length;
    const archived = notesList.filter(
      (x) => x.category == category && x.archived == true
    ).length;

    html +=
      unarchived === 0 && archived === 0
        ? ""
        : getNoteCategoryHtmlRow(category, unarchived, archived);
  });
  const notesContainer = document.getElementById("category_static");
  notesContainer.innerHTML =
    notesList.length !== 0
      ? html
      : `No Notes Yet! Add a note using the form above.`;
}

function renderNotesHeaderTitle(isArhivedMode) {
  const title = isArhivedMode ? "Your Archived Notes" : "Your Notes";
  document.getElementById("notes__header-title").innerHTML = title;
}

export function render() {
  const isArhivedMode = JSON.parse(localStorage.getItem(ARCHIVED_MODE));
  renderNotesHeaderTitle(isArhivedMode);
  renderNotesTableRows(isArhivedMode);
  renderNotesCategoryTableRows();
}

localStorage.setItem(ARCHIVED_MODE, "false");
render();
