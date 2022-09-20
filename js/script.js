import { render } from './rendering.js'
import * as noteService from './notes-service.js'
import { Note } from './note.model.js'

const ARCHIVED_MODE = 'archived_mode'
const EDIT_NOTE_ID = 'edit_note_id'

window.createNote = function createNote() {
  const noteName = document.getElementById("note-title")?.value;
  const noteContent = document.getElementById("note-text")?.value;
  const noteCategory = document.getElementById("note__category")?.value
  const noteDate = getDatesFromDescription(noteContent)

  if (!noteName || !noteContent) {
    return alert("Please add Note Title and Details")
  }

  const newNote = new Note(noteName, noteContent, noteCategory, noteDate);
  noteService.createNote(newNote);
  render();
}

window.deleteNote = function deleteNote(noteId) {
  const confirmDel = confirm("Delete this note?");

  if (!confirmDel) {
    return;
  }

  noteService.deleteNote(noteId)
  render();
}

window.editNote = function editNote(noteId) {
  localStorage.setItem(EDIT_NOTE_ID, JSON.stringify(noteId));
}

window.updateNote = function updateNote() {
  const noteToEditId = +localStorage.getItem(EDIT_NOTE_ID)

  const new_title = document.getElementById("note_new_title").value
  const new_desc = document.getElementById("note_new_desc").value
  const new_category = document.getElementById("note__category_edit").value
  const new_date = getDatesFromDescription(new_desc)

  if (!new_title || !new_desc) {
    return alert("Please add Note Title and Details")
  }
  const note = new Note(new_title, new_desc, new_category, new_date);

  noteService.updateNote(noteToEditId, note);

  localStorage.setItem(EDIT_NOTE_ID, '')

  const checkBox = document.getElementById("modal__checkbox")
  checkBox.checked = !checkBox.checked

  render()
}

window.deleteAllNotes = function deleteAllNotes() {
  noteService.deleteAllNotes();
  render();
}

window.showArchivedNotes = function showArchivedNotes() {
  const mode = !JSON.parse(localStorage.getItem(ARCHIVED_MODE));
  localStorage.setItem(ARCHIVED_MODE, JSON.stringify(mode));
  render();
}

window.toggleNoteArchivation = function toggleNoteArchivation(noteId) {
  noteService.changeNoteArchivationStatus(noteId);
  render()
}

function getDatesFromDescription(desc) {
  const regexp =  /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})(?=\W)|\b(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])?|(?:(?:16|[2468][048]|[3579][26])00)?)))(?=\W)|\b(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))(\4)?(?:(?:1[6-9]|[2-9]\d)?\d{2})?(?=\b)/g;
  const result = [...desc.matchAll(regexp)]

  const dates = result.map(x => x[0]).join(",")
  return dates
}

localStorage.setItem(ARCHIVED_MODE, 'false')
render();