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
$("#selectAll").click(function () { 
  if ($(this).hasClass("checkedAll")) {
    $("input").prop("checked", false);
    $(this).removeClass("checkedAll");
  } else {
    $("input").prop("checked", true);
    $(this).addClass("checkedAll");
  }
});
//showpopup modal
//showPopup edit, delete
//edit
//reload 

// const axios = require('axios')

// function getUserInfo(num) {
//   return axios
//     .get('https://shopee.vn/api/v4/product/get_shop_info?shopid=189373321')
//     .then(() => {
//       console.log('GET THANH CONG DOG', num)
//     })
// }

// async function main() {
//   const dog1 =  getUserInfo(1)
//   const dog2 =  getUserInfo(2)
//   const dog3 =  getUserInfo(3)

//   await Promise.all([dog1, dog2, dog3])
//     console.log("done");
// }
// main()
