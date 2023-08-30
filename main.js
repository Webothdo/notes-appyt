const myTitle = document.querySelector('#my-title')
const myText = document.querySelector('#my-text')
const saveNote = document.querySelector('#save-note')
const noteList = document.querySelector('#note-list')

let notes

window.addEventListener('load', () => {

    notes = JSON.parse(localStorage.getItem(notes)) || []

    saveNote.addEventListener('click', () => {
        const note = {
            title: myTitle.value || "Untitled",
            content: myText.value
        }

        notes.push(note)

        localStorage.setItem('notes', JSON.stringify(notes))

        myText.value = ''
        myTitle.value = ''

        showNotes()

    })

    showNotes()

})

showNotes()

function showNotes() {
    noteList.innerHTML = ''

    notes.forEach(note => {

        let noteContainer = document.createElement('div')
        let title = document.createElement('h3')
        let content = document.createElement('p')
        let deleteBtn = document.createElement('button')
        let editBtn = document.createElement('button')
        let actions = document.createElement('div')

        title.innerText = `${note.title}`
        content.innerText = `${note.content}`
        deleteBtn.innerText = 'Delete'
        editBtn.innerText = 'Edit'

        noteContainer.classList.add('note-container')
        deleteBtn.classList.add('delete-btn')
        editBtn.classList.add('edit-btn')
        actions.classList.add('actions')

        actions.appendChild(deleteBtn)
        actions.appendChild(editBtn)
        noteContainer.appendChild(title)
        noteContainer.appendChild(content)
        noteContainer.appendChild(actions)

        noteList.appendChild(noteContainer)

        deleteBtn.addEventListener('click', () => {
            notes = notes.filter((n) => {
                return n != note
            })

            localStorage.setItem('notes', JSON.stringify(notes))
            showNotes()
        })

        editBtn.addEventListener('click', () => {
            myTitle.value = note.title
            myText.value = note.content

            notes = notes.filter((n) => {
                return n != note
            })

            localStorage.setItem('notes', JSON.stringify(notes))

            showNotes()
            myText.focus()


        })


    });

}