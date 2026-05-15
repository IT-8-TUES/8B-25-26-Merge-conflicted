document.getElementById('resource_form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Вземаме данните
    const name = document.getElementById('res-name').value;
    const link = document.getElementById('res-link').value;
    const category = document.getElementById('res-category').value || "Общи";

    const resourcesList = document.getElementById('resources-list');

    // 2. Махаме съобщението за празна таблица
    const emptyRow = resourcesList.querySelector('.empty-row');
    if (emptyRow) {
        emptyRow.remove();
    }

    // 3. Създаваме новия ред
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><strong>${name}</strong></td>
        <td>${category}</td>
        <td><a href="${link}" target="_blank" class="resource-link">Посети сайта</a></td>
    `;

    // 4. Добавяме в таблицата
    resourcesList.prepend(newRow);

    // 5. Изчистваме формата
    this.reset();
});