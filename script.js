// need to show a list of existing todos
const url = 'http://localhost:3000/notes'
const notesOutput = document.getElementById('notesOutput')
const notesForm = document.getElementById('notesForm')


// notesForm.addEventListener('submit', function (event) { //done lines 8-14
//     event.preventDefault()
//     // grab the value from the input
//     const noteText = document.querySelector('#note-text').value
//     // send it to the server to create a new todo
//     createNote(noteText)
// })



notesOutput.addEventListener('click', function (event) {  //done 18-32

    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
    if (event.target.classList.contains('edit')) {
        editNote(event.target)
    }
    if (event.target.classList.contains('update-notes')) {
        updateNote(event.target)
    }
    if (event.target.classList.contains('cancel')) {
        hideEditControls(event.target.parentElement)
    }
})

function myNotes() {  //done lines 37-48
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
        // take all the todos
      // loop through and create a new todo item on the page for each one
        for (let noteObj of data) {
            renderNoteItem(noteObj)
        }
        })
}

function deleteNote(element) {  //51-59
    const noteId = element.parentElement.id
    fetch (`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE' ,
    }).then(function (){
        element.parentElement.remove()
    })
}



function updateNote(element) {  //62-81
    const noteTitle = document.querySelector('#noteTitle').value 
    const noteBody = document.querySelector('#noteBody').value
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: noteTitle,
            body: noteBody,
            
            // updated_at: moment().format(),
        }),
    })
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log(data)
        renderNoteText(element.parentElement, data)
    })

}


notesForm.addEventListener('submit', function (event) {  //done lines 84-106
    event.preventDefault()
        const noteTitle = document.querySelector('#noteTitle').value 
        const noteBody = document.querySelector('#noteBody').value
        fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: noteTitle,
            body: noteBody,
            created_at: moment().format('MMMM Do YY'),
    }),
})
    .then((r) => r.json())
    .then((data) => {

        renderNoteItem(data)
    })
    clearInputs()
})


function renderNoteItem(noteObj) {
    const noteCard = document.createElement('span')
    noteCard.id = noteObj.id
    noteCard.innerHTML = `
    <h2>${noteObj.title}</h2><p>${noteObj.body}</p>
    <span class="material-icons-outlined delete">
Delete
</span> <span class='edit'>edit</span>
    `
    notesOutput.appendChild(noteCard)
}

function rendernoteText(notesOutputItem, noteObj) {
    notesOutputItem.innerHTML = `class=${noteObj.item} class='delete' class='edit'`
}



function editNote(element) {
    showEditInput(element.parentElement)
}

function showEditInput(noteItem) {  //139-145
    renderTodoItem.innerHTML = `
    <input class='edit-text' value='${noteItem.textContent}' autofocus>
    <button class='update-note' value='${noteitem.id}>save</button>
    <button class='cancel'>cancel</button>
    `
noteItem.querySelector('input').select()
}



function hideEditControls(noteItem) {  //148-159
    fetch(`http://localhost:3000/notes/${noteId}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        renderNoteText(noteItem, data)
        })
}

function clearInputs(){
    notesForm.reset ()
}


myNotes();