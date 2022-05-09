const modal = document.getElementsByClassName("modal-fade");
const btn = document.getElementsByClassName("myBtn");
const close = document.getElementsByClassName("close");
const addModalForm = document.querySelector(".form-user");
const editModalForm = document.querySelector("#editModal .form-user");
const deleteModalForm = document.querySelector("#deleteModal .form-user");


// popup
btn[0].onclick = () => {
  modal[0].style.display = "block";
};
btn[1].onclick = () => {
  modal[1].style.display = "block";
};
close[0].onclick = () => {
  modal[0].style.display = "none";
};
close[1].onclick = (    
) => {
  modal[1].style.display = "none";
};
// close po   pup
window.onclick = function (event) {
  if (event.target == modal[0]) {
    modal[0].style.display = "none";
  }
  if (event.target == modal[1]) {
    modal[1].style.display = "none";
  }
};

//checkbox all
$("#selectAll").click(function (e) {
  if ($(this).hasClass("checkedAll")) {
    $("input").prop("checked", false);
    $(this).removeClass("checkedAll");
  } else {
    $("input").prop("checked", true);
    $(this).addClass("checkedAll");
  }
});

$(document).ready(function(){

})
//showpopup moda
//showPopup edit, delete
// "btn-edit_14"
// TODO: Using jquery to list btn-edit, btn-del click. Each btn should have unique id like: btn-edit__14
function showDel(user) {
  console.log("showdel");
  const btnDel = document.querySelector(`[btn-id = '${user.id}'] .btn-del`);
  btnDel.addEventListener("click", (e) => {
    e.preventDefault();
    id = user.id;
    $("#deleteModal").modal("show");
  });
}
function edit(user) {
  const btnEdit = document.querySelector(`[data-id = '${user.id}'] .btn-edit`);
  btnEdit.addEventListener("click", (e) => {
    e.preventDefault();
    id = user.id;
    $("#editModal").modal("show");
    (editModalForm.name.value = user.name),
      (editModalForm.email.value = user.email),
      (editModalForm.address.value = user.address),
      (editModalForm.phone.value = user.phone);
  });
}


// deleteModalForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   fetch(`${url}/${id}`, {
//     method: "DELETE",
//   })
//     .then((res) => res.json())
//     .then(() => fetchUsers());
// });

// addModalForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: addModalForm.name.value,
//       email: addModalForm.email.value,
//       address: addModalForm.address.value,
//       phone: addModalForm.phone.value,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       const dataArr = [];
//       dataArr.push(data);
//       fetchUsers(dataArr);
//     });
// });

// //edit
// editModalForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   fetch(`${url}/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       name: editModalForm.name.value,
//       email: editModalForm.email.value,
//       address: editModalForm.address.value,
//       phone: editModalForm.phone.value,
//     }),
//   })
//     .then((res) => res.json())
//     .then(() => fetchUsers());
// });
