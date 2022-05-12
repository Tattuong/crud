//CRUD USING JQUERY AJAX
//AJAX CALL TO SHOW DATA

const editModalForm = document.querySelector("#editModal .form-user");
const URL = "http://localhost:3000/users";
function fetchData() {
  $.ajax({
    url: URL,
    method: "GET",
    dataType: "json",
    data: {
      data: "testdata",
    },
    success: function (data) {
      console.log(data);
      $.each(data, function(key, user) {
        $("#table-user").append(`<tr data-id= '${user.id}'>
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
          <a href="#editModal" class="btn-edit" ><i class="bi bi-pencil-fill" data-toggle="modal" title="Edit" style="font-size: 20px; color:#FFC107;"></i></a>
          <a href="#deleteModal" class="btn-del"><i class="bi bi-trash-fill" data-toggle="tooltip" title="Delete" style="font-size: 20px; color:red"	></i></a>
        </td>
      </tr>`);
        const btnDel = document.querySelector(
          `[data-id = '${user.id}'] .btn-del`
        );
        btnDel.addEventListener("click", (e) => {
          e.preventDefault();
          id = user.id;
          $("#deleteModal").modal("show");
        });
        const btnEdit = document.querySelector(
          `[data-id = '${user.id}'] .btn-edit`
        );
        btnEdit.addEventListener("click", (e) => {
          e.preventDefault();
          id = user.id;
          $("#editModal").modal("show");
          (editModalForm.name.value = user.name),
            (editModalForm.email.value = user.email),
            (editModalForm.address.value = user.address),
            (editModalForm.phone.value = user.phone);
        });
        console.log(key);
      });
      
    },
  });
}

fetchData();
function deleteEmployes(id) {
  $.ajax({
    url: URL + id,
    method: "DELETE",
    dataType: "json",
    success: function (data) {
      console.log(data);
      fetchData();
    },
  });
}

function getOneUser(id) {
  $.ajax({
    url: URL + id,
    method: "get",
    dataType: "json",
    success: function (data) {
      $($("#updateForm")[0].updateNum).val(data.tutorialNumber);
      $($("#updateForm")[0].updateTitle).val(data.title);
      $($("#updateForm")[0].updateAuthor).val(data.author);
      $($("#updateForm")[0].updateType).val(data.type);
      $("#updateForm").show();
    },
  });
}

$("#submitTutorial").on("click", function (e) {
  let data = {
    tutorialNumber: $($("#newForm")[0].tutNum).val(),
    title: $($("#newForm")[0].title).val(),
    author: $($("#newForm")[0].author).val(),
    type: $($("#newForm")[0].type).val(),
  };

  postTutorial(data);
  $("#newForm").trigger("reset");
  $("#newForm").toggle();
  e.preventDefault();
});

function postTutorial(data) {
  $.ajax({
    url: URL,
    method: "POST",
    dataType: "json",
    data: data,
    success: function (data) {
      console.log(data);
      getTutorials();
    },
  });
}

function loadButtons() {
  $(".editUser").click(function (e) {
    getOneTutorial($($(this)[0]).data("id"));
    e.preventDefault();
  });

  $(".deleteTut").click(function (e) {
    deleteTutorial($($(this)[0]).data("tutid"));
    e.preventDefault();
  });
}

function putTutorial(id, data) {
  $.ajax({
    url: URL + id,
    method: "PUT",
    dataType: "json",
    data: data,
    success: function (data) {
      console.log(data);
      getTutorials();
    },
  });
}
$("#updateTutorial").on("click", function (e) {
  let data = {
    tutorialNumber: $($("#updateForm")[0].updateNum).val(),
    title: $($("#updateForm")[0].updateTitle).val(),
    author: $($("#updateForm")[0].updateAuthor).val(),
    type: $($("#updateForm")[0].updateType).val(),
  };
  putTutorial($($("#updateForm")[0].tutId).val(), data);
  $("#updateForm").trigger("reset");
  $("#updateForm").toggle();
  e.preventDefault();
});

function deleteTutorial(id) {
  $.ajax({
    url: "http://localhost:3000/api/tutorials/" + id,
    method: "DELETE",
    dataType: "json",
    success: function (data) {
      console.log(data);
      getTutorials();
    },
  });
}

// const url = "http://localhost:3000/users"
// $(document).ready(function () {
//   var page = 1;
//   var current_page = 1;
//   var total_page = 0;
//   var is_ajax_fire = 0;

//   manageData();
//   /* manage data list */
//   function manageData() {
//     $.ajax({
//       dataType: "json",
//       url: url,
//       data: { page: page },
//     }).done(function (data) {
//       total_page = Math.ceil(data.total / 10);
//       current_page = page;
//       $("#pagination").twbsPagination({
//         totalPages: total_page,
//         visiblePages: current_page,
//         onPageClick: function (event, pageL) {
//           page = pageL;
//           if (is_ajax_fire != 0) {
//             getPageData();
//           }
//         },
//       });

//       manageRow(data.data);
//       is_ajax_fire = 1;
//     });
//   }

//   /* Get Page Data*/
//   function getPageData() {
//     $.ajax({
//       dataType: "json",
//       url: url + "api/getData.php",
//       data: { page: page },
//     }).done(function (data) {
//       manageRow(data.data);
//     });
//   }

//   /* Add new Item table row */
//   function manageRow(data) {
//     var rows = "";
//     $.each(data, function (key, value) {
//       rows = rows + "<tr>";
//       rows = rows + "<td>" + value.name + "</td>";
//       rows = rows + "<td>" + value.description + "</td>";
//       rows = rows + '<td data-id="' + value.id + '">';
//       rows =
//         rows +
//         '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Edit</button> ';
//       rows =
//         rows + '<button class="btn btn-danger remove-item">Delete</button>';
//       rows = rows + "</td>";
//       rows = rows + "</tr>";
//     });

//     $("tbody").html(rows);
//   }

//   /* Create new Item */
//   $(".crud-submit").click(function (e) {
//     e.preventDefault();
//     var form_action = $("#create-item").find("form").attr("action");
//     var title = $("#create-item").find("input[name='title']").val();
//     var description = $("#create-item")
//       .find("textarea[name='description']")
//       .val();

//     if (title != "" && description != "") {
//       $.ajax({
//         dataType: "json",
//         type: "POST",
//         url: url + form_action,
//         data: { title: title, description: description },
//       }).done(function (data) {
//         $("#create-item").find("input[name='title']").val("");
//         $("#create-item").find("textarea[name='description']").val("");
//         getPageData();
//         $(".modal").modal("hide");
//         toastr.success("Item Created Successfully.", "Success Alert", {
//           timeOut: 5000,
//         });
//       });
//     } else {
//       alert("You are missing title or description.");
//     }
//   });

//   /* Remove Item */
//   $("body").on("click", ".remove-item", function () {
//     var id = $(this).parent("td").data("id");
//     var c_obj = $(this).parents("tr");

//     $.ajax({
//       dataType: "json",
//       type: "POST",
//       url: url,
//       data: { id: id },
//     }).done(function (data) {
//       c_obj.remove();
//       toastr.success("Item Deleted Successfully.", "Success Alert", {
//         timeOut: 5000,
//       });
//       getPageData();
//     });
//   });

//   /* Edit Item */
//   $("body").on("click", ".edit-item", function () {
//     var id = $(this).parent("td").data("id");
//     var title = $(this).parent("td").prev("td").prev("td").text();
//     var description = $(this).parent("td").prev("td").text();

//     $("#edit-item").find("input[name='title']").val(title);
//     $("#edit-item").find("textarea[name='description']").val(description);
//     $("#edit-item").find(".edit-id").val(id);
//   });

//   /* Updated new Item */
//   $(".crud-submit-edit").click(function (e) {
//     e.preventDefault();
//     var form_action = $("#edit-item").find("form").attr("action");
//     var title = $("#edit-item").find("input[name='title']").val();

//     var description = $("#edit-item")
//       .find("textarea[name='description']")
//       .val();
//     var id = $("#edit-item").find(".edit-id").val();

//     if (title != "" && description != "") {
//       $.ajax({
//         dataType: "json",
//         type: "POST",
//         url: url + form_action,
//         data: { title: title, description: description, id: id },
//       }).done(function (data) {
//         getPageData();
//         $(".modal").modal("hide");
//         toastr.success("Item Updated Successfully.", "Success Alert", {
//           timeOut: 5000,
//         });
//       });
//     } else {
//       alert("You are missing title or description.");
//     }
//   });
// });
