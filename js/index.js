let logado = JSON.parse(sessionStorage.getItem("logado"));
if (!logado) {
  window.location = "loginPage.html";
}

let accounts = JSON.parse(localStorage.getItem("accounts"));
let userEmail = JSON.parse(sessionStorage.getItem("userEmail"));
let userData = accounts.find((account) => userEmail == account.email);
let userAccountIndex = accounts.indexOf(userData);

let tasks = userData.toDo_list;
let finalizedTasks = [];
let notFinalizedTasks = [];

window.onload = showList;

const form = document.getElementById("form");
form.addEventListener("keydown", (ev) => {
  if(ev.key === "Enter") {
    addTask(ev);
    showList(ev)
  }
});

const btnLogout = document.getElementById("Logout");
btnLogout.addEventListener("click", () =>
  sessionStorage.setItem("logado", false)
);

const btnAdd = document.getElementById("sendToAdd");
btnAdd.addEventListener("click", addTask);
btnAdd.addEventListener("click", showList);

const btnFilter = document.getElementById("filter");
btnFilter.addEventListener("change", showList);

const btnRemoveAll = document.getElementById("removeAll");
btnRemoveAll.addEventListener("click", removeAll);
btnRemoveAll.addEventListener("click", showList);

function showList(ev) {
  ev.preventDefault()

  removeList();

  updateTasks();

  if (listToShow().length > 0) {
    listToShow().forEach((task) => {
      let listContent = document.createElement("div");
      listContent.className = "list_content";

      let paragraph = document.createElement("p");
      paragraph.className = "list_paragraph";
      if (task.done == true) paragraph.className += " finalized";
      paragraph.innerText = task.name;

      let divIconDone = document.createElement("div");
      divIconDone.className = "icon_container";

      let iconDone = document.createElement("span");
      iconDone.className = "material-symbols-outlined  icon_done";
      iconDone.innerText = "done";
      iconDone.addEventListener("click", (event) => {
        const task = tasks[findTarget(event)];

        if (task.done == false) {
          task.done = true;
        } else {
          task.done = false;
        }
        saveAccounts();
        saveLocalStorage("accounts", accounts);

        finalizedTasks.splice(task, 1);
        notFinalizedTasks.splice(task, 1);
      });
      iconDone.addEventListener("click", showList);

      let divIconDelete = document.createElement("div");
      divIconDelete.className = "icon_container background_delete";

      let iconDelete = document.createElement("span");
      iconDelete.className = "material-symbols-outlined  icon_delete";
      iconDelete.innerText = "delete";
      iconDelete.addEventListener("click", (event) => {
        const task = findTarget(event);

        tasks.splice(task, 1);
        saveAccounts();
        saveLocalStorage("accounts", accounts);
        finalizedTasks.splice(task, 1);
        notFinalizedTasks.splice(task, 1);
      });
      iconDelete.addEventListener("click", showList);

      const divToAppendChilds = document.getElementById("list");
      divIconDone.appendChild(iconDone);
      divIconDelete.appendChild(iconDelete);
      listContent.appendChild(paragraph);
      listContent.appendChild(divIconDone);
      listContent.appendChild(divIconDelete);
      divToAppendChilds.appendChild(listContent);
    });
  } else {
    let h2 = document.createElement("h2");
    h2.className = "no_itens";
    h2.innerText = "Não há itens nesta lista!";

    const divToAppendChild = document.getElementById("list");
    divToAppendChild.appendChild(h2);
  }
}

function removeList() {
  const listContainer = document.getElementById("list_container");

  const divToRemove = document.getElementById("list");
  listContainer.removeChild(divToRemove);

  let div = document.createElement("div");
  div.className = "list";
  div.id = "list";

  listContainer.appendChild(div);
}

function updateTasks() {
  let tasksToAddOnFT = [];
  let tasksToAddOnNFT = [];

  tasks.map((task) => {
    if (task.done == true) {
      tasksToAddOnFT.push(task);
    } else {
      tasksToAddOnNFT.push(task);
    }

    for (let i = 0; i < tasksToAddOnFT.length; i++) {
      finalizedTasks[i] = tasksToAddOnFT[i];
    }

    for (let i = 0; i < tasksToAddOnNFT.length; i++) {
      notFinalizedTasks[i] = tasksToAddOnNFT[i];
    }
  });
}

function listToShow() {
  let listToShow = document.getElementById("filter").value;
  if (listToShow == "tasks") return tasks;
  if (listToShow == "finalizedTasks") return finalizedTasks;
  if (listToShow == "notFinalizedTasks") return notFinalizedTasks;
}

function findTarget(event) {
  let target = event.target.parentNode.parentNode.firstChild.innerText;
  let findedTarget = tasks.filter((task) => task.name == target);
  const indexOfFindedTarget = tasks.indexOf(findedTarget[0]);

  return indexOfFindedTarget;
}

function addTask(ev) {
  ev.preventDefault()
  
  let toAdd = document.getElementById("toAdd").value;

  if (toAdd != "") {
    let duplicated = tasks.filter((task) => task.name == toAdd);

    if (duplicated.length > 0) {
      alert("Tarefa já listada!");
    } else {
      tasks.push({ name: toAdd, done: false });
      saveAccounts();
      saveLocalStorage("accounts", accounts);

      document.getElementById("toAdd").value = "";
    }
  } else {
    alert("Preencha o campo!");
  }
}

function removeAll() {
  const confirmRemoveAll = confirm(
    "Você tem certeza que deseja remover todos os itens desta lista?"
  );

  if(confirmRemoveAll) {
    let listToRemoveAll = listToShow();
    let removeFromTasks = [];
    
    listToRemoveAll.map((element) => {
      removeFromTasks.push(element);
    });

    for (let i = 0; i < removeFromTasks.length; i++) {
      let indexToRemove = tasks.indexOf(removeFromTasks[i]);
      tasks.splice(indexToRemove, 1);

      if(removeFromTasks[i].done == true) {
        finalizedTasks = [];
      } else {
        notFinalizedTasks = [];
      }
    }

    saveAccounts();
    saveLocalStorage("accounts", accounts)
  }
}

function saveLocalStorage(nameToSave, toSave) {
  localStorage.setItem(nameToSave, JSON.stringify(toSave));
}

function saveAccounts() {
  userData.toDo_list = tasks;
  accounts[userAccountIndex] = userData;
}
