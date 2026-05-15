const hwForm = document.getElementById('homework_form');
const hwList = document.getElementById('homework-list');

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
    });
}