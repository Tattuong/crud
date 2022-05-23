const modal = document.querySelector(".modal");
const tableUser = document.querySelector("#table-user");
const InputName = document.querySelector("#name");
const InputEmail = document.querySelector("#email");
const InputAddress = document.querySelector("#address");
const InputPhone = document.querySelector("#phone");
const btnSave = document.querySelector("#btnSave");

let listUser;
let id;

function openModal(edit = false, index = 0) {
    console.log("sds");
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    InputName.value = listUser[index].name;
    InputEmail.value = listUser[index].email;
    InputAddress.value = listUser[index].address;
    InputPhone.value = listUser[index].phone;
    id = index;
  } else {
    InputName.value = "";
    InputEmail.value = "";
    InputAddress.value = "";
    InputPhone.value = "";
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
  <td>
  <span class="custom-checkbox">
      <input onchange="addListSelected(${index.id})" type="checkbox" id="checkbox1${user.id}" name="options[]" value="1">
    <label for="checkbox1"></label>
  </span> 
</td>
<td>${item.name}</td>
<td>${item.email}</td>  
<td>${item.address}</td>
<td>${item.phone}</td>
<td>
  <a href="#editModal" onclick="editItem(${index}) class="btn-edit" ><i class="bi bi-pencil-fill" data-toggle="modal" title="Edit" style="font-size: 20px; color:#FFC107;"></i></a>
  <a href="#deleteModal" onclick="deleteItem(${index}) class="btn-del"><i class="bi bi-trash-fill" data-toggle="tooltip" title="Delete" style="font-size: 20px; color:red"	></i></a>
</td>
  `;
  tableUser.appendChild(tr);
}


function adduser() {
  console.log("sds");
  btnSalvar.onclick = (e) => {
  if (sNome.value == "" || sFuncao.value == "" || sSalario.value == "") {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].funcao = sFuncao.value;
    itens[id].salario = sSalario.value;
  } else {
    itens.push({
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value,
    });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};
}


function loadItens() {
  itens = getItensBD();
  tableUser.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

loadItens();
