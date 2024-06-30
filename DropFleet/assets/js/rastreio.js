document.addEventListener("DOMContentLoaded", function () {
  const rastreiosElement = document.getElementById("rastreios");
  const formContainer = document.querySelector(".modal-container");
  const userLogado = sessionStorage.getItem("userLogado") || sessionStorage.getItem("empresaLogada");
  const loggedUserId = userLogado ? JSON.parse(userLogado).cpf || JSON.parse(userLogado).cnpj : null;

  function calculateProgress(status) {
    const progressMap = {
      "Aguardando liberação": 10,
      "Postado": 25,
      "Em transito": 50,
      "Aguardando retirada": 75,
      "Entregue": 100,
    };
    return progressMap[status] || 0;
  }

  function createProgressBar(progressPercentage) {
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");

    const progress = document.createElement("div");
    progress.classList.add("progress");
    progress.style.width = `${progressPercentage}%`;

    const colorMap = {
      10: "#00CED1",
      25: "#ff4500",
      50: "#ffa500",
      75: "#ffd700",
      100: "#32cd32",
    };

    progress.style.backgroundColor = colorMap[progressPercentage] || "#808080";
    progressBar.appendChild(progress);

    return progressBar;
  }

  function createObjectInfo(object) {
    const info = document.createElement("div");
    info.classList.add("info");

    const id = document.createElement("p");
    id.textContent = `ID de rastreio: ${object.id}`;

    const empresaId = document.createElement("p");
    empresaId.textContent = `ID da empresa: ${object.empresaId}`;

    const postDate = document.createElement("p");
    postDate.textContent = `Postagem: ${object.postDate}`;

    const deliveryDate = document.createElement("p");
    deliveryDate.textContent = `Entregue: ${object.deliveryDate}`;

    info.append(id, empresaId, postDate, deliveryDate);

    return info;
  }

  function createStatusSelect(currentStatus, onChange) {
    const select = document.createElement("select");
    select.classList.add("status-select");

    const statuses = ["Aguardando liberação", "Postado", "Em transito", "Aguardando retirada", "Entregue"];
    statuses.forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      if (status === currentStatus) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener("change", function (event) {
      const newStatus = event.target.value;
      onChange(newStatus);
    });

    return select;
  }

  function createNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }, 100);
  }

  function addObjectToList(object) {
    const li = document.createElement("li");
    li.classList.add("object");

    const img = document.createElement("img");
    img.src = "../img/image48.png";
    img.classList.add("truck");

    const info = createObjectInfo(object);
    const progressBar = createProgressBar(calculateProgress(object.status));
    const select = createStatusSelect(object.status, function (newStatus) {
      object.status = newStatus;
      saveDataToLocalStorage(initialData);
      createNotification(`Status do rastreio ${object.id} alterado para ${newStatus}`);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.title = "Excluir";
    deleteButton.addEventListener("click", function () {
      const index = initialData.findIndex(item => item.id === object.id);
      if (index !== -1) {
        initialData.splice(index, 1);
        saveDataToLocalStorage(initialData);
        createNotification(`Rastreio ${object.id} excluído com sucesso`);
        displayData(initialData);
      }
    });

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "../img/remove.png";
    deleteIcon.alt = "Lixeira";
    deleteButton.appendChild(deleteIcon);

    info.appendChild(select);
    li.append(img, info, progressBar, deleteButton);
    rastreiosElement.appendChild(li);
  }

  function displayData(dataArray) {
    rastreiosElement.innerHTML = "";
    dataArray.forEach(addObjectToList);
  }

  function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('rastreios')) || [];
  }

  function saveDataToLocalStorage(data) {
    localStorage.setItem('rastreios', JSON.stringify(data));
  }

  function getUserRastreios() {
    const allRastreios = getDataFromLocalStorage();
    return allRastreios.filter(item => item.userId === loggedUserId);
  }

  const initialData = getUserRastreios();
  displayData(initialData);

  document.getElementById('add-tracking').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('add-id').value;
    const empresaId = document.getElementById('add-company').value;
    const deliveryDate = document.getElementById('add-delivery').value;
    const postDate = document.getElementById('add-post').value;
    const status = document.getElementById('statusFilter').value;

    const rastreio = { id, empresaId, postDate, deliveryDate, status, userId: loggedUserId };

    initialData.push(rastreio);
    saveDataToLocalStorage(initialData);
    displayData(initialData);
    this.reset();
    formContainer.style.display = 'none';
    createNotification(`Rastreio ${id} adicionado com sucesso`);
  });

  document.querySelector("#searchInput").addEventListener("keyup", (e) => {
    const search = initialData.filter(i =>
      i.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    displayData(search);
  });

  document.querySelector("#statusFilter").addEventListener("change", (e) => {
    const status = e.target.value;
    const filteredData = status
      ? initialData.filter(item => item.status === status)
      : initialData;
    displayData(filteredData);
  });

  document.getElementById("add-button").addEventListener("click", () => {
    formContainer.style.display = formContainer.style.display === "flex" ? "none" : "flex";
  });

  document.getElementById("close").addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.style.display = "none";
  });
});
