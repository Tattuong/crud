const modal = document.querySelector(".modal-fade");
const tableUser = document.querySelector("#table-user");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputAddress = document.querySelector("#address");
const inputPhone = document.querySelector("#phone");
const btnSave = document.querySelector("#btnSave");

let listUser;
let id;
let listSelectedUser = [];

// checkbox all

function checkAllUsers() {
  console.log(listSelectedUser);
  const checkboxValue = document.getElementById("selectedAll");
  if (checkboxValue) {
    listSelectedUser = listUser.map();
  }
}
// check iduser
function addListSelected(value) {
  console.log(value);
  const checkboxValue = document.getElementById(`checkbox1${value}`).checked;
  if (checkboxValue) {
    listSelectedUser = listSelectedUser.concat();
  }
}
//popup
    function openModal(edit = false, index = 0) {
    modal.classList.add("active");
    modal.onclick = (e) => {
        if (e.target.className.indexOf("modal-fade") !== -1) {
        modal.classList.remove("active");
        }
    };
    if (edit) {
        inputName.value = listUser[index].name;
        inputEmail.value = listUser[index].email;
        inputAddress.value = listUser[index].address;
        inputPhone.value = listUser[index].phone;
        id = index;
    } else {
        inputName.value = "";
        inputEmail.value = "";
        inputAddress.value = "";
        inputPhone.value = "";
    }
    }

    //renderUser
    function renderUser(item, index) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
        <span class="custom-checkbox">
            <input onchange="addListSelected(${index.id})" type="checkbox" id="checkbox1${index.id}" name="options[]" value="1">
        <label for="checkbox1"></label>
        </span> 
    </td>
    <td>${item.name}</td>
    <td>${item.email}</td>      
    <td>${item.address}</td>
    <td>${item.phone}</td>
    <td>
        <a href="#editModal" onclick="editUser(${index})" class="bx bx-edit" ><i class="bi bi-pencil-fill" data-toggle="modal" title="Edit" style="font-size: 20px; color:#FFC107;"></i></a>
        <a href="#deleteModal" onclick="deleteuUser(${index})" class="btn-del"><i class="bi bi-trash-fill" data-toggle="tooltip" title="Delete" style="font-size: 20px; color:red"	></i></a>
    </td>
        `;
    tableUser.appendChild(tr);
    console.log(index);
    }
    //edit
    function editUser(index) {
  openModal(true, index);
}

// HandelDeleteUser
function deleteuUser(index) {
  listUser.splice(index, 1);
  setUserDB();
  loadlistUser();
}

//created user
function addUser() {
  console.log("add");
  btnSave.onclick = (e) => {
    if (
      inputName.value == "" ||
      inputEmail.value == "" ||
      inputAddress.value == "" ||
      inputPhone.value == ""
    ) {
      return;
    }
    e.preventDefault();

    if (id !== undefined) {
      listUser[id].name = inputName.value;
      listUser[id].email = inputEmail.value;
      listUser[id].address = inputAddress.value;
      listUser[id].phone = inputPhone.value;
    } else {
      listUser.push({
        name: inputName.value,
        email: inputEmail.value,
        address: inputAddress.value,
        phone: inputPhone.value,
      });
    }

    setUserDB();

    modal.classList.remove("active");
    loadlistUser();
    id = undefined;
  };
}

//uploadUser
function loadlistUser() {
  listUser = getUserDB();
  tableUser.innerHTML = "";
  listUser.forEach((item, index) => {
    renderUser(item, index);
  });
}
//SAVE LOCALSTORAGE
const getUserDB = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setUserDB = () =>
  localStorage.setItem("dbfunc", JSON.stringify(listUser));

loadlistUser();
        
