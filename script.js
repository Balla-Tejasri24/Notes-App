const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Show notes from local storage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    attachEventListeners(); // Important!
}
showNotes();

// Update local storage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    img.src = "images/delete.png";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    updateStorage();        // Save immediately
    attachEvents(inputBox); // Attach event listener to the new note
});

// Attach event listener to individual note
function attachEvents(note) {
    note.onkeyup = updateStorage;
}

// Attach events to all current notes (used after loading from localStorage)
function attachEventListeners() {
    let notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        attachEvents(note);
    });
}

// Delete note
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Prevent new paragraph on Enter key
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
