const addBtn = document.querySelector('.add');

const localNotes = JSON.parse(localStorage.getItem('notes'));

if(localNotes){
    localNotes.forEach(note => {
        addNewNote(note);
    })
}



addBtn.addEventListener('click', () => {
    addNewNote();
})
function addNewNote(text = ''){
    const note = document.createElement('div');
    note.classList.add('notes')

    note.innerHTML = `<!-- notes header  -->
                        <div class="tools">
                            <button class="check"><i class="fas fa-check"></i></button>
                            <button class="edit"><i class="fas fa-edit"></i></button>
                            <button class="delete"><i class="fas fa-trash-alt"></i></button>
                        </div>
                        <!-- main content  -->
                        <div class="main-content"></div>
                        <textarea></textarea>`;
                        

    // const notes = note.querySelector('.notes-container');
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const checkBtn = note.querySelector('.check');
    const main = note.querySelector('.main-content');
    const textArea = note.querySelector('textarea');

        textArea.value = text;
        main.innerHTML = text;

    checkBtn.addEventListener('click', ()=>{
        main.classList.add('done');
        textArea.classList.add('hide')
    })
    editBtn.addEventListener('click', () => {
        main.classList.remove('done');
        textArea.classList.remove('hide')
        main.classList.add('hide');
    })

    deleteBtn.addEventListener('click', ()=> {
        note.remove();

        updateLS();
    })

    textArea.addEventListener('input', (e) => {
    const {value} = e.target;

    main.innerHTML = marked(value);

    updateLS();
})

    document.body.appendChild(note)
}

function updateLS(){
    const notesText = document.querySelectorAll('textarea');
    const notesArray  = [];

    notesText.forEach(note => {
        notesArray.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notesArray));
}