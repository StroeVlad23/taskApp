"use strict";
class TaskBox {
    constructor(inputElement) {
        this.tasks = [];
        this.inputElement = inputElement;
        this.loadTasks(); // Încarcă taskurile la început
        this.bindEvents();
    }
    bindEvents() {
        this.inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.saveTasks();
                this.CreateTaskBox(event);
            }
        });
    }
    saveTasks() {
        const currentInputText = this.inputElement.value.trim();
        if (currentInputText !== '') {
            this.tasks.push(currentInputText);
            console.log('Current tasks:', this.tasks);
            localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Salvează taskurile în localStorage
        }
    }
    loadTasks() {
        const savedTasks = localStorage.getItem('tasks'); // Citește taskurile din localStorage
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks); // Parsează și setează array-ul de taskuri
            this.tasks.forEach(task => {
                this.createTaskCard(task); // Crează un card pentru fiecare task
            });
        }
    }
    createTaskCard(task) {
        let card = document.createElement('div');
        card.classList.add('card');
        let cardTask = document.createElement('p');
        cardTask.classList.add('card__task');
        cardTask.innerText = task;
        card.appendChild(cardTask);
        let cardButtons = document.createElement('div');
        cardButtons.classList.add('card__buttons');
        let cardButtonsTags = document.createElement('div');
        cardButtonsTags.classList.add('card__buttons__tags');
        let cardButtonsDeleteElement = document.createElement('button');
        cardButtonsDeleteElement.classList.add('card__buttons__delete__element');
        cardButtonsDeleteElement.innerText = 'Delete';
        cardButtonsDeleteElement.addEventListener('click', () => {
            card.classList.add("remove");
            setTimeout(() => {
                card.remove();
                // După ce cardul este șters, elimină taskul și actualizează localStorage
                const taskText = cardTask.innerText;
                this.tasks = this.tasks.filter(task => task !== taskText); // Șterge taskul din array
                localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Actualizează localStorage
            }, 500);
        });
        cardButtons.appendChild(cardButtonsTags);
        cardButtons.appendChild(cardButtonsDeleteElement);
        card.appendChild(cardButtons);
        let mainContainer = document.querySelector('main');
        if (mainContainer) {
            mainContainer.appendChild(card);
        }
    }
    CreateTaskBox(event) {
        const currentInputText = this.inputElement.value.trim();
        if (event.key === "Enter" && currentInputText !== "") {
            this.createTaskCard(currentInputText); // Creează un card pentru task-ul curent
            this.inputElement.value = ''; // Golește input-ul
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.getElementById('task__input');
    if (inputElement) {
        new TaskBox(inputElement);
    }
    else {
        console.error("Elementul input nu a fost găsit!");
    }
});
