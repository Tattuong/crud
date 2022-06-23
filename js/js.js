const url = "http://localhost:3000/users";
const addModalForm = document.querySelector("#addModal .form-user");
const editModalForm = document.querySelector("#editModal .form-user");
const deleteModalBtn = document.querySelector("#deleteModal #del_user_button");
const tableUsers = document.querySelector("#table-user");
const myCheckbox = document.getElementById("selectAll");
const loadingBtn = document.querySelector("#loading-btn");

let id = "";
let listSelectedUser = [];
let listUsers = [];

const setModal = (isclose) => {
  document.querySelector("#addModal").style.display = isclose
    ? "block"
    : "none";
  document.querySelector("#deleteModal").style.display = isclose
    ? "block"
    : "none";
};

const displayLoading = (id, isLoading) => {
  const btnElement = document.getElementById(id);

  if (isLoading) {
    btnElement.setAttribute("data-name", btnElement.innerHTML);
  }

  const btnHtmlInit = isLoading
    ? btnElement.innerHTML
    : btnElement.getAttribute("data-name");

  if (isLoading) {
    btnElement.innerHTML = `
    <span class="spinner-border spinner-border-sm"></span>
    Loading...
 `;
    btnElement.disabled = true;
  } else {
    btnElement.innerHTML = btnHtmlInit;
    btnElement.disabled = false;
  }
};

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

const fetchUsers = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      listUsers = data;
      renderUsers();
    });
};
// renderHTML
const renderUsers = () => {
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
};

const deleteAllUsers = async (e) => {
  displayLoading("del_user_button", true);
  e.preventDefault();
  const promisesDelete = listSelectedUser.map((id) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  });
  console.log("successful del", listSelectedUser);
  console.log(promisesDelete);
  await Promise.all(promisesDelete);
  listUsers = listUsers.filter((user) => !listSelectedUser.includes(user.id));
  listSelectedUser = [];
  displayLoading("del_user_button", false);
  renderUsers();
  setModal(false);
  console.log("done");
};

const handleDeleteUser = (e) => {
  if (!id) {
    deleteAllUsers(e);
    return;
  }

  displayLoading("del_user_button", true);
  e.preventDefault();
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      listUsers = listUsers.filter((user) => user.id !== id);
      displayLoading("del_user_button", false);
      renderUsers();
      id = null;
      $("#deleteModal").modal("hide");
    });
};

const resetInputForm = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";
};
//add
const handleAddUser = (e) => {
  displayLoading("add_user_button", true);
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
      displayLoading("add_user_button", false);
      renderUsers();
      setModal(false);
      resetInputForm();
    });
};

//edit
const handleEditUser = (e) => {
  displayLoading("edit_user_button", true);
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
      displayLoading("edit_user_button", false);
      renderUsers();
      $("#editModal").modal("hide");
    });
};

deleteModalBtn.addEventListener("click", handleDeleteUser);
addModalForm.addEventListener("submit", handleAddUser);
editModalForm.addEventListener("submit", handleEditUser);
myCheckbox.addEventListener("change", checkAllUsers);

fetchUsers();
