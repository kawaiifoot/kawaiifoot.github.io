const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTask');
    let draggedItem = null;
    let editingTask = null;

    function isValidDate(dateStr) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
    const [year, month, day] = dateStr.split('-').map(Number);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    const dateObj = new Date(dateStr);
    if (
        dateObj.getFullYear() !== year ||
        dateObj.getMonth() + 1 !== month ||
        dateObj.getDate() !== day
    ) return false;
    if (year > 2150) return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    if (dateObj < today) return false;
    return true;
}

    addTaskBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value.trim();
    const deadline = document.getElementById('deadline').value;
    const details = document.getElementById('details').value.trim();

    if (title.length > 30) return alert("Title cannot exceed 30 characters.");
    if (!isValidDate(deadline)) return alert("Please enter a valid date (YYYY-MM-DD).");
    if (!title || !deadline) return alert("Please fill in the title and deadline.");
    if (deadline.length > 10) return alert("Date format is too long.");

    createTask(title, deadline, details);

    document.getElementById('title').value = '';
    document.getElementById('deadline').value = '';
    document.getElementById('details').value = '';
});

    function createTask(title, deadline, details) {
    const task = document.createElement('div');
    task.className = 'task';
    task.draggable = true;

    task.innerHTML = `
        <div class="task-top">
            <span class="task-title">${title}</span>
            <input type="date" value="${deadline}" disabled maxlength="10" class="task-date" />
        </div>
        <div class="task-details">
            <textarea disabled>${details}</textarea>
        </div>
        <div class="task-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const titleSpan = task.querySelector('.task-title');
    const dateInput = task.querySelector('.task-date');
    const detailsTextarea = task.querySelector('.task-details textarea');
    const editBtn = task.querySelector('.edit-btn');
    const deleteBtn = task.querySelector('.delete-btn');

    titleSpan.addEventListener('click', () => {
    const detailSection = task.querySelector('.task-details');
    const detailsTextarea = detailSection.querySelector('textarea');

    const isVisible = detailSection.style.display === 'block';
    if (isVisible) {
       
        detailSection.style.display = 'none';
        detailsTextarea.style.minHeight = '160px'; 
    } else {
        
        detailSection.style.display = 'block';
        detailsTextarea.style.minHeight = '160px'; 
    }
});

    editBtn.addEventListener('click', () => {
        if (editingTask && editingTask !== task) {
            setEditMode(editingTask, false);
        }
        const isEditing = editBtn.textContent === 'Save';
        setEditMode(task, !isEditing);
        editingTask = !isEditing ? task : null;
    });



function setEditMode(taskElem, enable) {
    const titleSpan = taskElem.querySelector('.task-title');
    const dateInput = taskElem.querySelector('.task-date');
    const detailsTextarea = taskElem.querySelector('.task-details textarea');
    const editBtn = taskElem.querySelector('.edit-btn');

    if (enable) {
        titleSpan.contentEditable = true;
        dateInput.disabled = false;
        detailsTextarea.disabled = false;
        editBtn.textContent = 'Save';

        detailsTextarea.style.minHeight = '160px';

        titleSpan.addEventListener('input', limitTitleLength);
    } else {
        titleSpan.contentEditable = false;
        dateInput.disabled = true;
        detailsTextarea.disabled = true;
        editBtn.textContent = 'Edit';

        detailsTextarea.style.minHeight = '160px';
        titleSpan.removeEventListener('input', limitTitleLength);

        if (!isValidDate(dateInput.value)) {
            alert("Please enter a valid date (YYYY-MM-DD).");
            dateInput.focus();
            return;
        }
 
        if (titleSpan.textContent.length > 30) {
            alert("Title cannot exceed 30 characters.");
            titleSpan.focus();
            return;
        }
    }

    function limitTitleLength(e) {
        if (titleSpan.textContent.length > 30) {
            titleSpan.textContent = titleSpan.textContent.slice(0, 30);
            placeCaretAtEnd(titleSpan);
        }
    }

    function placeCaretAtEnd(el) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

    dateInput.addEventListener('input', () => {
        if (dateInput.value.length > 10) {
            dateInput.value = dateInput.value.slice(0, 10);
        }
    });

    deleteBtn.addEventListener('click', () => {
        if (editingTask === task) editingTask = null;
        task.remove();
    });

   
    task.addEventListener('dragstart', () => {
        draggedItem = task;
        setTimeout(() => task.classList.add('dragging'), 0);
    });
    task.addEventListener('dragend', () => {
        draggedItem = null;
        task.classList.remove('dragging');
    });
    taskList.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(taskList, e.clientY);
        if (afterElement == null) {
            taskList.appendChild(draggedItem);
        } else {
            taskList.insertBefore(draggedItem, afterElement);
        }
    });

    taskList.appendChild(task);
}

    const darkModeBtn = document.getElementById('darkModeToggle');
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }