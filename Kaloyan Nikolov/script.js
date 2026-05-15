document.getElementById('notes_form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Вземаме данните
    const title = document.getElementById('note-title').value;
    const category = document.getElementById('note-category').value || "---";
    const content = document.getElementById('note-content').value;

    const notesList = document.getElementById('notes-list');

    // 2. Махаме съобщението "Нямате записки", ако съществува
    const emptyRow = notesList.querySelector('.empty-row');
    if (emptyRow) {
        emptyRow.remove();
    }

    // 3. Създаваме нов ред (tr) и клетки (td)
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><strong>${title}</strong></td>
        <td>${category}</td>
        <td>${content}</td>
    `;

    // 4. Добавяме реда в началото на таблицата
    notesList.prepend(newRow);

    // 5. Изчистваме формата
    this.reset();
});