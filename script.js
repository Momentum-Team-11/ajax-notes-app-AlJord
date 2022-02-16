// need to show a list of existing todos
const url = 'http://localhost:3000/notes'
const notesOutput = document.getElementById('notesOutput')
const notesForm = document.getElementById('notesForm')


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



notesForm.addEventListener('submit', function () { //done lines 8-14
    event.preventDefault()
    // grab the value from the input
    const noteText = document.querySelector('#note-text').value
    // send it to the server to create a new todo
    createNote(noteText)
})



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



function deleteNote(element) {  //51-59
    const noteId = element.parentElement.id
    fetch (`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE' ,
    }).then(function (){
        element.parentElement.remove()
    })
}



function updateNote(element) {  //62-81
    const note = element.parentElement.id
    const noteText = document.querySelector('.edit-text')
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            item: noteText.value,
            updated_at: moment().format(),
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




function createNote(noteText) {  //done lines 84-106
    fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
        item: noteText,
        created_at: moment().format(),
    }),
})
    .then(r => r.json())
    .then((data) => {
           // what I get back from the server IS the newly created todo object that looks like this:
    /*
    {
        "item": "Another thing!",
        "id": 5
    }
    */
      // So I can take that data and create a new todo item in th
        renderNoteItem(data)
    })
    clearInputs()
}


function renderNoteItem(noteObj) { //112-128
    const itemEl = document.createElement('li')
    itemEl.p = noteObj.id
    rendernoteText(itemEl, noteObj)
    notesOutput.prepent(itemEl)
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
    form.reset ()
}


// call this when the script first runs (on page load)
// This runs only on the first load!
myNotes();