const url = "http://localhost:3000/users";
const addModalForm = document.querySelector("#addModal .form-user");
const editModalForm = document.querySelector("#editModal .form-user");
const deleteModalForm = document.querySelector("#deleteModal .form-user");
const tableUsers = document.querySelector("#table-user");
const myCheckbox = document.getElementById("selectAll");

let id = "";
let listSelectedUser = [];
let listUsers = [];

// list idCheckbox

const addListSelected = (value) => {
  const checkboxValue = document.getElementById(`checkbox1${value}`).checked;
  if (checkboxValue) {
    listSelectedUser = listSelectedUser.concat(value);
    console.log("btn_id", value);
  } else {
    listSelectedUser = listSelectedUser.filter((user) => user !== value);
  }
};

// list ALlIdCheckbox
const checkAllUsers = () => {
  console.log(listUsers);
  const checkboxValue = document.getElementById("selectAll").checked;
  console.log(checkboxValue);
  if (checkboxValue) {
    listSelectedUser = listUsers.map((user) => user.id);
  } else {
    listSelectedUser = [];
  }
};

// fetch api
function fetchUsers() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      listUsers = data;
      renderUsers();
    });
}

// renderHTML
function renderUsers() {
  tableUsers.innerHTML = "";
  listUsers.forEach((user) => {
    const output = ` 
  <tr data-id='${user.id}'>
      <td>
        <span class="custom-checkbox">
            <input type="checkbox" onchange ="addListSelected(${user.id})" id="checkbox1${user.id}" name="options[]" value="1">
          <label for="checkbox1"></label>
        </span> 
      </td> 
      <td>${user.name}</td> 
      <td>${user.email}</td>  
      <td>${user.address}</td>
      <td>${user.phone}</td>
      <td>
        <a href="#editModal" class="btn-edit" ><i class="bi bi-pencil-fill" data-toggle="modal" title="Edit" style="font-size: 20px; color:#FFC107;"></i></a>
        <a href="#deleteModal" class="btn-del"><i class="bi bi-trash-fill" data-toggle="tooltip" title="Delete" style="font-size: 20px; color:red"	></i></a>
      </td>
    </tr>       
`;
    tableUsers.insertAdjacentHTML("beforeend", output);
    const btnDel = document.querySelector(`[data-id = '${user.id}'] .btn-del`);
    btnDel.addEventListener("click", () => {
      id = user.id;
      $("#deleteModal").modal("show");
    });

    const btnEdit = document.querySelector(
      `[data-id = '${user.id}'] .btn-edit`
    );
    btnEdit.addEventListener("click", () => {
      id = user.id;
      $("#editModal").modal("show");
      (editModalForm.name.value = user.name),
        (editModalForm.email.value = user.email),
        (editModalForm.address.value = user.address),
        (editModalForm.phone.value = user.phone);
    });
  });
}
//delete
function handleDeleteUser(e) {
  e.preventDefault();
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      listUsers = listUsers.filter((user) => user.id !== id);
      renderUsers();
    });
  $("#deleteModal").modal("hide");
}

function resetInputForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";
}

//add
function handleAddUser(e) {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: addModalForm.name.value,
      email: addModalForm.email.value,
      address: addModalForm.address.value,
      phone: addModalForm.phone.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      listUsers.push(data);
      renderUsers();
    });
  $("#addModal").modal("hide");
  resetInputForm();
}
//edit
function handleEditUser(e) {
  e.preventDefault();
  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: editModalForm.name.value,
      email: editModalForm.email.value,
      address: editModalForm.address.value,
      phone: editModalForm.phone.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      listUsers = listUsers.map((user) => {
        if (user.id === id) {
          return data;
        }
        return user;
      });
      console.log(listUsers);
      console.log("update", data);
      renderUsers();
    });
  $("#editModal").modal("hide");
  return 0;
}

deleteModalForm.addEventListener("submit", handleDeleteUser);
addModalForm.addEventListener("submit", handleAddUser);
editModalForm.addEventListener("submit", handleEditUser);
myCheckbox.addEventListener("change", checkAllUsers);

function start() {
  fetchUsers();
}
start();
