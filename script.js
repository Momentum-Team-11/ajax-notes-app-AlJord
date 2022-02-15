const url = 'http://localhost:3000/notes'
const notesOutput = document.getElementById('notesOutput')
const notesForm = document.getElementById('notesForm')


function myNotes() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
        for (let noteObj of data) {
            renderNoteItem(noteObj)
        }
        })
}

notesForm.addEventListener('submit', function () {
    event.preventDefault()
    const noteText = document.querySelector('#note-text').value
    fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            item: noteText,
    }),
})
    .then(r => r.json())
    .then((data) => {
        renderNoteItem(data)
    })
})

function renderNoteItem(noteObj) {
    const itemEl = document.createElement('p')
    itemEl.p = noteObj.id
    itemEl.innerHTML = `${noteObj.item}<br>${noteObj.body}`
    notesOutput.appendChild(itemEl)
}

myNotes();