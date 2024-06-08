const taskinput = document.getElementById("taskinput");
const add = document.getElementById("add");
const orderlist = document.getElementById("ol");
const editDialog = document.getElementById("editDialog");
const editInput = document.getElementById("editInput");
const confirmEdit = document.getElementById("confirmEdit");
const cancelEdit = document.getElementById("cancelEdit");
let tasklist = JSON.parse(localStorage.getItem("task")) || [];

function updateLocalStorage() {
    localStorage.setItem("task", JSON.stringify(tasklist));
}

function createTaskElement(task) {
    const litag = document.createElement("li");
    const btag = document.createElement("b");
    btag.innerText = task.name;
    if (task.isMarked) {
        btag.classList.add("done");
    }
    const div = document.createElement("div");
    div.classList.add("btns");
    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = `<img src="icons/delete.png" alt="">`;
    deletebtn.title = "Delete";
    const editbtn = document.createElement("button");
    editbtn.innerHTML = `<img src="icons/edit.png" alt="">`;
    editbtn.title = "Edit";
    const markasdonebtn = document.createElement("button");
    markasdonebtn.innerHTML = `<img src="icons/complete.png" alt="">`;
    markasdonebtn.title = "Mark as done";

    litag.appendChild(btag);
    litag.appendChild(div);
    div.appendChild(deletebtn);
    div.appendChild(editbtn);
    div.appendChild(markasdonebtn);

    deletebtn.addEventListener("click", () => {
        litag.remove();
        tasklist = tasklist.filter(t => t !== task);
        updateLocalStorage();
    });

    markasdonebtn.addEventListener("click", () => {
        // task.isMarked = true;
        // btag.classList.add("done");
        task.isMarked = !task.isMarked;
        btag.classList.toggle("done");
        updateLocalStorage();
    });

    editbtn.addEventListener("click", () => {
        editDialog.showModal();
        editInput.value = btag.innerText;
        confirmEdit.onclick = () => {
            task.name = editInput.value;
            btag.innerText = editInput.value;

            task.isMarked = false;
            btag.classList.remove("done");
            updateLocalStorage();
            editDialog.close();
        }

        cancelEdit.onclick = () => {
            editDialog.close();
        };
        editDialog.onclick = (e) => {
            if (e.target === editDialog) {
                editDialog.close();
            }
        };
    });

    return litag;
}

function taskElement() {
    const taskname = taskinput.value;
    const existingError = document.getElementById("error-message");
    if (existingError) {
        existingError.remove();
    }
    if (!taskname) {
        const error = document.createElement("div");
        error.id = "error-message";
        error.innerText = "Please enter a task";
        document.body.appendChild(error);
        setTimeout(() => {
            error.remove();
        }, 2000);
    } else {
        const task = { name: taskname, isMarked: false };
        const taskElement = createTaskElement(task);
        orderlist.appendChild(taskElement);
        tasklist.push(task);
        updateLocalStorage();
        taskinput.value = "";
    }
}

add.addEventListener("click", taskElement);

taskinput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        taskElement();
    }
});

window.addEventListener("load", () => {
    tasklist.forEach(task => {
        const taskElement = createTaskElement(task);
        orderlist.appendChild(taskElement);
    });
});
