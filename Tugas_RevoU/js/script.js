
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById ('task-input');
    const taskDate = document.getElementById('task-date');
    const addTaskBtn = document.getElementById ('add-task-btn');
    const taskList = document.getElementById ('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todoContainer = document.querySelector('.todos-container');
    const filterDate = document.getElementById('filter-date');


    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.
        length === 0 ? 'block' : 'none';
        todoContainer.style.width = taskList.children.length === 0 ? '100%' : '50%';  
    };

    const filterTasks = () => {
        const selectedDate = filterDate.value;
        const tasks = taskList.querySelectorAll('li');

        tasks.forEach(task => {
            const taskDateValue = task.getAttribute('data-date');
            if (!selectedDate || taskDateValue === selectedDate) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    };

    const addTask = (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const taskDueDate = taskDate.value;

        if(!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        ${taskDueDate ? `<small style="margin-left: auto;">${taskDueDate}</small>` : ''}
        <div class="task buttons">
            <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `;
        li.setAttribute('data-date', taskDueDate);
        
        li.querySelector('.delete-btn').addEventListener('click', () => {
            taskList.removeChild(li);
            toggleEmptyState();
            filterTasks();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        taskDate.value = '';
        toggleEmptyState();
        filterTasks();
    };

    const form = document.querySelector('.input-area');
    form.addEventListener('submit', addTask);
    filterDate.addEventListener('change', filterTasks);

    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            addTask(e);
        }
    });
    taskDate.addEventListener('change', filterTasks);
    toggleEmptyState();   
});