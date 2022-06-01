const url = "http://localhost:3000/users";
const addModalForm = document.getElementById("myForm");
const editModalForm = document.querySelector("#myForm2");
const deleteModalForm = document.querySelector("#deleteModal .form-user");
const tableUsers = document.querySelector("#table-user");

let id = "";
let listSelectedUser = [];
let listUsers = [];

// list idCheck ox
const addListSelected = (value) => {
  const checkboxValue = document.getElementById(`checkbox1${value}`).checked;
  if (checkboxValue) {
    listSelectedUser = listSelectedUser.concat(value);  
    console.log("btn_id", value);
  } else {
    listSelectedUser = listSelectedUser.filter((user) => user !== value);
  }
};
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

//deleteUserCheckbox
const deleteAllUsers = () => {
  console.log("sd");
  listSelectedUser.map((userId) => {
    fetch(`${url}/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => renderUsers());
  });
};

function fetchUsers() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      listUsers = data.slice();
      renderUsers()
    });
}

// renderuser
function renderUsers() {
  tableUsers.innerHTML = "";
  listUsers.forEach((user) => {
    const output = ` 
  <tr data-id= '${user.id}'>
      <td>
        <span class="custom-checkbox">
            <input   type="checkbox" id="checkbox1${user.id}" name="options[]" value="1">
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
  e.preventDefault()
  fetch(`${url}/${id}`, {
    method: "DELETE", 
  })
  .then(listUsers => listUsers.filter(user => user.id !== id))
  .then(() => renderUsers())
}
// function handleDeleteUser(id) {
//   //send delete request to json-server
//   fetch(`{url}/${id}`, {
//     method: "DELETE",
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     .then((res) => {
//       const chekbox = listUsers.findIndex((user) => user.id === id);
//       const newPostArray = listUsers.filter((user) => user.id != id);
//       fetchUsers(renderUsers);
//     });
//   }

// }
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then(() => fetchUsers());
//   });
// let deletedID = +eve.getAttribute('data-id');
// let newPostArray = postArray.filter(obj => obj.id != deletedID);
// cl(newPostArray);
// templating(newPostArray);
// let deletedURL = `${url}/${deletedID}`;
// try{
//     let responseData = await makeFetchAPICall("DELETE", deletedURL);
// }catch(err){
//     cl(err);
// }
//addsd

function handleAddUser(e) {
  e.preventDefault()
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
      listUsers.push[data]
    });
}
//edit
function handleEditUser(e) {
  e.preventDefault()
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
  });
}
deleteModalForm.addEventListener("submit", handleDeleteUser);
addModalForm.addEventListener("submit", handleAddUser);
editModalForm.addEventListener("submit", handleEditUser);

function start() {
  fetchUsers()
}

start();
