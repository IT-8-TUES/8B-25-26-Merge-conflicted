const SERVER_URL = 'http://localhost:3000/api/notes';

// Функция за изрисуване на записките на екрана (Акордеон стил)
function renderNotes(notes) {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; // Изчистваме старото

    if (notes.length === 0) {
        notesList.innerHTML = `<p class="empty-msg" style="text-align: center; color: #666;">Нямате добавени записки.</p>`;
        return;
    }

    notes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');

        noteItem.innerHTML = `
            <div class="note-header">
                <span class="note-title-text">${note.title} <small>(${note.category})</small></span>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="note-body">
                <p>${note.content}</p>
                <button class="delete-btn">Изтрий записката</button>
            </div>
        `;

        // Логика за отваряне/затваряне
        const noteHeader = noteItem.querySelector('.note-header');
        const noteBody = noteItem.querySelector('.note-body');
        const toggleIcon = noteItem.querySelector('.toggle-icon');

        noteHeader.addEventListener('click', () => {
            noteBody.classList.toggle('show');
            toggleIcon.textContent = noteBody.classList.contains('show') ? '▲' : '▼';
        });

        // Логика за изтриване чрез сървъра
        noteItem.querySelector('.delete-btn').addEventListener('click', () => {
            fetch(`${SERVER_URL}/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: note.title })
            })
            .then(res => res.json())
            .then(data => renderNotes(data.notes)); // Преначертава обновения списък
        });

        notesList.appendChild(noteItem);
    });
}

// 1. Зареждане на записките от сървъра при стартиране на страницата
window.addEventListener('DOMContentLoaded', () => {
    fetch(SERVER_URL)
        .then(res => res.json())
        .then(data => renderNotes(data));
});

// 2. Изпращане на нова записка към сървъра
document.getElementById('notes_form').addEventListener('submit', function(e) {
    e.preventDefault();

    const newNote = {
        title: document.getElementById('note-title').value,
        category: document.getElementById('note-category').value || "Общи",
        content: document.getElementById('note-content').value
    };

    fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
    })
    .then(res => res.json())
    .then(data => {
        renderNotes(data.notes); // Обновява списъка веднага
        this.reset();            // Изчиства формата
    });
});