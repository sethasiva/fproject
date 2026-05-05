const STORAGE_KEY = 'taskflow_tasks';
let tasks = [];
let currentFilter = 'all';
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskBtn');
const taskListElement = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-tab');
const statsDisplay = document.getElementById('statsDisplay');
const taskCountSpan = document.getElementById('taskCount');
<<<<<<< HEAD
function saveTasksStorage() {
=======
function saveTasksToStorage() {
>>>>>>> dbf87882ad52b98d906dc3f90f7fca1539a4ead9
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
function loadTasksFromStorage() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
        try {
            const parsedTasks = JSON.parse(storedTasks);
            if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
                tasks = parsedTasks;
                
                tasks.forEach(task => {
                    if (!task.createdAt) {
                        task.createdAt = new Date().toISOString();
                    }
                });
<<<<<<< HEAD
                saveTasksStorage();
            } else {
=======
                saveTasksToStorage();
            } else {
              
>>>>>>> dbf87882ad52b98d906dc3f90f7fca1539a4ead9
                loadSampleTasks();
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
            loadSampleTasks();
        }
    } else {
        loadSampleTasks();
    }
<<<<<<< HEAD
}

function loadSampleTasks() {
    tasks = [
        {
            id: Date.now(),
            text: 'Welcome to TaskFlow! Click the circle to complete me',
            status: 'pending',
            createdAt: new Date().toISOString()
        }
    ];
    saveTasksStorage();
=======
  }
function loadSampleTasks() {
    tasks = [
        {
            id: Date.now() + 1,
            text: 'Welcome to TaskFlow! Click the circle to complete me',
            status: 'pending',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 2,
            text: 'Try adding your own tasks',
            status: 'pending',
            createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            id: Date.now() + 3,
            text: 'Use filters to organize your view',
            status: 'completed',
            createdAt: new Date(Date.now() - 86400000).toISOString()
        }
    ];
    saveTasksToStorage();
>>>>>>> dbf87882ad52b98d906dc3f90f7fca1539a4ead9
}
function getRelativeTime(isoDate) {
    const taskDate = new Date(isoDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (taskDate.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (taskDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        const daysDiff = Math.floor((today - taskDate) / (1000 * 60 * 60 * 24));
        if (daysDiff < 7) {
            return `${daysDiff} days ago`;
        }
        return taskDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}


function getPriority(taskText) {
    const text = taskText.toLowerCase();
    if (text.includes('urgent') || text.includes('important') || text.includes('deadline') || text.includes('asap')) {
        return { level: 'high', label: ' High Priority' };
    } else if (text.includes('review') || text.includes('meeting') || text.includes('call')) {
        return { level: 'medium', label: ' Medium Priority' };
    } else {
        return { level: 'normal', label: ' Normal' };
    }
}


function updateStatistics() {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    
    let statsText = '';
    if (currentFilter === 'all') {
        statsText = `${totalTasks} total · ${pendingTasks} pending · ${completedTasks} done`;
        taskCountSpan.textContent = totalTasks;
    } else if (currentFilter === 'pending') {
        statsText = `${pendingTasks} pending task${pendingTasks !== 1 ? 's' : ''}`;
        taskCountSpan.textContent = pendingTasks;
    } else {
        statsText = `${completedTasks} completed task${completedTasks !== 1 ? 's' : ''}`;
        taskCountSpan.textContent = completedTasks;
    }
    
    statsDisplay.innerHTML = `<span id="taskCount">${taskCountSpan.textContent}</span> ${statsText.replace(taskCountSpan.textContent, '').trim()}`;
}


function showNotification(message, isError = false) {
   
    const existingNotification = document.querySelector('.task-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'task-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: ${isError ? '#e03131' : '#10b981'};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideUp 0.3s ease;
    `;
    
  
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (!taskText) {
        showNotification('Please enter a task description', true);
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
<<<<<<< HEAD
    saveTasksStorage();
=======
    saveTasksToStorage();
>>>>>>> dbf87882ad52b98d906dc3f90f7fca1539a4ead9
    taskInput.value = '';
    
  
    if (currentFilter !== 'all') {
        currentFilter = 'all';
        updateActiveFilterButton();
    }
    
    renderTasks();
    showNotification(`✓ "${taskText}" added successfully`);
    
  
    setTimeout(() => {
        const newTaskElement = document.querySelector(`[data-task-id="${newTask.id}"]`);
        if (newTaskElement) {
            newTaskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

function toggleTaskStatus(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newStatus = task.status === 'pending' ? 'completed' : 'pending';
        task.status = newStatus;
<<<<<<< HEAD
        saveTasksStorage();
=======
        saveTasksToStorage();
>>>>>>> dbf87882ad52b98d906dc3f90f7fca1539a4ead9
        renderTasks();
        
        const message = newStatus === 'completed' ? 'Task completed! Great job! ' : 'Task marked as pending ';
        showNotification(message);
    }
}

function deleteTask(taskId) {
    const taskToDelete = tasks.find(t => t.id === taskId);
    if (!taskToDelete) return;
    
    tasks = tasks.filter(t => t.id !== taskId);
<<<<<<< HEAD
    saveTasksStorage();
=======
    saveTasksToStorage();
>>>>>>> dbf87882ad52b98d906dc3f90f7fca1539a4ead9
    renderTasks();
    showNotification(` Removed "${taskToDelete.text}"`);
}


function setFilter(filterType) {
    currentFilter = filterType;
    updateActiveFilterButton();
    renderTasks();
    updateStatistics();
}

function updateActiveFilterButton() {
    filterButtons.forEach(btn => {
        const filterValue = btn.getAttribute('data-filter');
        if (filterValue === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}


function getFilteredTasks() {
    if (currentFilter === 'pending') {
        return tasks.filter(task => task.status === 'pending');
    } else if (currentFilter === 'completed') {
        return tasks.filter(task => task.status === 'completed');
    }
    return tasks;
}



function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
       
        let emptyMessage = '';
        if (currentFilter === 'pending') {
            emptyMessage = `
                <div class="empty-state">
                    <div class="empty-icon">✅</div>
                    <p>No pending tasks!</p>
                    <small>You're all caught up </small>
                </div>
            `;
        
        } else {
            emptyMessage = `
                <div class="empty-state">
                <div class="empty-icon">📋</div>
                    <p>Your task list is empty</p>
                    <small>Add a task using the input above</small>
                </div>
            `;
        }
        taskListElement.innerHTML = emptyMessage;
        updateStatistics();
        return;
    }
    
 
    let tasksHTML = '';
    filteredTasks.forEach(task => {
        const isCompleted = task.status === 'completed';
        const timeAgo = getRelativeTime(task.createdAt);
        const priority = getPriority(task.text);
        
        tasksHTML += `
            <li class="task-item ${isCompleted ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-content" data-action="toggle" data-id="${task.id}">
                    <span class="task-checkbox"></span>
                    <div style="flex: 1;">
                        <div class="task-text">${escapeHtml(task.text)}</div>
                        <div class="task-meta">
                            <span class="priority-tag ${priority.level}">${priority.label}</span>
                            <span class="time-tag"> ${timeAgo}</span>
                        </div>
                    </div>
                </div>
                <button class="delete-btn" data-action="delete" data-id="${task.id}" aria-label="Delete task">
                    🗑
                </button>
            </li>
        `;
    });
    
    taskListElement.innerHTML = tasksHTML;
    updateStatistics();
    
    
    attachTaskEventListeners();
}


function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function attachTaskEventListeners() {
    const taskContents = document.querySelectorAll('[data-action="toggle"]');
    taskContents.forEach(element => {
        element.removeEventListener('click', handleToggleClick);
        element.addEventListener('click', handleToggleClick);
    });
    const deleteButtons = document.querySelectorAll('[data-action="delete"]');
    deleteButtons.forEach(button => {
        button.removeEventListener('click', handleDeleteClick);
        button.addEventListener('click', handleDeleteClick);
    });
}

function handleToggleClick(e) {
    e.stopPropagation();
    const taskId = parseInt(this.getAttribute('data-id'));
    toggleTaskStatus(taskId);
}

function handleDeleteClick(e) {
    e.stopPropagation();
    const taskId = parseInt(this.getAttribute('data-id'));
    deleteTask(taskId);
}

function setupEventListeners() {
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            setFilter(filterValue);
        });
    });
}
function init() {
    loadTasksFromStorage();
    setupEventListeners();
    renderTasks();
}
document.addEventListener('DOMContentLoaded', init);