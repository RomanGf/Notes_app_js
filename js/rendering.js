import {
    getAllNotes,
    getActiveNotes,
    getArchivedNotes,
} from './notes-service.js'

const ARCHIVED_MODE = 'archived_mode'
const selectCategory = document.querySelectorAll("[id='note__category']");
const optionValues = [...selectCategory[0].options].map(o => o.value)


export function render() {
    const isArchivedMode = JSON.parse(localStorage.getItem(ARCHIVED_MODE));
    renderNotesHeaderTitle(isArchivedMode);
    renderNotesTableRows(isArchivedMode);
    renderNotesCategoryTableRows();
}

function renderNotesHeaderTitle(isArchivedMode) {
    const title = isArchivedMode ? 'Your Archived Notes' : 'Your Notes';
    document.getElementById('notes__header-title').innerHTML = title;
}

function renderNotesTableRows(isArchivedMode) {
    let notesList = isArchivedMode ? getArchivedNotes() : getActiveNotes();
    let html = "";
    notesList
      .forEach(function (note, index) {
        html += getNoteHtmlRow(note, index);
      });
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = notesList.length !== 0 ? html : `No Notes Yet! Add a note using the form above.`;
}

function renderNotesCategoryTableRows() {
    let notesList = getAllNotes();
    let html = "";
    optionValues
      .forEach(function (category) {
        const unArchived = notesList.filter(x => x.category == category && x.archived == false).length;
        const archived = notesList.filter(x => x.category == category && x.archived == true).length;
  
        html += unArchived === 0 && archived === 0 
        ? ''
        : getNoteCategoryHtmlRow(category, unArchived, archived);
      });
    const notesContainer = document.getElementById("category_static");
    notesContainer.innerHTML = notesList.length !== 0 ? html : `No Notes Yet! Add a note using the form above.`;
}

function getNoteHtmlRow(note, index) {
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
            <i class="fa-solid ${note.archived ? 'fa-box-open' : 'fa-box'} m-x-sm" onclick=toggleNoteArchivation(${note.id})></i>
            <i class="fa-solid fa-trash m-x-sm" onclick="deleteNote(${note.id})"></i>
          </p>
      </div>
    `
}

function getNoteCategoryHtmlRow(category, unArchived, archived) {
    return `
      <div class="notes__row">
          <p class="notes__header-item">${category}</p>
          <p class="notes__header-item">${unArchived}</p>
          <p class="notes__header-item">${archived}</p>
          
      </div>
    `
}