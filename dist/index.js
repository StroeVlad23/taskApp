"use strict";
// Exemplu de structură HTML:
// <input id="taskInput" type="text" placeholder="Scrie un task și apasă Enter" />
// <main></main>
class TaskBox {
    constructor(inputElement) {
        this.inputElement = inputElement;
        this.bindEvents();
    }
    bindEvents() {
        this.inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Previi eventualul submit al formularului
                this.CreateTaskBox(event);
            }
        });
    }
    CreateTaskBox(event) {
        const currentInputText = this.inputElement.value.trim();
        if (event.key === "Enter" && currentInputText !== "") {
            console.log('OK');
            let card = document.createElement('div');
            card.classList.add('card');
            let cardTask = document.createElement('p');
            cardTask.classList.add('card__task');
            cardTask.innerText = currentInputText;
            card.appendChild(cardTask);
            // Reset input după ce adaugi task-ul
            this.inputElement.value = '';
            let cardButtons = document.createElement('div');
            cardButtons.classList.add('card__buttons');
            let cardButtonsTags = document.createElement('div');
            cardButtonsTags.classList.add('card__buttons__tags');
            let cardButtonsDeleteElement = document.createElement('button');
            cardButtonsDeleteElement.classList.add('card__buttons__delete__element');
            cardButtonsDeleteElement.innerText = 'Delete';
            cardButtonsDeleteElement.addEventListener('click', function () {
                card.classList.add("remove");
                setTimeout(() => {
                    card.remove();
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
    }
}
// Instanțierea clasei TaskBox după încărcarea completă a DOM-ului
document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.getElementById('task__input');
    if (inputElement) {
        new TaskBox(inputElement);
    }
    else {
        console.error("Elementul input nu a fost găsit!");
    }
});
