const xhttp = new XMLHttpRequest()
function loadDoc(){
    var xhttp = new XMLHttpRequest()
    // function này sẽ chạy mỗi khi readyState thay đổi
    xhttp.onreadystatechange = function () {
      // khi request thành công
      if(this.readyState == 4 && this.status == 200) {
        document.getElementById('table-user').innerHTML = this.responseText
        console.log('XMLHttpRequest GET ', this.responseText )
      }
      xhttp.open('GET', 'https://httpbin.org/get', true)
      xhttp.send()
    }
    
    loadDoc()
}