const hwForm = document.getElementById('homework_form');
const hwList = document.getElementById('homework-list');
const deadlineContainer = document.getElementById('deadline-container');

const STORAGE_KEY = 'storedDeadlines';

function getStoredDeadlines() {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    } catch (error) {
        return [];
    }
}

function saveStoredDeadlines(deadlines) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(deadlines));
}

function renderDeadlines(deadlines) {
    if (!deadlineContainer) return;

    if (deadlines.length === 0) {
        deadlineContainer.innerHTML = '<p class="empty-msg">Няма наближаващи крайни срокове.</p>';
        return;
    }

    deadlineContainer.innerHTML = deadlines.map(deadline => `
        <div class="deadline-card">
            <h4>${deadline.title}</h4>
            <p>${deadline.description}</p>
            <span>Краен срок: ${deadline.due}</span>
        </div>
    `).join('');
}

if (hwForm && hwList) {
    hwForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const subject = document.getElementById('hw-subject').value;
        const task = document.getElementById('hw-task').value;
        const date = document.getElementById('hw-date').value;

        const emptyMsg = hwList.querySelector('.empty-msg');
        if (emptyMsg) emptyMsg.remove();

        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <div class="task-details">
                <strong>${subject}</strong>
                <p>${task}</p>
                <small>Срок: ${date}</small>
            </div>
            <button class="delete-task-btn">❌</button>
        `;

        taskCard.querySelector('.delete-task-btn').addEventListener('click', function() {
            taskCard.remove();
            if (hwList.children.length === 0) {
                hwList.innerHTML = '<p class="empty-msg">Нямате оставащи домашни работи. Браво!</p>';
            }
        });

        hwList.appendChild(taskCard);
        hwForm.reset();

        const storedDeadlines = getStoredDeadlines();
        storedDeadlines.push({
            title: subject,
            description: task,
            due: date
        });
        saveStoredDeadlines(storedDeadlines);

        renderDeadlines(storedDeadlines);
    });
}

if (deadlineContainer) {
    const storedDeadlines = getStoredDeadlines();
    renderDeadlines(storedDeadlines);
}
