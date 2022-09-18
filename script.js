class Note {
  constructor(name, text, category, dates) {
    this.id = Math.random();
    this.title = name;
    this.text = text;
    this.date_created = new Date().toLocaleDateString();
    this.dates = dates
    this.category = category
    this.archived = false;
  }
}
const NOTES_KEY = 'notes'
const ARCHIVED_NOTES_KEY = 'archived_notes'
const ARCHIVED_MODE = 'archived_mode'
const EDIT_NOTE_ID = 'edit_note_id'


function createNote() {

  const noteName = document.getElementById("note-title")?.value;
  const noteContent = document.getElementById("note-text")?.value;
  const noteCategory = document.getElementById("note__category")?.value
  const noteDate = getNoteDate(noteContent)

  if (!noteName || !noteContent) {
    return alert("Please add Note Title and Details")
  }

  const notesList = getNotesOrEmptyList();

  const newNote = new Note(noteName, noteContent, noteCategory, noteDate);
  notesList.push(newNote);
  setNotesToLocalStorage(notesList);

  render();
}


function getNoteDate(desc) {
  const regexp =  /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})(?=\W)|\b(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])?|(?:(?:16|[2468][048]|[3579][26])00)?)))(?=\W)|\b(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))(\4)?(?:(?:1[6-9]|[2-9]\d)?\d{2})?(?=\b)/g;
  const result = [...desc.matchAll(regexp)]

  const dates = result.map(x => x[0]).join(",")
  return dates
}

function getNotesOrEmptyList(key = NOTES_KEY) {
  let notesStr = localStorage.getItem(key);
  return notesStr ? JSON.parse(notesStr) : [];
}

function getAllNotes() {
  return [...getNotesOrEmptyList(), ...getNotesOrEmptyList(ARCHIVED_NOTES_KEY)];
}

function setNotesToLocalStorage(notes, key = NOTES_KEY) {
  localStorage.setItem(key, JSON.stringify(notes));
}

function setNotesIdToLocalStorage(notes, key = NOTES_KEY) {
  localStorage.setItem(key, JSON.stringify(notes));
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

function renderNotesTableRows(isArhivedMode) {
  let notesList = getNotesOrEmptyList(isArhivedMode ? ARCHIVED_NOTES_KEY : NOTES_KEY);
  let html = "";
  notesList
  .forEach(function (note, index) {
    html += getNoteHtmlRow(note, index);
  });
  const notesContainer = document.getElementById("notes");
  notesContainer.innerHTML = notesList.length !== 0 ? html : `No Notes Yet! Add a note using the form above.`;
}

function renderNotesHeaderTitle(isArhivedMode) {
  const title = isArhivedMode ? 'Your Archived Notes' : 'Your Notes';
  document.getElementById('notes__header-title').innerHTML = title;
}

function render() {
  const isArhivedMode = JSON.parse(localStorage.getItem(ARCHIVED_MODE));
  renderNotesHeaderTitle(isArhivedMode);
  renderNotesTableRows(isArhivedMode);
}

localStorage.setItem(ARCHIVED_MODE, 'false')
render();