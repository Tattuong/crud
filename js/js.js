// render users
const url = "http://localhost:3000/users";
const tableUsers = document.querySelector("#table-user");
let id = "";
let page = 1;
let listUsers = [];
let listSelectedUser = [];

//checkbox all user
const checkAllUsers = () => {
  console.log(listUsers);
  const checkboxValue = document.getElementById("selectedAll").checked;
  if (checkboxValue) {
    listSelectedUser = listUsers.map();
  }
};
checkAllUsers

const deleteAllUsers = () => {
  listSelectedUser.map((userId) => {
    fetch(`${url}/${userId}`, {
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

const fetchUsers = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      listUsers = data.slice(page - 1);
      renderUsers();
    });
};  
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
  const action = alert("Are you sure you want to delele?");
  const msg = "User deleted successfully!";
  users.forEach(function (user, i) {
    if (user.id == id && action != false) {
      user.splice(i, 1);
      $("#userTable #user-" + user.id).remove();
      flashMessage(msg);
    }
  })
}

function handleAddUser() {}
function handleEditUser() { 
  users.forEach(function (user, i) {
    if (user.id == id) {
      $(".table-user").empty().append(`
                <fo rm id="updateUser" action="">
                    <label for="name">Name</label>
                    <input class="form-control" type="text" name="name" value="${user.name}"/>
                    <label for="address">Address</label>
                    <input class="form-control" type="text" name="address" value="${user.address}"/>
                    <label for="age">Age</label>
                    <input class="form-control" type="number" name="age" value="${user.age}" min=10 max=100/>
            `);

      $(".modal-footer").empty().append(`
                    <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </fo>
            `);
    }
  });
}
function main() {
  fetchUsers();
}

main();
