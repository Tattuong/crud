// render users
const url = "http://localhost:3000/users";
const tableUsers = document.querySelector("#table-user");
const editModalForm = document.querySelector("#editModal .form-user");
const deleteModalForm = document.querySelector("#deleteModal .form-user");

let id = "";
let listUsers = [];
let listSelectedUser = [];
//checkbox all users

const checkAllUsers = () => {
  console.log(listUsers);
  const checkboxValue = document.getElementById("selectedAll");
  if (checkboxValue) {
    listSelectedUser = listUsers.map();
  }
};
const deleteAllUsers = () => {
  listSelectedUser.map((user) => {
    fetch(`${url}/${user}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchUsers());
  });
  console.log(listSelectedUser);
};

//unique user
const addListSelected = (value) => {
  const checkboxValue = document.getElementById(`checkbox1${value}`).checked;
  if (checkboxValue) {
    listSelectedUser = listSelectedUser.concat(value);
    console.log("btn_", value);
  } else {
    listSelectedUser = listSelectedUser.filter((user) => user !== value);
  }
};

function fetchUsers() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      listUsers = data.slice();
      renderUsers();
    });
}

//render list user
const renderUsers = () => {
  tableUsers.innerHTML = "";
  listUsers.map((user) => {
    const output = ` 
  <tr data-id= '${user.id}'>
      <td>
        <span class="custom-checkbox">
            <input onchange="addListSelected(${user.id})" type="checkbox" id="checkbox1${user.id}" name="options[]" value="1">
          <label for="checkbox1"></label>
        </span> 
      </td>
      <td>${user.name}</td>
      <td>${user.email}</td>  
      <td>${user.address}</td>
      <td>${user.phone}</td>
      <td>
        <a href="#editModal" onlick="editModal()" id="editModal" class="btn-edit" ><i class="bi bi-pencil-fill" data-toggle="modal" title="Edit" style="font-size: 20px; color:#FFC107;"></i></a>
        <a href="#deleteModal" onclick="showDel(${id})" class="btn-del"><i class="bi bi-trash-fill" data-toggle="tooltip" title="Delete" style="font-size: 20px; color:red"	></i></a>
      </td>
    </tr>       
`;
    tableUsers.insertAdjacentHTML("beforeend", output);
  });
};

//delete user
function handleDeleteUser(id) {
  deleteModalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchUsers());
  });
}
//addUser
function handleAddUser() {
  console.log("sd");
  addModalForm.addEventListener("submit", (e) => {
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
        const dataArr = [];
        dataArr.push(data);
        fetchUsers(dataArr);
      });
  });
}

function handleEditUser() {
  editModalForm.addEventListener("submit", (e) => {
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
      .then(() => fetchUsers());
  });
}

function start() {
  fetchUsers();
}
start();
