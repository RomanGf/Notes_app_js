const NOTES_KEY = 'notes'
const ARCHIVED_NOTES_KEY = 'archived_notes'
const ARCHIVED_MODE = 'archived_mode'
const EDIT_NOTE_ID = 'edit_note_id'

export function getAllNotes() {
    return [ ...getActiveNotes(), ...getArchivedNotes() ];
}

export function getActiveNotes() {
    return getNotesOrEmptyList(NOTES_KEY)
}

export function getArchivedNotes() {
    return getNotesOrEmptyList(ARCHIVED_NOTES_KEY)
}

export function createNote(note) {
    const notesList = getActiveNotes();
    notesList.push(note);
    setNotesToLocalStorage(notesList);
}

export function deleteNote(noteId) {
    const notesList = getAllNotes();
    const filteredNotes = notesList.filter(note => note.id !== noteId);
  
    const activeNotes = filteredNotes.filter(x => !x.archived);
    setNotesToLocalStorage(activeNotes);
    
    const archivedNotes = filteredNotes.filter(x => x.archived);
    setNotesToLocalStorage(archivedNotes, ARCHIVED_NOTES_KEY);
}

export function updateNote(id, note) {
    const noteList = getAllNotes()
    const noteToEdit = noteList.find(x => x.id === id)
    noteToEdit.title = note.title;
    noteToEdit.text = note.text;
    noteToEdit.category = note.category
    noteToEdit.dates = note.dates
    
    const activeNotes = noteList.filter(x => !x.archived);
    setNotesToLocalStorage(activeNotes);
    
    const archivedNotes = noteList.filter(x => x.archived);
    setNotesToLocalStorage(archivedNotes, ARCHIVED_NOTES_KEY);  
}

export function deleteAllNotes() {
    setNotesToLocalStorage([]);
    setNotesToLocalStorage([], ARCHIVED_NOTES_KEY);
}

export function changeNoteArchivationStatus(noteId) {
    const notesList = getAllNotes();
    const toggledNotes = notesList.map(note => {
      note.archived = note.id === noteId ? !note.archived : note.archived;
      return note;
    })
    setNotesToLocalStorage(toggledNotes.filter(x => x.archived), ARCHIVED_NOTES_KEY)
    setNotesToLocalStorage(toggledNotes.filter(x => !x.archived));
}

function getNotesOrEmptyList(key = NOTES_KEY) {
    let notesStr = localStorage.getItem(key);
    return notesStr ? JSON.parse(notesStr) : [];
}

function setNotesToLocalStorage(notes, key = NOTES_KEY) {
    localStorage.setItem(key, JSON.stringify(notes));
}