document.addEventListener("DOMContentLoaded", function () {
    const eventList = document.getElementById("event-list");
    const eventNameInput = document.getElementById("event-name");
    const eventDescrInput = document.getElementById("event-descr");
    const addEventButton = document.getElementById("add-event");

    // Charger les événements depuis le stockage local lors du chargement de la page
    let savedEvents = JSON.parse(localStorage.getItem("events")) || [];

    function saveEventsToLocalStorage(events) {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function renderEvent(event) {
        const eventItem = document.createElement("li");
        const eventId = savedEvents.indexOf(event);

        eventItem.innerHTML = `
            <span>${event.name} - ${event.descr}</span>
            <div class="actions">
                <button class="edit" data-id="${eventId}">Modifier</button>
                <button class="delete" data-id="${eventId}">Supprimer</button>
            </div>
        `;
        eventList.appendChild(eventItem);

        // Attacher des gestionnaires d'événements aux boutons Modifier et Supprimer
        const editButton = eventItem.querySelector(".edit");
        const deleteButton = eventItem.querySelector(".delete");

        editButton.addEventListener("click", function () {
            const eventId = parseInt(editButton.getAttribute("data-id"));
            const newName = prompt("Nouveau nom de la tâche :", savedEvents[eventId].name);
            if (newName !== null) {
                savedEvents[eventId].name = newName;
                saveEventsToLocalStorage(savedEvents);
                renderEvents();
            }
        });

        deleteButton.addEventListener("click", function () {
            const eventId = parseInt(deleteButton.getAttribute("data-id"));
            savedEvents.splice(eventId, 1);
            saveEventsToLocalStorage(savedEvents);
            renderEvents();
        });
    }

    
    function renderEvents() {
        eventList.innerHTML = "";

        savedEvents.forEach((event) => {
            renderEvent(event);
        });
    }

    addEventButton.addEventListener("click", function () {
        const eventName = eventNameInput.value;
        const eventDescr = eventDescrInput.value;

        if (eventName && eventDescr) {
            const event = {
                name: eventName,
                descr: eventDescr
            };

            savedEvents.push(event);
            saveEventsToLocalStorage(savedEvents);

            eventNameInput.value = "";
            eventDescrInput.value = "";

            renderEvents();
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    });

    // Afficher les événements sauvegardés lors du chargement de la page
    renderEvents();
});