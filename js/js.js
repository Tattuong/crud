const url = "http://localhost:3000/users";
const addModalForm = document.querySelector("#addModal .form-user");
const editModalForm = document.querySelector("#editModal .form-user");
const deleteModalForm = document.querySelector("#deleteModal2 .form-user");
const tableUsers = document.querySelector("#table-user");
const myCheckbox = document.getElementById("selectAll");
const loadingBtn = document.querySelector("#loading-btn");
const btnDeleteAll = document.getElementById("deleteModal");

let id = "";
let listSelectedUser = [];
let listUsers = [];

function setModal(isOpen) {
  document.querySelector("#addModal").style.display = isOpen ? "block" : "none";
  document.querySelector("#deleteModal").style.display = isOpen
    ? "block"
    : "none";
}
// settimeout
function loadingSm() {
  loadingBtn.classList.add("loading");
  // addBtn.form.firstElementChild.disabled = true;
  setTimeout(() => loadingBtn.classList.remove("loading"), 6000);
  // setTimeout(() => {
  //   addBtn.classList.remove('loading');
  //   addBtn.disabled = true;
  //   addBtn.form.firstElementChild.disabled = false;
  // }, 6000);
}

// let btn = document.querySelector('#add-btn');
// btn.addEventListener('click', function () {
//   btn.classList.add('spin');
//   btn.disabled = true;
//   btn.form.firstElementChild.disabled = true;
//   window.setTimeout(function () {
//     btn.classList.remove('spin');
//     btn.disabled = false;
//     btn.form.firstElementChild.disabled = false;
//   }, 4000);
// }, false);

// $(document).ready(function() {
//   $("#btnFetch").click(function() {
//     // disable button
//
//     // add spinner to button
//     $(this).html(
//       `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
//     );
//     renderUsers();
//     setModal(false)
//   });
// });
// var modalshow = true;
// function openModal() {
//   document.querySelector("#button").addEventListener("click", () => {
//     if (modalshow = true) {
//       $("#addModal").modal("show");
//       modalshow = false;
//     }
//   });
// }

// var modalshow = true;
// $("#button").click(function () {
//   if ((modalshow = true)) {
//     $("#addModal").modal("show");
//     modalshow = false;
//   }
// });
// listidCheckbox

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
        <a href="#deleteModal2" class="btn-del"><i class="bi bi-trash-fill" data-toggle="tooltip" title="Delete" style="font-size: 20px; color:red"	></i></a>
      </td>
    </tr>       
`;
    tableUsers.insertAdjacentHTML("beforeend", output);
    const btnDel = document.querySelector(`[data-id = '${user.id}'] .btn-del`);
    btnDel.addEventListener("click", () => {
      id = user.id;
      $("#deleteModal2").modal("show");
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
  e.preventDefault();
  const promisesDelete = listSelectedUser.map((id) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then(() => {
      listUsers = listUsers.filter((user) => user.id !== id)
    } )
  });
  console.log("successful del", listSelectedUser);
  console.log(promisesDelete);

  await Promise.all(promisesDelete);
  renderUsers();  
  setModal();
  console.log("done");
};
  
const handleDeleteUser = (e) => {
  e.preventDefault();
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      listUsers = listUsers.filter((user) => user.id !== id);
      renderUsers();
      $("#deleteModal2").modal("hide");
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
      setModal(false);
      resetInputForm();
    });
};
//edit
const handleEditUser = (e) => {
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
};

deleteModalForm.addEventListener("submit", handleDeleteUser);
addModalForm.addEventListener("submit", handleAddUser);
editModalForm.addEventListener("submit", handleEditUser);
myCheckbox.addEventListener("change", checkAllUsers);
loadingBtn.addEventListener("click", loadingSm);
btnDeleteAll.addEventListener("click", deleteAllUsers);

const start = () => {
  fetchUsers();
};

start();
