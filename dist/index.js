"use strict";
let SaveTask = (event) => {
    let inputElement = document.getElementById("task__input");
    let inputText = inputElement.value;
    if (inputText.trim() !== "") {
        if (event.key === "Enter") {
            //  <div class='card'>
            let card = document.createElement('div');
            card.classList.add('card');
            // <p id="card__task" class="card__task">
            let cardTask = document.createElement('p');
            cardTask.classList.add('card__task');
            cardTask.id = `card__task`;
            // Set p element with input
            cardTask.innerText = inputText;
            card.appendChild(cardTask);
            inputText = '';
            // <div class="card__buttons">
            let cardButtons = document.createElement('div');
            cardButtons.classList.add('card__buttons');
            // <div class="card__buttons__tags"
            let cardButtonsTags = document.createElement('div');
            cardButtonsTags.classList.add('card__buttons__tags');
            // <button class="card__buttons__element"
            let cardButtonsDeleteElement = document.createElement('button');
            cardButtonsDeleteElement.classList.add('card__buttons__delete__element');
            cardButtonsDeleteElement.innerText = 'Delete';
            cardButtonsDeleteElement.addEventListener('click', function () {
                card.classList.add("remove");
                setTimeout(() => {
                    card.remove(); // Șterge cardul din DOM după finalizarea animației
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
};
