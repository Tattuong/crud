const modal = document.getElementsByClassName("modal-fade");
const btn = document.getElementsByClassName("myBtn");
const close = document.getElementsByClassName("close");

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
close[1].onclick = () => {
  modal[1].style.display = "none";
};
// close popup
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

$(document).ready(function () {});

//showpopup moda
//showPopup edit, delete
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
//edit
